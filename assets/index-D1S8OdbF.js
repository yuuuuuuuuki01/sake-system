(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const d of l.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(r){if(r.ep)return;r.ep=!0;const l=n(r);fetch(r.href,l)}})();const vo="modulepreload",bo=function(e){return"/"+e},rn={},q=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let u=function(y){return Promise.all(y.map(v=>Promise.resolve(v).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),p=d?.nonce||d?.getAttribute("nonce");r=u(n.map(y=>{if(y=bo(y),y in rn)return;rn[y]=!0;const v=y.endsWith(".css"),g=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${y}"]${g}`))return;const x=document.createElement("link");if(x.rel=v?"stylesheet":vo,v||(x.as="script"),x.crossOrigin="",x.href=y,p&&x.setAttribute("nonce",p),document.head.appendChild(x),v)return new Promise((C,A)=>{x.addEventListener("load",C),x.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${y}`)))})}))}function l(d){const p=new Event("vite:preloadError",{cancelable:!0});if(p.payload=d,window.dispatchEvent(p),!p.defaultPrevented)throw d}return r.then(d=>{for(const p of d||[])p.status==="rejected"&&l(p.reason);return t().catch(l)})},fe="https://ridspyczkxwkcbmwndhm.supabase.co",wo="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZHNweWN6a3h3a2NibXduZGhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MzkwODAsImV4cCI6MjA5MzUxNTA4MH0.ppWbfEsrUdUL8sRPO3BPHWA-r12ueMgJ3C44n1FvK3o",oe=wo;async function Ee(e,t){try{const n=new URL(`/rest/v1/${e}`,fe),o=await fetch(n.toString(),{method:"POST",headers:{apikey:oe,Authorization:`Bearer ${oe}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(n){return console.warn(`Failed to insert into Supabase table ${e}`,n),null}}async function Ma(e,t){try{const n=new URL(`/rest/v1/${e}`,fe),o=await fetch(n.toString(),{method:"POST",headers:{apikey:oe,Authorization:`Bearer ${oe}`,"Content-Type":"application/json",Prefer:"return=representation,resolution=merge-duplicates"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return(await o.json())[0]??null}catch(n){return console.warn(`Failed to upsert into Supabase table ${e}`,n),null}}async function je(e,t,n){try{const o=new URL(`/rest/v1/${e}?id=eq.${t}`,fe);return(await fetch(o.toString(),{method:"PATCH",headers:{apikey:oe,Authorization:`Bearer ${oe}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(n)})).ok}catch{return!1}}async function he(e,t={}){try{const n=new URL(`/rest/v1/rpc/${e}`,fe),o=await fetch(n.toString(),{method:"POST",headers:{apikey:oe,Authorization:`Bearer ${oe}`,"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(t)});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(n){return console.warn(`Failed to call Supabase RPC ${e}`,n),null}}async function Na(e){try{const t=new URL(`/rest/v1/${e}`,fe);t.searchParams.set("select","*"),t.searchParams.set("limit","0");const n=await fetch(t.toString(),{method:"GET",headers:{apikey:oe,Authorization:`Bearer ${oe}`,Accept:"application/json",Prefer:"count=exact"}});if(!n.ok)return 0;const o=n.headers.get("Content-Range");if(o){const r=o.match(/\/(\d+)/);if(r)return parseInt(r[1],10)}return 0}catch{return 0}}async function F(e,t={}){try{const n=new URL(`/rest/v1/${e}`,fe);Object.entries(t).forEach(([r,l])=>{n.searchParams.set(r,l)});const o=await fetch(n.toString(),{method:"GET",headers:{apikey:oe,Authorization:`Bearer ${oe}`,Accept:"application/json",Prefer:"return=representation"}});if(!o.ok)throw new Error(`HTTP ${o.status}`);return await o.json()}catch(n){return console.warn(`Failed to query Supabase table ${e}`,n),[]}}async function Jn(e,t){try{const n=new URL(`/rest/v1/${e}?id=eq.${encodeURIComponent(t)}`,fe);return(await fetch(n.toString(),{method:"DELETE",headers:{apikey:oe,Authorization:`Bearer ${oe}`}})).ok}catch{return!1}}async function Se(e,t={},n=1e3){const o=[];let r=0;try{for(;;){const l=new URL(`/rest/v1/${e}`,fe);Object.entries(t).forEach(([u,y])=>{l.searchParams.set(u,y)}),l.searchParams.set("limit",String(n)),l.searchParams.set("offset",String(r));const d=await fetch(l.toString(),{method:"GET",headers:{apikey:oe,Authorization:`Bearer ${oe}`,Accept:"application/json",Prefer:"return=representation"}});if(!d.ok)throw new Error(`HTTP ${d.status}`);const p=await d.json();if(o.push(...p),p.length<n)break;r+=n}return o}catch(l){return console.warn(`Failed to query all rows from Supabase table ${e}`,l),o.length>0?o:[]}}const Z=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:oe,SUPABASE_URL:fe,supabaseCount:Na,supabaseDelete:Jn,supabaseInsert:Ee,supabaseQuery:F,supabaseQueryAll:Se,supabaseRpc:he,supabaseUpdate:je,supabaseUpsert:Ma},Symbol.toStringTag,{value:"Module"})),Ra="sake_auth";function Kn(e){localStorage.setItem(Ra,JSON.stringify(e))}function Hn(){return{apikey:oe,"Content-Type":"application/json"}}function xo(e){try{const[,t]=e.split(".");if(!t)return null;const n=t.replaceAll("-","+").replaceAll("_","/"),o=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(o))}catch{return null}}async function Qn(e,t){const n=await fetch(`${fe}/auth/v1/${e}`,{method:"POST",headers:Hn(),body:JSON.stringify(t)}),o=await n.json().catch(()=>({}));if(!n.ok)throw new Error(o.error_description??o.msg??`HTTP ${n.status}`);return o}async function $o(e,t){const n=await Qn("token?grant_type=password",{email:e,password:t});return Kn({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function ln(e,t){const n=await Qn("signup",{email:e,password:t});return n.access_token&&n.refresh_token&&Kn({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??e}}async function _o(){const e=Zt();if(localStorage.removeItem(Ra),!!e?.access_token)try{await fetch(`${fe}/auth/v1/logout`,{method:"POST",headers:{...Hn(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function Zt(){const e=localStorage.getItem(Ra);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function So(){const e=Zt();if(!e)return null;const t=xo(e.access_token),n=typeof t?.email=="string"?t.email:null;return n?{email:n}:null}async function ko(e){const t=Zt();if(!t)throw new Error("not signed in");const n=await fetch(`${fe}/auth/v1/user`,{method:"PUT",headers:{apikey:oe,Authorization:`Bearer ${t.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({password:e})});if(!n.ok){const o=await n.json().catch(()=>({}));throw new Error(o.msg??`HTTP ${n.status}`)}}const Oa={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},Wn={generatedAt:new Date().toISOString(),kpis:{todaySales:0,todayDelta:0,monthSales:0,monthDelta:0,unpaidCount:0,unpaidAmount:0},dailySales:[],allDailySales:[],salesRecords:[]},Po={generatedAt:new Date().toISOString(),records:[]},Ue={generatedAt:new Date().toISOString(),summary:{customerCount:0,activeCustomerCount:0,productCount:0,activeProductCount:0},customers:[],products:[]},Eo={generatedAt:new Date().toISOString(),lastSyncAt:new Date().toISOString(),lastDataAt:new Date().toISOString(),status:"success",jobName:"sake-relay",message:"データ未取得"},Ao={},Lo={generatedAt:new Date().toISOString(),monthlySales:[],productTotals:[],customerTotals:[],staffTotals:[]};function ne(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function Co(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function Do(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function f(e,t,n=""){for(const o of t){const r=e[o];if(typeof r=="string"&&r.length>0)return r}return n}function D(e,t,n=0){for(const o of t)if(o in e)return ne(e[o]);return n}function ve(e,t,n=!0){for(const o of t)if(o in e)return Do(e[o]);return n}function ge(e,t,n){for(const o of t){const r=e[o];if(typeof r!="string"||r.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(r))return new Date(`${r}T00:00:00Z`).toISOString();const l=new Date(r);if(!Number.isNaN(l.getTime()))return l.toISOString()}return n}function qo(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:ge(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:ne(e.total_amount??e.billed_amount)}}function cn(e){const t=e.trim().toUpperCase(),n=Ao[t];if(n)return n;const o=Wn.salesRecords.find(r=>r.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:o?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}async function Gn(e){try{return(await F("system_settings",{select:"key,value",key:`eq.${e}`}))?.[0]?.value??null}catch{return null}}async function st(e,t){await Ma("system_settings",{key:e,value:t,updated_at:new Date().toISOString()})}async function Xn(){const e=new Date;e.setFullYear(e.getFullYear()-1);const t=e.toISOString().slice(0,10),n=await F("daily_sales_fact",{select:"sales_date,sales_amount,total_quantity,document_count",order:"sales_date.desc",sales_date:`gte.${t}`,limit:"400"}),o=new Map;for(const l of n){const d=String(l.sales_date??"");if(!d)continue;const p=o.get(d)??{amount:0,qty:0,docs:0};p.amount+=ne(l.sales_amount),p.qty+=ne(l.total_quantity),p.docs+=ne(l.document_count),o.set(d,p)}const r=Array.from(o.entries()).map(([l,d])=>({sales_date:l,sales_amount:d.amount,amount:d.amount,document_count:d.docs,bottles:d.qty,volume_ml:0,price_per_bottle:d.qty>0?Math.round(d.amount/d.qty):0,price_per_liter:0})).sort((l,d)=>d.sales_date.localeCompare(l.sales_date));if(r.length>0){const[l,d]=await Promise.all([F("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"}),F("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,legacy_customer_code,customer_name,total_amount",order:"sales_date.desc",limit:"500"})]),u=new Date().toISOString().slice(0,10),y=u.slice(0,7),v=[...r].sort((s,i)=>s.sales_date.localeCompare(i.sales_date)).map(s=>({date:new Date(`${s.sales_date}T00:00:00Z`).toISOString(),amount:ne(s.amount??s.sales_amount),bottles:ne(s.bottles),volumeMl:ne(s.volume_ml),pricePerBottle:ne(s.price_per_bottle),pricePerLiter:ne(s.price_per_liter)})),g=v.slice(-30),x=s=>ne(s.amount??s.sales_amount),C=r.reduce((s,i)=>i.sales_date===u?s+x(i):s,0),A=r.reduce((s,i)=>i.sales_date.startsWith(y)?s+x(i):s,0),T=l.filter(s=>ne(s.balance_amount)>0),P=d.map((s,i)=>({id:String(s.id??`sale-${i+1}`),documentNo:s.document_no??s.legacy_document_no??"",date:s.sales_date??"",customerCode:s.legacy_customer_code??"",customerName:s.customer_name??s.legacy_customer_code??"",amount:ne(s.total_amount)}));return{generatedAt:new Date().toISOString(),kpis:{todaySales:C,todayDelta:0,monthSales:A,monthDelta:0,unpaidCount:T.length,unpaidAmount:T.reduce((s,i)=>s+ne(i.balance_amount),0)},dailySales:g,allDailySales:v,salesRecords:P}}return console.error("[fetchSalesSummary] daily_sales_detail が空 — ファクトテーブル未更新の可能性あり"),Wn}async function Zn(){const e=await F("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status",limit:"1000"});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,n)=>{const o=t.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${o}-${n+1}`,customerCode:o,customerName:o,billedAmount:ne(t.billed_amount),paymentAmount:ne(t.paid_amount),balanceAmount:ne(t.balance_amount),lastPaymentDate:null,status:Co(t.payment_status)}})}:Po}async function Ba(){const[e,t]=await Promise.all([F("customers",{limit:"1000"}),F("products",{limit:"1000"})]);if(e.length>0||t.length>0){const n=e.length?e.map((r,l)=>{const d=typeof r.memo=="string"?JSON.parse(r.memo||"{}"):r.memo??{};return{id:f(r,["id","customer_id","code"],`customer-${l+1}`),code:f(r,["code","customer_code","legacy_customer_code"],`C${String(l+1).padStart(4,"0")}`),name:f(r,["name","customer_name","display_name"],`Customer ${l+1}`),kanaName:f(r,["kana_name"],""),shortName:f(r,["short_name"],""),postalCode:f(r,["postal_code"],""),address1:f(r,["address1"],""),address2:f(r,["address2"],""),phone:f(r,["phone"],""),fax:f(r,["fax"],""),email:f(r,["email"],""),staffCode:f(r,["staff_code"],""),businessType:f(r,["business_type"],""),areaCode:f(r,["delivery_area_code"],""),salesCategory:String(d.sales_category??""),closingDay:D(r,["closing_day","close_day"],31),paymentDay:D(r,["payment_day","due_day"],15),paymentMonth:Number(d.payment_month??0),paymentCycle:f(r,["payment_cycle"],""),billingCycleType:f(r,["billing_cycle_type"],""),billingCode:String(d.billing_code??""),creditLimit:D(r,["credit_limit"],0),taxMode:f(r,["tax_mode"],""),taxRound:String(d.tax_round??""),invoiceIssue:String(d.invoice_issue??""),invoiceType:f(r,["invoice_type"],""),priceGroup:String(d.price_group??""),priceType:String(d.price_type??""),tradeType:(()=>{const p=f(r,["trade_type"],"");if(p)return p;const u=String(d.price_type??"");return u==="000"?"B2B2C":u==="001"?"B2C":"B2B"})(),customerGroup1:String(d.customer_group1??""),customerGroup2:String(d.customer_group2??""),bankName:f(r,["bank_name"],""),bankBranch:f(r,["bank_branch"],""),bankAccount:f(r,["bank_account"],""),isActive:ve(r,["is_active","active","enabled"],!0),lat:r.lat?Number(r.lat):void 0,lng:r.lng?Number(r.lng):void 0}}):Ue.customers,o=t.length?t.map((r,l)=>({id:f(r,["id","product_id","product_code","legacy_product_code"],`product-${l+1}`),code:f(r,["product_code","legacy_product_code","code"],`P${String(l+1).padStart(5,"0")}`),janCode:f(r,["jan_code","jan","barcode"],""),name:f(r,["name","product_name","display_name"],`Product ${l+1}`),kanaName:f(r,["kana_name"],""),shortName:f(r,["short_name"],""),category:f(r,["category_code","category","category_name"],"未分類"),taxCategoryCode:f(r,["tax_code","tax_category_code"],""),isActive:ve(r,["is_active","active","enabled"],!0),listPrice:D(r,["list_price"],0),purchasePrice:D(r,["purchase_price"],0),salePrice:D(r,["default_sale_price","sale_price"],0),costPrice:D(r,["default_cost_price"],0),alcoholDegree:r.alcohol_degree!=null?Number(r.alcohol_degree):null,volumeMl:r.volume_ml!=null?Number(r.volume_ml):null,unit:f(r,["unit_name","unit"],"本"),caseQty:r.case_qty!=null?Number(r.case_qty):null,bottleType:f(r,["bottle_type"],""),containerCode:f(r,["container_code"],""),polishRate:r.polish_rate!=null?Number(r.polish_rate):null,riceType:f(r,["rice_type"],""),season:f(r,["season"],""),agingYears:D(r,["aging_years"],0)})):Ue.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||Ue.summary.customerCount,activeCustomerCount:e.length?n.filter(r=>r.isActive).length:Ue.summary.activeCustomerCount,productCount:t.length||Ue.summary.productCount,activeProductCount:t.length?o.filter(r=>r.isActive).length:Ue.summary.activeProductCount},customers:n,products:o}}return Ue}async function es(){const[e,t]=await Promise.all([F("relay_sync_log",{order:"sync_ended_at.desc.nullslast",limit:"1"}),F("daily_sales_fact",{select:"sales_date",order:"sales_date.desc",limit:"1"})]),n=t.length>0?ge(t[0],["sales_date"],new Date().toISOString()):new Date().toISOString();if(e.length>0){const o=e[0],r=f(o,["status"],"success"),l=o.errors,d=Array.isArray(l)?l.length>0:!!l;return{generatedAt:new Date().toISOString(),lastSyncAt:ge(o,["sync_ended_at","sync_started_at"],new Date().toISOString()),lastDataAt:n,status:d?"warning":r==="error"?"error":"success",jobName:f(o,["agent_hostname"],"sake-relay"),message:`${D(o,["rows_upserted"],0)}行同期 / ${D(o,["files_updated"],0)}ファイル更新`}}return{...Eo,lastDataAt:n}}async function ts(){const e=await he("get_sync_summary");return e&&e.tables?{tables:e.tables.map(t=>({tableName:t.name,displayName:t.display_name,rowCount:t.count,lastSyncAt:t.last_sync,tableType:t.type})),totalRawRecords:e.total_raw_records,totalNormalizedRecords:e.total_normalized_records,lastOverallSync:e.overall_freshness}:{tables:[],totalRawRecords:0,totalNormalizedRecords:0,lastOverallSync:null}}async function as(){const e=[{name:"売上明細 (SHTOR)",table:"sales_document_lines",countFilter:"note=like.*src:diff*",expectMin:2e5},{name:"伝票ヘッダ (SHDEN)",table:"sales_document_headers",expectMin:5e4},{name:"日次売上集計",table:"daily_sales_fact",expectMin:1e5},{name:"商品月別売上",table:"product_monthly_sales",expectMin:1e4},{name:"得意先マスタ",table:"customers",expectMin:500},{name:"商品マスタ",table:"products",expectMin:1e3},{name:"安全在庫",table:"product_safety_stock_params",expectMin:0}],t=[];for(const n of e)try{const o=n.countFilter?`&${n.countFilter}`:"",r=`${fe}/rest/v1/${n.table}?select=id&limit=0${o}`,d=(await fetch(r,{headers:{apikey:oe,Authorization:`Bearer ${oe}`,Prefer:"count=exact"}})).headers.get("content-range")??"*/0",p=parseInt(d.split("/").pop()??"0",10)||0,u=p>=n.expectMin?"ok":p>0?"warn":"error";t.push({name:n.name,table:n.table,count:p,status:u,detail:p>=n.expectMin?"正常稼働":p>0?"データ少":"データなし"})}catch{t.push({name:n.name,table:n.table,count:0,status:"error",detail:"接続エラー"})}return t}async function St(e){const t={select:"id,document_no,legacy_document_no,sales_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",order:"sales_date.desc",limit:"500"};e.startDate&&e.endDate?t.and=`(sales_date.gte.${e.startDate},sales_date.lte.${e.endDate})`:e.startDate?t.sales_date=`gte.${e.startDate}`:e.endDate&&(t.sales_date=`lte.${e.endDate}`);const n=[];e.customerCode.trim()&&n.push(`customer_code.ilike.*${e.customerCode.trim()}*`,`legacy_customer_code.ilike.*${e.customerCode.trim()}*`),e.documentNo.trim()&&n.push(`document_no.ilike.*${e.documentNo.trim()}*`,`legacy_document_no.ilike.*${e.documentNo.trim()}*`),n.length>0&&(t.or=`(${n.join(",")})`);const o=await F("sales_document_headers",t);return o.length>0?o.map((r,l)=>({id:f(r,["id"],`invoice-${l}`),documentNo:f(r,["document_no","legacy_document_no"],""),date:ge(r,["sales_date"],""),customerCode:f(r,["legacy_customer_code","customer_code"],""),customerName:f(r,["customer_name","legacy_customer_code"],""),itemCount:D(r,["line_count"],0),amount:D(r,["total_amount","billed_amount"],0)})):[]}async function ns(e){return(await F("sales_document_lines",{select:"line_no,legacy_product_code,product_name,quantity,unit_price,amount",or:`document_no.eq.${e},legacy_document_no.eq.${e}`,order:"line_no",limit:"100"})).map(n=>({lineNo:D(n,["line_no"],0),productCode:f(n,["legacy_product_code"],""),productName:f(n,["product_name"],""),quantity:D(n,["quantity"],0),unitPrice:D(n,["unit_price"],0),amount:D(n,["amount"],0)}))}async function ja(e){const t=e.trim().toUpperCase();if(!t)return cn("");const[n,o,r]=await Promise.all([F("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_code,legacy_customer_code,customer_name,total_amount,billed_amount",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"sales_date.desc",limit:"50"}),F("customer_payments",{select:"id,customer_code,legacy_customer_code,payment_date,received_date,amount,payment_amount,method,payment_method",or:`customer_code.eq.${t},legacy_customer_code.eq.${t}`,order:"payment_date.desc",limit:"50"}),F("customer_payment_status",{select:"legacy_customer_code,billed_amount,paid_amount,balance_amount,payment_status"})]);if(n.length>0||o.length>0){const l=n.map((u,y)=>{const v=qo(u,y);return{id:v.id,date:v.date,documentNo:v.documentNo,amount:v.amount}}),d=o.map((u,y)=>({id:String(u.id??`payment-${y+1}`),date:ge(u,["payment_date","received_date"],new Date().toISOString()),amount:ne(u.payment_amount??u.amount),method:u.payment_method??u.method??"入金"})),p=r.find(u=>(u.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??t,balanceAmount:ne(p?.balance_amount),salesTotal:l.reduce((u,y)=>u+y.amount,0),paymentTotal:d.reduce((u,y)=>u+y.amount,0),salesHistory:l,paymentHistory:d}}return cn(t)}async function za(){const[e,t,n,o]=await Promise.all([F("mv_monthly_sales",{order:"month.asc"}),F("mv_customer_sales_totals",{order:"amount.desc",limit:"100"}),F("mv_product_sales_totals",{order:"amount.desc",limit:"100"}),F("mv_staff_sales_totals",{order:"amount.desc",limit:"50"})]);return e.length>0?{generatedAt:new Date().toISOString(),monthlySales:e.map(r=>({month:f(r,["month"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),volumeMl:D(r,["volume_ml"],0)})),productTotals:n.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:D(r,["volume_ml"],0)})),customerTotals:t.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:D(r,["volume_ml"],0)})),staffTotals:o.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:0}))}:Lo}async function Io(e,t,n){if(t==="all")return[];const o=n?ss(t,n):null,l=await he(e==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{p_date_from:o?.from??null,p_date_to:o?.to??null});return l?l.map(d=>({code:f(d,["code"],""),name:f(d,["name"],""),amount:D(d,["amount"],0),quantity:D(d,["quantity"],0),documents:D(d,["documents"],0),volumeMl:D(d,["volume_ml"],0)})):[]}async function To(e,t){if(t==="all")return[];const n=await he("get_available_periods",{p_type:t});return!n||n.length===0?[]:n.map(o=>o.period_val).filter(Boolean)}function ss(e,t){if(e==="all"||!t)return null;if(e==="daily")return{from:t,to:t};if(e==="monthly"){const[n,o]=t.split("-").map(Number),r=`${n}-${String(o).padStart(2,"0")}-01`,l=new Date(n,o,0).getDate(),d=`${n}-${String(o).padStart(2,"0")}-${String(l).padStart(2,"0")}`;return{from:r,to:d}}if(e==="yearly")return{from:`${t}-01-01`,to:`${t}-12-31`};if(e==="weekly"){const n=t.match(/^(\d{4})-W(\d{2})$/);if(!n)return null;const o=parseInt(n[1]),r=parseInt(n[2]),l=new Date(o,0,4),d=l.getDay()||7,p=new Date(l);p.setDate(l.getDate()-d+1);const u=new Date(p);u.setDate(p.getDate()+(r-1)*7);const y=new Date(u);return y.setDate(u.getDate()+6),{from:u.toISOString().slice(0,10),to:y.toISOString().slice(0,10)}}return null}function os(e){return e.map(t=>({staffCode:f(t,["staff_code"],""),staffName:f(t,["staff_name"],""),code:f(t,["code"],""),name:f(t,["name"],""),tag:f(t,["tag"],""),amount:D(t,["amount"],0),quantity:D(t,["quantity"],0),documents:D(t,["documents"],0)}))}async function Mo(e,t){const n=await he("get_staff_totals_by_period",{p_date_from:e??null,p_date_to:t??null});return n?n.map(o=>({code:f(o,["code"],""),name:f(o,["name"],""),amount:D(o,["amount"],0),quantity:D(o,["quantity"],0),documents:D(o,["documents"],0)})):[]}async function No(e,t,n){const o=await he("get_staff_customer_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return o?os(o):[]}async function Ro(e,t,n){const o=await he("get_staff_product_breakdown",{p_staff_code:e,p_date_from:t??null,p_date_to:n??null});return o?os(o):[]}async function Oo(e,t){if(e==="all"||!t)return[];const n=await he("get_period_chart_data",{p_period:e,p_filter:t});return n?n.map(o=>({month:f(o,["label"],""),amount:D(o,["amount"],0),quantity:D(o,["quantity"],0),volumeMl:D(o,["volume_ml"],0)})):[]}function Bo(e){return e.replace(/^\d{4}/,t=>String(Number(t)-1))}async function jo(e,t,n){const o=await he("get_customer_product_breakdown",{p_customer_code:e,p_date_from:t??null,p_date_to:n??null});return o?o.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),tag:f(r,["tag"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:D(r,["volume_ml"],0)})):[]}async function zo(e,t,n){const o=await he("get_product_customer_breakdown",{p_product_code:e,p_date_from:t??null,p_date_to:n??null});return o?o.map(r=>({code:f(r,["code"],""),name:f(r,["name"],""),tag:f(r,["tag"],""),amount:D(r,["amount"],0),quantity:D(r,["quantity"],0),documents:D(r,["documents"],0),volumeMl:D(r,["volume_ml"],0)})):[]}async function Fo(e,t){const n=await he("get_entity_monthly_sales",{p_code:e,p_type:t});return n?n.map(o=>({month:f(o,["month"],""),amount:D(o,["amount"],0),quantity:D(o,["quantity"],0),volumeMl:D(o,["volume_ml"],0)})):[]}async function Vo(e,t){const n=await he("get_brewing_plan_summary",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({brewCategory:f(o,["brew_category"],""),subCategory:f(o,["sub_category"],""),productCount:D(o,["product_count"],0),totalShipmentQty:D(o,["total_shipment_qty"],0),totalShipmentMl:D(o,["total_shipment_ml"],0),monthlyAvgQty:D(o,["monthly_avg_qty"],0),monthlyAvgMl:D(o,["monthly_avg_ml"],0),currentStockL:D(o,["current_stock_l"],0),monthsRemaining:D(o,["months_remaining"],0),costPerL:D(o,["cost_per_l"],0)})):[]}async function Uo(e,t){const n=await he("get_brewing_monthly_trend",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({month:f(o,["month"],""),brewCategory:f(o,["brew_category"],""),shipmentMl:D(o,["shipment_ml"],0)})):[]}async function Yo(e,t){const n=await he("get_brewing_product_detail",{p_fy_start:e,p_fy_end:t});return n?n.map(o=>({brewCategory:f(o,["brew_category"],""),subCategory:f(o,["sub_category"],""),productCode:f(o,["product_code"],""),productName:f(o,["product_name"],""),volumeMl:D(o,["volume_ml"],0),annualQty:D(o,["annual_qty"],0),annualMl:D(o,["annual_ml"],0),monthlyAvgQty:D(o,["monthly_avg_qty"],0),monthlyAvgMl:D(o,["monthly_avg_ml"],0)})):[]}async function Jo(e){return(await F("brewing_plan_schedule",{select:"id,brew_category,fy,brew_month,duration_months,planned_volume_l,notes",fy:`eq.${e}`,order:"brew_category.asc,brew_month.asc"})??[]).map(n=>({id:f(n,["id"],""),brewCategory:f(n,["brew_category"],""),fy:D(n,["fy"],e),brewMonth:D(n,["brew_month"],0),durationMonths:D(n,["duration_months"],2),plannedVolumeL:D(n,["planned_volume_l"],0),notes:f(n,["notes"],"")}))}async function Ko(e,t,n){return await he("save_brewing_schedule",{p_brew_category:e,p_fy:t,p_rows:n.map(r=>({brew_month:r.brewMonth,duration_months:r.durationMonths,planned_volume_l:r.plannedVolumeL,notes:r.notes??null}))})!==null}async function Ho(e,t,n,o){return await Ma("brewing_stock",{brew_category:e,stock_l:t,cost_per_l:n,notes:o??null,updated_at:new Date().toISOString()})!==null}async function Qo(){const e=await F("brewing_custom_category_type_links",{order:"category_name.asc,production_type_name.asc"}),t={};for(const n of e??[]){const o=f(n,["category_name"],""),r=f(n,["production_type_name"],"");!o||!r||(t[o]||(t[o]=[]),t[o].push(r))}return t}async function Wo(e,t){return await he("link_type_to_custom_category",{p_category:e,p_type_name:t})!==null}async function Go(e,t){return await he("unlink_type_from_custom_category",{p_category:e,p_type_name:t})!==null}async function Xo(){const e=await F("products",{select:"production_type_name",production_type_name:"not.is.null",order:"production_type_name.asc"});return[...new Set((e??[]).map(n=>f(n,["production_type_name"],"")).filter(Boolean))].filter(n=>!n.startsWith("セット品")&&!n.startsWith("その他(酒以外"))}async function Zo(){const e=await F("brewing_alcohol_settings",{}),t={};for(const n of e??[]){const o=f(n,["brew_category"],"");o&&(t[o]={brewCategory:o,rawAlcoholPct:D(n,["raw_alcohol_pct"],18),targetAlcoholPct:D(n,["target_alcohol_pct"],15)})}return t}async function er(e,t,n){const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await q(async()=>{const{SUPABASE_URL:d,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:d,SUPABASE_ANON_KEY:p}},void 0);return r?(await fetch(`${o}/rest/v1/brewing_alcohol_settings`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,raw_alcohol_pct:t,target_alcohol_pct:n,updated_at:new Date().toISOString()})})).ok:!1}async function tr(){const e=await he("get_brewing_yearly_shipments",{});return e?e.map(t=>({fy:D(t,["fy"],0),brewCategory:f(t,["brew_category"],""),shipmentL:D(t,["shipment_l"],0),monthsElapsed:D(t,["months_elapsed"],12),annualizedL:D(t,["annualized_l"],0)})):[]}async function ar(){const e=await F("brewing_forecast_overrides",{}),t={};for(const n of e??[]){const o=f(n,["brew_category"],""),r=D(n,["growth_rate"],NaN);o&&!isNaN(r)&&(t[o]=r)}return t}async function nr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await q(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}},void 0);return o?t===null?(await fetch(`${n}/rest/v1/brewing_forecast_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}})).ok:(await fetch(`${n}/rest/v1/brewing_forecast_overrides`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,growth_rate:t,updated_at:new Date().toISOString()})})).ok:!1}async function sr(){const e=await F("brewing_rice_params",{}),t={};for(const n of e??[]){const o=f(n,["brew_category"],"");o&&(t[o]={brewCategory:o,polishingRatio:D(n,["polishing_ratio"],.7),ricePerLiterKg:D(n,["rice_per_liter_kg"],.5),kojiRatio:D(n,["koji_ratio"],.3),kojiVariety:f(n,["koji_variety"],"山田錦"),kojiPricePerKg:D(n,["koji_price_per_kg"],600),kakeVariety:f(n,["kake_variety"],"一般米"),kakePricePerKg:D(n,["kake_price_per_kg"],350),alcoholAdditionRatio:D(n,["alcohol_addition_ratio"],0)})}return t}async function or(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await q(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}},void 0);return o?(await fetch(`${n}/rest/v1/brewing_rice_params`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,polishing_ratio:t.polishingRatio,rice_per_liter_kg:t.ricePerLiterKg,koji_ratio:t.kojiRatio,koji_variety:t.kojiVariety,koji_price_per_kg:t.kojiPricePerKg,kake_variety:t.kakeVariety,kake_price_per_kg:t.kakePricePerKg,alcohol_addition_ratio:t.alcoholAdditionRatio??0,updated_at:new Date().toISOString()})})).ok:!1}async function rr(){const e=await he("get_brewing_seasonal_pattern",{});return e?e.map(t=>({brewCategory:f(t,["brew_category"],""),monthNum:D(t,["month_num"],0),avgMonthlyL:D(t,["avg_monthly_l"],0)})):[]}async function ir(e){const t=await F("procurement_decisions",{fy:`eq.${e}`}),n={};for(const o of t??[]){const r=f(o,["brew_category"],""),l=D(o,["decided_brewing_l"],-1);r&&l>=0&&(n[r]=l)}return n}async function lr(e,t,n){const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await q(async()=>{const{SUPABASE_URL:d,SUPABASE_ANON_KEY:p}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:d,SUPABASE_ANON_KEY:p}},void 0);return r?(await fetch(`${o}/rest/v1/procurement_decisions`,{method:"POST",headers:{apikey:r,Authorization:`Bearer ${r}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({brew_category:e,fy:t,decided_brewing_l:n,updated_at:new Date().toISOString()})})).ok:!1}async function cr(e){return(await F("brewing_process_batches",{fy:`eq.${e}`,order:"start_date.asc.nullsfirst"})??[]).map(n=>({id:f(n,["id"],""),brewCategory:f(n,["brew_category"],""),batchCode:f(n,["batch_code"],""),fy:D(n,["fy"],e),plannedVolumeL:D(n,["planned_volume_l"],0),tankNo:f(n,["tank_no"],""),status:f(n,["status"],"planned"),startDate:f(n,["start_date"],""),targetEndDate:f(n,["target_end_date"],""),notes:f(n,["notes"],"")}))}async function dr(e){return e.length===0?[]:(await F("brewing_process_steps",{batch_id:`in.(${e.join(",")})`,order:"batch_id.asc,step_order.asc"})??[]).map(n=>({id:f(n,["id"],""),batchId:f(n,["batch_id"],""),stepOrder:D(n,["step_order"],0),stepName:f(n,["step_name"],""),plannedStart:f(n,["planned_start"],""),plannedEnd:f(n,["planned_end"],""),actualStart:f(n,["actual_start"],""),actualEnd:f(n,["actual_end"],""),status:f(n,["status"],"未着手"),temperature:n.temperature!=null?D(n,["temperature"],0):null,notes:f(n,["notes"],"")}))}function pr(e,t){const n=new Date(e);let o=0;for(;o<t;)n.setDate(n.getDate()+1),n.getDay()!==0&&o++;return n}function ur(e,t){const n=new Date(e);let o=t-1;for(;o>0;)n.setDate(n.getDate()+1),n.getDay()!==0&&o--;return n.getDay()===0&&n.setDate(n.getDate()+1),n}function dn(e){return e.getDay()===0&&e.setDate(e.getDate()+1),e}const zt=[{name:"洗米・浸漬",days:1},{name:"蒸米",days:1},{name:"製麹",days:2},{name:"酒母",days:14},{name:"仕込み(添/仲/留)",days:4},{name:"醪管理",days:25},{name:"上槽",days:2},{name:"濾過・火入れ",days:1},{name:"貯蔵",days:30},{name:"瓶詰め",days:1}];async function mr(e,t,n,o,r){const d=n[o],p=d?.ricePerLiterKg??.5,u=d?.kojiRatio??.3,y=d?.polishingRatio??.7,v=d?.alcoholAdditionRatio??0,g=Math.round(t*(1-v)*p*u/y),x=r.filter(A=>A.stepName==="製麹"&&A.plannedStart&&A.plannedEnd);let C=new Date(e);for(let A=0;A<60;A++){const T=new Date(C.getTime()+1728e5),P=new Date(C.getTime()+3*864e5);let s=0;for(const i of x){const c=new Date(i.plannedStart).getTime(),m=new Date(i.plannedEnd).getTime();T.getTime()<=m&&P.getTime()>=c&&(s+=180)}if(s+g<=180)return C.toISOString().slice(0,10);C=new Date(C.getTime()+864e5)}return C.toISOString().slice(0,10)}async function yr(e,t,n,o,r,l,d){let p=r;l&&d&&(p=await mr(r,o,d,e,l));const u=await Ee("brewing_process_batches",{brew_category:e,batch_code:t,fy:n,planned_volume_l:o,start_date:p});if(!u?.id)return null;let y=dn(new Date(p));for(let v=0;v<zt.length;v++){y=dn(y);const g=y.toISOString().slice(0,10),x=ur(y,zt[v].days),C=x.toISOString().slice(0,10);await Ee("brewing_process_steps",{batch_id:u.id,step_order:v+1,step_name:zt[v].name,planned_start:g,planned_end:C}),y=pr(x,1)}return await je("brewing_process_batches",u.id,{target_end_date:y.toISOString().slice(0,10)}),u.id}async function hr(e,t){return je("brewing_process_steps",e,t)}async function gr(e,t){return je("brewing_process_batches",e,{...t,updated_at:new Date().toISOString()})}async function fr(e,t,n){const o=new Map(n.map(A=>[A.stepName,A])),r=e.filter(A=>A.status!=="completed"&&A.startDate).sort((A,T)=>A.startDate.localeCompare(T.startDate));if(r.length===0)return;const l=t.deadlineDate||"",d=t.allowSunday&&!!l,p=new Map,u=(A,T)=>{const P=new Date(A);return P.setDate(P.getDate()+T),P.toISOString().slice(0,10)},y=(A,T,P,s)=>A<=s&&T>=P,v=A=>T=>(!A&&T.getDay()===0&&T.setDate(T.getDate()+1),T),g=(A,T,P)=>{const s=new Date(A);let i=T-1;for(;i>0;)s.setDate(s.getDate()+1),(P||s.getDay()!==0)&&i--;return!P&&s.getDay()===0&&s.setDate(s.getDate()+1),s},x=(A,T)=>{const P=new Date(A);return P.setDate(P.getDate()+1),!T&&P.getDay()===0&&P.setDate(P.getDate()+1),P},C=()=>{const A=new Map;for(const T of p.values())for(const P of T){const s=o.get(P.stepName);if(!s)continue;const i=Math.max(Math.round((new Date(P.end).getTime()-new Date(P.start).getTime())/864e5)+1,1);let c=0;for(let h=0;h<i;h++){const b=new Date(P.start);b.setDate(b.getDate()+h),b.getDay()!==0&&c++}if(c===0)continue;const m=s.laborHours/c;for(let h=0;h<i;h++){const b=new Date(P.start);if(b.setDate(b.getDate()+h),b.getDay()===0)continue;const w=new Date(b);w.setDate(w.getDate()+3-(w.getDay()+6)%7);const $=new Date(w.getFullYear(),0,4),_=1+Math.round(((w.getTime()-$.getTime())/864e5-3+($.getDay()+6)%7)/7),k=`${w.getFullYear()}-W${String(_).padStart(2,"0")}`;A.set(k,(A.get(k)??0)+m)}}return A};for(const A of r){let T=A.startDate;for(let i of[!1,...d?[!0]:[]]){T=A.startDate;for(let m=0;m<90;m++){T=v(i)(new Date(T)).toISOString().slice(0,10);const b=[];let w=new Date(T);for(const I of zt){w=v(i)(w);const M=w.toISOString().slice(0,10),O=g(w,I.days,i),N=O.toISOString().slice(0,10);b.push({stepName:I.name,start:M,end:N}),w=x(O,i)}const $=b.find(I=>I.stepName==="製麹");let _=!1;if($)for(const[I,M]of p){const O=M.find(N=>N.stepName==="製麹");if(O&&y($.start,$.end,O.start,O.end)){_=!0;break}}if(_){T=u(T,1);continue}p.set(A.id,b);const k=C(),E=t.workerCount*t.weeklyHoursLimit;let L=!1;for(const I of k.values())if(I>E*1.1){L=!0;break}if(L){p.delete(A.id),T=u(T,1);continue}break}const c=p.get(A.id);if(l&&c){const m=c.find(h=>h.stepName==="仕込み(添/仲/留)");if(m&&m.end<=l)break;if(!i){p.delete(A.id);continue}}else break}const P=p.get(A.id);if(!P)continue;await je("brewing_process_batches",A.id,{start_date:T,target_end_date:u(P[P.length-1].end,0),updated_at:new Date().toISOString()});const s=await F("brewing_process_steps",{batch_id:`eq.${A.id}`,order:"step_order.asc"});if(s)for(const i of s){const c=D(i,["step_order"],0),m=P[c-1];if(m){const h=f(i,["id"],"");await je("brewing_process_steps",h,{planned_start:m.start,planned_end:m.end})}}}}async function vr(){const t=(await F("brewing_worker_settings",{limit:"1"})??[])[0];return t?{workerCount:D(t,["worker_count"],2),weeklyHoursLimit:D(t,["weekly_hours_limit"],40),dayStartHour:D(t,["day_start_hour"],6),deadlineDate:f(t,["deadline_date"],""),allowSunday:t.allow_sunday===!0}:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1}}async function br(e){const t=await F("brewing_worker_settings",{limit:"1"});if(t&&t.length>0){const n=f(t[0],["id"],"");return je("brewing_worker_settings",n,{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday,updated_at:new Date().toISOString()})}return await Ee("brewing_worker_settings",{worker_count:e.workerCount,weekly_hours_limit:e.weeklyHoursLimit,day_start_hour:e.dayStartHour,deadline_date:e.deadlineDate||null,allow_sunday:e.allowSunday})!==null}async function wr(){return(await F("brewing_step_labor",{order:"step_name"})??[]).map(t=>({stepName:f(t,["step_name"],""),laborHours:D(t,["labor_hours"],4),workerCountNeeded:D(t,["worker_count_needed"],1)}))}function xr(e,t){const n=new Map(t.map(r=>[r.stepName,r])),o=new Map;for(const r of e){if(!r.plannedStart||!r.plannedEnd)continue;const l=n.get(r.stepName);if(!l)continue;const d=new Date(r.plannedStart),p=new Date(r.plannedEnd),u=Math.max(Math.round((p.getTime()-d.getTime())/864e5)+1,1),y=l.laborHours/u;for(let v=new Date(d);v<=p;v=new Date(v.getTime()+864e5)){const g=new Date(v);g.setDate(g.getDate()+3-(g.getDay()+6)%7);const x=new Date(g.getFullYear(),0,4),C=1+Math.round(((g.getTime()-x.getTime())/864e5-3+(x.getDay()+6)%7)/7),A=`${g.getFullYear()}-W${String(C).padStart(2,"0")}`;o.set(A,(o.get(A)??0)+y)}}return o}async function $r(e){return(await F("rice_purchase_commitments",{fy:`eq.${e}`,order:"variety_name.asc"})??[]).map(n=>({id:f(n,["id"],""),varietyName:f(n,["variety_name"],""),committedBales:D(n,["committed_bales"],0),pricePerKg:D(n,["price_per_kg"],0),supplier:f(n,["supplier"],""),deliveryMonth:D(n,["delivery_month"],0)||null,fy:D(n,["fy"],e),notes:f(n,["notes"],"")}))}async function _r(e){return await Ee("rice_purchase_commitments",{variety_name:e.varietyName,committed_bales:e.committedBales??0,price_per_kg:e.pricePerKg??0,supplier:e.supplier??"",delivery_month:e.deliveryMonth??null,fy:e.fy,notes:e.notes??""})!==null}async function Sr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/rice_purchase_commitments?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function kr(){return(await F("rice_varieties",{order:"sort_order.asc,name.asc"})??[]).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),defaultPricePerKg:D(t,["default_price_per_kg"],400),region:f(t,["region"],"")}))}async function Pr(e,t,n=""){return await Ee("rice_varieties",{name:e,default_price_per_kg:t,region:n})!==null}async function Er(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/rice_varieties?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function Ar(e){return(await F("brewing_stock_entries",{brew_category:`eq.${e}`,order:"created_at.asc"})??[]).map(n=>({id:f(n,["id"],""),brewCategory:f(n,["brew_category"],""),label:f(n,["label"],""),volumeL:D(n,["volume_l"],0)}))}async function Lr(){return(await F("brewing_stock_entries",{order:"brew_category.asc,created_at.asc"})??[]).map(t=>({id:f(t,["id"],""),brewCategory:f(t,["brew_category"],""),label:f(t,["label"],""),volumeL:D(t,["volume_l"],0)}))}async function Cr(e,t,n){return await Ee("brewing_stock_entries",{brew_category:e,label:t,volume_l:n})!==null}async function Dr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await q(async()=>{const{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:l,SUPABASE_ANON_KEY:d}},void 0);return o?(await fetch(`${n}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"PATCH",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json"},body:JSON.stringify({brew_category:t})})).ok:!1}async function qr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);return n?(await fetch(`${t}/rest/v1/brewing_stock_entries?id=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok:!1}async function Ir(){return(await F("brewing_custom_categories",{order:"sort_order.asc,name.asc"})??[]).map(t=>({name:f(t,["name"],""),parentCategory:f(t,["parent_category"],"")})).filter(t=>t.name)}async function Tr(e,t){return await Ee("brewing_custom_categories",{name:e,parent_category:t})!==null}async function Mr(e){const t=await he("get_types_in_brew_category",{p_brew_category:e});return t?t.map(n=>({name:f(n,["production_type_name"],""),count:D(n,["product_count"],0)})).filter(n=>n.name):[]}async function Nr(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}},void 0);if(!n)return!1;try{return await fetch(`${t}/rest/v1/brewing_category_overrides?brew_category=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}}),(await fetch(`${t}/rest/v1/brewing_custom_categories?name=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Rr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await q(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);if(!o)return!1;try{return t===null?(await fetch(`${n}/rest/v1/brewing_category_overrides?product_code=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}})).ok:(await fetch(`${n}/rest/v1/brewing_category_overrides`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"resolution=merge-duplicates"},body:JSON.stringify({product_code:e,brew_category:t})})).ok}catch{return!1}}async function Or(){const e=await F("brewing_category_overrides",{}),t={};for(const n of e??[]){const o=f(n,["product_code"],""),r=f(n,["brew_category"],"");o&&r&&(t[o]=r)}return t}async function Br(e){return(await F("calendar_label_exclusions",{year_month:`eq.${e}`})??[]).map(n=>f(n,["product_code"],"")).filter(Boolean)}async function jr(e,t){const{SUPABASE_URL:n,SUPABASE_ANON_KEY:o}=await q(async()=>{const{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:r,SUPABASE_ANON_KEY:l}},void 0);if(!o)return!1;try{if(await fetch(`${n}/rest/v1/calendar_label_exclusions?year_month=eq.${encodeURIComponent(e)}`,{method:"DELETE",headers:{apikey:o,Authorization:`Bearer ${o}`}}),t.length===0)return!0;const r=t.map(d=>({year_month:e,product_code:d}));return(await fetch(`${n}/rest/v1/calendar_label_exclusions`,{method:"POST",headers:{apikey:o,Authorization:`Bearer ${o}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(r)})).ok}catch{return!1}}const xa={sales:"売上",return:"返品",export_return:"輸出戻入"};async function rs(e){const t=e.lines.reduce((r,l)=>r+l.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Ee("sales_document_headers",{legacy_document_no:n,legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode,total_amount:t,status:"confirmed"}))?.id??`local-${n}`,documentNo:n,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const pn={documentNo:"",invoiceDate:"",customerCode:"",customerName:"",customerAddress:"",lines:[],totalAmount:0,taxAmount:0,note:""};async function Fa(e){const t=await F("sales_document_headers",{select:"*",legacy_document_no:`eq.${e}`});if(t.length>0){const n=t[0],o=ne(n.total_amount);return{documentNo:e,invoiceDate:f(n,["sales_date","document_date"],""),customerCode:f(n,["legacy_customer_code","customer_code"],""),customerName:f(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:o,taxAmount:Math.floor(o*10/110),note:""}}return{...pn,documentNo:e||pn.documentNo}}const zr={targetYearMonth:"",closingDay:31,totalBilling:0,customers:[]};async function Va(e){const t=await F("mv_billing_summary",{year_month:`eq.${e}`,order:"sales_amount.desc"});if(t.length>0){const n=t.map(r=>{const l=D(r,["sales_amount"],0),d=D(r,["tax_amount"],0);return{customerCode:f(r,["customer_code"],""),customerName:f(r,["customer_name"],""),closingDay:31,salesAmount:l,taxAmount:d,prevBalance:0,paymentAmount:0,billingAmount:l,status:"open"}}),o=n.reduce((r,l)=>r+l.billingAmount,0);return{targetYearMonth:e,closingDay:31,totalBilling:o,customers:n}}return{...zr,targetYearMonth:e}}const Fr={generatedAt:new Date().toISOString(),months:[],salesByProduct:[],salesByCustomer:[],costSimulation:[]};async function ea(){const[e,t,n]=await Promise.all([F("mv_monthly_sales",{order:"month.asc"}),F("mv_product_monthly_shipments",{order:"code.asc,month.asc"}),F("mv_customer_sales_totals",{order:"amount.desc",limit:"10"})]);if(e.length===0)return Fr;const o=e.slice(-12).map(u=>f(u,["month"],"")),r=new Map;t.forEach(u=>{const y=f(u,["code"],"");r.has(y)||r.set(y,{name:f(u,["name"],y),monthValues:new Map}),r.get(y).monthValues.set(f(u,["month"],""),D(u,["amount"],0))});const d=Array.from(r.entries()).map(([u,y])=>({code:u,name:y.name,total:o.reduce((v,g)=>v+(y.monthValues.get(g)??0),0),monthValues:y.monthValues})).sort((u,y)=>y.total-u.total).slice(0,10).map(u=>({label:u.name,values:o.map(y=>u.monthValues.get(y)??0)})),p=n.map(u=>({label:f(u,["name"],""),values:o.map(()=>Math.round(D(u,["amount"],0)/o.length))}));return{generatedAt:new Date().toISOString(),months:o,salesByProduct:d,salesByCustomer:p,costSimulation:[]}}async function Vr(){const e=await Se("mv_product_monthly_shipments",{order:"code.asc,month.asc"});if(e.length===0)return[];const t=new Map;return e.forEach(n=>{const o=f(n,["code"],"");if(!o)return;const r=f(n,["month"],""),l=parseInt(r.slice(5,7))-1;if(l<0||l>11)return;let d=t.get(o);d||(d={name:f(n,["name"],o),qty:new Array(12).fill(0),amt:new Array(12).fill(0)},t.set(o,d)),d.qty[l]+=D(n,["quantity"],0),d.amt[l]+=D(n,["amount"],0)}),Array.from(t.entries()).map(([n,o])=>({code:n,name:o.name,monthlyQuantity:o.qty,monthlyAmount:o.amt,totalQuantity:o.qty.reduce((r,l)=>r+l,0),totalAmount:o.amt.reduce((r,l)=>r+l,0)})).filter(n=>n.totalQuantity>0).sort((n,o)=>o.totalAmount-n.totalAmount)}async function Ur(){return(await F("product_demand_forecasts",{order:"forecast_amount.desc"})).map(t=>({productCode:f(t,["product_code"],""),productName:f(t,["product_name"],""),forecastMonth:f(t,["forecast_month"],""),segment:f(t,["segment"],"monthly"),avgMonthly:D(t,["avg_monthly"],0),forecastQuantity:D(t,["forecast_quantity"],0),forecastAmount:D(t,["forecast_amount"],0),safetyStock:D(t,["safety_stock"],0),calculatedAt:ge(t,["calculated_at"],"")}))}async function Yr(){const e=new Date;e.setMonth(e.getMonth()-1);const t=e.toISOString().slice(0,10),n=await Se("sales_document_headers",{select:"id,document_no,legacy_document_no,sales_date,document_date,customer_name",order:"sales_date.desc",sales_date:`gte.${t}`});if(n.length===0)return[];n.map(d=>String(d.id)).filter(Boolean);const o=await Se("sales_document_lines",{select:"header_id,document_header_id,product_name,quantity"}),r=new Map;n.forEach(d=>{d.id&&r.set(String(d.id),d)});const l=[];return o.forEach(d=>{const p=String(d.header_id??d.document_header_id??""),u=r.get(p);if(!u)return;const y=u.sales_date??u.document_date??"";!y||y<t||l.push({date:y.slice(0,10),customerName:u.customer_name??"不明",productName:d.product_name??"不明",quantity:ne(d.quantity),documentNo:u.document_no??u.legacy_document_no??""})}),l.sort((d,p)=>d.date.localeCompare(p.date))}async function Jr(){const e=new Date().toISOString();return(await F("system_announcements",{is_active:"eq.true",starts_at:`lte.${e}`,or:`(ends_at.is.null,ends_at.gte.${e})`,order:"created_at.desc"})).map(n=>({id:f(n,["id"],""),message:f(n,["message"],""),level:f(n,["level"],"info"),startsAt:ge(n,["starts_at"],""),endsAt:n.ends_at?ge(n,["ends_at"],""):null,dismissible:ve(n,["dismissible"],!0)}))}async function Kr(){const e=await Se("customer_sales_summary",{select:"customer_code,customer_name,business_type,area_code,phone,last_order_date,days_since_order,amount_12m,amount_3m,amount_this_month,amount_last_year_same_month,annual_revenue,is_dormant,is_at_risk",amount_12m:"gt.0",order:"amount_12m.desc"});return e.length>0?e.map(t=>({customer_code:f(t,["customer_code"],""),customer_name:f(t,["customer_name"],""),business_type:f(t,["business_type"],""),area_code:f(t,["area_code"],""),phone:f(t,["phone"],""),last_order_date:f(t,["last_order_date"],""),days_since_order:D(t,["days_since_order"],0),amount_12m:D(t,["amount_12m"],0),amount_3m:D(t,["amount_3m"],0),amount_this_month:D(t,["amount_this_month"],0),amount_last_year_same_month:D(t,["amount_last_year_same_month"],0),annual_revenue:D(t,["annual_revenue"],0),is_dormant:ve(t,["is_dormant"],!1),is_at_risk:ve(t,["is_at_risk"],!1)})):[]}async function Hr(){return(await Se("visit_priority",{select:"customer_code,customer_name,phone,address,area_code,business_type,priority_score,reasons,last_order_date,days_since_order,annual_revenue,recommended_action",order:"priority_score.desc"})).map(t=>({customer_code:f(t,["customer_code"],""),customer_name:f(t,["customer_name"],""),phone:f(t,["phone"],""),address:f(t,["address"],""),area_code:f(t,["area_code"],""),business_type:f(t,["business_type"],""),priority_score:D(t,["priority_score"],0),reasons:Array.isArray(t.reasons)?t.reasons:[],last_order_date:f(t,["last_order_date"],""),days_since_order:D(t,["days_since_order"],0),annual_revenue:D(t,["annual_revenue"],0),recommended_action:f(t,["recommended_action"],"")}))}async function Qr(){return(await Se("product_seasonal_profile",{select:"product_code,product_name,season_type,peak_months,proposal_month,avg_monthly_qty"})).map(t=>({product_code:f(t,["product_code"],""),product_name:f(t,["product_name"],""),season_type:f(t,["season_type"],"year-round"),peak_months:Array.isArray(t.peak_months)?t.peak_months:[],proposal_month:t.proposal_month!=null?Number(t.proposal_month):null,avg_monthly_qty:D(t,["avg_monthly_qty"],0)}))}async function Wr(){return(await Se("product_monthly_shipments",{select:"product_code,product_name,category,m01,m02,m03,m04,m05,m06,m07,m08,m09,m10,m11,m12,total_quantity,total_amount",order:"total_amount.desc"})).map(t=>({code:f(t,["product_code"],""),name:f(t,["product_name"],""),monthlyQuantity:[D(t,["m01"],0),D(t,["m02"],0),D(t,["m03"],0),D(t,["m04"],0),D(t,["m05"],0),D(t,["m06"],0),D(t,["m07"],0),D(t,["m08"],0),D(t,["m09"],0),D(t,["m10"],0),D(t,["m11"],0),D(t,["m12"],0)],monthlyAmount:[0,0,0,0,0,0,0,0,0,0,0,0],totalQuantity:D(t,["total_quantity"],0),totalAmount:D(t,["total_amount"],0)})).filter(t=>t.totalQuantity>0)}async function is(e,t,n){try{return await Ee("feature_requests",{title:e,category:t,description:n}),!0}catch{return!1}}async function ls(e,t){return je("customers",e,t)}async function cs(e,t){return je("products",e,t)}async function $a(e,t){const n=e.find(d=>d.code===t);n?.priceGroup;const o=n?.priceGroup||t;let r="";try{const d=await F("customers",{select:"memo",legacy_customer_code:`eq.${t}`,limit:"1"});d[0]?.memo&&(r=(typeof d[0].memo=="string"?JSON.parse(d[0].memo):d[0].memo)?.price_type??"")}catch{}const l=new Map;if(o){const d=await F("customer_product_prices",{price_group:`eq.${o}`,select:"legacy_product_code,special_price"});for(const p of d)l.set(p.legacy_product_code,p.special_price)}return{priceType:r,priceGroup:o,individualPrices:l}}function Ua(e,t){const n=t.individualPrices.get(e.code);if(n!=null&&n>0)return{price:n,label:"個別単価"};switch(t.priceType){case"000":if(e.purchasePrice>0)return{price:e.purchasePrice,label:"生産者価格"};break;case"001":if(e.listPrice>0)return{price:e.listPrice,label:"小売価格"};break;case"002":if(e.salePrice>0)return{price:e.salePrice,label:"卸価格"};break}return{price:e.salePrice||0,label:"卸価格"}}async function ds(){return(await F("product_power",{select:"legacy_product_code,product_name,volume_ml,category_code,year_amount,year_qty,recent_amount,recent_qty,prev_amount,share_pct,growth_rate,rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_product_code??""),name:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,category:String(t.category_code??""),yearAmount:Number(t.year_amount??0),yearQty:Number(t.year_qty??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),prevAmount:Number(t.prev_amount??0),sharePct:Number(t.share_pct??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,rank:String(t.rank??"C")}))}async function Gr(){return(await Se("product_daily",{select:"sales_date,legacy_product_code,product_name,volume_ml,amount,qty",order:"sales_date.desc"})).map(t=>({date:String(t.sales_date??""),productCode:String(t.legacy_product_code??""),productName:String(t.product_name??""),volumeMl:t.volume_ml?Number(t.volume_ml):null,amount:Number(t.amount??0),qty:Number(t.qty??0)}))}async function Xr(){return(await F("customer_efficiency",{select:"legacy_customer_code,customer_name,address1,year_amount,share_pct,recent_amount,recent_qty,order_days,prev_amount,growth_rate,current_rank,prev_rank",order:"year_amount.desc",limit:"100"})).map(t=>({code:String(t.legacy_customer_code??""),name:String(t.customer_name??""),address:String(t.address1??""),yearAmount:Number(t.year_amount??0),sharePct:Number(t.share_pct??0),recentAmount:Number(t.recent_amount??0),recentQty:Number(t.recent_qty??0),orderDays:Number(t.order_days??0),prevAmount:Number(t.prev_amount??0),growthRate:t.growth_rate!=null?Number(t.growth_rate):null,currentRank:String(t.current_rank??"C"),prevRank:String(t.prev_rank??"")}))}async function wt(e,t="billing"){const n=await he("get_customer_efficiency",{p_fiscal_year:e,p_group_by:t});return n?n.map(o=>({code:String(o.legacy_customer_code??""),name:String(o.customer_name??""),address:String(o.address1??""),yearAmount:Number(o.year_amount??0),sharePct:Number(o.share_pct??0),orderDays:Number(o.order_days??0),prevAmount:Number(o.prev_amount??0),growthRate:o.growth_rate!=null?Number(o.growth_rate):null,currentRank:String(o.current_rank??"C"),prevRank:String(o.prev_rank??"")})):[]}async function ps(){const[e,t]=await Promise.all([F("mv_customer_abc",{order:"amount.desc"}),ea()]),n=e.map(o=>({code:f(o,["code"],""),name:f(o,["name"],""),amount:D(o,["amount"],0),documents:D(o,["documents"],0),ratio:D(o,["ratio"],0),cumRatio:D(o,["cum_ratio"],0),abcRank:f(o,["abc_rank"],"C")}));return{generatedAt:new Date().toISOString(),ranking:n,months:t.months,monthlyByCustomer:t.salesByCustomer}}async function Zr(){const[e,t]=await Promise.all([F("mv_product_abc",{order:"amount.desc"}),ea()]),n=e.map(d=>({code:f(d,["code"],""),name:f(d,["name"],""),amount:D(d,["amount"],0),quantity:D(d,["quantity"],0),ratio:D(d,["ratio"],0),cumRatio:D(d,["cum_ratio"],0),abcRank:f(d,["abc_rank"],"C")})),o=n.reduce((d,p)=>d+p.amount,0),r=new Set(n.filter(d=>d.abcRank==="A").map(d=>d.name)),l=t.salesByProduct.filter(d=>r.has(d.label));return{generatedAt:new Date().toISOString(),totalAmount:o,ranking:n,months:t.months,monthlyByProduct:l.length>0?l:t.salesByProduct}}const us={planned:"計画中",active:"仕込中",done:"完了"};async function ms(){const e=await F("brewing_batches",{order:"start_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),jikomiNo:f(t,["batch_no","legacy_batch_no"],""),productName:f(t,["brand_name"],""),riceType:f(t,["rice_type"],""),plannedKg:D(t,["planned_rice_kg"],0),actualKg:D(t,["actual_rice_kg"],0),startDate:ge(t,["start_date"],""),expectedDoneDate:ge(t,["expected_done_date"],""),status:f(t,["status"],"planned"),tankNo:f(t,["tank_no"],""),note:f(t,["remarks"],"")})):[]}async function ys(){const e=await F("tanks",{order:"tank_no.asc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),tankNo:f(t,["tank_no"],""),capacity:D(t,["capacity_l"],0),currentVolume:D(t,["current_volume_l"],0),productName:f(t,["current_product_code"],""),jikomiNo:f(t,["current_batch_id"],""),status:f(t,["status"],"empty"),lastUpdated:ge(t,["last_updated_at"],"")})):[]}async function hs(){const e=await F("kentei_records",{order:"kentei_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),kenteiNo:f(t,["kentei_no"],""),jikomiNo:f(t,["batch_id"],""),productName:f(t,["product_code"],""),kenteiDate:ge(t,["kentei_date"],""),alcoholDegree:D(t,["alcohol_degree"],0),extractDegree:D(t,["extract_degree"],0),sakaMeterValue:D(t,["sakemeter_value"],0),volume:D(t,["volume_l"],0),taxCategory:f(t,["tax_category_code"],""),status:f(t,["status"],"pending")})):[]}async function gs(){const e=await F("materials",{order:"name.asc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),code:f(t,["material_code","legacy_material_code"],""),name:f(t,["name"],""),unit:f(t,["unit"],""),currentStock:D(t,["current_stock"],0),minimumStock:D(t,["minimum_stock"],0),unitCost:D(t,["unit_cost"],0),lastUpdated:ge(t,["updated_at"],"")})):[]}async function fs(){const e=await F("purchase_document_headers",{order:"purchase_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),documentNo:f(t,["document_no","legacy_document_no"],""),purchaseDate:ge(t,["purchase_date"],""),supplierCode:f(t,["supplier_code","legacy_supplier_code"],""),supplierName:f(t,["supplier_name"],""),itemName:"",quantity:0,unitPrice:0,amount:D(t,["total_amount"],0),status:f(t,["payment_status"],"pending")})):[]}async function vs(){const e=await F("supplier_payment_status",{order:"legacy_supplier_code.asc"});return e.length>0?e.map(t=>({supplierCode:f(t,["supplier_code","legacy_supplier_code"],""),supplierName:f(t,["legacy_supplier_code"],""),totalPurchase:D(t,["total_purchase"],0),paidAmount:D(t,["paid_amount"],0),balance:D(t,["balance"],0),nextPaymentDate:ge(t,["next_payment_date"],""),status:f(t,["status"],"unpaid")})):[]}async function bs(){const e=await F("bills_of_exchange",{order:"due_date.desc"});return e.length>0?e.map(t=>({id:f(t,["id"],""),billNo:f(t,["bill_no"],""),supplierName:f(t,["counterparty_name"],""),amount:D(t,["amount"],0),issueDate:ge(t,["issue_date"],""),dueDate:ge(t,["due_date"],""),status:f(t,["status"],"holding")})):[]}async function ws(){const e=await F("raw_materials",{order:"name.asc"});return e.length>0?e.map(t=>({code:f(t,["material_code","legacy_material_code"],""),name:f(t,["name"],""),unit:f(t,["unit"],""),currentStock:D(t,["current_stock"],0),minimumStock:D(t,["minimum_stock"],0),lastPurchaseDate:ge(t,["last_purchase_date"],""),unitCost:D(t,["unit_cost"],0)})):[]}const xs=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],_a={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},ei={targetYear:0,targetMonth:0,companyName:"",companyNo:"",companyAddress:"",companyRepresentative:"",taxOffice:"",rows:[],deductions:[],totalVolume:0,totalTax:0,status:"draft",submittedAt:null};async function Ya(e,t){const n=await F("tax_declarations",{target_year:`eq.${e}`,target_month:`eq.${t}`,limit:"1"});if(n.length>0){const o=n[0],r=f(o,["id"],""),[l,d]=await Promise.all([F("tax_declaration_rows",{declaration_id:`eq.${r}`,order:"tax_category_code.asc"}),F("tax_deductions",{declaration_id:`eq.${r}`})]),p=l.map(y=>({taxCategory:f(y,["tax_category_code"],""),taxCategoryName:f(y,["tax_category_name"],""),alcoholDegree:D(y,["alcohol_degree"],0),volume:D(y,["taxable_volume"],0),taxRate:D(y,["tax_rate"],0),taxAmount:D(y,["tax_amount"],0),productionVolume:D(y,["production_volume"],0),previousBalance:D(y,["previous_balance"],0),currentAdjustment:D(y,["current_adjustment"],0),exportDeduction:D(y,["export_deduction"],0),sampleDeduction:D(y,["sample_deduction"],0),taxableVolume:D(y,["taxable_volume"],0)})),u=d.map(y=>({type:f(y,["deduction_type"],"sample"),categoryCode:f(y,["tax_category_code"],""),volume:D(y,["volume"],0),reason:f(y,["reason"],""),documentNo:f(y,["reference_document_no"],"")||void 0}));return{targetYear:e,targetMonth:t,companyName:f(o,["company_name"],""),companyNo:f(o,["company_no"],""),companyAddress:f(o,["company_address"],""),companyRepresentative:f(o,["company_representative"],""),taxOffice:f(o,["tax_office"],""),rows:p,deductions:u,totalVolume:D(o,["total_taxable_volume"],0),totalTax:D(o,["total_tax_amount"],0),status:f(o,["status"],"draft"),submittedAt:f(o,["submitted_at"],"")||null}}return{...ei,targetYear:e,targetMonth:t}}function Le(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function $s(e){const t=e.rows.map(o=>`    <Category>
      <Code>${Le(o.taxCategory)}</Code>
      <Name>${Le(o.taxCategoryName)}</Name>
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
`),n=e.deductions.map(o=>`    <Deduction type="${Le(o.type)}">
      <CategoryCode>${Le(o.categoryCode)}</CategoryCode>
      <Volume>${o.volume}</Volume>
      <Reason>${Le(o.reason)}</Reason>${o.documentNo?`
      <DocumentNo>${Le(o.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${Le(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${Le(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${Le(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${Le(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${Le(e.taxOffice)}</TaxOffice>
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
`}function ti(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function ai(e){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),o=e.rows.map(l=>[l.taxCategory,l.taxCategoryName,l.alcoholDegree,l.productionVolume,l.previousBalance,l.currentAdjustment,l.exportDeduction,l.sampleDeduction,l.taxableVolume,l.taxRate,l.taxAmount].map(ti).join(",")),r=`,合計,,${e.rows.reduce((l,d)=>l+d.productionVolume,0)},,,${e.rows.reduce((l,d)=>l+d.exportDeduction,0)},${e.rows.reduce((l,d)=>l+d.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[n,...o,r].join(`
`)+`
`}function ni(e){const t=e.rows.map(r=>{const l=Math.max(0,r.productionVolume+r.previousBalance+r.currentAdjustment-r.exportDeduction-r.sampleDeduction),d=Math.round(l*r.taxRate);return{...r,taxableVolume:l,volume:l,taxAmount:d}}),n=t.reduce((r,l)=>r+l.taxableVolume,0),o=t.reduce((r,l)=>r+l.taxAmount,0);return{...e,rows:t,totalVolume:n,totalTax:o}}async function si(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>Z);return{supabaseInsert:n}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:$s(e),submitted_at:e.submittedAt})}async function Ja(e,t){return(await he("get_sake_tax_by_month",{p_year:e,p_month:t})).map(o=>({sakeType:o.sake_type,alcDegree:o.alc_degree??null,volumeSaleL:Number(o.volume_sale_l)||0,volumeReturnL:Number(o.volume_return_l)||0,volumeExportL:Number(o.volume_export_l)||0,volumeNetL:Number(o.volume_net_l)||0,taxRatePerKl:o.tax_rate_per_kl!==null?Number(o.tax_rate_per_kl):null,taxAmount:Number(o.tax_amount)||0}))}async function Ka(e){const t=await F("store_sales",{sale_date:`eq.${e}`,order:"sale_time.asc"});return t.length>0?t.map(n=>({id:f(n,["id"],""),saleDate:f(n,["sale_date"],e),saleTime:f(n,["sale_time"],""),productCode:f(n,["product_code"],""),productName:f(n,["product_name"],""),quantity:D(n,["quantity"],0),unitPrice:D(n,["unit_price"],0),amount:D(n,["amount"],0),paymentMethod:f(n,["payment_method"],"cash")})):[]}async function _s(){const e=await F("store_orders",{order:"order_date.desc",limit:"100"});return e.length>0?e.map(t=>({id:f(t,["id"],""),orderNo:f(t,["order_no"],""),orderDate:ge(t,["order_date"],""),customerName:f(t,["customer_name"],""),postalCode:f(t,["postal_code"],""),address:f(t,["shipping_address"],""),items:[],totalAmount:D(t,["total_amount"],0),status:f(t,["status"],"new"),shippingDate:ge(t,["shipping_date"],"")})):[]}async function oi(e,t,n,o,r,l){const d=await Ee("store_orders",{order_no:e,order_date:new Date().toISOString().slice(0,10),channel:"mobile",customer_name:t,legacy_customer_code:n||null,total_amount:o,status:"new",remarks:r||null});if(!d)return null;const p=d.id;for(let u=0;u<l.length;u++){const y=l[u];await Ee("store_order_lines",{order_id:p,line_no:u+1,product_code:y.productCode,product_name:y.productName,quantity:y.quantity,unit_price:y.unitPrice,amount:y.amount})}return p}async function Ft(e){const t=await Ee("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Ss(e,t){throw new Error("VITE_RESEND_API_KEY is not configured")}async function ri(e){const t={order:"updated_at.desc"};return e&&(t.template_key=`eq.${e}`),(await F("print_layouts",t)).map(o=>({id:f(o,["id"],""),name:f(o,["name"],""),templateKey:f(o,["template_key"],""),positions:o.positions??{},isDefault:ve(o,["is_default"],!1),note:f(o,["note"],""),updatedAt:f(o,["updated_at"],"")}))}async function ii(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:r}=await Promise.resolve().then(()=>Z);return{supabaseInsert:r}},void 0),n={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},o=await t("print_layouts",n);return o?{id:f(o,["id"],e.id),name:f(o,["name"],e.name),templateKey:f(o,["template_key"],e.templateKey),positions:o.positions??e.positions,isDefault:ve(o,["is_default"],!1),note:f(o,["note"],""),updatedAt:f(o,["updated_at"],"")}:null}async function li(e){const t=new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co");t.searchParams.set("id",`eq.${e}`);const n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{return(await fetch(t.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function ci(){return(await F("mail_senders",{order:"is_default.desc,name.asc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),email:f(t,["email"],""),displayName:f(t,["display_name"],""),signature:f(t,["signature"],""),replyTo:f(t,["reply_to"],""),isDefault:ve(t,["is_default"],!1),isVerified:ve(t,["is_verified"],!1),note:f(t,["note"],"")}))}async function di(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0),n=await t("mail_senders",{id:e.id,name:e.name,email:e.email,display_name:e.displayName??"",signature:e.signature??"",reply_to:e.replyTo??"",is_default:e.isDefault??!1,is_verified:e.isVerified??!1,note:e.note??"",updated_at:new Date().toISOString()});return n?{id:f(n,["id"],e.id),name:f(n,["name"],e.name),email:f(n,["email"],e.email),displayName:f(n,["display_name"],""),signature:f(n,["signature"],""),replyTo:f(n,["reply_to"],""),isDefault:ve(n,["is_default"],!1),isVerified:ve(n,["is_verified"],!1)}:null}async function pi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/mail_senders","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}const Ha={delivery:"🚚 納品",tour:"🏭 蔵見学",meeting:"📋 商談",brewing:"🍶 仕込",general:"📌 その他"},Qa={delivery:"#9C27B0",tour:"#FF9800",meeting:"#2196F3",brewing:"#4CAF50",general:"#0F5B8D"};async function ui(e){const t=`${e}-01T00:00:00Z`,[n,o]=e.split("-").map(p=>parseInt(p,10)),r=new Date(n,o,0).getDate(),l=`${e}-${String(r).padStart(2,"0")}T23:59:59Z`;return(await F("calendar_events",{starts_at:`gte.${t}`,and:`(starts_at.lte.${l})`,order:"starts_at.asc"})).map(p=>({id:f(p,["id"],""),title:f(p,["title"],""),description:f(p,["description"],""),category:f(p,["category"],"general")||"general",startsAt:f(p,["starts_at"],new Date().toISOString()),endsAt:f(p,["ends_at"],""),isAllDay:ve(p,["is_all_day"],!1),location:f(p,["location"],""),attendees:p.attendees??[],relatedCustomerCode:f(p,["related_customer_code"],""),relatedOrderId:f(p,["related_order_id"],""),color:f(p,["color"],""),googleEventId:f(p,["google_event_id"],"")}))}async function mi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("calendar_events",{id:e.id,title:e.title,description:e.description??"",category:e.category,starts_at:e.startsAt,ends_at:e.endsAt||null,is_all_day:e.isAllDay??!1,location:e.location??"",attendees:e.attendees??[],related_customer_code:e.relatedCustomerCode??null,related_order_id:e.relatedOrderId??null,color:e.color??Qa[e.category],updated_at:new Date().toISOString()})?e:null}async function yi(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/calendar_events","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function ks(){return(await F("integration_settings",{order:"name.asc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),provider:f(t,["provider"],""),config:t.config??{},isEnabled:ve(t,["is_enabled"],!1),lastSyncAt:f(t,["last_sync_at"],""),lastStatus:f(t,["last_status"],"")}))}async function Pt(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("integration_settings",{id:e.id,name:e.name,provider:e.provider,config:e.config,is_enabled:e.isEnabled,last_sync_at:e.lastSyncAt||null,last_status:e.lastStatus||null,updated_at:new Date().toISOString()})?e:null}async function hi(e){const t=e.config.shop_domain,n=e.config.admin_token;if(!t||!n)return{count:0,error:"shop_domain と admin_token を設定してください"};try{const o=`https://${t}/admin/api/2024-01/orders.json?status=any&limit=50`,r=await fetch(o,{headers:{"X-Shopify-Access-Token":n,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const l=await r.json(),{supabaseInsert:d}=await q(async()=>{const{supabaseInsert:u}=await Promise.resolve().then(()=>Z);return{supabaseInsert:u}},void 0);let p=0;for(const u of l.orders){const y=`shopify_${u.id}`;await d("shopify_orders",{id:y,shopify_order_id:String(u.id),order_number:String(u.order_number??""),order_date:String(u.created_at??new Date().toISOString()),customer_name:String(u.customer?.first_name??"")+" "+String(u.customer?.last_name??""),customer_email:String(u.customer?.email??""),total_amount:Math.round(parseFloat(String(u.total_price??"0"))),financial_status:String(u.financial_status??""),fulfillment_status:String(u.fulfillment_status??"unfulfilled"),line_items:u.line_items??[],shipping_address:u.shipping_address??null,raw_payload:u}),p++}return await Pt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得成功`}),{count:p}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function gi(){return(await F("shopify_orders",{order:"order_date.desc",limit:"50"})).map(t=>({id:f(t,["id"],""),shopifyOrderId:f(t,["shopify_order_id"],""),orderNumber:f(t,["order_number"],""),orderDate:f(t,["order_date"],""),customerName:f(t,["customer_name"],""),customerEmail:f(t,["customer_email"],""),totalAmount:ne(t.total_amount),financialStatus:f(t,["financial_status"],""),fulfillmentStatus:f(t,["fulfillment_status"],""),lineItems:t.line_items??[]}))}async function fi(e){const t=e.config.refresh_token,n=e.config.client_id,o=e.config.client_secret;if(!t||!n||!o)return{token:"",error:"refresh_token / client_id / client_secret が未設定です"};const r=await fetch("https://oauth2.googleapis.com/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"refresh_token",refresh_token:t,client_id:n,client_secret:o})});if(!r.ok)return{token:"",error:`トークンリフレッシュ失敗: HTTP ${r.status}`};const d=(await r.json()).access_token;return await Pt({...e,config:{...e.config,oauth_token:d}}),e.config.oauth_token=d,{token:d}}async function vi(e){let t=e.config.oauth_token;const n=e.config.calendar_id||"primary";if(!t&&!e.config.refresh_token)return{count:0,error:"oauth_token または refresh_token を設定してください"};try{const o=new Date().toISOString(),r=new Date(Date.now()+30*86400*1e3).toISOString(),l=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(n)}/events?timeMin=${o}&timeMax=${r}&singleEvents=true&orderBy=startTime`;let d=await fetch(l,{headers:{Authorization:`Bearer ${t}`}});if(d.status===401){const v=await fi(e);if(v.error)return{count:0,error:v.error};t=v.token,d=await fetch(l,{headers:{Authorization:`Bearer ${t}`}})}if(!d.ok)return{count:0,error:`HTTP ${d.status}`};const p=await d.json(),{supabaseInsert:u}=await q(async()=>{const{supabaseInsert:v}=await Promise.resolve().then(()=>Z);return{supabaseInsert:v}},void 0);let y=0;for(const v of p.items){const g=`gcal_${v.id}`,x=v.start?.dateTime??v.start?.date??"",C=v.end?.dateTime??v.end?.date??"";await u("calendar_events",{id:g,title:String(v.summary??"(無題)"),description:String(v.description??""),category:"general",starts_at:String(x),ends_at:String(C),location:String(v.location??""),google_event_id:String(v.id??""),updated_at:new Date().toISOString()}),y++}return await Pt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${y}件取得`}),{count:y}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function bi(){return(await F("fax_inbox",{order:"received_at.desc",limit:"50"})).map(t=>({id:f(t,["id"],""),receivedAt:f(t,["received_at"],""),senderPhone:f(t,["sender_phone"],""),senderName:f(t,["sender_name"],""),imageUrl:f(t,["image_url"],""),ocrStatus:f(t,["ocr_status"],"pending")||"pending",ocrText:f(t,["ocr_text"],""),extractedData:t.extracted_data??{},linkedInvoiceId:f(t,["linked_invoice_id"],"")}))}async function wi(e,t){const n=e.config.api_key;if(!n)return{text:"",error:"Cloud Vision API key 未設定"};try{const o=`https://vision.googleapis.com/v1/images:annotate?key=${n}`,r=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{image:{content:t.replace(/^data:image\/\w+;base64,/,"")},features:[{type:"DOCUMENT_TEXT_DETECTION"}],imageContext:{languageHints:["ja"]}}]})});return r.ok?{text:(await r.json()).responses?.[0]?.fullTextAnnotation?.text??""}:{text:"",error:`HTTP ${r.status}`}}catch(o){return{text:"",error:o instanceof Error?o.message:String(o)}}}async function xi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("fax_inbox",{id:e.id,received_at:e.receivedAt,sender_phone:e.senderPhone||null,sender_name:e.senderName||null,image_url:e.imageUrl||null,ocr_status:e.ocrStatus,ocr_text:e.ocrText||null,extracted_data:e.extractedData||null,linked_invoice_id:e.linkedInvoiceId||null})?e:null}const Kt={admin:"👑 管理者",manager:"📋 マネージャー",staff:"👤 スタッフ"},Ht={all:"全体",sales:"営業",brewery:"蔵人",management:"管理"};async function $i(){return(await F("user_profiles",{order:"display_name.asc"})).map(t=>({id:f(t,["id"],""),email:f(t,["email"],""),displayName:f(t,["display_name"],""),staffCode:f(t,["staff_code"],""),department:f(t,["department"],"all")||"all",role:f(t,["role"],"staff")||"staff",defaultMailSenderId:f(t,["default_mail_sender_id"],""),phone:f(t,["phone"],""),avatarUrl:f(t,["avatar_url"],""),isActive:ve(t,["is_active"],!0),lastSignInAt:f(t,["last_sign_in_at"],""),createdAt:f(t,["created_at"],"")}))}async function _i(e){if(!e)return null;const t=await F("user_profiles",{email:`eq.${e}`});if(t.length===0)return null;const n=t[0];return{id:f(n,["id"],""),email:f(n,["email"],""),displayName:f(n,["display_name"],""),staffCode:f(n,["staff_code"],""),department:f(n,["department"],"all")||"all",role:f(n,["role"],"staff")||"staff",defaultMailSenderId:f(n,["default_mail_sender_id"],""),phone:f(n,["phone"],""),avatarUrl:f(n,["avatar_url"],""),isActive:ve(n,["is_active"],!0),lastSignInAt:f(n,["last_sign_in_at"],"")}}async function Si(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("user_profiles",{id:e.id,email:e.email,display_name:e.displayName,staff_code:e.staffCode||null,department:e.department,role:e.role,default_mail_sender_id:e.defaultMailSenderId||null,phone:e.phone||null,avatar_url:e.avatarUrl||null,is_active:e.isActive,updated_at:new Date().toISOString()})?e:null}async function ki(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/user_profiles","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Pi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>Z);return{supabaseInsert:n}},void 0);await t("audit_logs",{action:e.action,entity_type:e.entityType??null,entity_id:e.entityId??null,user_email:e.userEmail??null,changes:e.changes??null})}async function Ei(e=100){return(await F("audit_logs",{order:"created_at.desc",limit:String(e)})).map(n=>({id:f(n,["id"],""),action:f(n,["action"],""),entityType:f(n,["entity_type"],""),entityId:f(n,["entity_id"],""),userEmail:f(n,["user_email"],""),changes:n.changes??{},createdAt:f(n,["created_at"],"")}))}const Qt={new_order:"🛒 新規受注",payment_overdue:"⚠️ 入金遅延",low_stock:"📦 低在庫",fax_received:"📠 FAX受信",tour_inquiry:"🏭 見学問合せ",new_prospect:"🎯 新規見込客"};async function Ps(){return(await F("slack_notifications",{order:"event_type.asc"})).map(t=>({id:f(t,["id"],""),eventType:f(t,["event_type"],"new_order"),enabled:ve(t,["enabled"],!0),channel:f(t,["channel"],""),condition:t.condition??{},lastTriggeredAt:f(t,["last_triggered_at"],"")}))}async function Ai(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("slack_notifications",{id:e.id,event_type:e.eventType,enabled:e.enabled,channel:e.channel,condition:e.condition})?e:null}async function Li(e=50){return(await F("slack_notification_logs",{order:"sent_at.desc",limit:String(e)})).map(n=>({id:f(n,["id"],""),eventType:f(n,["event_type"],""),channel:f(n,["channel"],""),message:f(n,["message"],""),status:f(n,["status"],"sent"),error:f(n,["error"],""),sentAt:f(n,["sent_at"],"")}))}async function Ci(e,t,n){const r=(await ks()).find(y=>y.provider==="slack");if(!r||!r.isEnabled)return{ok:!1,error:"Slack連携が無効です"};const l=r.config.webhook_url;if(!l)return{ok:!1,error:"Webhook URL未設定"};const p=(await Ps()).find(y=>y.eventType===e&&y.enabled);if(!p)return{ok:!1,error:"通知ルールが無効"};const u=n??p.channel??r.config.default_channel??"#general";try{const y=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`${Qt[e]} ${t}`,channel:u})}),v=y.ok,{supabaseInsert:g}=await q(async()=>{const{supabaseInsert:x}=await Promise.resolve().then(()=>Z);return{supabaseInsert:x}},void 0);return await g("slack_notification_logs",{id:`slack_${Date.now()}`,event_type:e,channel:u,message:t,status:v?"sent":"failed",error:v?null:`HTTP ${y.status}`}),v?{ok:!0}:{ok:!1,error:`HTTP ${y.status}`}}catch(y){return{ok:!1,error:y instanceof Error?y.message:String(y)}}}const ta={cold:"❄️ 未接触",warm:"🌡️ 関心あり",hot:"🔥 見込み高",contacted:"📞 アプローチ中",negotiating:"💬 商談中",won:"🎉 受注",lost:"💔 失注"},Wa={cold:"#90A4AE",warm:"#FFA726",hot:"#EF5350",contacted:"#42A5F5",negotiating:"#AB47BC",won:"#66BB6A",lost:"#757575"};async function Di(){return(await F("prospects",{order:"updated_at.desc"})).map(t=>({id:f(t,["id"],""),companyName:f(t,["company_name"],""),contactName:f(t,["contact_name"],""),email:f(t,["email"],""),phone:f(t,["phone"],""),address:f(t,["address"],""),website:f(t,["website"],""),businessType:f(t,["business_type"],""),stage:f(t,["stage"],"cold"),source:f(t,["source"],""),expectedAmount:ne(t.expected_amount),probability:ne(t.probability),assignedStaffCode:f(t,["assigned_staff_code"],""),nextActionDate:f(t,["next_action_date"],""),nextAction:f(t,["next_action"],""),note:f(t,["note"],""),lastContactAt:f(t,["last_contact_at"],""),wonAt:f(t,["won_at"],""),lostAt:f(t,["lost_at"],""),lostReason:f(t,["lost_reason"],""),convertedCustomerCode:f(t,["converted_customer_code"],""),createdAt:f(t,["created_at"],"")}))}async function Es(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0),n=await t("prospects",{id:e.id,company_name:e.companyName,contact_name:e.contactName||null,email:e.email||null,phone:e.phone||null,address:e.address||null,website:e.website||null,business_type:e.businessType||null,stage:e.stage,source:e.source||null,expected_amount:e.expectedAmount,probability:e.probability,assigned_staff_code:e.assignedStaffCode||null,next_action_date:e.nextActionDate||null,next_action:e.nextAction||null,note:e.note||null,updated_at:new Date().toISOString()});return n?{...e,id:f(n,["id"],e.id)}:null}async function qi(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}},void 0);try{const o=new URL("/rest/v1/prospects",t);return o.searchParams.set("id",`eq.${e}`),(await fetch(o.toString(),{method:"DELETE",headers:{apikey:n,Authorization:`Bearer ${n}`}})).ok}catch{return!1}}async function Ii(e){return(await F("prospect_activities",{prospect_id:`eq.${e}`,order:"activity_date.desc"})).map(n=>({id:f(n,["id"],""),prospectId:f(n,["prospect_id"],""),activityType:f(n,["activity_type"],"call"),title:f(n,["title"],""),description:f(n,["description"],""),activityDate:f(n,["activity_date"],""),result:f(n,["result"],""),staffCode:f(n,["staff_code"],"")}))}async function Ti(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("prospect_activities",{id:e.id,prospect_id:e.prospectId,activity_type:e.activityType,title:e.title||null,description:e.description||null,activity_date:e.activityDate,result:e.result||null,staff_code:e.staffCode||null})?e:null}const As=["瓶 (720ml)","瓶 (1.8L)","瓶 (300ml)","瓶 (500ml)","キャップ・栓","ラベル(表)","ラベル(裏)","首掛け","化粧箱","ダンボール","包装紙","熨斗・水引","和紙","リボン","その他"];async function Mi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("materials",{id:e.id,legacy_material_code:e.code,material_code:e.code,name:e.name,unit:e.unit,material_type:e.materialType||null,current_stock:e.currentStock,minimum_stock:e.minimumStock,unit_cost:e.unitCost,last_purchase_date:e.lastUpdated,is_active:!0,updated_at:new Date().toISOString()})?e:null}async function Ni(e){const t="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYXJ3bnV5dmZ4aXNjampzbWl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMTM0MDYsImV4cCI6MjA5MTc4OTQwNn0.7XofVlIiTjlzA9Oz-3lTX1ghLL1qqCcDRadf_a__ys8 ";try{const n=new URL("/rest/v1/materials","https://loarwnuyvfxiscjjsmiz.supabase.co");return n.searchParams.set("id",`eq.${e}`),(await fetch(n.toString(),{method:"DELETE",headers:{apikey:t,Authorization:`Bearer ${t}`}})).ok}catch{return!1}}async function Ri(){return(await Se("v_customer_map")).filter(t=>t.lat&&t.lng).map(t=>({customerCode:f(t,["customer_code"],""),name:f(t,["name"],""),phone:f(t,["phone"],""),areaCode:f(t,["area_code"],""),businessType:f(t,["business_type"],""),businessTypeName:f(t,["business_type_name"],""),address1:f(t,["address1"],""),lat:Number(t.lat),lng:Number(t.lng),isAtRisk:ve(t,["is_at_risk"],!1),isDormant:ve(t,["is_dormant"],!1),amount12m:D(t,["amount_12m"],0),daysSinceOrder:t.days_since_order!=null?Number(t.days_since_order):null}))}const aa=[{value:"price",label:"価格が高い"},{value:"competitor",label:"競合に切り替え"},{value:"closed",label:"廃業・閉店"},{value:"contact",label:"担当者交代"},{value:"seasonal",label:"季節要因"},{value:"pause",label:"一時的な休止"},{value:"complaint",label:"クレーム・不満"},{value:"unreachable",label:"連絡が取れない"},{value:"other",label:"その他"}];async function Oi(){return(await Se("customer_churn_notes")).map(t=>({customerCode:f(t,["customer_code"],""),reason:f(t,["reason"],""),memo:f(t,["memo"],""),actionedAt:t.actioned_at?String(t.actioned_at):null,updatedAt:f(t,["updated_at"],"")}))}async function Bi(e){const{supabaseUpsert:t}=await q(async()=>{const{supabaseUpsert:n}=await Promise.resolve().then(()=>Z);return{supabaseUpsert:n}},void 0);await t("customer_churn_notes",{customer_code:e.customerCode,reason:e.reason,memo:e.memo,actioned_at:e.actionedAt||null,updated_at:new Date().toISOString()},"customer_code")}async function ji(){return(await F("delivery_locations",{order:"name.asc"})).map(t=>({id:f(t,["id"],""),customerCode:f(t,["customer_code"],""),name:f(t,["name"],""),postalCode:f(t,["postal_code"],""),address:f(t,["address"],""),lat:t.lat?Number(t.lat):void 0,lng:t.lng?Number(t.lng):void 0,contactName:f(t,["contact_name"],""),phone:f(t,["phone"],""),deliveryNote:f(t,["delivery_note"],""),isActive:ve(t,["is_active"],!0)}))}async function zi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("delivery_locations",{id:e.id,customer_code:e.customerCode||null,name:e.name,postal_code:e.postalCode||null,address:e.address||null,lat:e.lat??null,lng:e.lng??null,contact_name:e.contactName||null,phone:e.phone||null,delivery_note:e.deliveryNote||null,is_active:e.isActive})?e:null}async function Fi(e=50){return(await F("call_logs",{order:"started_at.desc",limit:String(e)})).map(n=>({id:f(n,["id"],""),callDirection:f(n,["call_direction"],"inbound"),fromNumber:f(n,["from_number"],""),toNumber:f(n,["to_number"],""),matchedCustomerCode:f(n,["matched_customer_code"],""),matchedProspectId:f(n,["matched_prospect_id"],""),durationSeconds:ne(n.duration_seconds),callStatus:f(n,["call_status"],"answered"),recordingUrl:f(n,["recording_url"],""),transcript:f(n,["transcript"],""),ivryCallId:f(n,["ivry_call_id"],""),startedAt:f(n,["started_at"],""),endedAt:f(n,["ended_at"],""),notes:f(n,["notes"],"")}))}async function Ls(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("call_logs",{id:e.id,call_direction:e.callDirection,from_number:e.fromNumber||null,to_number:e.toNumber||null,matched_customer_code:e.matchedCustomerCode||null,matched_prospect_id:e.matchedProspectId||null,duration_seconds:e.durationSeconds??0,call_status:e.callStatus??"answered",started_at:e.startedAt||null,ended_at:e.endedAt||null,notes:e.notes||null,ivry_call_id:e.ivryCallId||null})?e:null}async function Vi(e){const t=e.config.api_key,n=e.config.team_id;if(!t||!n)return{count:0,error:"IVRy API key または team_id 未設定"};try{const o=`https://api.ivry.jp/v1/teams/${n}/calls?limit=100`,r=await fetch(o,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(!r.ok)return{count:0,error:`HTTP ${r.status}`};const d=(await r.json()).calls??[];let p=0;for(const u of d)await Ls({id:`ivry_${u.id}`,callDirection:String(u.direction??"inbound"),fromNumber:String(u.from??""),toNumber:String(u.to??""),durationSeconds:Number(u.duration??0),callStatus:String(u.status??"answered"),recordingUrl:String(u.recording_url??""),startedAt:String(u.started_at??""),endedAt:String(u.ended_at??""),ivryCallId:String(u.id??"")}),p++;return await Pt({...e,lastSyncAt:new Date().toISOString(),lastStatus:`${p}件取得`}),{count:p}}catch(o){return{count:0,error:o instanceof Error?o.message:String(o)}}}async function Ui(e,t){const n=e.config.api_key,o=e.config.team_id;if(!n||!o)return{synced:0,error:"IVRy API key または team_id 未設定"};try{let r=0;for(const l of t){if(!l.phone)continue;(await fetch(`https://api.ivry.jp/v1/teams/${o}/contacts`,{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({name:l.name,phone_number:l.phone,external_id:l.customerCode??"",note:l.note??""})})).ok&&r++}return{synced:r}}catch(r){return{synced:0,error:r instanceof Error?r.message:String(r)}}}async function Yi(){return(await F("lead_lists",{order:"created_at.desc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),query:f(t,["query"],""),area:f(t,["area"],""),businessType:f(t,["business_type"],""),totalCount:ne(t.total_count),source:f(t,["source"],"manual"),createdAt:f(t,["created_at"],"")}))}async function Ji(e){return(await F("lead_items",{list_id:`eq.${e}`,order:"rating.desc.nullslast"})).map(n=>({id:f(n,["id"],""),listId:f(n,["list_id"],""),companyName:f(n,["company_name"],""),address:f(n,["address"],""),phone:f(n,["phone"],""),website:f(n,["website"],""),email:f(n,["email"],""),businessType:f(n,["business_type"],""),rating:n.rating?Number(n.rating):void 0,reviewCount:ne(n.review_count),lat:n.lat?Number(n.lat):void 0,lng:n.lng?Number(n.lng):void 0,placeId:f(n,["place_id"],""),status:f(n,["status"],"new"),convertedProspectId:f(n,["converted_prospect_id"],""),note:f(n,["note"],"")}))}async function Ki(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("lead_lists",{id:e.id,name:e.name,query:e.query||null,area:e.area||null,business_type:e.businessType||null,total_count:e.totalCount,source:e.source})?e:null}async function Cs(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("lead_items",{id:e.id,list_id:e.listId,company_name:e.companyName,address:e.address||null,phone:e.phone||null,website:e.website||null,email:e.email||null,business_type:e.businessType||null,rating:e.rating??null,review_count:e.reviewCount??null,lat:e.lat??null,lng:e.lng??null,place_id:e.placeId||null,status:e.status,converted_prospect_id:e.convertedProspectId||null,note:e.note||null})?e:null}async function Hi(e,t,n){const o=e.config.api_key;if(!o)return{results:[],error:"Google Maps API key 未設定"};const r=`${t} ${n}`.trim(),l=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(r)}&language=ja&key=${o}`;try{const d=await fetch(l);if(!d.ok)return{results:[],error:`HTTP ${d.status}`};const p=await d.json();return p.status!=="OK"&&p.status!=="ZERO_RESULTS"?{results:[],error:`API status: ${p.status}`}:{results:p.results.map(y=>{const v=y.geometry?.location;return{id:`place_${y.place_id}`,listId:"",companyName:String(y.name??""),address:String(y.formatted_address??""),rating:y.rating?Number(y.rating):void 0,reviewCount:y.user_ratings_total?Number(y.user_ratings_total):void 0,lat:v?.lat,lng:v?.lng,placeId:String(y.place_id??""),status:"new"}})}}catch(d){return{results:[],error:d instanceof Error?d.message:String(d)}}}async function Qi(e){const t={id:`p_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,companyName:e.companyName,phone:e.phone,address:e.address,lat:e.lat,lng:e.lng,businessType:e.businessType,stage:"cold",source:"リスト",expectedAmount:1e5,probability:10,note:e.note??(e.rating?`Google評価: ⭐${e.rating} (${e.reviewCount}件)`:"")},n=await Es(t);return n&&await Cs({...e,status:"imported",convertedProspectId:t.id}),n}async function Wi(){return(await F("workflow_orders",{order:"order_date.desc"})).map(t=>({id:f(t,["id"],""),orderNo:f(t,["order_no"],""),customerName:f(t,["customer_name"],""),customerCode:f(t,["customer_code"],""),orderDate:f(t,["order_date"],""),deliveryDate:f(t,["delivery_date"],""),stage:f(t,["stage"],"new"),totalAmount:ne(t.total_amount),itemCount:ne(t.item_count),priority:f(t,["priority"],"normal"),staffName:f(t,["staff_name"],""),notes:f(t,["notes"],"")}))}async function Gi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("workflow_orders",{id:e.id,order_no:e.orderNo,customer_name:e.customerName,customer_code:e.customerCode||null,order_date:e.orderDate,delivery_date:e.deliveryDate||null,stage:e.stage,total_amount:e.totalAmount,item_count:e.itemCount,priority:e.priority,staff_name:e.staffName||null,notes:e.notes||null,updated_at:new Date().toISOString()})?e:null}async function Xi(){return(await F("tour_inquiries",{order:"created_at.desc"})).map(t=>({id:f(t,["id"],""),name:f(t,["name"],""),email:f(t,["email"],""),phone:f(t,["phone"],""),visitDate:f(t,["visit_date"],""),partySize:ne(t.party_size)||1,language:f(t,["language"],"ja"),purpose:f(t,["purpose"],""),message:f(t,["message"],""),status:f(t,["status"],"new"),repliedAt:f(t,["replied_at"],""),confirmedTime:f(t,["confirmed_time"],""),createdAt:f(t,["created_at"],new Date().toISOString())}))}async function Zi(e){const{supabaseInsert:t}=await q(async()=>{const{supabaseInsert:o}=await Promise.resolve().then(()=>Z);return{supabaseInsert:o}},void 0);return await t("tour_inquiries",{id:e.id,name:e.name,email:e.email,phone:e.phone||null,visit_date:e.visitDate||null,party_size:e.partySize,language:e.language,purpose:e.purpose||null,message:e.message||null,status:e.status,replied_at:e.repliedAt||null,confirmed_time:e.confirmedTime||null})?e:null}const el=[{table:"sake_sales_document_lines",display:"売上伝票明細"},{table:"sake_purchase_document_lines",display:"仕入伝票明細"},{table:"sake_sales_document_headers",display:"売上伝票ヘッダ"},{table:"sake_purchase_document_headers",display:"仕入伝票ヘッダ"},{table:"sake_inventory_movements_sk",display:"在庫移動(SK)"},{table:"sake_current_stock_sh",display:"在庫(SH)"},{table:"sake_inventory_movements_k5",display:"在庫移動(K5)"},{table:"sake_current_stock_h5",display:"在庫(H5)"},{table:"sake_special_prices_sh",display:"特価(SH)"},{table:"sake_products_sh",display:"商品(SH)"},{table:"sake_special_prices_h5",display:"特価(H5)"},{table:"sake_products_sk",display:"商品(SK)"},{table:"sake_products_k5",display:"商品(K5)"},{table:"sake_products_h5",display:"商品(H5)"},{table:"sake_customers",display:"得意先"},{table:"sake_suppliers",display:"仕入先"},{table:"sake_delivery_destinations",display:"納品先"},{table:"sake_trading_partners",display:"取引先"},{table:"sake_current_stock_sk",display:"在庫(SK)"}];async function Ds(){return(await Promise.all(el.map(async t=>{const[n,o]=await Promise.all([Na(t.table),F(t.table,{select:"_synced_at",order:"_synced_at.desc",limit:"1"})]);return{tableName:t.table,displayName:t.display,rowCount:n,lastSyncAt:o[0]?._synced_at??null}}))).sort((t,n)=>n.rowCount-t.rowCount)}async function Vt(e,t,n=100){const o=(t-1)*n,[r,l]=await Promise.all([F(e,{select:"_source_file,_record_index,_record_size,_raw_b64,_source_path,_source_file_mtime,_synced_at",order:"_record_index.asc",limit:String(n),offset:String(o)}),Na(e)]);return{records:r,total:l}}async function Sa(e){const t=await F("customers",{select:"memo",or:`legacy_customer_code.eq.${e},customer_code.eq.${e}`,limit:"1"});if(t.length===0)return"";const n=t[0].memo;if(typeof n=="string"&&n)try{const o=JSON.parse(n);return String(o.price_group??"")}catch{return""}return""}async function qs(e,t){if(e){const o=await F("customer_product_prices",{select:"special_price",price_group:`eq.${e}`,legacy_product_code:`eq.${t}`,limit:"1"});if(o.length>0&&o[0].special_price)return ne(o[0].special_price)}const n=await F("products",{select:"default_sale_price",or:`legacy_product_code.eq.${t},product_code.eq.${t}`,limit:"1"});return n.length>0&&n[0].default_sale_price?ne(n[0].default_sale_price):0}const tl=[{code:"SAK001",name:"純米大吟醸　金井"},{code:"SAK002",name:"純米吟醸　金井"},{code:"SAK003",name:"本醸造　金井"},{code:"SAK004",name:"純米酒　金井"}],al=[1.6,.7,1.3,1.2,.9,.7,.6,.7,.9,1,1.1,1.5],nl={SAK001:80,SAK002:150,SAK003:220,SAK004:180};function sl(){const e=new Date,t=[];for(let u=11;u>=0;u--){const y=new Date(e.getFullYear(),e.getMonth()-u,1);t.push(`${y.getFullYear()}-${String(y.getMonth()+1).padStart(2,"0")}`)}const n=tl,o={},r={};for(const u of n){o[u.code]={};for(const y of t){const v=parseInt(y.split("-")[1])-1,g=nl[u.code]??100,x=Math.round(g*al[v]*(.85+Math.random()*.3));o[u.code][y]=x,r[y]=(r[y]??0)+x}}const l={},d={},p={};for(const u of n){const y=t.map(x=>o[u.code][x]??0),v=y.reduce((x,C)=>x+C,0)/y.length,g=y.reduce((x,C)=>x+(C-v)**2,0)/y.length;l[u.code]=y.reduce((x,C)=>x+C,0),d[u.code]=v,p[u.code]=Math.sqrt(g)}return{months:t,products:n,matrix:o,totals:r,productTotals:l,productAvg:d,productStdDev:p}}async function ol(e=36){const t=(()=>{const x=new Date;return x.setMonth(x.getMonth()-e),`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`})(),n=await Se("product_monthly_sales",{select:"year_month,product_code,product_name,quantity",year_month:`gte.${t}`,order:"year_month.asc"});if(n.length===0)return sl();const o=new Set,r=new Map,l={},d={};for(const x of n){const C=f(x,["year_month"],""),A=f(x,["product_code"],""),T=f(x,["product_name"],A),P=D(x,["quantity"],0);!C||!A||(o.add(C),r.set(A,T),l[A]||(l[A]={}),l[A][C]=P,d[C]=(d[C]??0)+P)}const p=[...o].sort(),u=[...r.entries()].map(([x,C])=>({code:x,name:C})),y={},v={},g={};for(const x of u){const C=p.map(P=>l[x.code]?.[P]??0),A=C.reduce((P,s)=>P+s,0)/(C.length||1),T=C.reduce((P,s)=>P+(s-A)**2,0)/(C.length||1);y[x.code]=C.reduce((P,s)=>P+s,0),v[x.code]=A,g[x.code]=Math.sqrt(T)}return{months:p,products:u,matrix:l,totals:d,productTotals:y,productAvg:v,productStdDev:g}}async function rl(){return(await F("product_safety_stock_params",{order:"product_code.asc"})).map(t=>({productCode:f(t,["product_code"],""),productName:f(t,["product_name"],""),unit:f(t,["unit"],"本"),avgMonthlyDemand:D(t,["avg_monthly_demand"],0),demandStdDev:D(t,["demand_std_dev"],0),leadTimeDays:D(t,["lead_time_days"],30),serviceLevel:D(t,["service_level"],.95),safetyStockQty:D(t,["safety_stock_qty"],0),reorderPoint:D(t,["reorder_point"],0),memo:f(t,["memo"],""),productionType:f(t,["production_type"],"monthly")}))}async function il(e){return(await F("production_plan",{year_month:`eq.${e}`,order:"product_code.asc"})).map(n=>({id:f(n,["id"],""),yearMonth:f(n,["year_month"],e),productCode:f(n,["product_code"],""),productName:f(n,["product_name"],""),demandForecast:D(n,["demand_forecast"],0),safetyStockTarget:D(n,["safety_stock_target"],0),openingStock:D(n,["opening_stock"],0),requiredProduction:D(n,["required_production"],0),plannedQty:D(n,["planned_qty"],0),actualQty:D(n,["actual_qty"],0),status:f(n,["status"],"draft"),productionType:f(n,["production_type"],"monthly"),notes:f(n,["notes"],"")}))}async function ll(e){const{SUPABASE_URL:t,SUPABASE_ANON_KEY:n}=await q(async()=>{const{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}=await Promise.resolve().then(()=>Z);return{SUPABASE_URL:o,SUPABASE_ANON_KEY:r}},void 0);if(!n||e.length===0)return!1;try{const o=e.map(d=>({product_code:d.productCode,product_name:d.productName,unit:d.unit,avg_monthly_demand:d.avgMonthlyDemand,demand_std_dev:d.demandStdDev,lead_time_days:d.leadTimeDays,service_level:d.serviceLevel,safety_stock_qty:d.safetyStockQty,reorder_point:d.reorderPoint,production_type:d.productionType,memo:d.memo,last_calc_at:new Date().toISOString(),updated_at:new Date().toISOString()})),r=new URL("/rest/v1/product_safety_stock_params",t),l=await fetch(r.toString(),{method:"POST",headers:{apikey:n,Authorization:`Bearer ${n}`,"Content-Type":"application/json",Prefer:"return=minimal,resolution=merge-duplicates"},body:JSON.stringify(o)});if(!l.ok){const d=await l.text();return console.error("saveSafetyStockParamsBulk failed:",l.status,d),!1}return!0}catch(o){return console.error("saveSafetyStockParamsBulk error:",o),!1}}async function cl(e){const{supabaseUpsert:t}=await q(async()=>{const{supabaseUpsert:o}=await Promise.resolve().then(()=>Z);return{supabaseUpsert:o}},void 0);return await t("production_plan",{...e.id?{id:e.id}:{},year_month:e.yearMonth,product_code:e.productCode,product_name:e.productName,demand_forecast:e.demandForecast,safety_stock_target:e.safetyStockTarget,opening_stock:e.openingStock,required_production:e.requiredProduction,planned_qty:e.plannedQty,actual_qty:e.actualQty,status:e.status,production_type:e.productionType,notes:e.notes,updated_at:new Date().toISOString()})!==null}function dl(e){if(!e)return"不明";const t=e.replace(/^.+?[都道府県]/,""),n=t.match(/^(.+?郡.+?[町村]|.+?[市区町村])/);return n?n[1]:t.substring(0,6)}async function pl(e){const[t,n]=e.split("-").map(Number),o=`${e}-01`,r=new Date(t,n,0).getDate(),l=`${e}-${String(r).padStart(2,"0")}`,d=await Se("sales_document_headers",{select:"sales_date,customer_name,legacy_customer_code,total_amount",and:`(sales_date.gte.${o},sales_date.lte.${l})`,order:"sales_date.asc"}),p=await Se("customers",{select:"legacy_customer_code,address1",address1:"not.is.null"}),u={};for(const v of p)v.address1&&(u[v.legacy_customer_code]=dl(v.address1));const y={};for(const v of d){const g=v.sales_date;if(!g)continue;const x=u[v.legacy_customer_code]||"住所未登録",C=Number(v.total_amount)||0;y[g]||(y[g]={date:g,entries:[],cityGroups:[],totalAmount:0,count:0}),y[g].entries.push({customerCode:v.legacy_customer_code||"",customerName:v.customer_name||"",city:x,amount:C}),y[g].totalAmount+=C,y[g].count++}for(const v of Object.values(y)){const g={};for(const x of v.entries)g[x.city]=(g[x.city]||0)+1;v.cityGroups=Object.entries(g).sort((x,C)=>C[1]-x[1]).map(([x,C])=>({city:x,count:C}))}return y}async function Ga(){return F("quotes",{select:"id,quote_no,quote_date,valid_until,customer_name,subject,total_amount,template_type,status,created_at",order:"quote_date.desc,created_at.desc",limit:"200"})}async function Is(e){const t=await F("quotes",{select:"*",id:`eq.${e}`});if(!t[0])return null;const n=await F("quote_lines",{select:"*",quote_id:`eq.${e}`,order:"line_no.asc"});return{...t[0],lines:n}}async function ul(){const e=new Date().toISOString().slice(0,7)+"-01";return Se("sales_document_headers",{select:"legacy_document_no,sales_date,customer_name,legacy_customer_code,total_amount",sales_date:`gte.${e}`,order:"sales_date.asc"})}const R=Object.freeze(Object.defineProperty({__proto__:null,CALENDAR_CATEGORY_COLORS:Qa,CALENDAR_CATEGORY_LABELS:Ha,CHURN_REASONS:aa,DEPT_LABELS:Ht,INVOICE_TYPE_LABELS:xa,JIKOMI_STATUS_LABELS:us,MATERIAL_CATEGORIES:As,PROSPECT_STAGE_COLORS:Wa,PROSPECT_STAGE_LABELS:ta,ROLE_LABELS:Kt,SEASONAL_TEMPLATES:Oa,SLACK_EVENT_LABELS:Qt,TAX_DEDUCTION_LABELS:_a,TAX_RATE_CATEGORIES:xs,addBrewingCustomCategory:Tr,addBrewingStockEntry:Cr,addRiceVariety:Pr,autoScheduleAllBatches:fr,calcWeeklyLabor:xr,convertLeadToProspect:Qi,createBrewingBatch:yr,deleteBrewingCustomCategory:Nr,deleteBrewingStockEntry:qr,deleteCalendarEvent:yi,deleteMailSender:pi,deleteMaterial:Ni,deletePrintLayout:li,deleteProspect:qi,deleteRicePurchaseCommitment:Sr,deleteRiceVariety:Er,deleteUserProfile:ki,fetchAllBrewingStockEntries:Lr,fetchAnalyticsByPeriod:Io,fetchAnnouncements:Jr,fetchAuditLogs:Ei,fetchAvailablePeriods:To,fetchAvailableProductionTypes:Xo,fetchBillList:bs,fetchBillingSummary:Va,fetchBrewingAlcoholSettings:Zo,fetchBrewingBatches:cr,fetchBrewingCategoryOverrides:Or,fetchBrewingCustomCategories:Ir,fetchBrewingForecastOverrides:ar,fetchBrewingMonthlyTrend:Uo,fetchBrewingPlanSummary:Vo,fetchBrewingProcessSteps:dr,fetchBrewingProductDetail:Yo,fetchBrewingRiceParams:sr,fetchBrewingSchedule:Jo,fetchBrewingSeasonalPattern:rr,fetchBrewingStockEntries:Ar,fetchBrewingYearlyShipments:tr,fetchCalendarEvents:ui,fetchCallLogs:Fi,fetchCategoryTypeLinks:Qo,fetchChurnAlerts:Kr,fetchChurnNotes:Oi,fetchCustomerAnalysis:ps,fetchCustomerEfficiency:Xr,fetchCustomerEfficiencyByYear:wt,fetchCustomerLedger:ja,fetchCustomerPriceGroup:Sa,fetchCustomerPricing:$a,fetchCustomerProductBreakdown:jo,fetchDeliveryLocations:ji,fetchDeliveryNote:Fa,fetchDeliverySchedule:Yr,fetchDemandAnalysis:ol,fetchDemandForecasts:Ur,fetchEntityMonthlySales:Fo,fetchFaxInbox:bi,fetchIntegrationSettings:ks,fetchInvoiceLines:ns,fetchInvoices:St,fetchJikomiList:ms,fetchKenteiList:hs,fetchLabelExclusions:Br,fetchLeadItems:Ji,fetchLeadLists:Yi,fetchMailSenders:ci,fetchMapCustomers:Ri,fetchMasterStats:Ba,fetchMaterialList:gs,fetchMyProfile:_i,fetchOrderHeaders:ul,fetchPayableList:vs,fetchPaymentStatus:Zn,fetchPeriodChartData:Oo,fetchPipelineMeta:es,fetchPrintLayouts:ri,fetchProcurementDecisions:ir,fetchProductABC:Zr,fetchProductCustomerBreakdown:zo,fetchProductDaily:Gr,fetchProductMonthlyShipments:Vr,fetchProductPower:ds,fetchProductPrice:qs,fetchProductShipmentsFromTable:Wr,fetchProductionPlan:il,fetchProspectActivities:Ii,fetchProspects:Di,fetchPurchaseList:fs,fetchQuoteList:Ga,fetchQuoteWithLines:Is,fetchRawMaterialStock:ws,fetchRawRecords:Vt,fetchRawTableList:Ds,fetchRicePurchaseCommitments:$r,fetchRiceVarieties:kr,fetchSafetyStockParams:rl,fetchSakeTaxByMonth:Ja,fetchSalesAnalytics:za,fetchSalesReport:ea,fetchSalesSummary:Xn,fetchSeasonalProfiles:Qr,fetchShipmentCalendar:pl,fetchShopifyOrders:gi,fetchSlackLogs:Li,fetchSlackRules:Ps,fetchStaffCustomerBreakdown:No,fetchStaffProductBreakdown:Ro,fetchStaffTotalsByPeriod:Mo,fetchStepLabor:wr,fetchStoreOrders:_s,fetchStoreSales:Ka,fetchSyncDashboard:ts,fetchSystemHealth:as,fetchSystemSetting:Gn,fetchTankList:ys,fetchTaxDeclaration:Ya,fetchTourInquiriesFromDb:Xi,fetchTypesInCategory:Mr,fetchUserProfiles:$i,fetchVisitPriorities:Hr,fetchWorkerSettings:vr,fetchWorkflowOrdersFromDb:Wi,generateTaxCSV:ai,generateTaxXML:$s,linkTypeToCategory:Wo,ocrFaxImage:wi,periodToDateRange:ss,prevYearFilter:Bo,reassignBrewingStockEntry:Dr,recalculateTaxDeclaration:ni,recordAudit:Pi,resolveProductPrice:Ua,saveBrewingAlcoholSetting:er,saveBrewingForecastOverride:nr,saveBrewingRiceParams:or,saveBrewingSchedule:Ko,saveCalendarEvent:mi,saveCallLog:Ls,saveChurnNote:Bi,saveDeliveryLocation:zi,saveEmailCampaign:Ft,saveFaxRecord:xi,saveIntegrationSetting:Pt,saveInvoice:rs,saveLabelExclusions:jr,saveLeadItem:Cs,saveLeadList:Ki,saveMailSender:di,saveMaterial:Mi,savePrintLayout:ii,saveProcurementDecision:lr,saveProductionPlan:cl,saveProspect:Es,saveProspectActivity:Ti,saveRicePurchaseCommitment:_r,saveSafetyStockParamsBulk:ll,saveSlackRule:Ai,saveStoreOrder:oi,saveTaxDeclaration:si,saveTourInquiry:Zi,saveUserProfile:Si,saveWorkerSettings:br,saveWorkflowOrder:Gi,searchPlaces:Hi,sendEmailCampaign:Ss,sendSlackNotification:Ci,setBrewingCategoryOverride:Rr,submitFeatureRequest:is,syncGoogleCalendar:vi,syncIvryCallLogs:Vi,syncPhoneBookToIvry:Ui,syncShopifyOrders:hi,unlinkTypeFromCategory:Go,updateBrewingBatch:gr,updateBrewingProcessStep:hr,updateCustomer:ls,updateProduct:cs,upsertBrewingStock:Ho,upsertSystemSetting:st},Symbol.toStringTag,{value:"Module"}));function Ze(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const ml={open:"未締め",closed:"締め済"};function yl(e,t){const n=e.customers.map(o=>`
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
          <span class="status-pill ${o.status==="closed"?"success":"warning"}">${ml[o.status]}</span>
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
  `}const hl={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"},{title:"需要・生産計画",description:"月次売上実績から安全在庫を算出し、必要生産数を計画します。",path:"/demand"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],crm:[{title:"新規営業",description:"見込客をカンバンで管理。パイプライン金額、確度、活動履歴。",path:"/prospects"},{title:"リスト取得ツール",description:"Google Placesで業種×エリア検索 → 見込客候補を自動取得 → 一括変換。",path:"/list-builder"},{title:"通話履歴 (IVRy)",description:"IVRy電話の通話履歴取得、電話帳同期。不在着信から顧客紐付け。",path:"/calls"},{title:"取引先マップ",description:"取引先の所在地を地図上にプロット。エリア絞込で営業ルート最適化に。",path:"/map"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"メール送信元管理",description:"複数のメールアドレス(営業/蔵見学等)を切り替えて送信。署名・返信先も個別設定。",path:"/mail-senders"},{title:"受注ワークフロー",description:"新規受注→ピッキング→梱包→発送→配達をカンバンで可視化。",path:"/workflow"},{title:"モバイル受注",description:"ラウンダー外出先用。顧客選択→商品選択→確認の3ステップで即受注。",path:"/mobile-order"},{title:"Shopify注文",description:"Shopifyストアの注文を自動同期。EC売上を一元管理。",path:"/shopify"},{title:"FAX OCR",description:"FAX受信画像をOCRしてテキスト化。伝票自動起票。",path:"/fax"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"カレンダー",description:"納品/見学/商談/仕込予定を月表示で管理。クリックで予定追加・編集。",path:"/calendar"},{title:"酒蔵見学管理",description:"見学お問合せの一元管理。多言語対応、テンプレ返信、サイト埋め込みフォーム。",path:"/tour"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}],settings:[{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"外部連携設定",description:"Shopify / Googleカレンダー / Cloud Vision (FAX OCR) / Resend のAPIキー設定。",path:"/integrations"},{title:"Slack通知",description:"受注/入金遅延/低在庫/問合せ等の通知をSlackに自動送信。",path:"/slack"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"データブラウザ",description:"テーブル単位で生データを閲覧し、連動状況を確認します。",path:"/raw-browser"},{title:"ユーザー管理",description:"担当者のアカウント・権限・部署を管理 (管理者専用)。",path:"/users"},{title:"プロフィール",description:"自分のアカウント情報・パスワード変更・既定の送信元メール。",path:"/profile"},{title:"操作ログ",description:"全ユーザーの操作履歴 (監査証跡)。",path:"/audit"}]},gl={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},crm:{eyebrow:"営業・CRM",title:"営業・顧客管理",description:"新規開拓、顧客コミュニケーション、受注処理をまとめて管理します。"},more:{eyebrow:"業務ツール",title:"業務ツール",description:"酒税、店舗、分析、カレンダーなど日常業務の補助機能です。"},settings:{eyebrow:"設定",title:"システム設定",description:"連携、通知、ユーザー管理など環境設定をまとめています。"}};function un(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Lt(e){const t=gl[e],n=hl[e].map(o=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${un(o.title)}</p>
            <p class="category-card-description">${un(o.description)}</p>
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
  `}function Ts(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function xt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function fl(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${Ts(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${xt(t.amount)}</td>
        </tr>
      `).join("")}function vl(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${Ts(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${xt(t.amount)}</td>
        </tr>
      `).join("")}function bl(e,t){return`
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
            <tbody>${fl(e)}</tbody>
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
            <tbody>${vl(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function pt(e,t,n){const o=e.findIndex(l=>l.column===t);if(o>=0){if(e[o].direction==="asc"){const d=[...e];return d[o]={column:t,direction:"desc"},d}return e.filter((d,p)=>p!==o)}const r={column:t,direction:"asc"};return n?[...e,r]:[r]}function wl(e,t){const n=e.findIndex(l=>l.column===t);if(n<0)return'<span class="sort-icon">⇅</span>';const o=e[n].direction==="asc"?"↑":"↓",r=e.length>1?`<small class="sort-badge">${n+1}</small>`:"";return`<span class="sort-icon active">${o}${r}</span>`}function ee(e,t,n,o=""){return`<th class="sortable ${o}" data-sort-col="${e}">${t} ${wl(n,e)}</th>`}function mn(e){if(e==null)return"";const t=String(e).replace(/[¥,円%本日L]/g,"").trim(),n=Number(t);return Number.isFinite(n)?n:t.toLowerCase()}function it(e,t,n){return t.length===0?e:[...e].sort((o,r)=>{for(const{column:l,direction:d}of t){const p=n[l];if(!p)continue;const u=mn(o[p]),y=mn(r[p]);let v=0;if(typeof u=="number"&&typeof y=="number"?v=u-y:v=String(u).localeCompare(String(y),"ja"),v!==0)return d==="asc"?v:-v}return 0})}const xl={forecasts:[],deliveries:[],calendarMonth:new Date().toISOString().slice(0,7),selectedSegment:"all"},yn={monthly:"通年出荷","made-to-order":"受注生産","november-only":"歳暮（11月生産）","annual-batch":"季節集中","december-settlement":"歳暮（11月生産）","seasonal-batch":"季節集中"},ut={monthly:"#0F5B8D","made-to-order":"#6b46c1","november-only":"#c05621","annual-batch":"#2f855a","december-settlement":"#c05621","seasonal-batch":"#2f855a"};function $l(e){const t=new Date().toISOString().slice(0,10);return e.map(n=>({date:n.date,customerName:n.customerName,productName:n.productName,quantity:n.quantity,status:n.date>t?"scheduled":"delivered"}))}function _l(e){const[t,n]=e.split("-").map(Number);return new Date(t,n,0).getDate()}function Sl(e){const[t,n]=e.split("-").map(Number);return new Date(t,n-1,1).getDay()}function Ms(e,t){const n=_l(t),o=Sl(t),[r,l]=t.split("-").map(Number),d=new Map;e.forEach(m=>{if(m.date.slice(0,7)===t){const h=m.date.slice(0,10);d.has(h)||d.set(h,[]),d.get(h).push(m)}});const p=e.filter(m=>m.date.slice(0,7)===t),u=p.reduce((m,h)=>m+h.quantity,0),y=new Set(p.map(m=>m.date)).size,v=new Date().toISOString().slice(0,10),g=["日","月","火","水","木","金","土"].map(m=>`<th class="dcal-header">${m}</th>`).join("");let x="",C=1;for(let m=0;m<6&&!(C>n&&m>0);m++){x+="<tr>";for(let h=0;h<7;h++)if(m===0&&h<o||C>n)x+='<td class="dcal-cell dcal-empty"></td>';else{const b=`${r}-${String(l).padStart(2,"0")}-${String(C).padStart(2,"0")}`,w=d.get(b)||[],$=b===v,_=w.reduce((k,E)=>k+E.quantity,0);x+=`
          <td class="dcal-cell ${$?"dcal-today":""}">
            <div class="dcal-day">${C}</div>
            ${w.length>0?`
              <div class="dcal-entries">
                <div class="dcal-entry dcal-${w[0].status}">${w.length}件 ${_}本</div>
              </div>
            `:""}
          </td>`,C++}x+="</tr>"}const[A,T]=l===1?[r-1,12]:[r,l-1],[P,s]=l===12?[r+1,1]:[r,l+1],i=`${A}-${String(T).padStart(2,"0")}`,c=`${P}-${String(s).padStart(2,"0")}`;return`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>納品カレンダー</h2>
          <p class="panel-caption">${r}年${l}月: ${y}日稼働 / ${p.length}件 / 合計${u.toLocaleString()}本</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <button class="button secondary small" type="button" data-action="dcal-prev" data-month="${i}">◀</button>
          <span style="font-weight:700;min-width:90px;text-align:center;">${r}年${l}月</span>
          <button class="button secondary small" type="button" data-action="dcal-next" data-month="${c}">▶</button>
        </div>
      </div>
      <div class="dcal-legend">
        <span><span class="dcal-dot scheduled"></span>予定</span>
        <span><span class="dcal-dot delivered"></span>出荷済</span>
      </div>
      <table class="dcal-table">
        <thead><tr>${g}</tr></thead>
        <tbody>${x}</tbody>
      </table>
    </section>
  `}function kl(e,t){const n=t==="all"?e:e.filter(p=>p.segment===t),o={all:e.length};e.forEach(p=>{o[p.segment]=(o[p.segment]??0)+1});const l=["all",...[...new Set(e.map(p=>p.segment))]].map(p=>`
      <button class="button ${t===p?"primary":"secondary"} small" type="button" data-action="forecast-segment" data-segment="${p}">
        ${p==="all"?"全て":yn[p]??p} (${o[p]??0})
      </button>
    `).join(""),d=n.map(p=>`
      <tr>
        <td class="mono">${p.code}</td>
        <td>${p.name}</td>
        <td><span class="segment-badge" style="background:${ut[p.segment]??"#718096"};">${yn[p.segment]??p.segment}</span></td>
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
          <tbody>${d}</tbody>
        </table>
      </div>
    </section>
  `}function Pl(e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">分析</p>
        <h1>需要予測 / 納品カレンダー</h1>
        <p class="meta-note">伝票実績から商品別の月次出荷量を集計し、在庫適正化に活用します。</p>
      </div>
    </section>

    ${Ms(e.deliveries,e.calendarMonth)}
    ${kl(e.forecasts,e.selectedSegment)}
  `}function El(e,t){return Ms(e,t)}const Ct={today:"当日",month:"当月","90days":"90日",year:"1年",all:"全期間",custom:"指定期間",future:"今月以降"};function hn(e,t){const n=new Date(e);return n.setFullYear(n.getFullYear()+t),n.toISOString()}function ra(e,t,n){if(t==="all")return e;const o=new Date,r=o.toISOString().slice(0,10),l=new Date(o);switch(t){case"today":return e.filter(d=>d.date.slice(0,10)===r);case"month":return e.filter(d=>d.date.slice(0,7)===r.slice(0,7));case"future":{const d=new Date(o.getFullYear(),o.getMonth(),1).toISOString().slice(0,10);return e.filter(p=>p.date.slice(0,10)>=d)}case"90days":return l.setDate(l.getDate()-90),e.filter(d=>d.date>=l.toISOString());case"year":return l.setFullYear(l.getFullYear()-1),e.filter(d=>d.date>=l.toISOString());case"custom":return!n?.start||!n?.end?e:e.filter(d=>{const p=d.date.slice(0,10);return p>=n.start&&p<=n.end})}}function ke(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ia(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Al(e){const o={top:20,right:20,bottom:30,left:50},r=760-o.left-o.right,l=260-o.top-o.bottom,d=Math.max(...e.map(v=>v.amount),1),p=r/e.length,u=e.map((v,g)=>{const x=v.amount/d*l,C=o.left+g*p+4,A=o.top+l-x,T=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(v.date));return`
        <g>
          <rect x="${C}" y="${A}" width="${Math.max(p-8,8)}" height="${x}" rx="4" fill="#0F5B8D" opacity="${.58+g/e.length*.34}" />
          ${g%5===0?`<text x="${C+6}" y="252" class="chart-axis">${T}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(v=>{const g=o.top+l-l*v,x=Math.round(d*v/1e3);return`
        <g>
          <line x1="${o.left}" y1="${g}" x2="${760-o.right}" y2="${g}" class="chart-grid" />
          <text x="6" y="${g+4}" class="chart-axis">${x.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${u}
    </svg>
  `}function Ll(e,t,n,o,r="month",l,d=[]){const p={success:"正常",warning:"注意",error:"異常",running:"実行中"},u=ra(e.allDailySales,r,l),y=u.reduce((z,U)=>z+U.amount,0),v=u.reduce((z,U)=>z+U.bottles,0),g=u.reduce((z,U)=>z+U.volumeMl,0),x=u.length,C=v>0?Math.round(y/v):0,A=g>0?Math.round(y/(g/1e3)):0,T=new Date,P=T.toISOString().slice(0,10),s=P.slice(0,7),i=ra(e.allDailySales,"month").filter(z=>z.date.slice(0,10)<=P),c=i.reduce((z,U)=>z+U.amount,0);i.reduce((z,U)=>z+U.bottles,0);const m=T.getDate();new Date(T.getFullYear(),T.getMonth()+1,0).getDate();const b=(o?.orderHeaders??[]).filter(z=>z.sales_date.slice(0,7)===s),w=b.reduce((z,U)=>z+Number(U.total_amount),0),$=b.length,_=ra(e.allDailySales,"month"),k=_.reduce((z,U)=>z+U.bottles,0),E=w>0?w:_.reduce((z,U)=>z+U.amount,0),L=w>0?"orders":"extrapolation",M=(u.length>0?e.allDailySales.filter(z=>{const U=u[0]?.date??"",H=u[u.length-1]?.date??"",W=hn(U,-1),J=hn(H,-1);return z.date>=W&&z.date<=J}):[]).reduce((z,U)=>z+U.amount,0),O=M>0?(y-M)/M*100:0,N=O>0?"+":"",j=e.salesRecords.slice(0,10).map(z=>`
            <tr>
              <td class="mono">${z.documentNo}</td>
              <td>${ia(z.date)}</td>
              <td>${z.customerName}</td>
              <td class="numeric">${ke(z.amount)}</td>
            </tr>
          `).join(""),V=["today","month","future","90days","year","all"].map(z=>`<button class="button ${z===r?"primary":"secondary"} small" type="button" data-period="${z}">${Ct[z]}</button>`).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${p[t.status]}</span>
        <span class="meta-note">データ最新日 ${t.lastDataAt?t.lastDataAt.slice(0,10):"―"}</span>
        <span class="meta-note" style="font-size:11px;opacity:0.7;">同期エージェント ${ia(t.lastSyncAt)}</span>
        <button class="button secondary small" data-action="dashboard-refresh" title="データを再取得">↻ 更新</button>
      </div>
    </section>

    <section class="period-filter">
      <div class="button-group">${V}</div>
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
        <p class="kpi-value">${ke(c)}</p>
        <p class="kpi-sub">${m}日経過 / ${i.length}営業日 / 日平均 ${i.length>0?ke(Math.round(c/i.length)):"―"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:3px solid #0968e5;">
        <p class="panel-title">月末受注見込</p>
        <p class="kpi-value">${ke(E)}</p>
        <p class="kpi-sub">${L==="orders"?`受注確定 ${$}件`:`出荷見込 ${k.toLocaleString("ja-JP")}本（日割り外挿）`}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">昨対比</p>
        <p class="kpi-value" style="color:${O>=0?"#2f855a":"#c53d3d"}">${M>0?`${N}${O.toFixed(1)}%`:"―"}</p>
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
        <p class="panel-title">${Ct[r]}売上</p>
        <p class="kpi-value">${ke(y)}</p>
        <p class="kpi-sub">${x}日間${x>0?` / 日平均 ${ke(Math.round(y/x))}`:""}</p>
      </article>
    </section>
    `:""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">出荷本数</p>
        <p class="kpi-value">${v.toLocaleString("ja-JP")} 本</p>
        <p class="kpi-sub">本単価 ${ke(C)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">出荷液体量</p>
        <p class="kpi-value">${(g/1e3).toLocaleString("ja-JP",{maximumFractionDigits:0})} L</p>
        <p class="kpi-sub">L単価 ${ke(A)}</p>
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
            <p class="panel-caption">${Ct[r]} (${u.length}日分)</p>
          </div>
        </div>
        <div class="chart-scroll">
          ${Al(u.length>0?u:e.dailySales)}
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
              <dd>${ia(t.lastSyncAt)}</dd>
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
          <p class="panel-caption">${Ct[r]} — 売上・本数・液体量・単価（${u.length}日分）</p>
        </div>
        <span class="collapse-icon">▼</span>
      </summary>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ee("date","日付",d)}
              ${ee("amount","売上",d,"numeric")}
              ${ee("bottles","本数",d,"numeric")}
              ${ee("volumeMl","液体量(L)",d,"numeric")}
              ${ee("pricePerBottle","本単価",d,"numeric")}
              ${ee("pricePerLiter","L単価",d,"numeric")}
            </tr>
          </thead>
          <tbody>${it(d.length>0?u:u.slice().reverse(),d,{date:"date",amount:"amount",bottles:"bottles",volumeMl:"volumeMl",pricePerBottle:"pricePerBottle",pricePerLiter:"pricePerLiter"}).slice(0,31).map(z=>`
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

    ${o?Cl(o):""}

    <section class="panel" style="padding:12px 16px;">
      <p style="margin:0;font-size:12px;color:var(--text-secondary);">
        機能要望・バグ報告は <button class="button secondary small" type="button" data-link="/setup">設定画面</button> からお送りいただけます。
      </p>
    </section>
  `}function Cl(e){const t=new Date().toISOString().slice(0,10),n=e.upcomingEvents.filter(p=>p.startsAt.slice(0,10)>=t).slice(0,5),o=e.tourInquiries.filter(p=>p.status==="new").length,r=e.churnSummary,l=r?r.atRiskCount+r.dormantCount+r.decliningCount:null,d=r?`<article class="panel kpi-card ${r.atRiskCount>0?"kpi-alert":""}" style="cursor:pointer;" data-link="/churn-alert">
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

    ${e.deliveries&&e.deliveries.length>0?El(e.deliveries,e.deliveryCalendarMonth||new Date().toISOString().slice(0,7)):""}

    ${e.orderHeaders&&e.orderHeaders.length>0?Dl(e.orderHeaders):""}
  `}function Dl(e){const t=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),o=new Date().toISOString().slice(0,10),r=o.slice(0,7),l=new Map;for(const g of e){const x=g.sales_date.slice(0,7),C=l.get(x)??{count:0,total:0};l.set(x,{count:C.count+1,total:C.total+Number(g.total_amount)})}const d=[...l.keys()].sort(),p=e.reduce((g,x)=>g+Number(x.total_amount),0),u=d.map(g=>{const{count:x,total:C}=l.get(g);return`<tr>
      <td class="mono" style="font-weight:700;">${g===r?`${g}（当月）`:g}</td>
      <td class="numeric">${x.toLocaleString("ja-JP")}件</td>
      <td class="numeric" style="font-weight:700;">${t.format(C)}</td>
    </tr>`}).join(""),y=e.filter(g=>g.sales_date>=o).slice(0,30),v=y.map(g=>`<tr>
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
  `}function ql(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function et(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Il(e,t){const n=e.lines.length?e.lines.map((r,l)=>`
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
            <tr><th>納品日</th><td>${ql(e.invoiceDate)}</td></tr>
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
  `}function De(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Tl(e){return De(e).replaceAll(`
`,"<br />")}function Ml(e){const n=[...Object.values(Oa),{id:"custom",season:"カスタム",subject:"",body:""}].map(r=>`
        <button
          class="template-card ${e.selectedTemplateId===r.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${r.id}"
        >
          <span class="template-card-kicker">${r.season}</span>
          <strong>${De(r.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),o=e.previewRecipients.length?e.previewRecipients.map(r=>`
            <li>
              <span>${De(r.name)}</span>
              <span class="table-sub">${De(r.email)} / ${De(r.area)}</span>
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
            ${e.senders.map(r=>`<option value="${r.id}" ${r.id===e.senderId?"selected":""}>${De(r.name)} &lt;${De(r.email)}&gt;${r.isVerified?"":" ⚠️未認証"}</option>`).join("")}
            ${e.senders.length===0?'<option value="">送信元が未登録です</option>':""}
          </select>
          <p class="form-hint" style="margin-top:4px;">送信元は <a href="#" data-link="/mail-senders">メール送信元管理</a> で追加できます</p>
        </label>
        <div class="email-preview">
          <p class="panel-title">${De(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?Tl(e.body):"本文未入力"}</div>
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
  `}function Nl(e,t){const n=[Dt("得意先",t.customers.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Ce(r.name)}</strong>
            <span class="table-sub mono">${Ce(r.code)}</span>
          </button>
        `)),Dt("商品",t.products.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${Ce(r.name)}</strong>
            <span class="table-sub mono">${Ce(r.code)}</span>
          </button>
        `)),Dt("伝票",t.documents.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${Ce(r.documentNo)}</strong>
            <span class="table-sub">${Ce(r.customerName)} / ${Ce(r.date)}</span>
          </button>
        `)),Dt("ページ",t.pages.map(r=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${Ce(r.path)}"
          >
            <strong>${Ce(r.title)}</strong>
            <span class="table-sub mono">${Ce(r.path)}</span>
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
  `}function mt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ns(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${mt(e.emptyMessage??"該当データがありません。")}</p>`;return`
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
  `}function qt(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function gn(e){return e.trim().toLowerCase()}function Rl(e,t){const n=gn(t),o=e.filter(l=>n?[l.code,l.name,l.name].map(gn).some(d=>d.includes(n)):!0).slice(0,50),r=o.length?`
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
      `:"";return Ns({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:r,emptyMessage:"該当する得意先が見つかりません。"})}function Ol(e){return e.toISOString().slice(0,10)}function Ge(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ye(e,t){return e[t]?`<div class="field-error">${Ge(e[t])}</div>`:""}function tt(e,t,n=""){return[n,e[t]?"has-error":""].filter(Boolean).join(" ")}function Bl(e,t,n,o){const r=Object.keys(xa).map(u=>`<option value="${u}" ${e.invoiceType===u?"selected":""}>${xa[u]}</option>`).join(""),l=e.lines.map((u,y)=>`
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
          <select id="inv-type">${r}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${tt(o,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||Ol(new Date)}" />
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
  `}function jl(e){return"¥"+e.toLocaleString("ja-JP")}function zl(e){if(!e)return"";const t=new Date(e);return`${t.getFullYear()}/${String(t.getMonth()+1).padStart(2,"0")}/${String(t.getDate()).padStart(2,"0")}`}const Fl={draft:"下書き",sent:"送付済",accepted:"受注",rejected:"失注"},Vl={draft:"badge-gray",sent:"badge-blue",accepted:"badge-green",rejected:"badge-red"},Ul={sake:"酒販用",standard:"通常"};function Yl(e,t){return`
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
        <td>${zl(o.quote_date)}</td>
        <td>${o.customer_name||"（未選択）"}</td>
        <td>${o.subject||""}</td>
        <td class="numeric">${jl(o.total_amount)}</td>
        <td><span class="badge ${Vl[o.status]??"badge-gray"}">${Fl[o.status]??o.status}</span></td>
        <td>${Ul[o.template_type]??o.template_type}</td>
        <td>
          <button class="button secondary small" data-open-quote="${o.id}">開く</button>
          <button class="button secondary small danger" data-delete-quote="${o.id}" data-quote-no="${o.quote_no}">削除</button>
        </td>
      </tr>
    `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}const Rs="kanei-quote-settings",Os=[{label:"青（標準）",value:"#0968e5"},{label:"紺",value:"#1e3a8a"},{label:"藍",value:"#1d4ed8"},{label:"緑",value:"#15803d"},{label:"金",value:"#b45309"},{label:"朱",value:"#c2410c"},{label:"ワイン",value:"#881337"},{label:"墨",value:"#1f2937"}],Ut={companyName:"金井酒造店",companyPostal:"257-0014",companyAddress1:"神奈川県秦野市堀山下182",companyAddress2:"",companyTel:"0463-88-1511",companyFax:"0463-88-5885",companyEmail:"info@kaneishuzo.co.jp",companyRegistrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"",bankAccountHolder:"カ）カナイシュゾウテン",defaultPaymentTerms:"月末締め翌月末払い",defaultHeaderNote:"下記のとおりお見積り申し上げます。",defaultFooterNote:"",sealImageDataUrl:"",sealSize:72,accentColor:"#0968e5"};function ka(){try{const e=localStorage.getItem(Rs);if(e)return{...Ut,...JSON.parse(e)}}catch{}try{const e=localStorage.getItem("quote-seal");if(e){const t=JSON.parse(e);return{...Ut,sealImageDataUrl:t.imageDataUrl??"",sealSize:t.size??72}}}catch{}return{...Ut}}function Xe(e){localStorage.setItem(Rs,JSON.stringify(e))}function Me(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function _e(e,t,n,o="text",r=""){return`<div class="form-row"><label>${t}</label><input type="${o}" id="${e}" value="${Me(n)}" placeholder="${Me(r)}" /></div>`}function Jl(e,t,n,o){const r=o.map(l=>`<option value="${Me(l)}" ${n===l?"selected":""}>${Me(l)}</option>`).join("");return`<div class="form-row"><label>${t}</label><select id="${e}">${r}</select></div>`}function Kl(e){return`
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
        ${Jl("qs-bank-type","口座種別",e.bankAccountType,["普通","当座"])}
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
        ${Os.map(t=>`
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
  `}function Hl(){const e=new Date;return new Date(e.getFullYear(),e.getMonth()+3,0).toISOString().slice(0,10)}function Wt(e){return{id:null,quoteNo:"",quoteDate:new Date().toISOString().slice(0,10),validUntil:Hl(),customerCode:"",customerName:"",customerAddress:"",subject:"",lines:[],remarks:"",taxRate:10,deliveryDate:"",paymentTerms:e?.defaultPaymentTerms??"月末締め翌月末払い",deliveryPlace:"",templateType:"sake",previewMode:!1}}Wt();function G(e){return(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ae(e){return"¥"+e.toLocaleString("ja-JP")}function fn(e){if(!e)return"";const t=new Date(e);return isNaN(t.getTime())?e:`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Bs(e){const t=e.replace("#","");return[parseInt(t.slice(0,2),16),parseInt(t.slice(2,4),16),parseInt(t.slice(4,6),16)]}function js(e,t,n){return"#"+[e,t,n].map(o=>Math.max(0,Math.min(255,Math.round(o))).toString(16).padStart(2,"0")).join("")}function Gt(e,t){const[n,o,r]=Bs(e);return js(n+(255-n)*t,o+(255-o)*t,r+(255-r)*t)}function zs(e,t){const[n,o,r]=Bs(e);return js(n*(1-t),o*(1-t),r*(1-t))}function Ql(e){const t=zs(e,.15),n=Gt(e,.88),o=Gt(e,.96);return`
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
`}function Wl(e){const t=zs(e,.15),n=Gt(e,.88),o=Gt(e,.96);return`
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
`}function Fs(e,t){const n=e.lines.reduce((A,T)=>A+T.amount,0),o=Math.round(n*e.taxRate/100),r=n+o,l=e.templateType==="sake",d=l?'<th style="width:90px;">JANコード</th><th style="width:40px;">入数</th><th style="width:70px;">希望小売価格</th>':"",p=l?9:6,u=e.lines.map((A,T)=>{const P=l?`<td style="font-size:9px;">${G(A.janCode)}</td><td style="text-align:center;">${A.caseQty??""}</td><td style="text-align:right;">${A.retailPrice!=null?Ae(A.retailPrice):""}</td>`:"";return`<tr>
      <td style="text-align:center;">${T+1}</td>
      <td class="mono" style="font-size:9px;">${G(A.productCode)}</td>
      <td>${G(A.productName)}</td>
      ${P}
      <td style="text-align:right;">${A.quantity.toLocaleString()}</td>
      <td style="text-align:center;">${G(A.unit)}</td>
      <td style="text-align:right;">${Ae(A.unitPrice)}</td>
    </tr>`}).join("")||`<tr><td colspan="${p}" style="text-align:center;padding:16px;color:#999;">明細なし</td></tr>`,y=[t.bankName,t.bankBranch,t.bankAccountType?t.bankAccountType+"預金":"",t.bankAccountNo,t.bankAccountHolder?"　口座名義："+t.bankAccountHolder:""].filter(Boolean).join("　"),v=y?`
    <div class="billing-box">
      <p style="font-weight:600;margin-bottom:2px;">【振込口座】</p>
      <p>${G(y)}</p>
    </div>
  `:"",g=t.sealImageDataUrl?`<img src="${t.sealImageDataUrl}" style="width:${t.sealSize}px;height:${t.sealSize}px;opacity:0.9;flex-shrink:0;" />`:"",x=[];e.validUntil&&x.push(`<div class="q-cond-cell"><div class="q-cond-label">有効期限</div><div class="q-cond-value">${fn(e.validUntil)}</div></div>`),e.paymentTerms&&x.push(`<div class="q-cond-cell"><div class="q-cond-label">支払条件</div><div class="q-cond-value">${G(e.paymentTerms)}</div></div>`),e.deliveryDate&&x.push(`<div class="q-cond-cell"><div class="q-cond-label">納期</div><div class="q-cond-value">${G(e.deliveryDate)}</div></div>`),e.deliveryPlace&&x.push(`<div class="q-cond-cell"><div class="q-cond-label">納品場所</div><div class="q-cond-value">${G(e.deliveryPlace)}</div></div>`);const C=x.length>0?`<div class="q-cond-grid" style="grid-template-columns:repeat(${Math.min(x.length,4)},1fr);">${x.join("")}</div>`:"";return`
<div class="q-doc">
  <!-- タイトル行: 左=御見積書、右=見積番号・日付（右寄せ） -->
  <div class="q-title-row">
    <h1 class="q-title">御 見 積 書</h1>
    <div class="q-meta-box">
      ${e.quoteNo?`<div class="q-meta-item"><span class="q-meta-label">見積番号</span><span class="q-meta-val">${G(e.quoteNo)}</span></div>`:""}
      <div class="q-meta-item"><span class="q-meta-label">見積日</span><span class="q-meta-val">${fn(e.quoteDate)}</span></div>
    </div>
  </div>

  <!-- 取引先（左）・自社情報（右） -->
  <div class="q-parties">
    <div class="q-customer">
      <p class="q-customer-name">${G(e.customerName||"（得意先未選択）")} 御中</p>
      ${e.customerAddress?`<p class="q-customer-addr">${G(e.customerAddress)}</p>`:""}
    </div>
    <div class="q-seller-col">
      <!-- 自社情報: 社名の右に印鑑 -->
      <div class="q-seller-name-row">
        <span class="q-seller-name">${G(t.companyName)}</span>
        ${g}
      </div>
      ${t.companyPostal?`<p class="q-seller-sub">〒${G(t.companyPostal)}</p>`:""}
      ${t.companyAddress1?`<p class="q-seller-sub">${G(t.companyAddress1)}${t.companyAddress2?" "+G(t.companyAddress2):""}</p>`:""}
      ${t.companyTel?`<p class="q-seller-sub">TEL: ${G(t.companyTel)}</p>`:""}
      ${t.companyFax?`<p class="q-seller-sub">FAX: ${G(t.companyFax)}</p>`:""}
      ${t.companyRegistrationNo?`<p class="q-seller-sub q-regno">登録番号: ${G(t.companyRegistrationNo)}</p>`:""}
    </div>
  </div>

  ${C}

  <div class="q-total-banner">
    <span class="q-total-label">合計金額</span>
    <span class="q-total-amount">${Ae(r)}（税込）</span>
  </div>

  ${e.subject?`<p class="q-subject">件名：${G(e.subject)}</p>`:""}
  ${t.defaultHeaderNote?`<p class="q-note">${G(t.defaultHeaderNote)}</p>`:""}

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
        <th style="width:80px;">${l?"納入価格":"単価"}</th>
      </tr>
    </thead>
    <tbody>${u}</tbody>
    <tfoot>
      <tr><td colspan="${p-1}" style="text-align:right;">小計</td><td style="text-align:right;">${Ae(n)}</td></tr>
      <tr><td colspan="${p-1}" style="text-align:right;">消費税(${e.taxRate}%)</td><td style="text-align:right;">${Ae(o)}</td></tr>
      <tr class="q-total-row"><td colspan="${p-1}" style="text-align:right;">合計</td><td style="text-align:right;">${Ae(r)}</td></tr>
    </tfoot>
  </table>
  </div>

  ${e.remarks?`<div class="q-remarks"><p class="q-remarks-label">備考</p><p>${G(e.remarks).replace(/\n/g,"<br/>")}</p></div>`:""}

  ${t.defaultFooterNote?`<p class="q-footer-note">${G(t.defaultFooterNote)}</p>`:""}

  ${v}
</div>`}function Vs(e,t,n,o,r,l,d){const p=e.lines.reduce((A,T)=>A+T.amount,0),u=Math.round(p*e.taxRate/100),y=p+u,v=e.templateType==="sake",g=o.length>=1?t.filter(A=>A.name.includes(o)||A.code.includes(o)).slice(0,8):[],x=r.length>=1?n.filter(A=>A.name.includes(r)||A.code.includes(r)).slice(0,8):[];if(e.previewMode){const A=d.accentColor||"#0968e5";return`
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
        ${Wl(A)}
        @media print {
          .q-print-hide { display: none !important; }
          .app-header   { display: none !important; }
          .main-v2      { padding: 0 !important; }
          body          { background: white !important; }
          div[style*="background:white;border:1px solid #ddd"] { border: none !important; border-radius: 0 !important; padding: 0 !important; }
        }
      </style>
      <div style="background:white;border:1px solid #ddd;border-radius:10px;padding:20px 16px;margin-top:8px;overflow-x:hidden;">
        ${Fs(e,d)}
      </div>
    `}const C=e.lines.map((A,T)=>{const P=v?`
      <td><input type="text" class="jan-input" data-line-idx="${T}" value="${G(A.janCode)}" style="width:85px;" /></td>
      <td><input type="number" class="case-qty-input" data-line-idx="${T}" value="${A.caseQty??""}" min="0" style="width:38px;text-align:center;" /></td>
      <td class="numeric"><input type="number" class="retail-price-input" data-line-idx="${T}" value="${A.retailPrice??""}" min="0" style="width:75px;text-align:right;" /></td>
    `:"";return`<tr>
      <td class="mono" style="font-size:11px;">${G(A.productCode)}</td>
      <td>${G(A.productName)}</td>
      ${P}
      <td class="numeric"><input type="number" class="qty-input" data-line-idx="${T}" value="${A.quantity}" min="0" style="width:56px;text-align:right;" /></td>
      <td>${G(A.unit)}</td>
      <td class="numeric"><input type="number" class="price-input" data-line-idx="${T}" value="${A.unitPrice}" min="0" style="width:72px;text-align:right;" /></td>
      <td class="numeric">${Ae(A.amount)}</td>
      <td><button class="button secondary small" data-remove-line="${T}">×</button></td>
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
          ${Os.map(A=>`
            <button type="button" data-action="set-accent-color" data-color="${G(A.value)}" title="${G(A.label)}"
              style="width:28px;height:28px;border-radius:4px;border:3px solid ${d.accentColor===A.value?"#333":"transparent"};background:${G(A.value)};cursor:pointer;"></button>
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
          <input type="text" id="q-no" value="${G(e.quoteNo)}" placeholder="保存時に自動採番" />
        </div>
        <div class="form-row"><label>見積日</label>
          <input type="date" id="q-date" value="${e.quoteDate}" />
        </div>
        <div class="form-row"><label>有効期限</label>
          <input type="date" id="q-valid" value="${e.validUntil}" />
        </div>
        <div class="form-row"><label>件名</label>
          <input type="text" id="q-subject" value="${G(e.subject)}" placeholder="御見積の件" />
        </div>
        <div class="form-row"><label>支払条件</label>
          <input type="text" id="q-payment-terms" value="${G(e.paymentTerms)}" />
        </div>
        <div class="form-row"><label>納期</label>
          <input type="text" id="q-delivery-date" value="${G(e.deliveryDate)}" placeholder="受注後2週間等" />
        </div>
        <div class="form-row"><label>納品場所</label>
          <input type="text" id="q-delivery-place" value="${G(e.deliveryPlace)}" />
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header"><h2>得意先</h2></div>
      <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">既存得意先</p>
      <div class="form-row">
        <input type="text" id="q-cust-search" value="${G(o)}" placeholder="得意先名またはコードで検索" />
      </div>
      ${g.length>0?`<div class="search-results">${g.map(A=>`
        <button class="search-item" type="button" data-select-customer="${A.code}" data-cust-name="${G(A.name)}" data-cust-addr="${G(A.address1||"")}">
          <span class="mono">${A.code}</span> ${G(A.name)}
        </button>`).join("")}</div>`:""}
      ${e.customerName&&!e.isProspect?`<div class="selected-item"><span class="mono">${G(e.customerCode)}</span> <strong>${G(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${G(e.customerAddress)}</span>`:""}</div>`:""}

      <div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--border);">
        <p style="font-size:12px;color:var(--text-secondary);margin-bottom:6px;font-weight:600;">見込み顧客から選択</p>
        <div style="display:flex;gap:6px;align-items:center;">
          <input type="text" id="q-prospect-search" placeholder="見込み顧客名で検索…" style="flex:1;" />
          <button type="button" class="button secondary small" data-action="new-prospect-from-quote">＋ 新規登録</button>
        </div>
        <div id="q-prospect-results"></div>
        ${e.customerName&&e.isProspect?`<div class="selected-item" style="border-left:3px solid #48bb78;"><span style="font-size:11px;background:#48bb78;color:white;border-radius:3px;padding:1px 5px;margin-right:6px;">見込</span> <strong>${G(e.customerName)}</strong>${e.customerAddress?`<br/><span style="color:var(--text-secondary);font-size:13px;">${G(e.customerAddress)}</span>`:""}</div>`:""}
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
        <input type="text" id="q-prod-search" value="${G(r)}" placeholder="商品名またはコードで検索して追加" />
      </div>
      ${x.length>0?`<div class="search-results">${x.map(A=>{const T=l?Ua(A,l):{price:A.salePrice||0,label:"卸価格"},P=A.listPrice||0,s=T.label!=="標準価格"&&T.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${A.code}" data-prod-name="${G(A.name)}" data-prod-price="${T.price}" data-prod-retail="${P}" data-prod-jan="${G(A.janCode??"")}" data-prod-unit="${G(A.unit??"本")}" data-prod-case="${A.caseQty??""}">
          <span class="mono">${A.code}</span> ${G(A.name)}
          <span class="numeric" ${s?'style="color:#2f855a;font-weight:700;"':""}>納入 ${T.price?Ae(T.price):"未設定"} <small>(${T.label})</small>${P?`　定価 ${Ae(P)}`:""}</span>
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
          <tbody>${C}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="quote-summary">
        <div class="form-row">
          <label>備考</label>
          <textarea id="q-remarks" rows="3">${G(e.remarks)}</textarea>
        </div>
        <div class="quote-totals">
          <div><span>小計</span><span class="numeric">${Ae(p)}</span></div>
          <div><span>消費税(${e.taxRate}%)</span><span class="numeric">${Ae(u)}</span></div>
          <div class="total-row"><span>合計</span><span class="numeric">${Ae(y)}</span></div>
        </div>
      </div>
    </section>
  `}async function Gl(e,t){const n=t.accentColor||"#0968e5",o=document.createElement("div");o.style.cssText="position:fixed;left:-9999px;top:0;width:794px;background:#fff;z-index:-1;padding:76px 68px 60px;box-sizing:border-box;",o.innerHTML=`<style>${Ql(n)}</style>${Fs(e,t)}`,document.body.appendChild(o);try{const[{default:r},{jsPDF:l}]=await Promise.all([q(()=>import("./html2canvas.esm-DXEQVQnt.js"),[]),q(()=>import("./jspdf.es.min-D9GvOdLn.js").then(A=>A.j),[])]),d=await r(o,{scale:2,useCORS:!0,backgroundColor:"#ffffff",logging:!1,windowWidth:794}),p=210,u=297,y=d.width/p,v=u*y,g=new l({orientation:"portrait",unit:"mm",format:"a4"});let x=0,C=0;for(;x<d.height;){C>0&&g.addPage();const A=Math.min(v,d.height-x),T=document.createElement("canvas");T.width=d.width,T.height=Math.ceil(A);const P=T.getContext("2d");P.fillStyle="#ffffff",P.fillRect(0,0,T.width,T.height),P.drawImage(d,0,x,d.width,A,0,0,d.width,A);const s=T.toDataURL("image/jpeg",.95),i=A/y;g.addImage(s,"JPEG",0,0,p,i),x+=v,C++}g.save(`見積書_${e.quoteNo||"作成中"}.pdf`)}finally{document.body.removeChild(o)}}function It(e){const t=n=>document.getElementById(n)?.value??"";e.quoteNo=t("q-no"),e.quoteDate=t("q-date"),e.validUntil=t("q-valid"),e.subject=t("q-subject"),e.paymentTerms=t("q-payment-terms"),e.deliveryDate=t("q-delivery-date"),e.deliveryPlace=t("q-delivery-place"),e.remarks=document.getElementById("q-remarks")?.value??""}function Us(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ys(e){return`<span style="display:inline-block;width:24px;height:24px;border-radius:50%;background:${{A:"#2f855a",B:"#2b6cb0",C:"#b7791f"}[e]||"#9aa5b1"};color:white;text-align:center;line-height:24px;font-weight:700;font-size:12px;">${e}</span>`}function Js(e){return e==null?'<span style="color:#9aa5b1;">―</span>':`<span style="color:${e>=0?"#2f855a":"#c53d3d"};font-weight:700;">${e>=0?"+":""}${e.toFixed(1)}%</span>`}function Xl(e,t){return!t||e===t?"":e<t?`<span style="color:#2f855a;font-size:11px;">&#x2191;${t}&#x2192;${e}</span>`:`<span style="color:#c53d3d;font-size:11px;">&#x2193;${t}&#x2192;${e}</span>`}function Zl(e,t,n,o,r){const l=new Map,d=new Map;for(const v of e){if(v.date>=t&&v.date<=n){const g=l.get(v.productCode);g?(g.amt+=v.amount,g.qty+=v.qty):l.set(v.productCode,{name:v.productName,vol:v.volumeMl,amt:v.amount,qty:v.qty})}v.date>=o&&v.date<=r&&d.set(v.productCode,(d.get(v.productCode)??0)+v.amount)}const p=[...l.entries()].map(([v,g])=>({code:v,...g})).sort((v,g)=>g.amt-v.amt),u=p.reduce((v,g)=>v+g.amt,0);let y=0;return p.map(v=>{y+=v.amt;const g=u>0?Math.round(v.amt*1e4/u)/100:0,x=y<=u*.7?"A":y<=u*.9?"B":"C",C=d.get(v.code)??0,A=C>0?Math.round((v.amt-C)/C*1e3)/10:null;return{code:v.code,name:v.name,volumeMl:v.vol,amount:v.amt,qty:v.qty,sharePct:g,rank:x,prevAmount:C,growthRate:A}})}function ec(e,t,n){const o=new Date,r=o.toISOString().slice(0,10);let l=r,d=r,p="";switch(e){case"week":{const v=new Date(o);v.setDate(v.getDate()-7),l=v.toISOString().slice(0,10),d=r,p="直近7日間";break}case"month":{l=r.slice(0,7)+"-01",d=r,p="当月";break}case"90days":{const v=new Date(o);v.setDate(v.getDate()-90),l=v.toISOString().slice(0,10),d=r,p="直近90日間";break}case"year":{const v=new Date(o);v.setFullYear(v.getFullYear()-1),l=v.toISOString().slice(0,10),d=r,p="直近1年間";break}case"custom":{l=t||r,d=n||r,p=`${l} 〜 ${d}`;break}}const u=new Date(l);u.setFullYear(u.getFullYear()-1);const y=new Date(d);return y.setFullYear(y.getFullYear()-1),{start:l,end:d,prevStart:u.toISOString().slice(0,10),prevEnd:y.toISOString().slice(0,10),label:p}}function tc(e,t="all",n=[],o="year",r,l,d=[]){const p=ec(o,r,l),u=n.length>0?Zl(n,p.start,p.end,p.prevStart,p.prevEnd):e.map(i=>({code:i.code,name:i.name,volumeMl:i.volumeMl,amount:i.yearAmount,qty:i.yearQty,sharePct:i.sharePct,rank:i.rank,prevAmount:i.prevAmount,growthRate:i.growthRate})),y=u.filter(i=>i.rank==="A").length,v=u.filter(i=>i.rank==="B").length,g=u.filter(i=>i.rank==="C").length,x=u.filter(i=>i.growthRate!=null&&i.growthRate>10),C=u.filter(i=>i.growthRate!=null&&i.growthRate<-10);let A=u,T="全商品";switch(t){case"A":A=u.filter(i=>i.rank==="A"),T="Aランク";break;case"B":A=u.filter(i=>i.rank==="B"),T="Bランク";break;case"C":A=u.filter(i=>i.rank==="C"),T="Cランク";break;case"growing":A=x,T="成長商品(+10%以上)";break;case"declining":A=C,T="衰退商品(-10%以下)";break}const P=(i,c,m)=>`<button class="button ${t===i?"primary":"secondary"} small" data-product-filter="${i}">${c} (${m})</button>`,s=(i,c)=>`<button class="button ${o===i?"primary":"secondary"} small" data-product-period="${i}">${c}</button>`;return`
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
        <input type="date" id="pp-range-start" class="range-input" value="${r||""}" />
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
        <p class="kpi-value">${C.length}</p>
        <p class="kpi-sub">前年同期比-10%以下</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${T} (${A.length}件)</h2>
      </div>
      <div class="button-group" style="margin-bottom:12px;">
        ${P("all","全て",u.length)}
        ${P("A","A",y)}
        ${P("B","B",v)}
        ${P("C","C",g)}
        ${P("growing","成長",x.length)}
        ${P("declining","衰退",C.length)}
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${ee("rank","ABC",d)}
              ${ee("name","商品名",d)}
              ${ee("amount","売上",d,"numeric")}
              ${ee("sharePct","構成比",d,"numeric")}
              ${ee("qty","本数",d,"numeric")}
              ${ee("growthRate","前年同期比",d,"numeric")}
            </tr>
          </thead>
          <tbody>
            ${it(A,d,{rank:"rank",name:"name",amount:"amount",sharePct:"sharePct",qty:"qty",growthRate:"growthRate"}).slice(0,100).map(i=>`
              <tr>
                <td>${Ys(i.rank)}</td>
                <td>${i.name?i.name.slice(0,25):i.code}${i.volumeMl?` <small>${i.volumeMl}ml</small>`:""}</td>
                <td class="numeric">${Us(i.amount)}</td>
                <td class="numeric">${i.sharePct}%</td>
                <td class="numeric">${i.qty.toLocaleString()}</td>
                <td class="numeric">${Js(i.growthRate)}</td>
              </tr>
            `).join("")}
            ${A.length===0?'<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text-secondary);">該当なし</td></tr>':""}
          </tbody>
        </table>
      </div>
    </section>
  `}function ac(e,t=[],n=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,o="billing"){const r=e.filter(x=>x.currentRank==="A").length,l=e.filter(x=>x.prevRank&&x.currentRank<x.prevRank).length,d=e.filter(x=>x.prevRank&&x.currentRank>x.prevRank).length,p=new Date().getMonth()>=3?new Date().getFullYear():new Date().getFullYear()-1,u=2011,y=[];for(let x=p;x>=u&&y.length<6;x--)y.push(x);const v=`
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
        ${Array.from({length:p-u+1},(x,C)=>p-C).filter(x=>!y.includes(x)).map(x=>`<option value="${x}" ${x===n?"selected":""}>${x}年度</option>`).join("")}
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
        <p class="kpi-value">${r} ${o==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #2b6cb0;">
        <p class="panel-title">ランクアップ</p>
        <p class="kpi-value">${l} ${o==="billing"?"社":"店舗"}</p>
      </article>
      <article class="panel kpi-card" style="border-left:4px solid #c53d3d;">
        <p class="panel-title">ランクダウン</p>
        <p class="kpi-value">${d} ${o==="billing"?"社":"店舗"}</p>
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
            ${it(e,t,{currentRank:"currentRank",name:"name",yearAmount:"yearAmount",sharePct:"sharePct",orderDays:"orderDays",growthRate:"growthRate"}).map(x=>`
              <tr>
                <td>${Ys(x.currentRank)}</td>
                <td>${x.name||x.code}</td>
                <td class="numeric">${Us(x.yearAmount)}</td>
                <td class="numeric">${x.sharePct}%</td>
                <td class="numeric">${x.orderDays}日</td>
                <td class="numeric">${Js(x.growthRate)}</td>
                <td>${Xl(x.currentRank,x.prevRank)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function nc(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Yt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function sc(e,t,n=null,o=null){const r=e.length?e.map(l=>`
            <tr class="clickable-row${l.documentNo===n?" selected-row":""}"
                data-doc-no="${l.documentNo}">
              <td class="mono">${l.documentNo}</td>
              <td>${nc(l.date)}</td>
              <td>
                <div class="table-title">${l.customerName}</div>
                <div class="table-sub mono">${l.customerCode}</div>
              </td>
              <td class="numeric">${l.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Yt(l.amount)}</td>
            </tr>
            ${l.documentNo===n?oc(o):""}
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
  `}function oc(e){if(!e)return`<tr class="line-detail-row"><td colspan="5">
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
            <td class="numeric">${Yt(n)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </td></tr>`}function rc(e){return new Date(e.getFullYear(),e.getMonth(),1)}function ic(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function Ks(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function Hs(e){const t=new Date(e),n=t.getDay();return t.setDate(t.getDate()-n),t.setHours(0,0,0,0),t}function vn(e){const t=Ks(Hs(e),6);return t.setHours(23,59,59,999),t}function bn(e){return new Date(`${e}T00:00:00`)}function wn(e){return`${e.getMonth()+1}/${e.getDate()}`}function lc(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function cc(){const e=new Date,t=Hs(ic(rc(e),-3)),n=vn(new Date(e.getFullYear(),e.getMonth()+4,0)),o=[];let r=new Date(t);for(;r<=n;){const l=vn(r);o.push({start:new Date(r),end:l,label:`${wn(r)} - ${wn(l)}`}),r=Ks(r,7)}return o}function dc(e){const t=cc(),n=`160px repeat(${t.length}, minmax(56px, 1fr))`,o=t.map(l=>`
        <div class="gantt-week">
          <span>${l.label}</span>
        </div>
      `).join(""),r=e.length?e.map(l=>{const d=bn(l.startDate),p=bn(l.expectedDoneDate),u=Math.max(0,t.findIndex(g=>g.end>=d)),y=Math.max(u,t.reduce((g,x,C)=>x.start<=p?C:g,u)),v=[`仕込番号: ${l.jikomiNo}`,`銘柄: ${l.productName}`,`期間: ${l.startDate} - ${l.expectedDoneDate}`,`タンク: ${l.tankNo}`,`備考: ${l.note||"なし"}`].join(`
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
                  title="${lc(v)}"
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
  `}function xn(e,t){const n={planned:"neutral",active:"warning",done:"success"},o=e.map(p=>`
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
          <span class="status-pill ${n[p.status]}">${us[p.status]}</span>
        </td>
        <td>${p.note||"―"}</td>
      </tr>
    `).join(""),r=e.filter(p=>p.status==="active").length,l=e.filter(p=>p.status==="done").length,d=e.filter(p=>p.status==="planned").length;return`
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
          <tbody>${o||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function pc(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},o=e.map(u=>`
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
    `).join(""),r=e.filter(u=>u.status==="approved").length,l=e.filter(u=>u.status==="submitted").length,d=e.filter(u=>u.status==="pending").length;return`
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
          <tbody>${o||'<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function uc(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function mc(e,t){return`
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
        ${e?`<p class="field-error">${uc(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function yc(e){return`
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
  `}function hc(e){return`
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
  `}const Xa={query:"",businessType:"",tradeType:"",areaCode:"",activeOnly:"",page:1},$t=50;function gc(e,t){let n=e;if(t.query){const p=t.query.toLowerCase();n=n.filter(u=>u.code.toLowerCase().includes(p)||u.name.toLowerCase().includes(p)||u.kanaName&&u.kanaName.toLowerCase().includes(p)||u.address1&&u.address1.toLowerCase().includes(p)||u.phone&&u.phone.toLowerCase().includes(p))}t.businessType&&(n=n.filter(p=>p.businessType===t.businessType)),t.tradeType&&(n=n.filter(p=>p.tradeType===t.tradeType)),t.areaCode&&(n=n.filter(p=>p.areaCode===t.areaCode)),t.activeOnly==="active"?n=n.filter(p=>p.isActive):t.activeOnly==="inactive"&&(n=n.filter(p=>!p.isActive));const o=Math.max(1,Math.ceil(n.length/$t)),l=(Math.min(t.page,o)-1)*$t,d=n.slice(l,l+$t);return{filtered:n,paged:d,totalPages:o}}function $n(e,t,n){if(n<=1)return`<div class="master-pagination"><span>${e}件</span></div>`;const o=(t-1)*$t+1,r=Math.min(t*$t,e),l=[];for(let d=1;d<=n;d++)d===1||d===n||d>=t-2&&d<=t+2?l.push(`<button class="button ${d===t?"primary":"secondary"}" type="button" data-action="master-page" data-page="${d}" style="min-width:36px;padding:4px 8px;">${d}</button>`):(d===t-3||d===t+3)&&l.push('<span style="padding:0 4px;color:var(--text-secondary);">…</span>');return`
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;gap:12px;flex-wrap:wrap;">
      <span>${e.toLocaleString("ja-JP")}件中 ${o}-${r} を表示</span>
      <div style="display:flex;align-items:center;gap:4px;">
        <button class="button secondary" type="button" data-action="master-page" data-page="${t-1}" ${t<=1?"disabled":""} style="padding:4px 10px;">←</button>
        ${l.join("")}
        <button class="button secondary" type="button" data-action="master-page" data-page="${t+1}" ${t>=n?"disabled":""} style="padding:4px 10px;">→</button>
      </div>
    </div>
  `}function fc(e,t){const n=[...new Set(e.map(r=>r.businessType).filter(Boolean))].sort(),o=[...new Set(e.map(r=>r.areaCode).filter(Boolean))].sort();return`
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
          ${Object.entries(bc).map(([r,l])=>`<option value="${r}" ${t.tradeType===r?"selected":""}>${l}</option>`).join("")}
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
  `}function Pa(e,t){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function vc(e){switch(e){case"000":return"生産者";case"001":return"小売";case"002":return"卸";default:return e||"―"}}const bc={B2B:"B2B（卸）",B2B2C:"B2B2C（生産者）",B2C:"B2C（小売）"};function wc(e){return e?`<span style="display:inline-block;padding:1px 6px;border-radius:10px;font-size:11px;font-weight:700;color:#fff;background:${{B2B:"#3b82f6",B2B2C:"#8b5cf6",B2C:"#10b981"}[e]??"#999"};">${e}</span>`:"―"}function xc(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td>${t.kanaName||""}</td>
          <td>${t.shortName||""}</td>
          <td>${t.businessType||""}</td>
          <td>${t.salesCategory||""}</td>
          <td>${wc(t.tradeType)}</td>
          <td>${vc(t.priceType)}</td>
          <td>${t.priceGroup||""}</td>
          <td>${t.phone||""}</td>
          <td>${t.fax||""}</td>
          <td>${t.postalCode||""}</td>
          <td title="${t.address1||""}">${Pa(t.address1||"",16)}</td>
          <td>${Pa(t.address2||"",12)}</td>
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
      `).join("")}function Tt(e){return e?`¥${e.toLocaleString("ja-JP")}`:"―"}function $c(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${Pa(t.name,20)}</td>
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
      `).join("")}function _c(e,t,n=Xa,o=[]){const{filtered:r,paged:l,totalPages:d}=gc(e.customers,n);return`
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
        ${fc(e.customers,n)}
        ${$n(r.length,n.page,d)}
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
            <tbody>${xc(it(l,o,{code:"code",name:"name",kanaName:"kanaName",businessType:"businessType",areaName:"areaName",closingDay:"closingDay",paymentDay:"paymentDay"}))}</tbody>
          </table>
        </div>
        ${$n(r.length,n.page,d)}
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
            <tbody>${$c(it(e.products,o,{code:"code",name:"name",category:"category",alcoholDegree:"alcoholDegree",volumeMl:"volumeMl",purchasePrice:"purchasePrice",salePrice:"salePrice",listPrice:"listPrice"}))}</tbody>
          </table>
        </div>
      `}
    </section>
  `}function la(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Sc(e,t){if(!e&&!t)return"";const n=e;return`
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
                ${As.map(o=>`<option ${n?.materialType===o?"selected":""}>${o}</option>`).join("")}
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
  `}function kc(e){const t=e.map(r=>{const d=(r.minimumStock>0?r.currentStock/r.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${d?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${d?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${la(r.unitCost)}</td>
          <td class="numeric">${la(r.currentStock*r.unitCost)}</td>
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
        <p class="kpi-value">${la(o)}</p>
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
  `}function Pc(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function ca(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const Ec={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Ac(e){return`
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
          <td class="numeric">${ca(n.billedAmount)}</td>
          <td class="numeric">${ca(n.paymentAmount)}</td>
          <td class="numeric">${ca(n.balanceAmount)}</td>
          <td>${Pc(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${Ec[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function at(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function _n(e){return e.trim().toLowerCase()}function Lc(e,t){const n=_n(t),o=e.filter(l=>n?[l.code,l.name,l.janCode].map(_n).some(d=>d.includes(n)):!0),r=o.length?`
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
      `:"";return Ns({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:r,emptyMessage:"該当する商品が見つかりません。"})}function Je(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Cc(e,t){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},o={pending:"warning",confirmed:"neutral",paid:"success"},r={unpaid:"未払い",partial:"一部支払",paid:"支払済"},l={unpaid:"warning",partial:"neutral",paid:"success"},d=e.map(g=>`
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
    `).join(""),p=t.map(g=>`
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
    `).join(""),u=e.reduce((g,x)=>g+x.amount,0),y=t.reduce((g,x)=>g+x.balance,0),v=t.filter(g=>g.status!=="paid").length;return`
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
  `}function yt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Dc(e,t){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},o={holding:"neutral",due:"warning",cleared:"success"},r=e.map(v=>`
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
    `).join(""),l=t.map(v=>{const g=v.minimumStock>0&&v.currentStock<v.minimumStock*1.2;return`
        <tr>
          <td class="mono">${v.code}</td>
          <td>${v.name}</td>
          <td class="numeric ${g?"text-danger":""}">
            ${v.currentStock.toLocaleString("ja-JP")} ${v.unit}
            ${g?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${v.minimumStock.toLocaleString("ja-JP")} ${v.unit}</td>
          <td class="numeric">${yt(v.unitCost)}</td>
          <td class="numeric">${yt(v.currentStock*v.unitCost)}</td>
          <td>${v.lastPurchaseDate}</td>
        </tr>
      `}).join(""),d=e.filter(v=>v.status==="holding"),p=d.reduce((v,g)=>v+g.amount,0),u=t.reduce((v,g)=>v+g.currentStock*g.unitCost,0),y=t.filter(v=>v.minimumStock>0&&v.currentStock<v.minimumStock*1.2).length;return`
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
        <p class="kpi-sub">${d.length} 枚保有中</p>
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
  `}function Ea(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function xe(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Aa(e){return`
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
  `}function qc(e){return`
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
      ${qc(e)}
    </div>
  `}function nt(e){return`
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
      ${e.code?Aa(e.code):""}
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
  `}function Rt(e){if(!e)return"error";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"success":n<24?"warning":"error"}function Sn(e){if(!e)return"未同期";const n=(Date.now()-new Date(e).getTime())/(1e3*60*60);return n<1?"正常":n<24?"注意":"要確認"}function Ic(e){return`
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
        <p class="kpi-value">${e.lastOverallSync?Ea(e.lastOverallSync):"---"}</p>
        <p class="kpi-sub">全テーブル最新</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">データ鮮度</p>
        <p class="kpi-value">
          <span class="status-pill ${Rt(e.lastOverallSync)}">${Sn(e.lastOverallSync)}</span>
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
              <td>${t.lastSyncAt?Ea(t.lastSyncAt):"---"}</td>
              <td><span class="status-pill ${Rt(t.lastSyncAt)}">${Sn(t.lastSyncAt)}</span></td>
            </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Tc(e){if(!e.length)return"";const t=r=>r==="ok"?"&#x2705;":r==="warn"?"&#x26A0;&#xFE0F;":"&#x274C;",n=r=>r==="ok"?"success":r==="warn"?"warning":"error",o=e.every(r=>r.status==="ok");return`
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
  `}function Mc(e,t,n,o,r){const l={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    ${r?Tc(r):""}

    ${o?Ic(o):""}

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${Ea(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${l[e.status]}</span>
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
          ${Aa(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${Aa(`{
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
  `}function bt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Nc(e){switch(e){case"A":return"success";case"B":return"warning";case"C":return"neutral"}}function Rc(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=e.slice(0,15),n=Math.max(...t.map(g=>g.amount),1),o=28,r=6,l=140,d=100,p=760,u=p-l-d,y=t.length*(o+r)+16,v=t.map((g,x)=>{const C=g.amount/n*u,A=x*(o+r)+8,T=g.abcRank==="A"?"#2F855A":g.abcRank==="B"?"#B7791F":"#718096";return`
        <g>
          <text x="${l-8}" y="${A+o/2+5}" class="chart-axis" text-anchor="end">${g.name.length>10?g.name.slice(0,10)+"…":g.name}</text>
          <rect x="${l}" y="${A}" width="${C}" height="${o}" rx="4" fill="${T}" opacity="0.85" />
          <text x="${l+C+8}" y="${A+o/2+5}" class="chart-axis">${(g.amount/1e4).toFixed(0)}万円</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${p} ${y}" class="sales-chart ranking-chart" role="img" aria-label="得意先別売上ランキング">
      ${v}
    </svg>
  `}function Oc(e){if(e.monthlyByCustomer.length===0)return'<p class="empty-row">データなし</p>';const t=e.months.map(o=>`<th class="numeric">${o}</th>`).join(""),n=e.monthlyByCustomer.map(o=>{const r=o.values.reduce((d,p)=>d+p,0),l=o.values.map(d=>`<td class="numeric">${d>0?(d/1e4).toFixed(0)+"万":"—"}</td>`).join("");return`
        <tr>
          <td>${o.label}</td>
          ${l}
          <td class="numeric"><strong>${bt(r)}</strong></td>
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
  `}function Bc(e){e.ranking.reduce((u,y)=>u+y.amount,0);const t=e.ranking.filter(u=>u.abcRank==="A").length,n=e.ranking.filter(u=>u.abcRank==="B").length,o=e.ranking.filter(u=>u.abcRank==="C").length,r=e.ranking.filter(u=>u.abcRank==="A").reduce((u,y)=>u+y.amount,0),l=e.ranking.filter(u=>u.abcRank==="B").reduce((u,y)=>u+y.amount,0),d=e.ranking.filter(u=>u.abcRank==="C").reduce((u,y)=>u+y.amount,0),p=e.ranking.map(u=>`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric">${bt(u.amount)}</td>
          <td class="numeric">${u.ratio.toFixed(1)}%</td>
          <td class="numeric">${u.cumRatio.toFixed(1)}%</td>
          <td class="numeric">${u.documents.toLocaleString("ja-JP")}</td>
          <td><span class="status-pill ${Nc(u.abcRank)}">${u.abcRank}</span></td>
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
        <div class="kpi-value kpi-success">${t}社 <span class="kpi-sub">${bt(r)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Bランク</div>
        <div class="kpi-value kpi-warning">${n}社 <span class="kpi-sub">${bt(l)}</span></div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Cランク</div>
        <div class="kpi-value">${o}社 <span class="kpi-sub">${bt(d)}</span></div>
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
        ${Rc(e.ranking)}
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
      ${Oc(e)}
    </section>
  `}const jc={code:"code",name:"name",amount:"amount",quantity:"quantity",documents:"documents",volumeMl:"volumeMl"},kn={amount:"売上額",quantity:"出荷本数",volume:"移出量"},La=10;function Za(e){const[t,n]=e.split("-").map(Number);return n>=La?t:t-1}function zc(e){const t=La-1,n=new Date(e+1,t,0).getDate();return{from:`${e}-${String(La).padStart(2,"0")}-01`,to:`${e+1}-${String(t).padStart(2,"0")}-${String(n).padStart(2,"0")}`}}function Fc(e,t,n){const o=d=>t==="quantity"?d.quantity:t==="volume"?d.volumeMl:d.amount,r=new Map;for(const d of e){const p=n==="fiscal"?`${Za(d.month)}年度`:d.month.slice(0,4);r.set(p,(r.get(p)??0)+o(d))}return{curr:[...r.entries()].sort((d,p)=>d[0].localeCompare(p[0])).map(([d,p])=>({month:d,amount:p}))}}function Vc(e){const t=new Set;for(const n of e)t.add(Za(n.month));return[...t].sort((n,o)=>o-n).map(String)}function lt(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Uc(e){return e.replace("-","/")}const Pn={all:"全期間",yearly:"年次",monthly:"月次",weekly:"週次",daily:"日次"};function Yc(e,t="#0F5B8D",n=[],o="amount"){if(e.length===0)return'<div class="chart-empty">データなし</div>';const r=n.length>0&&n.some(i=>i.amount>0),l=760,d=280,p={top:16,right:24,bottom:36,left:o==="amount"?64:56},u=l-p.left-p.right,y=d-p.top-p.bottom,v=[...e.map(i=>i.amount),...n.map(i=>i.amount)],g=Math.max(...v,1),x=u/e.length;function C(i){if(o==="quantity")return i>=1e4?`${(i/1e4).toFixed(1)}万本`:`${Math.round(i).toLocaleString()}本`;if(o==="volume"){const c=i/1e3;return c>=1e4?`${(c/1e3).toFixed(0)}kL`:`${Math.round(c).toLocaleString()} L`}return`${Math.round(i/1e4).toLocaleString("ja-JP")}万円`}function A(i){return o==="quantity"?`${i.toLocaleString()}本`:o==="volume"?na(i):lt(i)}const T=[0,.25,.5,.75,1].map(i=>{const c=p.top+y-y*i,m=C(g*i);return`<g>
        <line x1="${p.left}" y1="${c}" x2="${l-p.right}" y2="${c}" class="chart-grid" />
        <text x="4" y="${c+4}" class="chart-axis">${m}</text>
      </g>`}).join(""),P=e.map((i,c)=>{const m=r?Math.max((x-18)/2,10):Math.max(x-18,24),h=r?2:0,b=p.left+c*x+(x-(r?m*2+h:m))/2,w=i.amount/g*y,$=p.top+y-w,_=n[c]?.amount??0,k=_/g*y,E=p.top+y-k,L=r?`<rect x="${b}" y="${E}" width="${m}" height="${k}" rx="4" fill="#ccc" opacity="0.6"><title>前年 ${A(_)}</title></rect>`:"",I=r?b+m+h:b;return`<g>
      ${L}
      <rect x="${I}" y="${$}" width="${m}" height="${w}" rx="4" fill="${t}" opacity="${.6+c/e.length*.35}"><title>${A(i.amount)}</title></rect>
      <text x="${p.left+c*x+x/2}" y="${d-8}" class="chart-axis centered-axis">${Uc(i.month)}</text>
    </g>`}).join(""),s=r?`
    <g transform="translate(${l-160}, 8)">
      <rect width="10" height="10" fill="#ccc" rx="2" opacity="0.6" />
      <text x="14" y="9" class="chart-axis" style="font-size:9px;">前年</text>
      <rect x="48" width="10" height="10" fill="${t}" rx="2" />
      <text x="62" y="9" class="chart-axis" style="font-size:9px;">当年</text>
    </g>`:"";return`
    <svg viewBox="0 0 ${l} ${d}" class="sales-chart" role="img" aria-label="売上分析チャート">
      ${T}${P}${s}
    </svg>
  `}function na(e){return e>=1e3?`${(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})} L`:`${e.toLocaleString("ja-JP")} ml`}function Jc(e,t=!1){const n=t?7:6;return e.length===0?`<tr><td colspan="${n}" class="empty-row">データなし</td></tr>`:e.map(o=>`
    <tr>
      <td class="mono">${o.code}</td>
      <td>${o.name}</td>
      <td class="numeric">${lt(o.amount)}</td>
      <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${na(o.volumeMl)}</td>
      <td class="numeric">${o.documents.toLocaleString("ja-JP")}</td>
      ${t?`<td><button class="button secondary small" data-analytics-drilldown="${o.code}" data-drilldown-name="${o.name}">詳細</button></td>`:""}
    </tr>
  `).join("")}function Kc(e){return e.length===0?'<tr><td colspan="7" class="empty-row">データなし</td></tr>':e.map(t=>`
    <tr>
      <td class="mono">${t.code||"―"}</td>
      <td>${t.name||"不明"}</td>
      <td class="mono">${t.tag||"―"}</td>
      <td class="numeric">${lt(t.amount)}</td>
      <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
      <td class="numeric">${na(t.volumeMl)}</td>
      <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
    </tr>
  `).join("")}function En(e,t,n){const o=t?e.filter(l=>l.tag.includes(t)||l.name.includes(t)):e,r=o.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':o.map(l=>`
        <tr>
          <td class="mono">${l.code||"―"}</td>
          <td>${l.name||"未設定"}</td>
          <td class="mono">${l.tag||"―"}</td>
          <td class="numeric">${lt(l.amount)}</td>
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
  `}function Qs(e,t,n="all",o="",r=[],l=[],d="",p="",u=null,y="all",v="",g=[],x=[],C=[],A=null,T=[],P=[],s="amount",i="calendar"){const c=t==="products"?"商品別集計":t==="customers"?"得意先別集計":"担当別集計",m=t==="products"?e.productTotals:t==="customers"?e.customerTotals:e.staffTotals,b=n!=="all"&&r.length>0&&t!=="staff"?r:m,w=it(b,C,jc),$={all:"月別",yearly:"月別推移",monthly:"日別推移",weekly:"日別推移",daily:"当日"},_=kn[s],k=K=>s==="quantity"?K.quantity:s==="volume"?K.volumeMl:K.amount,E=K=>s==="quantity"?`${K.toLocaleString()}本`:s==="volume"?na(K):lt(K);let L,I=[],M,O,N;if(A&&A.monthlySales.length>0)L=A.monthlySales.slice(-24).map(K=>({month:K.month,amount:k(K)})),M=`${A.name} の月別${_}`,O=`${A.tab==="customers"?"得意先":"商品"}: ${A.code}`,N="#0968e5";else if(T.length>0&&n!=="all"){L=T.map(Y=>({month:Y.month,amount:k(Y)})),I=P.map(Y=>({month:Y.month,amount:k(Y)}));const K=L.reduce((Y,Q)=>Y+Q.amount,0),le=I.reduce((Y,Q)=>Y+Q.amount,0),re=le>0?(K-le)/le*100:0,ce=re>0?"+":"";M=`${$[n]} ${_}（${o}）`,O=`${E(K)}${le>0?` / 前年比 ${ce}${re.toFixed(1)}%`:""}`,N="#2f855a"}else{L=Fc(e.monthlySales,s,i).curr,I=[];const le=L.reduce((ce,Y)=>ce+Y.amount,0);M=`${i==="fiscal"?"決算年度別":"暦年別"}${_}`,O=`累計 ${E(le)}（${L.length}${i==="fiscal"?"期":"年"}）`,N="#0F5B8D"}const j=["amount","quantity","volume"].map(K=>`<button class="tab-button ${K===s?"active":""}" data-chart-metric="${K}">${kn[K]}</button>`).join(""),V=["all","yearly","monthly","weekly","daily"].map(K=>`<button class="button ${K===n?"primary":"secondary"} small" type="button" data-analytics-period="${K}">${Pn[K]}</button>`).join(""),z=i==="fiscal"&&n==="yearly"?Vc(e.monthlySales):l,U=i==="fiscal"&&n==="yearly"&&!z.includes(o)?z[0]??"":o,H=n!=="all"&&z.length>0&&t!=="staff"?`<select id="analytics-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
        ${z.map(K=>`<option value="${K}" ${K===U?"selected":""}>${i==="fiscal"&&n==="yearly"?K+"年度":K}</option>`).join("")}
      </select>`:"";let W="",J="";if(t==="staff"){const K=["all","yearly","monthly","weekly","daily"].map(Q=>`<button class="button ${Q===y?"primary":"secondary"} small" type="button" data-staff-period="${Q}">${Pn[Q]}</button>`).join(""),le=y!=="all"&&g.length>0?`<select id="staff-period-select" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;">
          ${g.map(Q=>`<option value="${Q}" ${Q===v?"selected":""}>${Q}</option>`).join("")}
        </select>`:"",ce=(x.length>0?x:e.staffTotals).filter(Q=>!d||Q.name.includes(d)||Q.code.includes(d)),Y=y!=="all"&&v?` (${v})`:"";if(W=`
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
        <div class="button-group">${K}</div>
        ${le}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:center;">
        <input type="text" id="staff-filter-input" placeholder="担当名で絞込" value="${d}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
        ${Y?`<span style="font-size:12px;color:var(--text-secondary);">${Y}</span>`:""}
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
            ${ce.length===0?'<tr><td colspan="6" class="empty-row">データなし</td></tr>':ce.map(Q=>`
                <tr>
                  <td class="mono">${Q.code||"―"}</td>
                  <td>${Q.name||"未設定"}</td>
                  <td class="numeric">${lt(Q.amount)}</td>
                  <td class="numeric">${Q.quantity.toLocaleString("ja-JP")}</td>
                  <td class="numeric">${Q.documents.toLocaleString("ja-JP")}</td>
                  <td><button class="button secondary small" data-staff-drilldown="${Q.code}" data-staff-name="${Q.name}">詳細</button></td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,u){const Q=u.breakdownTab,X=y!=="all"&&v?`<span style="font-size:12px;color:var(--text-secondary);margin-left:8px;">${v}</span>`:"";J=`
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
              <button class="tab-button ${Q==="customers"?"active":""}" data-staff-breakdown-tab="customers">得意先別</button>
              <button class="tab-button ${Q==="products"?"active":""}" data-staff-breakdown-tab="products">商品別</button>
            </div>
            <input type="text" data-analytics-tag-filter placeholder="名称・タグで絞込" value="${p}" style="padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px;flex:1;min-width:120px;" />
          </div>

          ${Q==="customers"?En(u.customerRows,p,"得意先名"):En(u.productRows,p,"商品名")}
        </article>
      `}}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">売上分析</p>
        <h1>月別・商品別・得意先別分析</h1>
      </div>
      <div class="meta-stack">
        <div class="tab-group" style="font-size:12px;">
          <button class="tab-button ${i==="calendar"?"active":""}" data-fiscal-mode="calendar">暦年（1〜12月）</button>
          <button class="tab-button ${i==="fiscal"?"active":""}" data-fiscal-mode="fiscal">決算期（10〜9月）</button>
        </div>
      </div>
    </section>

    <section class="analytics-grid">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <h2>${M}</h2>
            <p class="panel-caption">${O}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <div class="tab-group">${j}</div>
            ${A?'<button class="button secondary small" data-action="close-analytics-drilldown">← 全体に戻す</button>':""}
        </div>
          </div>
        </div>
        <div class="chart-scroll">
          ${Yc(L,N,I,s)}
        </div>
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${c}</h2>
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
            <div class="button-group">${V}</div>
            ${H}
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  ${ee("code","コード",C,"mono")}
                  ${ee("name","名称",C)}
                  ${ee("amount","売上額",C,"numeric")}
                  ${ee("quantity","本数",C,"numeric")}
                  ${ee("volumeMl","移出量",C,"numeric")}
                  ${ee("documents","伝票数",C,"numeric")}
                  <th></th>
                </tr>
              </thead>
              <tbody>${Jc(w,!0)}</tbody>
            </table>
          </div>
        `:W}
      </article>
    </section>

    ${A?`
    <section class="analytics-grid" style="margin-top:0;">
      <article class="panel">
        <div class="panel-header" style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <h2>${A.name} の${A.tab==="customers"?"商品別":"得意先別"}内訳</h2>
            <p class="panel-caption">${A.tab==="customers"?"この得意先が購入した商品":"この商品を購入した得意先"}</p>
          </div>
          <button class="button secondary small" data-action="close-analytics-drilldown">閉じる</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>${A.tab==="customers"?"商品名":"得意先名"}</th>
                <th>タグ</th>
                <th class="numeric">売上額</th>
                <th class="numeric">本数</th>
                <th class="numeric">移出量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${Kc(A.breakdownRows)}</tbody>
          </table>
        </div>
      </article>
    </section>
    `:""}

    ${J}
  `}const An=Object.freeze(Object.defineProperty({__proto__:null,fiscalYearToDateRange:zc,monthToFiscalYear:Za,renderSalesAnalytics:Qs},Symbol.toStringTag,{value:"Module"}));function ht(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Hc(e){const t=Math.max(...e.salesByProduct.flatMap(l=>l.values),1),n=e.salesByProduct.map(l=>{const d=l.values.map((p,u)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(p/t*120)}px" title="${e.months[u]}: ${ht(p)}"></div>
            <span class="bar-label">${e.months[u].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${l.label}</p>
          <div class="bar-chart">${d}</div>
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
    `).join(""),r=e.salesByCustomer.map(l=>{const d=l.values.reduce((p,u)=>p+u,0);return`
        <tr>
          <td>${l.label}</td>
          ${l.values.map(p=>`<td class="numeric">${(p/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${ht(d)}</strong></td>
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
  `}function Qc(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Wc(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ln(e){return e.toISOString().slice(0,10)}function Gc(e,t,n){const o=e.length?e.map(r=>`
            <tr>
              <td class="mono">${r.documentNo}</td>
              <td>${Qc(r.date)}</td>
              <td>
                <div class="table-title">${r.customerName}</div>
                <div class="table-sub mono">${r.customerCode}</div>
              </td>
              <td class="numeric">${Wc(r.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||Ln(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||Ln(new Date)}" />
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
  `}function Ot(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Xc(e,t,n,o){const r={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},l={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},d={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},p=e.map(g=>`
      <tr>
        <td>${g.saleTime}</td>
        <td class="mono">${g.productCode}</td>
        <td>${g.productName}</td>
        <td class="numeric">${g.quantity}</td>
        <td class="numeric">${Ot(g.unitPrice)}</td>
        <td class="numeric"><strong>${Ot(g.amount)}</strong></td>
        <td>${r[g.paymentMethod]}</td>
      </tr>
    `).join(""),u=t.map(g=>`
      <tr>
        <td class="mono">${g.orderNo}</td>
        <td>${g.orderDate}</td>
        <td>${g.customerName}</td>
        <td>${g.postalCode} ${g.address}</td>
        <td>${g.items.map(x=>`${x.productName} ×${x.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Ot(g.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${d[g.status]}">${l[g.status]}</span>
        </td>
        <td>${g.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${g.id}">詳細</button>
        </td>
      </tr>
    `).join(""),y=e.reduce((g,x)=>g+x.amount,0),v=t.filter(g=>g.status==="new").length;return`
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
  `}const da={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Zc={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function ed(e,t,n,o){const r=Zc[e],l=Object.keys(da).map(p=>`
      <button class="tab-button ${e===p?"active":""}" data-import-entity="${p}">
        ${da[p]}
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
        <h2>${da[e]} のCSV形式</h2>
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

    ${d}

    ${o?`<section class="panel"><p class="sync-message">${o}</p></section>`:""}
  `}const ue={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function td(e,t,n){const o=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:ue.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:ue.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:ue.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:ue.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:ue.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:ue.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:ue.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:ue.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:ue.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:ue.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:ue.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:ue.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:ue.date}];e.lines.slice(0,6).forEach((d,p)=>{const u=33+p*8.5;o.push({id:`line${p}_name`,label:`明細${p+1} 品名`,x:5,y:u,fontSize:7.5,value:d.productName+(d.spec?` ${d.spec}`:""),color:ue.detail},{id:`line${p}_code`,label:`明細${p+1} CD`,x:64,y:u,fontSize:7.5,value:d.productCode,color:ue.detail},{id:`line${p}_qty`,label:`明細${p+1} 数量`,x:124,y:u,fontSize:8,value:d.quantity>0?String(d.quantity):"",color:ue.detail},{id:`line${p}_price`,label:`明細${p+1} 原単価`,x:163,y:u,fontSize:8,value:d.unitPrice>0?d.unitPrice.toLocaleString("ja-JP"):"",color:ue.detail},{id:`line${p}_amount`,label:`明細${p+1} 原価金額`,x:176,y:u,fontSize:8,value:d.amount>0?d.amount.toLocaleString("ja-JP"):"",color:ue.detail},{id:`line${p}_retail`,label:`明細${p+1} 売単価`,x:193,y:u,fontSize:8,value:d.retailPrice?d.retailPrice.toLocaleString("ja-JP"):"",color:ue.detail})});const r=e.lines.reduce((d,p)=>d+(p.amount||0),0),l=e.lines.reduce((d,p)=>d+p.quantity,0);return o.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(l),color:ue.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:r.toLocaleString("ja-JP"),color:ue.total}),n&&o.forEach(d=>{const p=n[d.id];p&&(d.x=p.x,d.y=p.y)}),o}function ad(e,t,n,o,r){const d=td(e,t,o).map(u=>`
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
  `}function pa(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(n=>{const o=n.dataset.fdId??"",r=parseFloat(n.style.left)||0,l=parseFloat(n.style.top)||0;t[o]={x:r,y:l}}),t}function nd(e,t,n){const o=[...new Set(e.map(x=>x.areaCode).filter(Boolean))].sort(),r=[...new Set(e.map(x=>x.businessTypeName||x.businessType).filter(Boolean))].sort(),l=e.filter(x=>x.isAtRisk),d=e.filter(x=>!x.isAtRisk&&x.isDormant),p=e.filter(x=>!x.isAtRisk&&!x.isDormant&&x.amount12m>0),u=e.filter(x=>!x.isAtRisk&&!x.isDormant&&x.amount12m===0),y=t.filter(x=>x.lat&&x.lng),v=JSON.stringify(e),g=JSON.stringify(y.map(x=>({name:x.name,address:x.address,lat:x.lat,lng:x.lng,phone:x.phone})));return`
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
        ${r.map(x=>`<option value="${x}" ${n.filterBiz===x?"selected":""}>${x}</option>`).join("")}
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
      const DELIVERIES    = ${g};

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
    <\/script>`}const sd={new:{label:"新規受注",color:"#2196F3",icon:"📥"},picking:{label:"ピッキング中",color:"#FF9800",icon:"🔍"},packed:{label:"梱包完了",color:"#4CAF50",icon:"📦"},shipped:{label:"発送済",color:"#9C27B0",icon:"🚚"},delivered:{label:"配達完了",color:"#4CAF50",icon:"✅"}},od=["new","picking","packed","shipped","delivered"];function rd(e){const t={new:[],picking:[],packed:[],shipped:[],delivered:[]};e.forEach(l=>t[l.stage].push(l));const n=od.map(l=>{const d=sd[l],p=t[l];return`
      <div class="wf-col" data-wf-stage="${l}">
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
    `}).join(""),o=e.reduce((l,d)=>l+d.totalAmount,0),r=e.filter(l=>l.priority==="urgent").length;return`
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
  `}function id(e,t,n){const o=e.cart.reduce((l,d)=>l+d.amount,0);return`
    <div class="mobile-order">
      <!-- 上部固定ヘッダー -->
      <header class="mo-header">
        <div class="mo-title">
          <p class="eyebrow">ラウンダー</p>
          <h1>モバイル受注</h1>
        </div>
        <div class="mo-cart-badge">
          🛒 ${e.cart.reduce((l,d)=>l+d.quantity,0)}<br/>
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

      ${ld(e,t,n)}
    </div>
  `}function ld(e,t,n){if(e.step==="customer"){const o=e.customerQuery.toLowerCase(),r=o?t.filter(l=>l.name.toLowerCase().includes(o)||l.code.toLowerCase().includes(o)):t.slice(0,20);return`
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
          ${r.slice(0,50).map(l=>{const d=e.cart.find(p=>p.productCode===l.code);return`
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
  `}const Cn={new:"新規",replied:"返信済",confirmed:"確定",completed:"来訪済",cancelled:"キャンセル"},Dn={new:"warning",replied:"neutral",confirmed:"success",completed:"success",cancelled:"neutral"},qn={ja:"🇯🇵 日本語",en:"🇬🇧 English",zh:"🇨🇳 中文",ko:"🇰🇷 한국어"};function cd(e,t){const n=e.find(l=>l.id===t)??e[0],o=e.filter(l=>l.status==="new").length,r=e.filter(l=>l.status==="confirmed").length;return`
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
                <span class="status-pill ${Dn[l.status]}">${Cn[l.status]}</span>
              </div>
              <div class="tour-item-sub">
                ${qn[l.language]} · 👥 ${l.partySize}名
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
            <span class="status-pill ${Dn[n.status]}">${Cn[n.status]}</span>
          </div>
          <dl class="summary-list">
            <div><dt>連絡先</dt><dd>${n.email}${n.phone?` / ${n.phone}`:""}</dd></div>
            <div><dt>希望日</dt><dd>${n.visitDate}</dd></div>
            <div><dt>人数</dt><dd>${n.partySize}名</dd></div>
            <div><dt>言語</dt><dd>${qn[n.language]}</dd></div>
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
  `}const dd=`{name}様

この度は金井酒造店の酒蔵見学にお申し込みいただき、誠にありがとうございます。
以下の通り、見学予約を確定させていただきました。

【予約内容】
日時: {confirmedTime}
人数: {partySize}名
所要時間: 約60分

当日は〇〇駅から送迎をご用意しております。
お気をつけてお越しください。

金井酒造店`,pd=`{name}様

この度は酒蔵見学のお申し込みをいただき、誠にありがとうございます。

誠に恐縮ですが、ご希望日は既に予約が埋まっております。
別日程での調整が可能でしたら、改めてご希望日をお知らせいただけますと幸いです。

金井酒造店`;function ud(e,t){const n=t?e.find(r=>r.id===t):null,o=t==="__new__";return`
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
  `}function md(e,t,n,o){const[r,l]=t.split("-").map(h=>parseInt(h,10)),d=new Date(r,l-1,1),p=new Date(r,l,0),u=d.getDay(),y=p.getDate(),v=[];for(let h=0;h<u;h++)v.push({isOutside:!0});for(let h=1;h<=y;h++)v.push({date:new Date(r,l-1,h)});for(;v.length%7!==0;)v.push({isOutside:!0});const g=n?e.filter(h=>h.category===n):e,x={};g.forEach(h=>{const b=h.startsAt.slice(0,10);x[b]??=[],x[b].push(h)});const C=new Date().toISOString().slice(0,10),A=v.map(h=>{if(h.isOutside)return'<div class="cal-cell cal-outside"></div>';const b=h.date,w=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}-${String(b.getDate()).padStart(2,"0")}`,$=x[w]??[],_=w===C,k=b.getDay();return`
        <div class="cal-cell ${_?"cal-today":""} ${k===0?"cal-sun":k===6?"cal-sat":""}"
             data-cal-date="${w}">
          <div class="cal-day-num">${b.getDate()}</div>
          <div class="cal-events">
            ${$.slice(0,3).map(E=>`
              <button class="cal-event" data-cal-event-id="${E.id}"
                      style="background:${E.color||Qa[E.category]||"#0F5B8D"};"
                      title="${E.title}">
                <span class="cal-event-time">${E.isAllDay?"終日":new Date(E.startsAt).toTimeString().slice(0,5)}</span>
                <span class="cal-event-title">${E.title}</span>
              </button>
            `).join("")}
            ${$.length>3?`<button class="cal-event-more" data-cal-date="${w}">+${$.length-3}件</button>`:""}
          </div>
        </div>
      `}).join(""),T=o?.isOpen?yd(o):"",P=new Date(r,l-2,1),s=new Date(r,l,1),i=`${P.getFullYear()}-${String(P.getMonth()+1).padStart(2,"0")}`,c=`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}`,m=(()=>{const h=new Date;return`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}`})();return`
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
          <button class="button secondary" data-action="cal-prev" data-ym="${i}">◀ 前月</button>
          <button class="button secondary" data-action="cal-today" data-ym="${m}">今日</button>
          <button class="button secondary" data-action="cal-next" data-ym="${c}">次月 ▶</button>
          <input type="month" id="cal-month-input" value="${t}" style="margin-left:8px;" />
        </div>
        <div class="cal-filter">
          <label style="display:flex;align-items:center;gap:8px;">
            分類:
            <select id="cal-filter-category">
              <option value="">すべて</option>
              ${Object.entries(Ha).map(([h,b])=>`<option value="${h}" ${n===h?"selected":""}>${b}</option>`).join("")}
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
        ${A}
      </div>
    </section>

    ${T}
  `}function yd(e){const t=e.event;return`
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
                ${Object.entries(Ha).map(([n,o])=>`<option value="${n}" ${t.category===n?"selected":""}>${o}</option>`).join("")}
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
              <input id="cal-starts" type="datetime-local" value="${t.startsAt?In(t.startsAt):""}" />
            </label>
            <label class="field" style="flex:1;">
              <span>終了 (任意)</span>
              <input id="cal-ends" type="datetime-local" value="${t.endsAt?In(t.endsAt):""}" />
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
  `}function In(e){const t=new Date(e),n=o=>String(o).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())}T${n(t.getHours())}:${n(t.getMinutes())}`}const gt={shopify:{description:"Shopifyストアの注文・商品を自動同期します。",setupUrl:"https://shopify.dev/docs/apps/auth/admin-app-access-tokens",fields:[{key:"shop_domain",label:"ショップドメイン",placeholder:"your-store.myshopify.com"},{key:"admin_token",label:"Admin API アクセストークン",placeholder:"shpat_xxx..."}]},google_calendar:{description:"Googleカレンダーの予定を取込・書き戻しします。OAuth2.0トークンが必要です。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"calendar_id",label:"カレンダーID",placeholder:"primary または xxx@group.calendar.google.com"},{key:"oauth_token",label:"OAuth Access Token",placeholder:"ya29.xxx..."}]},cloud_vision:{description:"FAX画像をOCRしてテキスト化、伝票を自動起票します。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Cloud Vision API Key",placeholder:"AIzaSyxxx..."}]},resend:{description:"メール送信サービス。Webhook受信用エンドポイントもこちらから。",setupUrl:"https://resend.com/api-keys",fields:[{key:"api_key",label:"Resend API Key",placeholder:"re_xxx..."}]},slack:{description:"Slackに各種業務通知を送信します (受注/入金遅延/低在庫 等)。",setupUrl:"https://api.slack.com/messaging/webhooks",fields:[{key:"webhook_url",label:"Webhook URL",placeholder:"https://hooks.slack.com/services/..."},{key:"default_channel",label:"デフォルトチャンネル",placeholder:"#general"}]},ivry:{description:"IVRy電話システム連携。通話履歴取得と電話帳同期。",setupUrl:"https://ivry.jp/",fields:[{key:"api_key",label:"IVRy API Key",placeholder:"sk_live_..."},{key:"team_id",label:"チームID",placeholder:"team_..."},{key:"phone_number",label:"代表電話番号",placeholder:"0463-88-1511"}]},google_maps:{description:"Google Maps APIで地図表示。設定するとLeafletからGoogle Mapsに切替。",setupUrl:"https://console.cloud.google.com/apis/credentials",fields:[{key:"api_key",label:"Google Maps API Key",placeholder:"AIzaSyxxx..."}]}};function hd(e,t){const n=t?e.find(o=>o.id===t):null;return`
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
  `}function gd(e,t){const n=e.reduce((l,d)=>l+d.totalAmount,0),o=e.filter(l=>l.financialStatus==="paid").length,r=e.filter(l=>l.fulfillmentStatus!=="fulfilled"&&l.fulfillmentStatus!=="shipped").length;return`
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
                <td style="font-size:12px;">${l.lineItems.map(d=>`${d.name} ×${d.quantity}`).join("<br/>")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function fd(e,t,n){return`
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
  `}function vd(e,t,n){const o=t==="__new__"?null:e.find(d=>d.id===t),r=t==="__new__";return n?.role==="admin"?`
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
                <td>${Ht[d.department]}</td>
                <td>${Kt[d.role]}</td>
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
              ${Object.entries(Ht).map(([d,p])=>`<option value="${d}" ${o?.department===d?"selected":""}>${p}</option>`).join("")}
            </select>
          </label>
          <label class="field" style="flex:1 1 140px;">
            <span>権限</span>
            <select id="user-role">
              ${Object.entries(Kt).map(([d,p])=>`<option value="${d}" ${o?.role===d?"selected":""}>${p}</option>`).join("")}
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
    `}function bd(e,t,n){return e?`
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
        <div><dt>部署</dt><dd>${Ht[e.department]}</dd></div>
        <div><dt>権限</dt><dd>${Kt[e.role]}</dd></div>
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
    `}function wd(e){const t={};return e.forEach(n=>{const o=n.userEmail??"(anonymous)";t[o]=(t[o]??0)+1}),`
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
  `}function xd(e){const t=e.prospects.reduce((l,d)=>l+d.expectedAmount,0),n=e.prospects.reduce((l,d)=>l+d.expectedAmount*d.probability/100,0),o=e.prospects.filter(l=>l.stage==="won").length,r=e.prospects.filter(l=>l.stage==="hot"||l.stage==="negotiating").length;return`
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

    ${e.viewMode==="kanban"?$d(e.prospects):_d(e.prospects)}

    ${Sd(e)}
  `}function $d(e){return`
    <section class="panel" style="padding:12px;">
      <p class="form-hint" style="margin:0 0 12px;">カードをドラッグしてステージ変更。クリックで詳細編集。</p>
      <div class="pk-board">${["cold","warm","hot","contacted","negotiating","won","lost"].map(o=>{const r=e.filter(d=>d.stage===o),l=r.reduce((d,p)=>d+p.expectedAmount,0);return`
        <div class="pk-col" data-prospect-stage="${o}">
          <div class="pk-col-header" style="--pk-color:${Wa[o]};">
            <span class="pk-col-label">${ta[o]}</span>
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
                <div style="margin-top:6px;" onclick="event.stopPropagation()">
                  <button class="button-sm secondary" data-action="prospect-quote-create"
                    data-id="${d.id}" data-name="${d.companyName.replace(/"/g,"&quot;")}"
                    data-addr="${(d.address??"").replace(/"/g,"&quot;")}"
                    style="font-size:11px;padding:2px 8px;">見積作成</button>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `}).join("")}</div>
    </section>
  `}function _d(e){return`
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
                <td><span class="status-pill" style="background:${Wa[t.stage]};color:white;">${ta[t.stage]}</span></td>
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
  `}function Sd(e){if(!e.editingId)return"";const t=e.editingId==="__new__",n=t?null:e.prospects.find(o=>o.id===e.editingId);return!t&&!n?"":`
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
                ${Object.entries(ta).map(([o,r])=>`<option value="${o}" ${n?.stage===o?"selected":""}>${r}</option>`).join("")}
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
  `}function kd(e,t,n){const o=e?.config.webhook_url??"",r=e?.config.default_channel??"#general";return`
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
                <td>${Qt[l.eventType]||l.eventType}</td>
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
                <td>${Qt[l.eventType]||l.eventType}</td>
                <td class="mono" style="font-size:12px;">${l.channel}</td>
                <td style="font-size:12px;max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${l.message}</td>
                <td><span class="status-pill ${l.status==="sent"?"success":"warning"}">${l.status}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Pd(e,t,n,o){const r=new Map(t.map(g=>[g.code,g])),l=e.filter(g=>g.callDirection==="inbound").length,d=e.filter(g=>g.callDirection==="outbound").length,p=e.filter(g=>g.callStatus==="missed").length,u=e.reduce((g,x)=>g+(x.durationSeconds??0),0),y=g=>{if(g===0)return"―";const x=Math.floor(g/60),C=g%60;return x>0?`${x}分${C}秒`:`${C}秒`},v=g=>{if(g.matchedCustomerCode){const x=r.get(g.matchedCustomerCode);if(x)return`${x.name} (既存)`}return"未登録番号"};return`
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
  `}const Ed=["飲食店","居酒屋","寿司屋","和食","焼肉","フレンチ","イタリアン","バー","酒販店","ワインショップ","百貨店","スーパー","ホテル","旅館","ブライダル","セレクトショップ"];function Ad(e){const t=e.activeListId?e.lists.find(l=>l.id===e.activeListId):null,n=e.items.filter(l=>l.status==="new").length,o=e.items.filter(l=>l.status==="imported").length,r=e.items.filter(l=>l.status==="excluded").length;return`
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
            ${Ed.map(l=>`<option value="${l}" ${e.searchBusinessType===l?"selected":""}>${l}</option>`).join("")}
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
  `}const Tn={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},Ld={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},Cd={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function we(e){return"¥"+e.toLocaleString("ja-JP")}function _t(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Ws(e,t){const n=e.reduce((l,d)=>l+d.amount,0),o=Math.floor(n*t),r=n+o;return{subtotal:n,taxAmount:o,total:r}}const de={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function pe(e,t){const n=e.align??"left",o=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${n}`,`font-size:${o}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function ua(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),n=t.getFullYear(),o=n-2018;return{y:o>0?String(o).padStart(2,"0"):String(n).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function Dd(e,t,n){const o=ua(e.documentDate),r=ua(e.orderDate??e.documentDate),l=ua(e.deliveryDate??e.documentDate),d=e.lines.slice(0,6).map((P,s)=>{const i=de.detailStartY+s*de.detailRowH,c=de.detailCols,m=[],h=(b,w)=>{w&&m.push(pe({...b,y:i,x:b.x+0},w))};return h(c.productName,P.productName+(P.spec?` ${P.spec}`:"")),h(c.productCode,P.productCode),h(c.color,P.color??""),h(c.size,[P.size,P.caseQty?`×${P.caseQty}`:""].filter(Boolean).join(" ")),h(c.unit,P.unit),h(c.quantity,P.quantity>0?P.quantity.toLocaleString("ja-JP"):""),h(c.correctedQty,P.correctedQuantity?P.correctedQuantity.toLocaleString("ja-JP"):""),h(c.discount,P.discount?P.discount.toLocaleString("ja-JP"):""),h(c.unitPrice,P.unitPrice>0?P.unitPrice.toLocaleString("ja-JP"):""),h(c.costAmount,P.amount>0?P.amount.toLocaleString("ja-JP"):""),h(c.retailPrice,P.retailPrice?P.retailPrice.toLocaleString("ja-JP"):""),h(c.note,P.receivedAmount?P.receivedAmount.toLocaleString("ja-JP"):""),m.join("")}).join(""),p=e.lines.reduce((P,s)=>P+(s.amount||0),0),u=e.lines.reduce((P,s)=>P+(s.retailPrice||0)*(s.correctedQuantity??s.quantity),0),y=e.lines.reduce((P,s)=>P+(s.receivedAmount||0),0),v=e.lines.reduce((P,s)=>P+(s.returnAmount||0),0),g=e.lines.reduce((P,s)=>P+s.quantity,0),x=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",C=n.calibrationOffsetX||0,A=n.calibrationOffsetY||0,T=`transform: translate(${C}mm, ${A}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${x}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${T}">
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

        ${d}

        ${pe(de.totalQty,g.toLocaleString("ja-JP"))}
        ${pe(de.receivedTotal,y.toLocaleString("ja-JP"))}
        ${pe(de.returnTotal,v.toLocaleString("ja-JP"))}
        ${pe(de.correctedCostTotal,p.toLocaleString("ja-JP"))}
        ${pe(de.correctedRetailTotal,u.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function qd(e,t,n){const{subtotal:o,taxAmount:r,total:l}=Ws(e.lines,e.taxRate),d=e.previousBalance??0,p=e.paymentAmount??0,u=d-p+l,y=e.lines.map(g=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${g.note??""}</td>
        <td>${g.productName}${g.spec?` <span style="color:#636e72;font-size:9pt;">/ ${g.spec}</span>`:""}</td>
        <td class="numeric">${g.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${g.unit}</td>`:""}
        <td class="numeric">${we(g.unitPrice)}</td>
        <td class="numeric">${we(g.amount)}</td>
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
          <span class="freee-total-value">${we(u)}</span>
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
              <p>${Math.round(e.taxRate*100)}%対象: ${we(o)} / 消費税: ${we(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${d?`<tr><th>前回御請求額</th><td>${we(d)}</td></tr>`:""}
          ${p?`<tr><th>ご入金額</th><td>▲ ${we(p)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${we(o)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${we(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${we(u)}</td></tr>
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
  `}function Id(e,t,n){const{subtotal:o,taxAmount:r,total:l}=Ws(e.lines,e.taxRate),d=e.lines.map(u=>`
      <tr>
        <td>${u.productName}${u.spec?` <span style="color:#636e72;font-size:9pt;">/ ${u.spec}</span>`:""}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${u.unit}</td>`:""}
        <td class="numeric">${we(u.unitPrice)}</td>
        <td class="numeric">${we(u.amount)}</td>
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
          <span class="freee-total-value">${we(l)}</span>
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
        <tbody>${d}${p}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${we(o)} / 消費税: ${we(r)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${we(o)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${we(r)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${we(l)}</td></tr>
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
  `}function Td(e,t,n,o){let r="";switch(e){case"chain_store":r=Dd(o,n,t);break;case"quotation":r=Id(o,n,t);break;case"invoice_monthly":r=qd(o,n,t);break}const l=Object.keys(Tn).map(u=>`<button class="tab-button ${e===u?"active":""}" data-print-template="${u}">${Tn[u]}</button>`).join(""),d=o.lines.map((u,y)=>`
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
  `}const Md={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},Nd={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function Gs(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let n=[],o="",r=!1;for(let p=0;p<e.length;p++){const u=e[p];r?u==='"'?e[p+1]==='"'?(o+='"',p++):r=!1:o+=u:u==='"'?r=!0:u===","?(n.push(o),o=""):u===`
`||u==="\r"?(u==="\r"&&e[p+1]===`
`&&p++,n.push(o),n.some(y=>y!=="")&&t.push(n),n=[],o=""):o+=u}if((o!==""||n.length>0)&&(n.push(o),n.some(p=>p!=="")&&t.push(n)),t.length===0)return{columns:[],rows:[]};const l=t[0].map(p=>p.trim()),d=[];for(let p=1;p<t.length;p++){const u={};l.forEach((y,v)=>{u[y]=(t[p][v]??"").trim()}),d.push(u)}return{columns:l,rows:d}}function Xs(e,t,n){const o=Md[e],r=o.filter(p=>!t.includes(p)),l=n.map(p=>{const u=[];r.length>0&&u.push(`必須列欠損: ${r.join(",")}`);for(const y of o)t.includes(y)&&!p[y]&&u.push(`${y}が空`);return{...p,_valid:u.length===0,_error:u[0]}}),d=l.filter(p=>p._valid).length;return{entity:e,columns:t,rows:l,totalRows:n.length,validRows:d,invalidRows:l.length-d}}function Zs(e){const n=Nd[e],r={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+n.join(",")+`
`+r.join(",")+`
`}async function eo(e,t){const{supabaseInsert:n}=await q(async()=>{const{supabaseInsert:p}=await Promise.resolve().then(()=>Z);return{supabaseInsert:p}},void 0);let o=0,r=0;const d={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const p of t){if(!p._valid)continue;const{_valid:u,_error:y,...v}=p,g={...v};if(!g.id){const x=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";g.id=String(v[x]??`${e}-${Date.now()}-${o+r}`)}for(const x of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof g[x]=="string"&&g[x]!==""){const C=Number(g[x]);Number.isFinite(C)&&(g[x]=C)}try{await n(d,g)!==null?o++:r++}catch{r++}}return{inserted:o,failed:r}}const Rd=Object.freeze(Object.defineProperty({__proto__:null,generateTemplateCSV:Zs,importToSupabase:eo,parseCSV:Gs,validateImport:Xs},Symbol.toStringTag,{value:"Module"}));function ma(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function Od(e,t=40){return!e||e.length<=t?e||"":e.slice(0,t)+"…"}function Bd(e,t,n,o,r){const l=n.reduce((y,v)=>y+v.rowCount,0),d=n.map(y=>y.lastSyncAt).filter(y=>y!==null).sort().reverse()[0]??null,p=100,u=Math.max(1,Math.ceil(r/p));return`
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
        <p class="kpi-value">${d?ma(d):"---"}</p>
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
            <p class="kpi-sub" style="font-size:11px;">${y.lastSyncAt?ma(y.lastSyncAt):"未同期"}</p>
          </button>
        `).join("")}
      </div>
    </section>

    ${e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${n.find(y=>y.tableName===e)?.displayName??e}</h2>
          <p class="panel-caption">${r.toLocaleString("ja-JP")}件中 ${((o-1)*p+1).toLocaleString("ja-JP")}-${Math.min(o*p,r).toLocaleString("ja-JP")} を表示</p>
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
              <td>${y._synced_at?ma(y._synced_at):"---"}</td>
              <td class="mono" style="font-size:11px;max-width:300px;overflow:hidden;text-overflow:ellipsis;" title="${y._raw_b64?y._raw_b64.slice(0,200):""}">${Od(y._raw_b64)}</td>
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
  `}const ct=400,dt=240;function te(e){return e.toLocaleString("ja-JP")}function ya(e){const[t,n]=e.split("-");return`${t.slice(2)}/${n}`}function jd(e,t){return!e||e.column!==t?'<span style="opacity:0.3;margin-left:2px;">⇅</span>':e.dir==="asc"?'<span style="margin-left:2px;">↑</span>':'<span style="margin-left:2px;">↓</span>'}function qe(e,t,n,o=""){return`<th class="${o}" style="cursor:pointer;user-select:none;white-space:nowrap;"
    data-action="demand-sort" data-sort-col="${t}">${e}${jd(n,t)}</th>`}function ft(e){return e>=.99?2.33:e>=.97?1.88:e>=.95?1.65:e>=.9?1.28:1.04}function zd(e){const{months:t,matrix:n}=e;if(t.length===0||e.products.length===0)return'<div class="chart-empty">データなし</div>';const o=e.products.slice().sort((s,i)=>(e.productTotals[i.code]??0)-(e.productTotals[s.code]??0)).slice(0,6),r=["#0F5B8D","#2F855A","#B7791F","#C53D3D","#6B46C1","#2B6CB0"],l=820,d=280,p={top:20,right:20,bottom:40,left:60},u=l-p.left-p.right,y=d-p.top-p.bottom,v=t.map(s=>o.reduce((i,c)=>i+(n[c.code]?.[s]??0),0)),g=Math.max(...v,1),x=u/t.length,C=Math.max(x-10,14),A=[0,.25,.5,.75,1].map(s=>{const i=p.top+y-y*s,c=`${Math.round(g*s/100)*100}`;return`
      <line x1="${p.left}" y1="${i}" x2="${l-p.right}" y2="${i}" class="chart-grid" />
      <text x="6" y="${i+4}" class="chart-axis">${Number(c).toLocaleString("ja-JP")}</text>
    `}).join(""),T=t.map((s,i)=>{let c=p.top+y;const m=p.left+i*x+(x-C)/2,h=o.map((E,L)=>{const M=(n[E.code]?.[s]??0)/g*y;return c-=M,`<rect x="${m}" y="${c}" width="${C}" height="${M}" fill="${r[L%r.length]}" opacity="0.85" rx="${L===o.length-1?3:0}" />`}).join(""),[b,w]=s.split("-"),$=parseInt(w),_=$===1||i%3===0,k=$===1?`${b.slice(2)}年`:`${$}月`;return`<g>${h}${_?`<text x="${m+C/2}" y="${d-10}" class="chart-axis centered-axis">${k}</text>`:""}</g>`}).join(""),P=o.map((s,i)=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${r[i%r.length]};"></span>
       ${s.name}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${l} ${d}" class="sales-chart" role="img" aria-label="月次商品別出荷数量">
        ${A}${T}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${p.left}px;display:flex;flex-wrap:wrap;">${P}</div>
  `}function Fd(e){const{months:t,products:n}=e,o=n.slice().sort((d,p)=>(e.productTotals[p.code]??0)-(e.productTotals[d.code]??0)).slice(0,50),r=t.map(d=>{const[p,u]=d.split("-"),y=parseInt(u);return`<th class="numeric" style="min-width:52px;white-space:nowrap;">${y===1?`${p.slice(2)}年1月`:`${y}月`}</th>`}).join(""),l=o.map(d=>{const p=t.map(u=>{const y=e.matrix[d.code]?.[u]??0;return`<td class="numeric">${y>0?te(y):"—"}</td>`}).join("");return`
      <tr>
        <td class="mono">${d.code}</td>
        <td style="white-space:nowrap;">${d.name}</td>
        ${p}
        <td class="numeric"><strong>${te(e.productTotals[d.code]??0)}</strong></td>
        <td class="numeric">${te(Math.round(e.productAvg[d.code]??0))}</td>
        <td class="numeric">${te(Math.round(e.productStdDev[d.code]??0))}</td>
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
  `}function Vd(e,t){const n=e.months[e.months.length-1]??"",o=e.months[e.months.length-2]??"",r=e.months.length-13,l=r>=0?e.months[r]:"",d=e.products.reduce((C,A)=>C+(e.matrix[A.code]?.[n]??0),0),p=e.products.reduce((C,A)=>C+(e.matrix[A.code]?.[o]??0),0),u=l?e.products.reduce((C,A)=>C+(e.matrix[A.code]?.[l]??0),0):0,y=p>0?(d-p)/p*100:0,v=u>0?(d-u)/u*100:0,g=C=>C>=0?"+":"",x=[1,2,3,5].map(C=>`<option value="${C}" ${C===t?"selected":""}>${C}年</option>`).join("");return`
    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">直近月 出荷合計</p>
        <p class="kpi-value">${te(d)} 本</p>
        <p class="kpi-sub">${ya(n)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前月比</p>
        <p class="kpi-value ${y>=0?"":"text-danger"}">${g(y)}${y.toFixed(1)}%</p>
        <p class="kpi-sub">${ya(o)} 比</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">前年同月比</p>
        <p class="kpi-value ${v>=0?"":"text-danger"}">${u>0?`${g(v)}${v.toFixed(1)}%`:"—"}</p>
        <p class="kpi-sub">${l?`${ya(l)} 比`:"前年データなし"}</p>
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
      ${zd(e)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>商品×月 出荷数量マトリクス</h2>
        <p class="panel-caption" style="margin:0;">上位50商品 · ${e.months.length}ヶ月</p>
      </div>
      ${Fd(e)}
    </section>
  `}function Ud(e,t){const o=e.slice().sort((l,d)=>{if(!t)return 0;const p=t.dir==="asc"?1:-1;switch(t.column){case"ss-name":return p*l.productName.localeCompare(d.productName,"ja");case"ss-avg":return p*(l.avgMonthlyDemand-d.avgMonthlyDemand);case"ss-std":return p*(l.demandStdDev-d.demandStdDev);case"ss-ss":{const u=Math.ceil(ft(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(ft(d.serviceLevel)*d.demandStdDev*Math.sqrt(d.leadTimeDays/30));return p*(u-y)}case"ss-rop":{const u=Math.ceil(l.avgMonthlyDemand*(l.leadTimeDays/30)+ft(l.serviceLevel)*l.demandStdDev*Math.sqrt(l.leadTimeDays/30)),y=Math.ceil(d.avgMonthlyDemand*(d.leadTimeDays/30)+ft(d.serviceLevel)*d.demandStdDev*Math.sqrt(d.leadTimeDays/30));return p*(u-y)}default:return 0}}).map(l=>{const d=ft(l.serviceLevel),p=l.leadTimeDays/30,u=Math.ceil(d*l.demandStdDev*Math.sqrt(p)),y=Math.ceil(l.avgMonthlyDemand*p+u),v=u-l.safetyStockQty,g=v>0?"text-danger":v<-u*.3?"text-warning":"",x=[.9,.95,.99].map(C=>`<option value="${C}" ${Math.abs(l.serviceLevel-C)<.01?"selected":""}>${(C*100).toFixed(0)}%</option>`).join("");return`
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
        <td class="numeric ${g}">
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
  `}const Yd={monthly:"月次",annual:"年次",make_to_order:"受注生産",november:"11月生産"};function Jd(e,t,n,o){const r={draft:"下書き",confirmed:"確定",actual:"実績入力済"},l={draft:"neutral",confirmed:"info",actual:"success"},d=w=>Object.entries(Yd).map(([$,_])=>`<option value="${$}" ${$===w?"selected":""}>${_}</option>`).join(""),p=640,u=w=>w.map($=>{const _=Math.max(0,$.demandForecast+$.safetyStockTarget-$.openingStock),k=$.plannedQty>0?$.plannedQty:Math.round(_),E=k>0?Math.ceil(k/p*10)/10:0,L=$.plannedQty>0?($.actualQty-$.plannedQty)/$.plannedQty*100:null,I=L!==null?L>=0?"text-success":"text-danger":"";return`
      <tr>
        <td style="white-space:nowrap;">${$.productName}</td>
        <td>
          <select class="input-sm" data-action="plan-prod-type" data-code="${$.productCode}"
            style="width:92px;">${d($.productionType)}</select>
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
          ${L!==null?`${L>=0?"+":""}${L.toFixed(1)}%`:"—"}
        </td>
        <td class="numeric" style="white-space:nowrap;">
          ${E>0?`${E.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span>`:"—"}
        </td>
        <td>
          <span class="status-pill ${l[$.status]??"neutral"}">${r[$.status]??$.status}</span>
        </td>
      </tr>
    `}).join(""),v=(n==="all"?e:e.filter(w=>w.productionType===n)).slice().sort((w,$)=>{if(!o)return 0;const _=o.dir==="asc"?1:-1,k=Math.max(0,w.demandForecast+w.safetyStockTarget-w.openingStock),E=Math.max(0,$.demandForecast+$.safetyStockTarget-$.openingStock);switch(o.column){case"plan-name":return _*w.productName.localeCompare($.productName,"ja");case"plan-forecast":return _*(w.demandForecast-$.demandForecast);case"plan-required":return _*(k-E);case"plan-planned":return _*(w.plannedQty-$.plannedQty);case"plan-actual":return _*(w.actualQty-$.actualQty);case"plan-label":{const L=w.plannedQty>0?w.plannedQty:Math.round(k),I=$.plannedQty>0?$.plannedQty:Math.round(E);return _*(L-I)}default:return 0}}),g=u(v),x=[{key:"all",label:"全て"},{key:"monthly",label:"月次"},{key:"annual",label:"年次"},{key:"november",label:"11月生産"},{key:"make_to_order",label:"受注生産"}],C=w=>{const _=(w==="all"?e:e.filter(k=>k.productionType===w)).reduce((k,E)=>{const L=Math.max(0,E.demandForecast+E.safetyStockTarget-E.openingStock);return k+(E.plannedQty>0?E.plannedQty:Math.round(L))},0);return Math.ceil(_/p*10)/10},A=x.filter(w=>w.key!=="all").map(w=>{const $=C(w.key),_=e.filter(E=>E.productionType===w.key).length,k=w.key==="make_to_order"?e.filter(E=>E.productionType==="make_to_order"&&E.plannedQty>0).length:null;return`
      <div style="background:var(--surface-alt);border-radius:8px;padding:12px 16px;min-width:130px;">
        <p style="font-size:11px;color:var(--text-secondary);margin:0 0 4px;">${w.label}</p>
        <p style="font-size:20px;font-weight:700;margin:0;">${$>0?$.toFixed(1):"—"}<span style="font-size:12px;font-weight:400;margin-left:3px;">人日</span></p>
        <p style="font-size:11px;color:var(--text-secondary);margin:4px 0 0;">${_}商品${k!==null?` · 受注${k}件`:""}</p>
      </div>
    `}).join(""),T=v.reduce((w,$)=>w+$.demandForecast,0),P=v.reduce((w,$)=>w+Math.max(0,$.demandForecast+$.safetyStockTarget-$.openingStock),0),s=v.reduce((w,$)=>w+$.plannedQty,0),i=v.reduce((w,$)=>w+$.actualQty,0),c=C(n),m=new Date,h=Array.from({length:24},(w,$)=>{const _=new Date(m.getFullYear(),m.getMonth()-6+$,1),k=`${_.getFullYear()}-${String(_.getMonth()+1).padStart(2,"0")}`;return`<option value="${k}" ${k===t?"selected":""}>${k.replace("-","年")}月</option>`}).join(""),b=x.map(w=>`<button class="button ${n===w.key?"primary":"secondary"}" type="button"
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
      <div style="display:flex;gap:12px;flex-wrap:wrap;padding:4px 0 8px;">${A}</div>
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
            ${g||'<tr><td colspan="11" class="empty-row">データなし</td></tr>'}
            ${v.length>0?`
              <tr style="background:var(--surface-alt);font-weight:700;">
                <td>合計</td>
                <td>—</td>
                <td class="numeric">${te(Math.round(T))}</td>
                <td class="numeric">—</td>
                <td class="numeric">—</td>
                <td class="numeric">${te(Math.round(P))}</td>
                <td class="numeric">${te(s)}</td>
                <td class="numeric">${i>0?te(i):"—"}</td>
                <td class="numeric">—</td>
                <td class="numeric">${c.toFixed(1)}<span style="font-size:11px;color:var(--text-secondary);margin-left:2px;">人日</span></td>
                <td>—</td>
              </tr>`:""}
          </tbody>
        </table>
      </div>
    </section>
  `}function to(e){const[t,n]=e.split("-").map(Number),o=new Date(t,n,0).getDate();return Array.from({length:o},(r,l)=>{const d=l+1;return`${e}-${String(d).padStart(2,"0")}`})}function Mn(e){const t=new Date(e).getDay();return["日","月","火","水","木","金","土"][t]}function Nn(e){const t=new Date(e).getDay();return t===0||t===6}function Kd(e,t){return e.partTimers*t.partCapacity+e.employees*t.empCapacity}function ao(e){return e.partTimers+e.employees}function Ie(e,t,n={partCapacity:ct,empCapacity:dt}){const o=e.filter(v=>v.partTimers>0||v.employees>0);if(o.length===0)return;const r=t.reduce((v,g)=>{const x=g.plannedQty>0?g.plannedQty:Math.max(0,g.demandForecast+g.safetyStockTarget-g.openingStock);return v+x},0);if(r<=0)return;const l=r/o.length;let d=0,p=0,u=1/0;const y=Math.ceil(l/n.partCapacity);for(let v=0;v<=y;v++){const g=l-v*n.partCapacity,x=g>0?Math.ceil(g/n.empCapacity):0,C=v+x;C<u&&(u=C,d=v,p=x)}for(const v of e)v.confirmed||(v.partTimers>0||v.employees>0)&&(v.partTimers=d,v.employees=p)}function Hd(e,t,n={partCapacity:ct,empCapacity:dt}){const o=t.filter(p=>ao(p)>0).map(p=>p.date).sort();if(o.length===0)return t.map(p=>({date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:0,items:[],totalQty:0,utilization:0}));const r={monthly:0,november:1,annual:2,make_to_order:3},l=e.filter(p=>p.plannedQty>0||Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)>0).map(p=>({productCode:p.productCode,productName:p.productName,productionType:p.productionType,remaining:p.plannedQty>0?p.plannedQty:Math.max(0,p.demandForecast+p.safetyStockTarget-p.openingStock)})).filter(p=>p.remaining>0).sort((p,u)=>(r[p.productionType]??99)-(r[u.productionType]??99)||u.remaining-p.remaining),d=new Map;for(const p of t){const u=Kd(p,n);d.set(p.date,{date:p.date,partTimers:p.partTimers,employees:p.employees,confirmed:p.confirmed,capacity:u,items:[],totalQty:0,utilization:0})}for(const p of l){let u=p.remaining;if(u<=0)continue;if(o.reduce((v,g)=>{const x=d.get(g);return v+Math.max(0,x.capacity-x.totalQty)},0)<=0)break;for(const v of o){if(u<=0)break;const g=d.get(v),x=Math.max(0,g.capacity-g.totalQty);if(x<=0)continue;const C=Math.min(u,x);g.items.push({productCode:p.productCode,productName:p.productName,productionType:p.productionType,qty:C}),g.totalQty+=C,g.utilization=g.capacity>0?g.totalQty/g.capacity:0,u-=C}}return t.map(p=>d.get(p.date))}function Jt(e,t=1,n=1){return to(e).map(o=>({date:o,partTimers:Nn(o)?0:t,employees:Nn(o)?0:n,confirmed:!1}))}function Qd(e,t,n,o=null,r=new Set,l={partCapacity:ct,empCapacity:dt}){const d=to(t),p=e.filter(L=>!r.has(L.productCode)),u=Hd(p,n,l),y=new Map(u.map(L=>[L.date,L])),v=p.reduce((L,I)=>L+(I.plannedQty>0?I.plannedQty:Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock)),0),x=e.reduce((L,I)=>L+(I.plannedQty>0?I.plannedQty:Math.max(0,I.demandForecast+I.safetyStockTarget-I.openingStock)),0)-v,C=u.reduce((L,I)=>L+I.totalQty,0),A=n.filter(L=>ao(L)>0).length,T=u.reduce((L,I)=>L+I.capacity,0),P=n.reduce((L,I)=>L+I.partTimers,0),s=n.reduce((L,I)=>L+I.employees,0),i=A>0?Math.ceil(v/A):0,c=new Date,m=Array.from({length:24},(L,I)=>{const M=new Date(c.getFullYear(),c.getMonth()-6+I,1),O=`${M.getFullYear()}-${String(M.getMonth()+1).padStart(2,"0")}`;return`<option value="${O}" ${O===t?"selected":""}>${O.replace("-","年")}月</option>`}).join(""),h=new Date(d[0]).getDay(),b=[];for(let L=0;L<h;L++)b.push('<div style="min-height:44px;"></div>');for(const L of d){const I=y.get(L),M=new Date(L).getDay(),O=parseInt(L.split("-")[2]),N=I?.partTimers??0,j=I?.employees??0,V=N+j,z=I?.totalQty??0,U=I?.utilization??0,H=L===o,W=V===0?"var(--surface-alt)":U>.95?"rgba(197,61,61,0.12)":U>.7?"rgba(183,121,31,0.10)":U>0?"rgba(47,133,90,0.08)":"var(--surface)",J=V===0?"transparent":U>.95?"#c53d3d":U>.7?"#b7791f":U>0?"#2f855a":"var(--border)",K=M===0?"#c53d3d":M===6?"#0F5B8D":"var(--text)",le=V>0?`<span style="font-size:8px;color:var(--text-secondary);line-height:1;">${N>0?`パ${N}`:""}${j>0?`社${j}`:""}</span>`:"";b.push(`
      <div data-action="cal-toggle-day" data-date="${L}"
        style="min-height:44px;padding:3px;border:${H?"2px solid #0F5B8D":"1px solid var(--border)"};border-radius:6px;
          background:${W};cursor:pointer;display:flex;flex-direction:column;
          ${H?"box-shadow:0 0 0 2px rgba(15,91,141,0.2);":""}">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-weight:600;color:${K};line-height:1;">${O}</span>
          ${le}
        </div>
        ${V>0?`
          <div style="font-size:10px;font-weight:600;color:var(--text);margin-top:auto;line-height:1;">${z>0?te(z):""}</div>
          <div style="height:3px;background:var(--border);border-radius:2px;margin-top:2px;">
            <div style="height:100%;width:${Math.min(U*100,100)}%;background:${J};border-radius:2px;"></div>
          </div>
        `:'<div style="font-size:9px;color:var(--text-disabled);margin-top:auto;">休</div>'}
      </div>
    `)}const $=b.length%7;if($>0)for(let L=0;L<7-$;L++)b.push('<div style="min-height:44px;"></div>');const _=o?y.get(o):null;o&&n.find(L=>L.date===o);const k=o&&_?(()=>{const L=_,I=parseInt(o.split("-")[2]),M=Mn(o),O=Math.round(L.utilization*100),N=n.find(Y=>Y.date===o),j=o===new Date().toISOString().slice(0,10),V={monthly:"#0F5B8D",november:"#B7791F",annual:"#6B46C1",make_to_order:"#999"},z={monthly:"月次",november:"11月",annual:"年次",make_to_order:"受注"},U=L.items.map(Y=>`
      <div style="display:flex;align-items:center;gap:8px;padding:10px 0;border-bottom:1px solid var(--border);">
        <span style="width:10px;height:10px;border-radius:50%;background:${V[Y.productionType]??"#999"};flex-shrink:0;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:14px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${Y.productName}</div>
          <div style="font-size:11px;color:var(--text-secondary);">${z[Y.productionType]??Y.productionType}</div>
        </div>
        <div style="font-size:16px;font-weight:700;white-space:nowrap;">${te(Y.qty)}<span style="font-size:12px;font-weight:400;">本</span></div>
      </div>
    `).join(""),H=`パ${L.partTimers}×${l.partCapacity} 社${L.employees}×${l.empCapacity} = ${te(L.capacity)}本`,W=L.totalQty>0?Math.ceil(L.totalQty/l.partCapacity):0,J=[];if(L.totalQty>0)for(let Y=0;Y<=W;Y++){const Q=L.totalQty-Y*l.partCapacity;if(Q<=0){J.push({p:Y,e:0});break}const X=Math.ceil(Q/l.empCapacity);J.push({p:Y,e:X})}const K=L.totalQty-L.capacity,le=L.totalQty===0?"":K>0?`<span style="color:#c53d3d;font-weight:600;">⚠ ${te(K)}本 不足</span>`:'<span style="color:#2f855a;">✓ キャパ内</span>',re=J.filter(Y=>Y.p+Y.e>0).sort((Y,Q)=>Y.p+Y.e-(Q.p+Q.e)).slice(0,3),ce=L.totalQty>0?`
      <div style="background:var(--surface-alt);border-radius:6px;padding:10px 12px;margin:0 4px 8px;">
        <div style="font-size:12px;font-weight:600;margin-bottom:6px;">
          ${te(L.totalQty)}本を収めるには ${le}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${re.map((Y,Q)=>{const X=Y.p===L.partTimers&&Y.e===L.employees;return`<button data-action="cal-apply-pattern" data-date="${o}" data-part="${Y.p}" data-emp="${Y.e}"
              style="font-size:11px;padding:4px 10px;border:1px solid ${X?"#2f855a":"var(--border)"};
                border-radius:4px;background:${X?"rgba(47,133,90,0.08)":"var(--surface)"};
                cursor:pointer;white-space:nowrap;${X?"font-weight:600;":""}">
              パ${Y.p}社${Y.e}＝${Y.p+Y.e}人
              <span style="color:var(--text-secondary);margin-left:2px;">${te(Y.p*l.partCapacity+Y.e*l.empCapacity)}本</span>
            </button>`}).join("")}
        </div>
      </div>
    `:"";return`
      <section class="panel" style="margin-top:12px;border:2px solid ${j?"#2f855a":"#0F5B8D"};">
        <div style="padding:12px 16px 8px;${j?"background:rgba(47,133,90,0.06);":""}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            ${j?'<span style="background:#2f855a;color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;">TODAY</span>':""}
            <h2 style="margin:0;font-size:16px;">${I}日（${M}）${j?"":"の生産内訳"}</h2>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);">${H} ・ 稼働率${O}%</div>
          ${L.totalQty>0?`<div style="font-size:20px;font-weight:700;margin-top:6px;">${te(L.totalQty)}<span style="font-size:13px;font-weight:400;">本</span> <span style="font-size:13px;font-weight:400;">/ ${L.items.length}品</span></div>`:""}
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
        ${L.items.length>0?`
          <div style="padding:0 4px;">
            ${U}
            <div style="display:flex;justify-content:space-between;padding:10px 0 4px;font-weight:700;">
              <span>合計</span>
              <span>${te(L.totalQty)}本</span>
            </div>
          </div>
        `:'<p style="color:var(--text-secondary);padding:12px;text-align:center;">生産予定なし</p>'}
      </section>
    `})():o?`
    <section class="panel" style="margin-top:12px;">
      <div style="padding:16px;text-align:center;">
        <p style="color:var(--text-secondary);margin-bottom:8px;">${parseInt(o.split("-")[2])}日（${Mn(o)}）— 休日</p>
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
  `:"",E=[{color:"#0F5B8D",label:"月次"},{color:"#B7791F",label:"11月"},{color:"#6B46C1",label:"年次"},{color:"#999",label:"受注"}].map(L=>`<span style="display:inline-flex;align-items:center;gap:2px;font-size:10px;">
    <span style="width:6px;height:6px;border-radius:50%;background:${L.color};"></span>${L.label}
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
      <div><strong>${te(Math.round(v))}</strong>本 ÷ <strong>${A}</strong>稼働日 = 日当たり<strong>${te(i)}</strong>本</div>
      <div>→ パ<strong>${P}</strong> 社<strong>${s}</strong>人日 ・ キャパ<strong>${te(T)}</strong>本
        ${C<v?` <span style="color:#c53d3d;">（${te(Math.round(v-C))}本 未配分）</span>`:' <span style="color:#2f855a;">✓ 全量配分済</span>'}
      </div>
      <div style="color:var(--text-secondary);font-size:10px;">日付タップで稼働ON/OFF → 人数自動計算</div>
    </div>

    <section class="panel" style="padding:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;padding:0 2px;">
        <span style="font-size:13px;font-weight:600;">${t.replace("-","年")}月</span>
        <span>${E}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;">
        ${["日","月","火","水","木","金","土"].map((L,I)=>`<div style="text-align:center;font-size:10px;font-weight:600;padding:2px;color:${I===0?"#c53d3d":I===6?"#0F5B8D":"var(--text-secondary)"};">${L}</div>`).join("")}
        ${b.join("")}
      </div>
      <p style="font-size:10px;color:var(--text-secondary);margin:6px 0 0;text-align:center;">日付タップで稼働ON/OFF</p>
    </section>

    ${k}

    <section class="panel" style="margin-top:12px;" id="cal-label-section">
      <div class="panel-header" style="padding-bottom:4px;">
        <div>
          <h2 style="font-size:14px;">ラベル対象商品</h2>
          <p class="panel-caption">区分ごとにまとめて外す or 個別に外せます${r.size>0?`（<strong>${r.size}</strong>品除外中 = ${te(Math.round(x))}本）`:""}</p>
        </div>
        <button class="button primary" type="button" data-action="cal-save-exclusions"
          style="padding:6px 14px;font-size:12px;">設定を保存</button>
      </div>
      <div id="cal-label-list" style="max-height:500px;overflow-y:auto;">
        ${(()=>{const L=[{key:"monthly",label:"月次",color:"#0F5B8D"},{key:"november",label:"11月生産",color:"#B7791F"},{key:"annual",label:"年次",color:"#6B46C1"},{key:"make_to_order",label:"受注生産",color:"#999"}],I=new Map;for(const M of e){if((M.plannedQty>0?M.plannedQty:Math.max(0,M.demandForecast+M.safetyStockTarget-M.openingStock))<=0)continue;const N=M.productionType||"monthly";I.has(N)||I.set(N,[]),I.get(N).push(M)}return L.filter(M=>I.has(M.key)).map(M=>{const O=I.get(M.key),N=O.reduce((H,W)=>H+(W.plannedQty>0?W.plannedQty:Math.max(0,W.demandForecast+W.safetyStockTarget-W.openingStock)),0),j=O.filter(H=>r.has(H.productCode)).length,V=j===O.length,z=j===0,U=O.map(H=>{const W=H.plannedQty>0?H.plannedQty:Math.max(0,H.demandForecast+H.safetyStockTarget-H.openingStock),J=r.has(H.productCode);return`
                <div style="display:flex;align-items:center;gap:8px;padding:7px 4px 7px 28px;border-bottom:1px solid var(--border);${J?"opacity:0.4;":""}">
                  <input type="checkbox" data-action="cal-label-toggle" data-code="${H.productCode}"
                    ${J?"":"checked"} style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${J?"text-decoration:line-through;":""}">${H.productName}</div>
                  </div>
                  <div style="font-size:13px;font-weight:600;flex-shrink:0;">${te(Math.round(W))}</div>
                </div>
              `}).join("");return`
              <div style="border-bottom:2px solid var(--border);">
                <div style="display:flex;align-items:center;gap:8px;padding:10px 4px;background:var(--surface-alt);position:sticky;top:0;z-index:1;">
                  <input type="checkbox" data-action="cal-label-toggle-group" data-type="${M.key}"
                    ${V?"":"checked"} ${!z&&!V?'class="indeterminate"':""}
                    style="cursor:pointer;flex-shrink:0;width:18px;height:18px;" />
                  <span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${M.color};flex-shrink:0;"></span>
                  <div style="flex:1;font-size:13px;font-weight:600;">${M.label}<span style="font-weight:400;color:var(--text-secondary);margin-left:6px;">${O.length}品 ${te(Math.round(N))}本</span></div>
                  ${j>0&&!V?`<span style="font-size:11px;color:#b7791f;">${j}品除外</span>`:""}
                  ${V?'<span style="font-size:11px;color:var(--text-secondary);">全除外</span>':""}
                </div>
                ${U}
              </div>
            `}).join("")})()}
      </div>
    </section>
  `}function Wd(e,t,n,o,r,l,d="all",p=null,u=[],y=null,v=new Set,g={partCapacity:ct,empCapacity:dt}){const C=[{key:"demand",label:"需要実績"},{key:"safety",label:"安全在庫"},{key:"plan",label:"生産計画"},{key:"calendar",label:"生産カレンダー"}].map(T=>`<button class="tab-button ${o===T.key?"active":""}"
       data-demand-tab="${T.key}">${T.label}</button>`).join("");let A="";if(o==="demand")A=e?Vd(e,l):'<section class="panel"><p>データを読み込んでいます…</p></section>';else if(o==="safety")A=Ud(t,p);else if(o==="plan")A=Jd(n,r,d,p);else if(o==="calendar")try{A=Qd(n,r,u,y,v,g)}catch(T){console.error("[renderCalendarTab] error:",T),A=`<section class="panel"><div style="color:red;padding:16px;white-space:pre-wrap;">[カレンダー描画エラー] ${String(T)}
${T?.stack??""}</div></section>`}return`
    <section class="page-head">
      <div>
        <p class="eyebrow">在庫管理</p>
        <h1>需要分析・安全在庫・生産計画</h1>
      </div>
    </section>

    <div class="tab-group" style="margin-bottom:20px;">
      ${C}
    </div>

    ${A}
  `}const Ve={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},Re=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"];function se(e){return e.toLocaleString("ja-JP")}function ye(e){return(e/1e3).toLocaleString("ja-JP",{maximumFractionDigits:1})}function en(e){return e<2?"#ef4444":e<=4?"#eab308":"#22c55e"}function Gd(e){return e<2?"要醸造":e<=4?"注意":"余裕あり"}function tn(e){return"bc-"+encodeURIComponent(e).replace(/%/g,"-")}function Xd(e){if(e.length===0)return'<div class="chart-empty">出荷データなし</div>';const t=[...new Set(e.map(P=>P.month))].sort(),n=Re.filter(P=>e.some(s=>s.brewCategory===P)),o={};for(const P of e)o[P.month]||(o[P.month]={}),o[P.month][P.brewCategory]=P.shipmentMl;const r=820,l=300,d={top:20,right:20,bottom:50,left:70},p=r-d.left-d.right,u=l-d.top-d.bottom,y=t.map(P=>n.reduce((s,i)=>s+(o[P]?.[i]??0),0)),v=Math.max(...y,1),g=p/t.length,x=Math.max(g-8,14),C=[0,.25,.5,.75,1].map(P=>{const s=d.top+u-u*P,i=v*P/1e3;return`
      <line x1="${d.left}" y1="${s}" x2="${r-d.right}" y2="${s}" class="chart-grid" />
      <text x="6" y="${s+4}" class="chart-axis">${Math.round(i).toLocaleString("ja-JP")}L</text>
    `}).join(""),A=t.map((P,s)=>{let i=d.top+u;const c=d.left+s*g+(g-x)/2,m=n.map(k=>{const E=o[P]?.[k]??0,L=E/v*u;return i-=L,L>0?`<rect x="${c}" y="${i}" width="${x}" height="${L}" fill="${Ve[k]??"#9ca3af"}" opacity="0.85" rx="1"><title>${k}: ${ye(E)}L</title></rect>`:""}).join(""),[h,b]=P.split("-"),w=parseInt(b),$=w===10||s%2===0,_=w===10?`${h}年度`:`${w}月`;return`<g>${m}${$?`<text x="${c+x/2}" y="${l-12}" class="chart-axis centered-axis" style="font-size:10px;">${_}</text>`:""}</g>`}).join(""),T=n.map(P=>`<span style="display:inline-flex;align-items:center;gap:4px;margin-right:12px;font-size:11px;">
       <span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${Ve[P]??"#9ca3af"};"></span>
       ${P}
     </span>`).join("");return`
    <div style="overflow-x:auto;">
      <svg viewBox="0 0 ${r} ${l}" class="sales-chart" role="img" aria-label="月次区分別移出量">
        ${C}${A}
      </svg>
    </div>
    <div style="padding:4px 0 8px ${d.left}px;display:flex;flex-wrap:wrap;">${T}</div>
  `}function Zd(e,t,n,o){const r=new Map;for(const p of e){const u=p.brewCategory;r.has(u)||r.set(u,{rows:[],totalMl:0,avgMl:0,stockL:0});const y=r.get(u);y.rows.push(p),y.totalMl+=p.totalShipmentMl,y.avgMl+=p.monthlyAvgMl,y.stockL=p.currentStockL}const l=new Map;for(const p of t)l.has(p.brewCategory)||l.set(p.brewCategory,[]),l.get(p.brewCategory).push(p);return`<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;">${Re.filter(p=>r.has(p)).map(p=>{const u=r.get(p),y=Ve[p]??"#9ca3af",v=tn(p);l.get(p);const g=n[p]??{rawAlcoholPct:18,targetAlcoholPct:15},x=g.targetAlcoholPct>0?g.rawAlcoholPct/g.targetAlcoholPct:1;u.stockL*1e3;const C=u.totalMl,A=u.avgMl,T=C/1e3,P=Math.round(u.stockL*x*10)/10,s=P*1e3,i=A>0?Math.round(s/A*10)/10:0,c=P-T,m=A>0?Math.round(A*2/1e3*10)/10:0,h=P<m,b=en(i),w=Gd(i),$=Math.min(i/12*100,100),_=c>=0?"#22c55e":"#ef4444",k=c>=0?`+${se(Math.round(c))}L 余裕`:`${se(Math.round(c))}L 不足`,E=x>1.001;return`
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
              <div><span style="color:#6b7280;">年間出荷</span><br><strong style="font-size:15px;">${se(Math.round(T))}L</strong></div>
              <div><span style="color:#6b7280;">月平均</span><br><strong style="font-size:15px;">${ye(A)}L</strong></div>
            </div>
            ${E?`
              <div style="background:rgba(37,99,235,0.06);border-radius:6px;padding:6px 8px;margin-bottom:6px;font-size:11px;">
                <div style="color:#2563eb;font-weight:600;">加水後 ${se(P)}L</div>
                <div style="color:#6b7280;">${g.rawAlcoholPct}% → ${g.targetAlcoholPct}%（×${x.toFixed(2)}）・残<strong>${i.toFixed(1)}</strong>ヶ月</div>
              </div>
            `:""}
            ${(()=>{const L=o.filter(I=>I.parentCategory===p);return L.length===0?"":L.map(I=>{const O=t.filter(N=>N.brewCategory===I.name).reduce((N,j)=>N+j.volumeL,0);return`<div style="font-size:11px;border-left:3px solid #6366f1;padding-left:8px;margin-bottom:4px;">
                  <span style="color:#6366f1;font-weight:600;">${I.name}</span>
                  ${O>0?`<span style="margin-left:4px;">${se(O)}L</span>`:'<span style="color:var(--text-secondary);margin-left:4px;">在庫未設定</span>'}
                </div>`}).join("")})()}
          </div>

          <div id="stock-edit-${v}" style="display:none;margin-bottom:8px;">
            ${(()=>{const L=o.filter(N=>N.parentCategory===p),I=[{name:p,label:p},...L.map(N=>({name:N.name,label:N.name}))],M=I.flatMap(N=>t.filter(V=>V.brewCategory===N.name).map(V=>({...V,catLabel:N.label}))),O=I.map(N=>`<option value="${N.name}">${N.label}</option>`).join("");return`
                <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">タンク／在庫（区分を選んで追加）</div>
                <div>
                  ${M.map(N=>`
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
            <span style="color:${_};font-weight:600;">年間比 ${k}</span>
            <span style="color:${h?"#ef4444":"#6b7280"};">安全在庫${se(m)}L${h?" ⚠下回り":" ✓"}</span>
          </div>

          <div style="margin-bottom:4px;display:flex;justify-content:space-between;font-size:11px;">
            <span style="color:#6b7280;">残月数${E?"（加水後）":""}</span>
            <span style="font-weight:600;color:${b};">${i.toFixed(1)}ヶ月</span>
          </div>
          <div style="background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;">
            <div style="background:${b};height:100%;width:${$}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
        </div>
      `}).join("")}</div>`}function ep(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=new Map;for(const r of e)t.has(r.brewCategory)||t.set(r.brewCategory,[]),t.get(r.brewCategory).push(r);const n=`
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
  `,o=[];for(const r of Re){const l=t.get(r);if(!l)continue;const d=Ve[r]??"#9ca3af",p=l.length>1,u=l.reduce((P,s)=>P+s.totalShipmentQty,0),y=l.reduce((P,s)=>P+s.totalShipmentMl,0),v=l.reduce((P,s)=>P+s.monthlyAvgQty,0),g=l.reduce((P,s)=>P+s.monthlyAvgMl,0),x=l.reduce((P,s)=>P+s.productCount,0),C=l[0].currentStockL,A=g>0?Math.round(C*1e3/g*10)/10:0,T=en(A);if(o.push(`
      <tr style="font-weight:600;background:#f9fafb;cursor:${p?"pointer":"default"};" ${p?`data-toggle-cat="${r}"`:""}>
        <td style="color:${d};">
          ${p?`<span class="toggle-icon" data-cat="${r}" style="display:inline-block;width:16px;font-size:10px;">&#9654;</span>`:'<span style="display:inline-block;width:16px;"></span>'}
          ${r}
        </td>
        <td style="color:#9ca3af;font-weight:400;">--</td>
        <td style="text-align:right;">${x}</td>
        <td style="text-align:right;">${se(u)}</td>
        <td style="text-align:right;">${ye(y)}</td>
        <td style="text-align:right;">${se(v)}</td>
        <td style="text-align:right;">${ye(g)}</td>
        <td style="text-align:right;">${se(C)}</td>
        <td style="text-align:right;color:${T};font-weight:700;">${A.toFixed(1)}</td>
      </tr>
    `),p)for(const P of l)o.push(`
          <tr class="sub-row-${tn(r)}" style="display:none;font-size:12px;">
            <td></td>
            <td style="padding-left:24px;">${P.subCategory}</td>
            <td style="text-align:right;">${P.productCount}</td>
            <td style="text-align:right;">${se(P.totalShipmentQty)}</td>
            <td style="text-align:right;">${ye(P.totalShipmentMl)}</td>
            <td style="text-align:right;">${se(P.monthlyAvgQty)}</td>
            <td style="text-align:right;">${ye(P.monthlyAvgMl)}</td>
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
  `}function tp(e,t,n,o,r,l={}){const d={html:"",needByCategory:{}};if(e.length===0)return d;const p={},u=new Date,y=u.getMonth()+1,v=y>=10?u.getFullYear():u.getFullYear()-1,g=v+1,x=new Map;for(const k of e)x.has(k.brewCategory)||x.set(k.brewCategory,new Map),x.get(k.brewCategory).set(k.fy,{shipL:k.shipmentL,annualL:k.annualizedL});const C=new Map;for(const k of r)C.has(k.brewCategory)||C.set(k.brewCategory,new Map),C.get(k.brewCategory).set(k.monthNum,k.avgMonthlyL);const A=[...new Set(e.map(k=>k.fy))].sort(),T=[...x.keys()].sort((k,E)=>{const L=[...Re,...o.map(I=>I.name)];return(L.indexOf(k)===-1?99:L.indexOf(k))-(L.indexOf(E)===-1?99:L.indexOf(E))}),P=[];for(let k=y;k<=9;k++)P.push(k);if(y>=10)for(let k=1;k<=9;k++)P.push(k);const s=A.filter(k=>k<v),i=A.includes(v),c=T.map(k=>{const E=x.get(k);A.filter(me=>E.has(me));const L=Ve[k]??"#6366f1",I=C.get(k)??new Map,M=s.filter(me=>E.has(me)).map(me=>E.get(me).shipL);let O=0;if(M.length>=2){let me=0,be=0;for(let Oe=1;Oe<M.length;Oe++)if(M[Oe-1]>0){const oa=(M[Oe]-M[Oe-1])/M[Oe-1],At=Oe;me+=oa*At,be+=At}O=be>0?me/be:0}const N=E.get(v)?.annualL??0,j=M.length>0?M[M.length-1]:0,V=N>0&&j>0?Math.round(j*.4+N*.6):j||N,z=P.reduce((me,be)=>me+(I.get(be)??0),0),U=t.filter(me=>me.brewCategory===k).reduce((me,be)=>me+be.volumeL,0),H=n[k],W=H&&H.targetAlcoholPct>0?H.rawAlcoholPct/H.targetAlcoholPct:1,J=Math.round(U*W),K=Math.max(0,J-Math.round(z)),le=k in l,re=le?l[k]:O,ce=Math.round(re*100),Y=Math.round(V*(1+re)),Q=Math.max(0,Y-K);p[k]=Q;const X=ce>0?"#22c55e":ce<0?"#ef4444":"#6b7280",ie=Math.round(O*100),$e=E.get(v)?.annualL??0;return`
      <tr>
        <td style="color:${L};font-weight:600;white-space:nowrap;">${k}</td>
        ${s.map(me=>`<td style="text-align:right;">${E.has(me)?se(Math.round(E.get(me).shipL)):"—"}</td>`).join("")}
        ${i?`<td style="text-align:right;color:var(--text-secondary);" title="年換算">${se(Math.round($e))}*</td>`:""}
        <td style="text-align:right;">
          <input type="number" step="1" value="${ce}"
            data-action="brew-growth-edit" data-cat="${k}"
            style="width:52px;height:24px;font-size:11px;text-align:right;border:1px solid ${le?"#2563eb":"var(--border)"};border-radius:3px;padding:0 2px;
              color:${X};font-weight:600;${le?"background:rgba(37,99,235,0.06);":""}"
            title="${le?`手動設定（自動: ${M.length>=2?ie+"%":"—"}）`:"自動算出"}" />%
        </td>
        <td style="text-align:right;">${se(J)}</td>
        <td style="text-align:right;color:var(--text-secondary);">-${se(Math.round(z))}</td>
        <td style="text-align:right;font-weight:600;">${se(K)}</td>
        <td style="text-align:right;">${se(Y)}</td>
        <td style="text-align:right;color:${Q>0?"#ef4444":"#22c55e"};font-weight:700;">${Q>0?se(Q):"余裕"}</td>
      </tr>
    `}).join("");let m=0,h=0,b=0,w=0,$=0;for(const k of T){const E=x.get(k),L=C.get(k)??new Map,I=s.filter(re=>E.has(re)).map(re=>E.get(re).shipL);let M=0;if(I.length>=2){let re=0,ce=0;for(let Y=1;Y<I.length;Y++)if(I[Y-1]>0){const Q=(I[Y]-I[Y-1])/I[Y-1];re+=Q*Y,ce+=Y}M=ce>0?re/ce:0}const O=E.get(v)?.annualL??0,N=I.length>0?I[I.length-1]:0,j=O>0&&N>0?Math.round(N*.4+O*.6):N||O,V=t.filter(re=>re.brewCategory===k).reduce((re,ce)=>re+ce.volumeL,0),z=n[k],U=z&&z.targetAlcoholPct>0?z.rawAlcoholPct/z.targetAlcoholPct:1,H=Math.round(V*U),W=P.reduce((re,ce)=>re+(L.get(ce)??0),0),J=Math.max(0,H-Math.round(W)),K=k in l?l[k]:M,le=Math.round(j*(1+K));m+=H,h+=Math.round(W),b+=J,w+=le,$+=Math.max(0,le-J)}const _=y<=9?`${y}月〜9月`:`${y}月〜翌9月`;return{needByCategory:p,html:`
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
              ${s.map(k=>`<th style="text-align:right;">${k}(L)</th>`).join("")}
              ${i?`<th style="text-align:right;">${v}*</th>`:""}
              <th style="text-align:right;">増減率</th>
              <th style="text-align:right;">現在庫</th>
              <th style="text-align:right;">${_}</th>
              <th style="text-align:right;">10月予想</th>
              <th style="text-align:right;">${g}予測</th>
              <th style="text-align:right;">必要醸造</th>
            </tr>
          </thead>
          <tbody>${c}</tbody>
          <tfoot>
            <tr style="font-weight:700;background:var(--surface-alt);">
              <td>合計</td>
              ${s.map(()=>"<td></td>").join("")}
              ${i?"<td></td>":""}
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
  `}}function ap(e,t,n,o,r){if(e.length===0)return"";const l=new Date,d=l.getMonth()+1,p=l.getFullYear(),u=[];let y=d,v=p;for(let s=0;s<4;s++){const i=[];for(let h=0;h<3;h++)i.push({y:v,m:y}),y++,y>12&&(y=1,v++);const c=`${i[0].y}/${i[0].m}`,m=`${i[2].y}/${i[2].m}`;u.push({label:`${c}-${m}`,months:i})}const g=new Map;for(const s of n)g.has(s.brewCategory)||g.set(s.brewCategory,new Map),g.get(s.brewCategory).set(s.monthNum,s.avgMonthlyL);const x=new Map;for(const s of e)x.has(s.brewCategory)||x.set(s.brewCategory,s.currentStockL);for(const s of r){const i=t.filter(c=>c.brewCategory===s.name).reduce((c,m)=>c+m.volumeL,0);i>0&&x.set(s.name,i)}const C=new Map;for(const s of r)C.has(s.parentCategory)||C.set(s.parentCategory,[]),C.get(s.parentCategory).push(s);const A=[];for(const s of Re){(x.has(s)||(g.get(s)?.size??0)>0)&&A.push({cat:s,isChild:!1});for(const i of C.get(s)??[])(x.has(i.name)||(g.get(i.name)?.size??0)>0)&&A.push({cat:i.name,isChild:!0})}function T(s,i){const c=o[s],m=c&&c.targetAlcoholPct>0?c.rawAlcoholPct/c.targetAlcoholPct:1;let h=(x.get(s)??0)*m;const b=g.get(s)??new Map,w=Ve[s]??(i?"#6366f1":"#9ca3af");let $="";const _=[];for(const k of u){const E=k.months.reduce((O,{m:N})=>O+(b.get(N)??0),0),L=h;h=Math.max(0,h-E),L>0&&h<=0&&!$&&($=k.label);const M=h<=0?"#ef4444":h<E?"#eab308":"#22c55e";_.push(`<td style="text-align:right;padding:4px 6px;color:${M};font-weight:${h<=0?"700":"400"};">${h>0?se(Math.round(h)):"枯渇"}</td>`)}return`
      <tr style="${i?"background:rgba(99,102,241,0.02);":""}">
        <td style="color:${w};font-weight:${i?"500":"600"};padding:4px 6px;white-space:nowrap;${i?"padding-left:20px;font-size:11px;":""}">${i?"┗ ":""}${s}</td>
        <td style="text-align:right;padding:4px 6px;">${se(Math.round((x.get(s)??0)*m))}</td>
        ${_.join("")}
        <td style="padding:4px 6px;font-size:11px;color:${$?"#ef4444":"#22c55e"};font-weight:600;">
          ${$?`⚠ ${$}`:"12ヶ月+"}
        </td>
      </tr>
    `}const P=A.map(({cat:s,isChild:i})=>T(s,i)).join("");return`
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
          <tbody>${P}</tbody>
        </table>
      </div>
    </div>
  `}function np(e,t,n){const o=new Map;for(const d of e){o.has(d.brewCategory)||o.set(d.brewCategory,{avgMl:0,totalMl:0,stockL:d.currentStockL});const p=o.get(d.brewCategory);p.avgMl+=d.monthlyAvgMl,p.totalMl+=d.totalShipmentMl}for(const d of n){const p=t.filter(u=>u.brewCategory===d.name).reduce((u,y)=>u+y.volumeL,0);(p>0||o.has(d.name))&&(o.has(d.name)?o.get(d.name).stockL=p:(o.get(d.parentCategory),o.set(d.name,{avgMl:0,totalMl:0,stockL:p})))}return`
    <div class="card" style="margin-bottom:16px;">
      <h3 style="font-size:14px;margin:0 0 12px 0;">在庫 vs 年間出荷</h3>
      <div style="font-size:11px;color:#6b7280;margin-bottom:8px;display:flex;gap:16px;flex-wrap:wrap;">
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#ef4444;"></span> &lt;2ヶ月 要醸造</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#eab308;"></span> 2-4ヶ月 注意</span>
        <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#22c55e;"></span> &gt;4ヶ月 余裕</span>
        <span style="color:#9ca3af;">| 安全在庫=2ヶ月分</span>
      </div>
      ${[...Re,...n.map(d=>d.name)].filter(d=>o.has(d)&&(o.get(d).stockL>0||o.get(d).totalMl>0)).map(d=>{const p=o.get(d),u=p.avgMl>0?Math.round(p.stockL*1e3/p.avgMl*10)/10:0,y=p.totalMl/1e3,v=y>0?Math.round(p.stockL/y*100):0,g=n.some(P=>P.name===d),x=Ve[d]??(g?"#6366f1":"#9ca3af"),C=p.avgMl>0?en(u):p.stockL>0?"#22c55e":"#9ca3af",A=p.avgMl>0?Math.min(u/12*100,100):p.stockL>0?100:0,T=p.avgMl>0?`${u.toFixed(1)}ヶ月 / 年間の${v}%`:`${se(p.stockL)}L在庫`;return`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="width:100px;font-size:12px;font-weight:500;color:${x};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${d}">${g?"┗ ":""}${d}</span>
          <div style="flex:1;background:#e5e7eb;border-radius:4px;height:24px;overflow:hidden;position:relative;">
            <div style="background:${C};height:100%;width:${A}%;border-radius:4px;transition:width 0.3s;"></div>
            <span style="position:absolute;top:3px;left:8px;font-size:11px;font-weight:600;color:#374151;">${T}</span>
          </div>
          <span style="width:60px;font-size:11px;text-align:right;color:${p.stockL>0?"var(--text)":"#ef4444"};">${se(p.stockL)}L</span>
        </div>
      `}).join("")}
    </div>
  `}function sp(e,t,n,o,r){if(e.length===0)return"";const l=n.map(g=>g.name);[...Re,...l];const d=new Map;for(const g of n)d.has(g.parentCategory)||d.set(g.parentCategory,[]),d.get(g.parentCategory).push(g);const p=new Map;for(const g of e)p.has(g.brewCategory)||p.set(g.brewCategory,[]),p.get(g.brewCategory).push(g);for(const g of l)p.has(g)||p.set(g,[]);const u=new Set;for(const g of n)for(const x of p.get(g.name)??[])u.add(x.productCode);const y=new Map;for(const g of Re)y.set(g,p.get(g)??[]);const v=Re.filter(g=>p.has(g)).map(g=>{const x=p.get(g)??[],C=Ve[g]??"#9ca3af",A=d.get(g)??[],T=A.length>0,P=x.reduce((_,k)=>_+k.annualMl,0),s=x.reduce((_,k)=>_+k.monthlyAvgMl,0),i=x.filter(_=>!u.has(_.productCode)),c=i.filter(_=>!t.has(_.productCode)),m=c.reduce((_,k)=>_+k.annualMl,0),h=c.reduce((_,k)=>_+k.monthlyAvgMl,0),b=i.filter(_=>t.has(_.productCode)),w=i.map(_=>{const k=t.has(_.productCode);return`
          <tr style="${k?"opacity:0.5;background:rgba(183,121,31,0.06);":""}">
            <td style="width:32px;text-align:center;">
              ${T?`<input type="checkbox" ${k?"":"checked"} data-action="brew-move-to-child" data-code="${_.productCode}" data-parent="${g}"
                    style="cursor:pointer;" />`:""}
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;${k?"color:#b7791f;":""}" title="${_.productName}">
              ${_.productName}${k?' <span style="font-size:9px;padding:1px 4px;border-radius:3px;background:#b7791f20;color:#b7791f;">未振分</span>':""}
            </td>
            <td style="font-size:11px;color:var(--text-secondary);">${_.subCategory}</td>
            <td style="text-align:right;">${ye(_.annualMl)}</td>
            <td style="text-align:right;">${ye(_.monthlyAvgMl)}</td>
          </tr>
        `}).join(""),$=A.map(_=>{const k=p.get(_.name)??[],E=k.reduce((V,z)=>V+z.annualMl,0),L=k.reduce((V,z)=>V+z.monthlyAvgMl,0),I=r.filter(V=>V.brewCategory===_.name),M=I.reduce((V,z)=>V+z.volumeL,0),O=tn(_.name),N=k.map(V=>`
          <tr style="background:rgba(99,102,241,0.04);">
            <td style="width:32px;text-align:center;">
              <input type="checkbox" checked data-action="brew-unconfirm" data-code="${V.productCode}" data-cat="${_.name}"
                style="cursor:pointer;accent-color:#2563eb;" />
            </td>
            <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${V.productName}"><strong>${V.productName}</strong></td>
            <td style="font-size:11px;color:var(--text-secondary);">${V.subCategory}</td>
            <td style="text-align:right;">${ye(V.annualMl)}</td>
            <td style="text-align:right;">${ye(V.monthlyAvgMl)}</td>
          </tr>
        `).join(""),j=b.filter(V=>!k.some(z=>z.productCode===V.productCode)).map(V=>`
            <tr style="opacity:0.4;">
              <td style="width:32px;text-align:center;">
                <input type="checkbox" data-action="brew-confirm-to-child" data-code="${V.productCode}" data-cat="${_.name}"
                  style="cursor:pointer;" />
              </td>
              <td style="white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis;" title="${V.productName}">${V.productName}</td>
              <td style="font-size:11px;color:var(--text-secondary);">${V.subCategory}</td>
              <td style="text-align:right;color:var(--text-secondary);">${ye(V.annualMl)}</td>
              <td style="text-align:right;color:var(--text-secondary);">${ye(V.monthlyAvgMl)}</td>
            </tr>
          `).join("");return`
          <tr><td colspan="5" style="padding:0;">
            <div style="border-left:3px solid #6366f1;margin:8px 0 8px 16px;padding:6px 0 6px 12px;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                <strong style="font-size:12px;color:#6366f1;">${_.name}</strong>
                <span style="font-size:11px;color:var(--text-secondary);">${k.length}品 ・ ${ye(E)}L/年${M>0?` ・ 在庫${se(M)}L`:""}</span>
                <button class="btn-edit-stock" data-cat-id="${O}" data-cat="${_.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid var(--border);border-radius:3px;background:none;cursor:pointer;">在庫</button>
                <button data-action="brew-delete-category" data-cat="${_.name}"
                  style="font-size:9px;padding:1px 6px;border:1px solid #ef4444;color:#ef4444;border-radius:3px;background:none;cursor:pointer;">削除</button>
              </div>
              <div id="stock-edit-${O}" style="display:none;margin-bottom:6px;padding:4px;background:var(--surface-alt);border-radius:4px;">
                <div style="font-size:10px;color:#6b7280;margin-bottom:3px;">タンク在庫</div>
                ${I.map(V=>`
                  <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
                    <span style="font-size:11px;">${V.label||"タンク"}</span>
                    <strong style="font-size:11px;">${se(V.volumeL)}L</strong>
                    <button data-action="brew-delete-entry" data-id="${V.id}" data-cat="${_.name}"
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
                    <td style="text-align:right;">${ye(E)}</td><td style="text-align:right;">${ye(L)}</td>
                  </tr></tfoot>`:""}
                </table>
              `:'<div style="font-size:10px;color:var(--text-secondary);padding:4px;">親からチェックを外すとここに候補表示されます</div>'}
            </div>
          </td></tr>
        `}).join("");return`
        <div style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:${C};"></span>
            <h4 style="margin:0;font-size:14px;">${g}</h4>
            <span style="font-size:12px;color:var(--text-secondary);">
              全${x.length}銘柄 ・ 年間${ye(P)}L
              ${T?`（内 ${A.map(_=>`${_.name}:${(p.get(_.name)??[]).length}品`).join(" / ")}）`:""}
            </span>
          </div>
          ${T?'<div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px;">チェックを外すと子区分へ移動</div>':""}
          <div class="table-wrap">
            <table class="data-table" style="font-size:12px;">
              <thead><tr><th style="width:32px;"></th><th>銘柄</th><th>種別</th><th style="text-align:right;">年間(L)</th><th style="text-align:right;">月平均(L)</th></tr></thead>
              <tbody>
                ${w}
                ${$}
              </tbody>
              <tfoot>
                <tr style="font-weight:600;background:var(--surface-alt);"><td></td><td>全体計</td><td></td>
                  <td style="text-align:right;">${ye(P)}</td><td style="text-align:right;">${ye(s)}</td></tr>
                ${T?`<tr style="font-size:11px;"><td></td><td>　親区分に残り</td><td></td>
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
  `}function op(e,t,n,o=[],r=new Set,l=[],d={},p=[],u={},y=[],v=[],g={},x={}){const C=new Date,A=C.getMonth()>=9?C.getFullYear():C.getFullYear()-1,T=Array.from({length:5},(s,i)=>{const c=A-i;return`<option value="${c}" ${c===n?"selected":""}>${c}年度 (${c}/10-${c+1}/9)</option>`}).join(""),P=e.length===0&&t.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます...</p></div></section>':"";return P||`
    <section class="panel">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
        <div>
          <h2 style="margin:0;font-size:18px;">醸造計画</h2>
          <p style="margin:4px 0 0 0;font-size:12px;color:#6b7280;">特定名称酒区分別の出荷実績と在庫状況</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <label for="brewing-fy-select" style="font-size:13px;font-weight:500;">会計年度:</label>
          <select id="brewing-fy-select" class="input" style="width:auto;min-width:200px;">
            ${T}
          </select>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <h3 style="font-size:14px;margin:0 0 8px 0;">月次移出推移（区分別）</h3>
        ${Xd(t)}
      </div>

      ${Zd(e,p,u,l)}

      ${tp(y,p,u,l,v,g).html}

      ${np(e,p,l)}

      ${ap(e,p,v,u,l)}

      ${sp(o,r,l,d,p)}

      <div class="card">
        <h3 style="font-size:14px;margin:0 0 8px 0;">区分別出荷明細</h3>
        ${ep(e)}
      </div>
    </section>
  `}const ha={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},rp=["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他"],vt=[10,11,12,1,2,3,4,5,6,7,8,9],Rn=["10月","11月","12月","1月","2月","3月","4月","5月","6月","7月","8月","9月"],Ke=[9,10,11,12,1,2,3,4,5],ip=["9月","10月","11月","12月","1月","2月","3月","4月","5月"];function ae(e){return e.toLocaleString("ja-JP")}function lp(e,t,n,o=[],r=2026,l=[],d=[],p={}){const y=[...new Set([...Object.keys(e).filter(_=>e[_]>0),...o.filter(_=>_.plannedVolumeL>0).map(_=>_.brewCategory)])];if(y.length===0)return'<section class="panel"><p style="padding:24px;text-align:center;color:var(--text-secondary);">醸造計画の予測データがありません。先に醸造計画ページで在庫・予測を設定してください。</p></section>';const v=[...rp,...n.map(_=>_.name)];y.sort((_,k)=>(v.indexOf(_)===-1?99:v.indexOf(_))-(v.indexOf(k)===-1?99:v.indexOf(k)));const g={polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0},x=new Map;for(const _ of o)x.has(_.brewCategory)||x.set(_.brewCategory,[]),x.get(_.brewCategory).push(_);const C=(_,k,E,L,I)=>`<input type="number" step="${I}" value="${E}" data-action="brew-rice-edit" data-cat="${k}" data-field="${_}"
        style="width:${L};height:26px;font-size:12px;text-align:right;border:1px solid var(--border);border-radius:4px;padding:0 4px;" />`,A=(_,k,E)=>`<select data-action="brew-rice-variety-select" data-cat="${k}" data-field="${_}"
        style="height:26px;font-size:12px;border:1px solid var(--border);border-radius:4px;padding:0 4px;max-width:110px;">
      ${l.map(L=>`<option value="${L.name}" ${L.name===E?"selected":""}>${L.name}${L.region?` (${L.region})`:""}</option>`).join("")}
      ${!l.some(L=>L.name===E)&&E?`<option value="${E}" selected>${E}</option>`:""}
    </select>`;let T=0,P=0,s=0,i=0;const c=vt.map(()=>0),m=new Map,h=y.map(_=>{const k=e[_]??0,E=t[_]??g,L=ha[_]??"#6366f1",I=x.get(_)??[],M=_ in p,O=I.reduce((X,ie)=>X+ie.plannedVolumeL,0),N=I.length>0,j=M?p[_]:N?O:k,V=E.alcoholAdditionRatio??0,z=j*(1-V),U=Math.round(z*E.ricePerLiterKg),H=Math.round(U*E.kojiRatio),W=U-H,J=Math.round(H/E.polishingRatio),K=Math.round(W/E.polishingRatio),le=J+K,re=Math.round(J*E.kojiPricePerKg),ce=Math.round(K*E.kakePricePerKg);T+=J,P+=K,s+=re,i+=ce;for(const[X,ie,$e,me]of[[E.kojiVariety,J,E.kojiPricePerKg,"麹米"],[E.kakeVariety,K,E.kakePricePerKg,"掛米"]]){if(ie<=0)continue;m.has(X)||m.set(X,{brownKg:0,pricePerKg:$e,cost:0,usage:[]});const be=m.get(X);be.brownKg+=ie,be.cost+=Math.round(ie*$e),be.pricePerKg=Math.round(be.cost/be.brownKg),be.usage.push({cat:_,type:me,kg:ie})}const Y=vt.map(()=>0);if(I.length>0)for(const X of I){const ie=vt.indexOf(X.brewMonth);ie>=0&&(Y[ie]+=X.plannedVolumeL)}else{const X=j/12;for(let ie=0;ie<12;ie++)Y[ie]=X}const Q=Y.reduce((X,ie)=>X+ie,0)||1;for(let X=0;X<12;X++){const ie=Y[X]/Q;c[X]+=Math.round(le*ie)}return`
      <div class="card" style="border-top:3px solid ${L};margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:4px;">
          <h4 style="margin:0;font-size:14px;color:${L};">${_}</h4>
          <div style="font-size:12px;">${j>0?`予算 <strong>¥${ae(re+ce)}</strong>`:'<span style="color:#6b7280;font-weight:600;">醸造しない</span>'}</div>
        </div>

        <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;align-items:center;font-size:12px;">
          <label style="display:flex;align-items:center;gap:3px;">
            醸造量
            <input type="number" min="0" step="100" value="${Math.round(j)}"
              data-action="proc-edit-vol" data-cat="${_}"
              style="width:72px;height:26px;font-size:12px;text-align:right;border:1px solid ${M?"#2563eb":"var(--border)"};border-radius:4px;padding:0 4px;font-weight:600;${M?"background:rgba(37,99,235,0.04);":""}" />L
          </label>
          ${V>0?`<span style="color:var(--text-secondary);">−${Math.round(V*100)}%→${ae(Math.round(z))}L</span>`:""}
          ${k>0&&Math.abs(k-j)>10?`<span style="color:var(--text-secondary);font-size:11px;">(予測${ae(Math.round(k))})</span>`:""}
        </div>

        <div style="border:1px solid var(--border);border-radius:6px;padding:8px;margin-bottom:8px;background:var(--surface-alt);">
          <div style="font-size:11px;font-weight:600;color:${L};margin-bottom:6px;">醸造スケジュール${I.length>0?` (${ae(Math.round(I.reduce((X,ie)=>X+ie.plannedVolumeL,0)))}L / ${ae(Math.round(j))}L)`:""}</div>
          ${I.length>0?`
            <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">
              ${I.map(X=>`
                <div style="display:flex;align-items:center;gap:3px;padding:3px 8px;border-radius:4px;background:${L}15;border:1px solid ${L}30;">
                  <span style="font-size:11px;font-weight:600;color:${L};">${X.brewMonth}月</span>
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
              ${[10,11,12,1,2,3,4,5,6,7,8,9].filter(X=>!I.some(ie=>ie.brewMonth===X)).map(X=>`<option value="${X}">${X}月</option>`).join("")}
            </select>
            <input type="number" min="0" max="${Math.round(j)}" step="100" placeholder="L"
              data-action="proc-add-month-vol" data-cat="${_}"
              style="width:56px;height:24px;font-size:11px;text-align:right;border:1px solid var(--border);border-radius:3px;padding:0 3px;" />
            <button data-action="proc-add-schedule" data-cat="${_}"
              style="height:24px;font-size:11px;padding:0 8px;border:1px solid ${L};background:${L}10;color:${L};border-radius:3px;cursor:pointer;">+追加</button>
          </div>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;margin-bottom:8px;">
          <label style="display:flex;align-items:center;gap:3px;">白米/L ${C("ricePerLiterKg",_,E.ricePerLiterKg,"48px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">麹 ${C("kojiRatio",_,E.kojiRatio,"44px","0.01")}</label>
          <label style="display:flex;align-items:center;gap:3px;">歩合 ${C("polishingRatio",_,E.polishingRatio,"44px","0.01")}</label>
          ${V>0||_==="本醸造"||_==="普通酒"?`<label style="display:flex;align-items:center;gap:3px;">ｱﾙ添 ${C("alcoholAdditionRatio",_,E.alcoholAdditionRatio??0,"44px","0.01")}</label>`:""}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#6366f1;font-weight:600;margin-bottom:4px;">麹米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${A("kojiVariety",_,E.kojiVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${C("kojiPricePerKg",_,E.kojiPricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${ae(J)}kg</strong> <span style="color:var(--text-secondary);">(${(J/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${ae(re)}</div>
          </div>
          <div style="border:1px solid var(--border);border-radius:6px;padding:10px;">
            <div style="font-size:11px;color:#b7791f;font-weight:600;margin-bottom:4px;">掛米</div>
            <div style="display:flex;gap:6px;margin-bottom:4px;flex-wrap:wrap;font-size:12px;">
              <label style="display:flex;align-items:center;gap:3px;">品種 ${A("kakeVariety",_,E.kakeVariety)}</label>
              <label style="display:flex;align-items:center;gap:3px;">円/kg ${C("kakePricePerKg",_,E.kakePricePerKg,"52px","10")}</label>
            </div>
            <div style="font-size:12px;">玄米 <strong>${ae(K)}kg</strong> <span style="color:var(--text-secondary);">(${(K/60).toFixed(1)}俵)</span></div>
            <div style="font-size:14px;font-weight:700;margin-top:2px;">¥${ae(ce)}</div>
          </div>
        </div>
      </div>
    `}).join(""),b=T+P,w=s+i,$=Math.max(...c,1);return vt.map((_,k)=>{const E=c[k];return`
      <div style="text-align:center;">
        <div style="height:80px;display:flex;align-items:flex-end;justify-content:center;">
          <div style="width:24px;height:${E/$*100}%;background:#0F5B8D;border-radius:3px 3px 0 0;min-height:${E>0?2:0}px;"></div>
        </div>
        <div style="font-size:9px;color:var(--text-secondary);margin-top:2px;">${Rn[k]}</div>
        <div style="font-size:10px;font-weight:600;">${E>0?ae(E):""}</div>
        <div style="font-size:9px;color:var(--text-secondary);">${E>0?(E/60).toFixed(0)+"俵":""}</div>
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
          ${ip.map(_=>`<div style="text-align:center;padding:4px;font-weight:600;border-left:1px solid var(--border);">${_}</div>`).join("")}
        </div>
        ${(()=>{const _=[],k=Ke.length,E=new Map;for(const M of d)M.deliveryMonth&&(E.has(M.varietyName)||E.set(M.varietyName,[]),E.get(M.varietyName).push(M.deliveryMonth));for(const[M,O]of E){const N=Ke.map(j=>{const V=O.includes(j),z=d.filter(U=>U.varietyName===M&&U.deliveryMonth===j).reduce((U,H)=>U+H.committedBales,0);return`<div style="text-align:center;padding:3px;border-left:1px solid var(--border);${V?"background:#dcfce7;":""}">
                ${V?`<div style="font-size:9px;font-weight:600;color:#16a34a;">🌾${z}俵</div>`:""}
              </div>`}).join("");_.push(`<div style="display:grid;grid-template-columns:80px repeat(${k},1fr);border-top:1px solid var(--border);">
              <div style="padding:4px;color:#16a34a;font-weight:500;font-size:10px;">📥 ${M}</div>${N}
            </div>`)}const L=34,I=2;for(const M of y){const O=x.get(M)??[],N=ha[M]??"#6366f1",j=M in p,V=O.reduce((Y,Q)=>Y+Q.plannedVolumeL,0),z=O.length>0,U=j?p[M]:z?V:e[M]??0,H=[],W=[...O].sort((Y,Q)=>Ke.indexOf(Y.brewMonth)-Ke.indexOf(Q.brewMonth)),J=[];for(const Y of W){const Q=Ke.indexOf(Y.brewMonth);if(Q<0)continue;const X=Math.min(Y.durationMonths,k-Q),ie=Q+X;let $e=0;for(;$e<J.length&&J[$e]>Q;)$e++;$e>=J.length?J.push(ie):J[$e]=ie,H.push({s:Y,startIdx:Q,dur:X,lane:$e})}const le=Math.max(J.length,1)*(L+I)+I,re=Ke.map(()=>`<div style="border-left:1px solid var(--border);height:${le}px;"></div>`).join(""),ce=H.map(({s:Y,startIdx:Q,dur:X,lane:ie})=>{const $e=(Q/k*100).toFixed(2),me=(X/k*100).toFixed(2),be=I+ie*(L+I);return`<div class="gantt-bar" data-cat="${M}" data-month="${Y.brewMonth}" data-dur="${X}" data-vol="${Math.round(Y.plannedVolumeL)}" data-max="${Math.round(U)}"
                style="position:absolute;left:${$e}%;width:${me}%;top:${be}px;height:${L}px;
                  background:${N}30;border:2px solid ${N};border-radius:6px;cursor:grab;
                  display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:${N};overflow:hidden;box-sizing:border-box;">
                <div class="gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
                <span class="gantt-bar-label" style="pointer-events:none;white-space:nowrap;">${ae(Math.round(Y.plannedVolumeL))}L</span>
                <div class="gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div>
              </div>`}).join("");_.push(`<div style="display:grid;grid-template-columns:80px 1fr;border-top:1px solid var(--border);">
              <div style="padding:4px;color:${N};font-weight:500;font-size:10px;display:flex;align-items:center;">🍶 ${M}</div>
              <div style="position:relative;display:grid;grid-template-columns:repeat(${k},1fr);">
                ${re}
                <div class="gantt-bar-container" data-cat="${M}" data-max="${Math.round(U)}" data-cols="${k}" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;">
                  ${ce}
                </div>
              </div>
            </div>`)}return _.join("")||'<div style="text-align:center;color:var(--text-secondary);padding:16px;">区分を追加するとタイムラインが表示されます</div>'})()}
      </div>
    </section>

    <section class="panel" style="margin-bottom:16px;">
      <div class="panel-header"><h2>区分別 醸造量・米必要量</h2><p class="panel-caption">横棒で全区分を一覧比較</p></div>
      ${(()=>{const _=y.map(E=>{const L=t[E]??g,I=x.get(E)??[],M=E in p,O=I.reduce((H,W)=>H+W.plannedVolumeL,0),N=I.length>0,j=M?p[E]:N?O:e[E]??0,V=j*(1-(L.alcoholAdditionRatio??0)),z=Math.round(V*L.ricePerLiterKg),U=Math.round(z/L.polishingRatio);return{cat:E,brewingL:j,brownKg:U,color:ha[E]??"#6366f1"}}).filter(E=>E.brewingL>0||E.brownKg>0),k=Math.max(..._.map(E=>E.brownKg),1);return _.map(E=>{const L=Math.min(E.brownKg/k*100,100);return`
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="width:90px;font-size:11px;font-weight:500;color:${E.color};text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${E.cat}</span>
              <div style="flex:1;background:#e5e7eb;border-radius:3px;height:20px;overflow:hidden;position:relative;">
                <div style="background:${E.color};opacity:0.7;height:100%;width:${L}%;border-radius:3px;"></div>
                <span style="position:absolute;top:2px;left:6px;font-size:10px;font-weight:600;color:#374151;">${ae(E.brownKg)}kg (${Math.ceil(E.brownKg/60)}俵)</span>
              </div>
              <span style="width:60px;font-size:10px;text-align:right;color:var(--text-secondary);">${ae(Math.round(E.brewingL))}L</span>
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
            ${[...m.entries()].sort((_,k)=>k[1].brownKg-_[1].brownKg).map(([_,k])=>{const E=(k.brownKg/60).toFixed(1),L=k.usage.map(I=>`<span style="font-size:10px;padding:1px 5px;border-radius:3px;background:${I.type==="麹米"?"rgba(99,102,241,0.08)":"rgba(183,121,31,0.08)"};margin-right:3px;">${I.cat}/${I.type} ${ae(I.kg)}kg</span>`).join("");return`
                <tr>
                  <td style="font-weight:600;">${_}</td>
                  <td style="text-align:right;font-weight:600;">${ae(k.brownKg)}</td>
                  <td style="text-align:right;">${E}</td>
                  <td style="text-align:right;">¥${ae(k.pricePerKg)}/kg</td>
                  <td style="text-align:right;font-weight:700;">¥${ae(k.cost)}</td>
                  <td style="max-width:300px;overflow-x:auto;">${L}</td>
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
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${ae(T)}kg</strong> <span style="color:var(--text-secondary);">(${(T/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${ae(s)}</div>
        </div>
        <div style="background:rgba(183,121,31,0.06);border-radius:8px;padding:14px;">
          <div style="font-size:11px;color:#b7791f;font-weight:600;">掛米 合計</div>
          <div style="font-size:12px;margin-top:6px;">玄米 <strong>${ae(P)}kg</strong> <span style="color:var(--text-secondary);">(${(P/60).toFixed(1)}俵)</span></div>
          <div style="font-size:18px;font-weight:700;margin-top:4px;">¥${ae(i)}</div>
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
      ${(()=>{const _=new Map;for(const[N,j]of m)_.set(N,j.brownKg);const k=new Map;for(const N of d){k.has(N.varietyName)||k.set(N.varietyName,{bales:0,kg:0,cost:0,suppliers:[]});const j=k.get(N.varietyName);j.bales+=N.committedBales,j.kg+=N.committedBales*60,j.cost+=N.committedBales*60*N.pricePerKg,N.supplier&&!j.suppliers.includes(N.supplier)&&j.suppliers.push(N.supplier)}const E=[...new Set([..._.keys(),...k.keys()])];let L=0,I=0;const M=E.map(N=>{const j=_.get(N)??0,V=k.get(N),z=V?.kg??0,U=z-j;L+=z,I+=j;const H=U>=0?"#22c55e":"#ef4444",W=U>=0?`+${ae(Math.round(U))}kg余裕`:`${ae(Math.round(U))}kg不足`,J=z>0?Math.min(j/z*100,100):0;return`
            <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);">
              <div style="width:80px;font-weight:600;font-size:13px;">${N}</div>
              <div style="flex:1;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
                  <span>確保 ${ae(Math.round(z))}kg (${V?.bales??0}俵)</span>
                  <span>必要 ${ae(Math.round(j))}kg</span>
                </div>
                <div style="height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;">
                  <div style="height:100%;width:${J}%;background:${z>0?U>=0?"#22c55e":"#ef4444":"#9ca3af"};border-radius:4px;"></div>
                </div>
              </div>
              <span style="width:90px;text-align:right;font-size:11px;font-weight:600;color:${H};">${z>0?W:"未確保"}</span>
            </div>
          `}).join(""),O=L-I;return`
          <div style="margin-bottom:12px;">
            ${M||'<p style="color:var(--text-secondary);text-align:center;padding:12px;">作付け予定が未登録です</p>'}
          </div>
          ${L>0?`
            <div style="display:flex;gap:12px;flex-wrap:wrap;font-size:12px;padding:8px;background:var(--surface-alt);border-radius:6px;">
              <span>確保合計: <strong>${ae(Math.round(L))}kg</strong> (${Math.ceil(L/60)}俵)</span>
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
              ${vt.map((N,j)=>`<option value="${N}">${Rn[j]}</option>`).join("")}
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
  `}const cp={純米大吟醸:"#7c3aed",大吟醸:"#a855f7",純米吟醸:"#2563eb",純米:"#059669",本醸造:"#d97706",普通酒:"#6b7280",リキュール:"#e11d48",その他:"#9ca3af"},dp={planned:"計画中",active:"進行中",completed:"完了"},no={未着手:"#d1d5db",進行中:"#3b82f6",完了:"#22c55e"},Be=6;function so(e){return e.toLocaleString("ja-JP")}function Et(e){return cp[e]??"#6366f1"}function Bt(e,t){return Math.round((new Date(t).getTime()-new Date(e).getTime())/864e5)}function pp(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n.toISOString().slice(0,10)}function Ne(e){return e?e.slice(5).replace("-","/"):"―"}function up(e){return e.length<=3?e:e.slice(0,3)}function mp(e,t,n){const o=e.filter(s=>s.status!=="completed"&&s.startDate&&s.targetEndDate);if(o.length===0)return"";const r=o.flatMap(s=>[s.startDate,s.targetEndDate]),l=o.flatMap(s=>t[s.id]??[]);for(const s of l)s.plannedStart&&r.push(s.plannedStart),s.plannedEnd&&r.push(s.plannedEnd);r.sort();const d=r[0],p=r[r.length-1],u=Math.min(Bt(d,p)+7,180),y=u*Be,v=[];let g="";for(let s=0;s<u;s++){const i=pp(d,s),c=i.slice(0,7);c!==g&&(v.push(`<span style="position:absolute;left:${s*Be}px;font-size:9px;color:#6b7280;white-space:nowrap;border-left:1px solid #d1d5db;padding-left:2px;">${parseInt(i.slice(5,7))}月</span>`),g=c)}const x=new Date().toISOString().slice(0,10),C=Bt(d,x),A=C>=0&&C<u?`<div style="position:absolute;left:${C*Be}px;top:0;width:2px;height:100%;background:#ef4444;z-index:5;opacity:0.7;pointer-events:none;"></div>`:"",T=30,P=o.map(s=>{const i=(t[s.id]??[]).sort((b,w)=>b.stepOrder-w.stepOrder),c=Et(s.brewCategory),m=n===s.id,h=i.map(b=>{const w=Math.max(Bt(d,b.plannedStart),0),$=Math.min(Bt(d,b.plannedEnd),u-1),_=w*Be,k=Math.max(($-w+1)*Be,Be),E=no[b.status],L=b.status==="未着手"?"#555":"#fff";return`<div class="bp-gantt-bar" data-step-id="${b.id}" data-batch-id="${b.batchId}" data-step-order="${b.stepOrder}" data-planned-start="${b.plannedStart}" data-planned-end="${b.plannedEnd}" style="position:absolute;left:${_}px;top:4px;width:${k}px;height:22px;background:${E};border-radius:3px;font-size:7px;line-height:22px;color:${L};overflow:hidden;white-space:nowrap;cursor:grab;border:1px solid ${b.status==="未着手"?"#bbb":E};" title="${b.stepName} ${Ne(b.plannedStart)}〜${Ne(b.plannedEnd)}"><div class="bp-gantt-resize-left" style="position:absolute;left:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div><span style="padding:0 16px;pointer-events:none;">${k>24?up(b.stepName):""}</span><div class="bp-gantt-resize-right" style="position:absolute;right:0;top:0;width:14px;height:100%;cursor:ew-resize;"></div></div>`}).join("");return`<div style="display:flex;align-items:center;border-bottom:1px solid ${m?"#3b82f6":"#f3f4f6"};min-height:${T}px;background:${m?"#eff6ff":"transparent"};" data-action="bp-toggle-detail" data-batch-id="${s.id}">
      <div style="width:120px;flex-shrink:0;padding:2px 6px;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;">
        <span style="color:${c};font-weight:600;">${s.batchCode}</span>
        <span style="color:#9ca3af;display:block;font-size:8px;">${s.brewCategory}</span>
      </div>
      <div style="position:relative;width:${y}px;height:${T}px;background:repeating-linear-gradient(90deg,transparent 0 ${Be*7-1}px,#f3f4f6 ${Be*7-1}px ${Be*7}px);">${h}</div>
    </div>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header"><h2>醸造ガントチャート</h2><p class="panel-caption">バッチをクリックで詳細表示 ／ バーをドラッグで日程調整</p></div>
    <div id="bp-gantt" style="overflow-x:auto;touch-action:none;user-select:none;">
      <div style="min-width:${y+120}px;">
        <div style="display:flex;align-items:flex-end;">
          <div style="width:120px;flex-shrink:0;"></div>
          <div style="position:relative;width:${y}px;height:20px;">${v.join("")}</div>
        </div>
        <div style="position:relative;">${P}${A}</div>
      </div>
    </div>
  </section>`}function yp(e,t){const n=[...t].sort((T,P)=>T.stepOrder-P.stepOrder);if(n.length===0)return"";const o=120,r=50,l=40,d=20,p=5,u=Math.ceil(n.length/p),y=p*(o+l)-l+20,v=u*(r+d)-d+20,g=T=>{const P=Math.floor(T/p);return{x:10+(P%2===0?T%p:p-1-T%p)*(o+l),y:10+P*(r+d)}},x=n.map((T,P)=>{const s=g(P),i=no[T.status],c=T.status==="進行中"?"#1d4ed8":T.status==="完了"?"#15803d":"#9ca3af",m=T.status==="未着手"?"#374151":"#fff";return`<g>
      <rect x="${s.x}" y="${s.y}" width="${o}" height="${r}" rx="6" fill="${i}" stroke="${c}" stroke-width="2"/>
      <text x="${s.x+o/2}" y="${s.y+20}" text-anchor="middle" fill="${m}" font-size="11" font-weight="600">${T.stepName}</text>
      <text x="${s.x+o/2}" y="${s.y+36}" text-anchor="middle" fill="${m}" font-size="9" opacity="0.8">${Ne(T.plannedStart)}〜${Ne(T.plannedEnd)}</text>
    </g>`}).join(""),C=n.slice(1).map((T,P)=>{const s=g(P),i=g(P+1),c=s.x+o/2,m=s.y+r/2,h=i.x+o/2,b=i.y+r/2;if(Math.floor(P/p)===Math.floor((P+1)/p)){const $=h>c?1:-1,_=s.x+($>0?o:0),k=m,E=i.x+($>0?0:o);return`<line x1="${_}" y1="${k}" x2="${E}" y2="${b}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}else{const $=s.y+r,_=i.y;return`<line x1="${c}" y1="${$}" x2="${h}" y2="${_}" stroke="#9ca3af" stroke-width="2" marker-end="url(#arrow)"/>`}}).join("");return`<div id="bp-network" style="margin-bottom:16px;">
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
          ${C}${x}
        </svg>
      </div>
    </section>
  </div>`}function hp(e,t,n){if(e.length===0)return'<div class="panel" style="padding:20px;text-align:center;color:#9ca3af">バッチ未登録。調達計画から取込むか、新規バッチを追加してください。</div>';const o=e.map(r=>{const l=t[r.id]??[],d=l.length,p=l.filter(g=>g.status==="完了").length,u=d>0?Math.round(p/d*100):0,y=Et(r.brewCategory);return`<tr style="border-bottom:1px solid #f3f4f6;background:${n===r.id?"#eff6ff":"transparent"};cursor:pointer;" data-action="bp-toggle-detail" data-batch-id="${r.id}">
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
          ${["planned","active","completed"].map(g=>`<option value="${g}"${r.status===g?" selected":""}>${dp[g]}</option>`).join("")}
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
  </section>`}function gp(e,t){if(e.length===0)return"";const n=new Set(t.map(l=>`${l.brewCategory}:${l.startDate?.slice(0,7)}`)),o=e.filter(l=>{const d=l.brewMonth>=10?l.fy:l.fy+1,p=`${l.brewCategory}:${d}-${String(l.brewMonth).padStart(2,"0")}`;return!n.has(p)&&l.plannedVolumeL>0});return o.length===0?"":`<section class="panel" style="margin-bottom:16px">
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
      <td style="padding:5px 6px;text-align:right;font-size:11px;">${so(Math.round(l.plannedVolumeL))}L</td>
      <td style="padding:5px 6px;font-size:11px;">${l.brewMonth}月（${p}）</td>
      <td style="padding:5px 3px;text-align:center;"><input type="checkbox" data-action="bp-import-check" data-cat="${l.brewCategory}" data-month="${l.brewMonth}" data-vol="${Math.round(l.plannedVolumeL)}" data-date="${p}" data-code="${u}" checked></td>
    </tr>`}).join("")}</tbody></table></div>
  </section>`}function fp(e){return`<div class="panel" style="margin-bottom:16px">
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
  </div>`}function vp(e,t){const n=[...t].sort((l,d)=>l.stepOrder-d.stepOrder);if(n.length===0)return"";const o=n.map(l=>`<tr style="border-bottom:1px solid #f3f4f6">
    <td style="padding:4px 6px;font-size:11px;font-weight:${l.status==="進行中"?700:400}">${l.stepName}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${Ne(l.plannedStart)}〜${Ne(l.plannedEnd)}</td>
    <td style="padding:4px 6px;font-size:10px;color:#6b7280">${l.actualStart?Ne(l.actualStart):"―"}〜${l.actualEnd?Ne(l.actualEnd):"―"}</td>
    <td style="padding:4px 3px">
      <select data-action="bp-step-status" data-step-id="${l.id}" data-batch-id="${l.batchId}" style="font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px">
        ${["未着手","進行中","完了"].map(d=>`<option value="${d}"${l.status===d?" selected":""}>${d}</option>`).join("")}
      </select>
    </td>
    <td style="padding:4px 3px"><input type="number" step="0.1" data-action="bp-step-temp" data-step-id="${l.id}" value="${l.temperature??""}" placeholder="℃" style="width:50px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
    <td style="padding:4px 3px"><input type="text" data-action="bp-step-notes" data-step-id="${l.id}" value="${l.notes}" placeholder="メモ" style="width:100px;font-size:10px;padding:2px 3px;border:1px solid #d1d5db;border-radius:3px"></td>
  </tr>`).join("");return`<section class="panel" style="margin-bottom:16px;border-left:4px solid ${Et(e.brewCategory)};">
    <div class="panel-header"><h2>${e.batchCode} 工程詳細</h2><p class="panel-caption">${e.brewCategory} ｜ ${so(e.plannedVolumeL)}L ｜ ${Ne(e.startDate)}〜${Ne(e.targetEndDate)}</p></div>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;min-width:500px">
        <thead><tr style="border-bottom:2px solid #e5e7eb;font-size:10px;color:#6b7280;text-align:left">
          <th style="padding:3px 6px">工程</th><th style="padding:3px 6px">予定</th><th style="padding:3px 6px">実績</th>
          <th style="padding:3px 3px">状態</th><th style="padding:3px 3px">温度</th><th style="padding:3px 3px">メモ</th>
        </tr></thead>
        <tbody>${o}</tbody>
      </table>
    </div>
  </section>`}function bp(e,t,n){if(e.length===0||n.length===0)return"";const o=new Map(n.map(y=>[y.stepName,y])),r=new Map;for(const y of e){if(!y.plannedStart||!y.plannedEnd)continue;const v=o.get(y.stepName);if(!v)continue;const g=new Date(y.plannedStart),x=new Date(y.plannedEnd),C=Math.max(Math.round((x.getTime()-g.getTime())/864e5)+1,1);let A=0;for(let P=0;P<C;P++)new Date(g.getTime()+P*864e5).getDay()!==0&&A++;if(A===0)continue;const T=v.laborHours/A;for(let P=new Date(g);P<=x;P=new Date(P.getTime()+864e5)){if(P.getDay()===0)continue;const s=new Date(P);s.setDate(s.getDate()+3-(s.getDay()+6)%7);const i=new Date(s.getFullYear(),0,4),c=1+Math.round(((s.getTime()-i.getTime())/864e5-3+(i.getDay()+6)%7)/7),m=`${s.getFullYear()}-W${String(c).padStart(2,"0")}`;r.set(m,(r.get(m)??0)+T)}}if(r.size===0)return"";const l=[...r.keys()].sort(),d=t.workerCount*t.weeklyHoursLimit,p=Math.max(...r.values(),d),u=l.map(y=>{const v=r.get(y)??0,g=Math.min(v/p*100,100),x=v>d,C=x?"#ef4444":v>d*.8?"#f59e0b":"#22c55e",A=y.replace(/^\d{4}-W/,"W");return`<div style="text-align:center;flex:1;min-width:32px;">
      <div style="height:60px;display:flex;align-items:flex-end;justify-content:center;">
        <div style="width:20px;height:${g}%;background:${C};border-radius:3px 3px 0 0;min-height:2px;" title="${Math.round(v)}h / ${d}h"></div>
      </div>
      <div style="font-size:8px;color:#9ca3af;margin-top:2px;">${A}</div>
      <div style="font-size:9px;font-weight:600;color:${x?"#ef4444":"#374151"};">${Math.round(v)}h</div>
    </div>`}).join("");return`<section class="panel" style="margin-bottom:16px;">
    <div class="panel-header">
      <div><h2>週別労働時間</h2><p class="panel-caption">上限: ${t.workerCount}名 × ${t.weeklyHoursLimit}h = ${d}h/週（赤=超過）</p></div>
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
        <div style="border-top:2px dashed #ef4444;width:100%;position:relative;top:${-60*(d/p)+60}px;">
          <span style="font-size:7px;color:#ef4444;position:absolute;right:0;top:-10px;">${d}h</span>
        </div>
      </div>
      ${u}
    </div>
  </section>`}function wp(e,t,n,o={}){const{expandedBatchId:r,showNewForm:l,schedule:d=[],fy:p=2026,workerSettings:u={workerCount:2,weeklyHoursLimit:40,dayStartHour:6},stepLabor:y=[]}=o,v={};for(const s of t)(v[s.batchId]??=[]).push(s);const g=e.filter(s=>s.status==="active").length,x=e.filter(s=>s.status==="planned").length,C=e.filter(s=>s.status==="completed").length,A=r?e.find(s=>s.id===r):null,T=A?yp(A,v[A.id]??[]):"",P=A?vp(A,v[A.id]??[]):"";return`
    <section class="page-head">
      <div><p class="eyebrow">蔵内管理</p><h1>醸造工程管理</h1></div>
      <div class="meta-stack" style="display:flex;gap:8px;">
        <button class="button primary" data-action="bp-auto-schedule" style="font-size:12px;">自動スケジュール</button>
        <button class="button" data-action="bp-show-new-form">＋ 新規バッチ</button>
      </div>
    </section>
    <section class="kpi-grid compact">
      <article class="panel kpi-card"><p class="panel-title">進行中</p><p class="kpi-value">${g}</p><p class="kpi-sub">アクティブ</p></article>
      <article class="panel kpi-card"><p class="panel-title">計画中</p><p class="kpi-value">${x}</p><p class="kpi-sub">未着手</p></article>
      <article class="panel kpi-card"><p class="panel-title">完了</p><p class="kpi-value">${C}</p><p class="kpi-sub">今期</p></article>
    </section>

    ${mp(e,v,r)}
    ${bp(t,u,y)}
    ${l?fp(n):""}
    ${gp(d,e)}
    ${T}
    ${P}
    ${hp(e,v,r)}

    <div id="bp-delete-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.4);z-index:1000;align-items:center;justify-content:center;">
      <div style="background:white;border-radius:12px;padding:24px;max-width:360px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
        <h3 style="margin:0 0 12px;font-size:15px;">バッチを削除</h3>
        <p style="font-size:13px;color:#6b7280;margin-bottom:20px;"><strong id="bp-delete-batch-name"></strong> を削除します。<br>関連する全工程データも削除されます。</p>
        <div style="display:flex;justify-content:flex-end;gap:8px;">
          <button data-action="bp-delete-cancel" style="padding:8px 16px;font-size:13px;border:1px solid #d1d5db;background:white;border-radius:6px;cursor:pointer;">キャンセル</button>
          <button data-action="bp-delete-confirm" style="padding:8px 16px;font-size:13px;border:none;background:#ef4444;color:white;border-radius:6px;cursor:pointer;font-weight:600;">削除する</button>
        </div>
      </div>
    </div>`}function Ca(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e4?`${Math.round(e/1e4)}万`:new Intl.NumberFormat("ja-JP").format(e)+"円"}function xp(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function oo(e){return e?aa.find(t=>t.value===e)?.label??e:""}function $p(e){const t=[],n=[],o=[];for(const r of e){const l=r.amount_last_year_same_month>0?r.amount_this_month/r.amount_last_year_same_month:1,d={code:r.customer_code,name:r.customer_name,businessType:r.business_type,areaCode:r.area_code,phone:r.phone,lastOrderDate:r.last_order_date,daysSinceLastOrder:r.days_since_order,totalAmountLast12m:r.amount_12m,amount3m:r.amount_3m,amountThisMonth:r.amount_this_month,amountLastYearSameMonth:r.amount_last_year_same_month,annualRevenue:r.annual_revenue,yoyRatio:l,status:"dormant"};r.is_at_risk?t.push({...d,status:"at-risk"}):r.is_dormant?n.push({...d,status:"dormant"}):r.amount_last_year_same_month>0&&l<.8&&o.push({...d,status:"declining"})}return t.sort((r,l)=>l.totalAmountLast12m-r.totalAmountLast12m),n.sort((r,l)=>l.daysSinceLastOrder-r.daysSinceLastOrder),o.sort((r,l)=>r.yoyRatio-l.yoyRatio),{atRiskCustomers:t,dormantCustomers:n,decliningCustomers:o}}function _p(e,t){const n=t?.reason??"",o=aa.map(r=>`<option value="${r.value}" ${n===r.value?"selected":""}>${r.label}</option>`).join("");return`
    <select
      class="input-sm churn-reason-select"
      data-churn-code="${e}"
      style="min-width:118px;font-size:0.78rem;"
      title="注文がない理由を選択"
    >
      <option value="">— 理由を選択 —</option>
      ${o}
    </select>`}function Sp(e,t){const n={"at-risk":{label:"離反リスク",cls:"danger"},dormant:{label:"休眠",cls:"warning"},declining:{label:"下落中",cls:"info"}}[e.status],o=e.status==="declining"&&e.amountLastYearSameMonth>0?`<td class="numeric" style="color:var(--color-danger);font-weight:700;">${Math.round(e.yoyRatio*100)}%</td>`:e.status==="dormant"?`<td class="numeric" style="color:var(--color-warning);">${e.daysSinceLastOrder}日</td>`:'<td class="numeric" style="color:var(--color-danger);">今月未注文</td>',r=!!t?.actionedAt,l=r?'style="opacity:0.45;"':"",d=t?.reason?`<br><span class="status-pill info" style="font-size:0.72rem;">${oo(t.reason)}</span>`:"";return`
    <tr data-churn-code="${e.code}" data-status="${e.status}" data-area="${e.areaCode}" data-biz="${e.businessType}" data-actioned="${r?"1":"0"}" ${l}>
      <td><span class="status-pill ${n.cls}">${n.label}</span></td>
      <td>${e.name}${d}</td>
      <td class="mono" style="font-size:0.75rem;color:var(--color-muted);">${e.areaCode}</td>
      <td style="font-size:0.8rem;">${e.businessType}</td>
      <td class="mono" style="font-size:0.8rem;">${e.lastOrderDate}</td>
      ${o}
      <td class="numeric">${Ca(e.totalAmountLast12m)}</td>
      <td>${_p(e.code,t)}</td>
      <td>
        <label style="display:flex;align-items:center;gap:4px;cursor:pointer;">
          <input type="checkbox" class="churn-actioned-check" data-churn-code="${e.code}"
            ${r?"checked":""} style="cursor:pointer;width:16px;height:16px;">
          <span style="font-size:0.78rem;color:var(--color-muted);">済</span>
        </label>
      </td>
      <td><a href="tel:${e.phone}" class="button secondary small" style="white-space:nowrap;">${e.phone||"—"}</a></td>
    </tr>`}function ga(e,t,n,o,r,l,d,p){if(r.length===0)return"";const u=r.map(y=>Sp(y,p.get(y.code))).join("");return`
    <section class="panel" id="${e}-section">
      <div class="panel-header">
        <div>
          <h2><span class="status-pill ${o}" style="margin-right:8px;">${r.length}社</span>${t}</h2>
          <p class="panel-caption">${n} — 対象売上合計: ${xp(l)}</p>
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
    </section>`}function kp(e,t=[]){const{atRiskCustomers:n,dormantCustomers:o,decliningCustomers:r}=e,l=n.length+o.length+r.length,d=n.reduce((P,s)=>P+s.totalAmountLast12m,0),p=o.reduce((P,s)=>P+s.totalAmountLast12m,0),u=r.reduce((P,s)=>P+s.totalAmountLast12m,0),y=[...n,...o,...r],v=[...new Set(y.map(P=>P.areaCode).filter(Boolean))].sort(),g=[...new Set(y.map(P=>P.businessType).filter(Boolean))].sort(),x=new Map(t.map(P=>[P.customerCode,P])),C=t.filter(P=>P.actionedAt).length,A=new Map;t.forEach(P=>{P.reason&&A.set(P.reason,(A.get(P.reason)??0)+1)});const T=[...A.entries()].sort((P,s)=>s[1]-P[1]).slice(0,5).map(([P,s])=>`<span class="status-pill info" style="font-size:0.75rem;">${oo(P)} ${s}社</span>`).join(" ");return`
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
        <div class="kpi-trend" style="color:var(--color-danger);">${Ca(d)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-warning);">
        <div class="kpi-label">🟠 休眠顧客</div>
        <div class="kpi-value">${o.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-warning);">${Ca(p)} 相当</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-info);">
        <div class="kpi-label">🟡 売上下落中</div>
        <div class="kpi-value">${r.length}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-info);">前年同月比80%未満</div>
      </div>
      <div class="kpi-card" style="border-top:3px solid var(--color-success);">
        <div class="kpi-label">✅ 対応済み</div>
        <div class="kpi-value">${C}<span class="kpi-sub">社</span></div>
        <div class="kpi-trend" style="color:var(--color-muted);">${l}社中</div>
      </div>
    </section>

    ${T?`
    <div class="panel" style="padding:12px 16px;">
      <p style="font-size:0.8rem;color:var(--color-muted);margin-bottom:6px;">注文しない理由 — 内訳</p>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${T}</div>
    </div>`:""}

    <div class="button-group" style="margin-bottom:8px;flex-wrap:wrap;gap:6px;">
      <button class="button secondary small" type="button" data-churn-filter="all">すべて (${l})</button>
      <button class="button secondary small" type="button" data-churn-filter="at-risk">離反リスク (${n.length})</button>
      <button class="button secondary small" type="button" data-churn-filter="dormant">休眠 (${o.length})</button>
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

    ${ga("at-risk","離反リスク","前年同月に注文があったが今月まだない顧客","danger",n,d,"状況",x)}
    ${ga("dormant","休眠顧客","12ヶ月以内に注文があったが3ヶ月以上空白がある顧客","warning",o,p,"経過日数",x)}
    ${ga("declining","売上下落中","前年同月比80%未満の顧客（離反・休眠を除く）","info",r,u,"前年同月比",x)}

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
    <\/script>`}const Fe=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],Da={"year-round":"通年品",seasonal:"季節品","year-end":"歳暮品"},ze={"year-round":"#0F5B8D",seasonal:"#2f855a","year-end":"#c05621"};function Pp(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ep(e){const t=e.reduce((l,d)=>l+d,0);if(t===0)return"year-round";if((e[10]+e[11])/t>.5)return"year-end";const o=Math.max(...e);return e.filter(l=>l>o*.1).length<=6?"seasonal":"year-round"}function Ap(e){const t=e.reduce((l,d)=>l+d,0);if(t===0)return[];const o=t/12*1.5,r=[];for(let l=0;l<12;l++)e[l]>o&&r.push(l);if(r.length===0){const l=Math.max(...e);l>0&&r.push(e.indexOf(l))}return r.sort((l,d)=>l-d)}function Lp(e){return e.length===0?0:(e[0]-2+12)%12}function On(e){const t=new Date().getMonth(),n=e.map(r=>{const l=Ep(r.monthlyQuantity),d=Ap(r.monthlyQuantity),p=Lp(d);return{code:r.code,name:r.name,category:r.category,peakMonths:d,proposalStartMonth:p,seasonType:l,monthlyQuantity:r.monthlyQuantity}}),o=[];for(let r=0;r<12;r++){const l=n.filter(d=>{if(d.peakMonths.length===0)return!1;const p=d.proposalStartMonth,u=d.peakMonths[0];return p<=u?r>=p&&r<=u:r>=p||r<=u});o.push({month:r,products:l,targetCustomers:[]})}return{products:n,proposals:o,selectedMonth:t}}function Cp(e){const{products:t,proposals:n,selectedMonth:o}=e,r=new Date().getMonth(),l={"year-round":[],seasonal:[],"year-end":[]};t.forEach(g=>l[g.seasonType].push(g));const d=n[o],p=t.length,u=d?.products.length??0,y=t.filter(g=>g.peakMonths.includes(o)).length,v=d?.targetCustomers.length??0;return`
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
      <div class="eyebrow">${Fe[o]} 提案商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#2f855a">${u}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">${Fe[o]} ピーク商品</div>
      <div class="mono numeric" style="font-size:1.5rem;color:#c05621">${y}</div>
    </div>
    <div class="kpi-card">
      <div class="eyebrow">提案対象顧客</div>
      <div class="mono numeric" style="font-size:1.5rem">${v}</div>
    </div>
  </div>

  <!-- Month selector bar -->
  <div style="display:flex;gap:4px;margin-bottom:1.5rem;flex-wrap:wrap">
    ${Fe.map((g,x)=>{const C=x===r,A=x===o;return`<button class="button" style="padding:4px 10px;background:${A?"#0F5B8D":C?"#e2e8f0":"transparent"};color:${A?"#fff":"#333"};border:${C&&!A?"2px solid #0F5B8D":"1px solid #cbd5e0"};border-radius:4px;font-size:0.8rem;cursor:pointer" data-action="select-month" data-month="${x}">${g}${C?" ●":""}</button>`}).join("")}
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
            ${Fe.map((g,x)=>`<th style="text-align:center;padding:6px 2px;border-bottom:2px solid #e2e8f0;min-width:36px;${x===r?"background:#f0f7ff;":""}">${g.replace("月","")}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${Dp(l,r)}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Product groups -->
  ${qp(l,o)}

  <!-- Target customer list for selected month -->
  ${Ip(d)}
</div>`}function Dp(e,t){const n=[],o=["year-round","seasonal","year-end"];for(const r of o){const l=e[r];if(l.length!==0){n.push(`<tr><td colspan="14" style="padding:8px 8px 4px;font-weight:600;background:#f7fafc;border-bottom:1px solid #e2e8f0">
      <span class="status-pill" style="background:${ze[r]}15;color:${ze[r]};padding:2px 8px;border-radius:9px;font-size:0.75rem">${Da[r]}</span>
    </td></tr>`);for(const d of l){const p=Fe.map((u,y)=>{const v=d.peakMonths.includes(y),g=ro(d,y),x=y===t?"outline:2px solid #0F5B8D;outline-offset:-1px;":"";let C="transparent";v?C=ze[d.seasonType]:g&&(C=ze[d.seasonType]+"40");const A=v||g?`background:${C};border-radius:3px;height:18px;width:100%;`:"";return`<td style="padding:2px;text-align:center;${x}"><div style="${A}" title="${v?"ピーク":g?"提案期間":""}"></div></td>`}).join("");n.push(`<tr style="border-bottom:1px solid #f0f0f0">
        <td style="padding:4px 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px" title="${d.name}"><span class="mono" style="font-size:0.7rem;color:#888">${d.code}</span> ${d.name}</td>
        <td style="padding:4px"><span class="status-pill" style="font-size:0.65rem;padding:1px 5px;background:${ze[d.seasonType]}15;color:${ze[d.seasonType]}">${Da[d.seasonType]}</span></td>
        ${p}
      </tr>`)}}}return n.join("")}function ro(e,t){if(e.peakMonths.length===0||e.peakMonths.includes(t))return!1;const n=e.proposalStartMonth,o=e.peakMonths[0];return n<=o?t>=n&&t<o:t>=n||t<o}function qp(e,t){const o=["year-round","seasonal","year-end"].map(r=>{const l=e[r];if(l.length===0)return"";const d=l.filter(u=>u.peakMonths.includes(t)||ro(u,t));if(d.length===0)return"";const p=d.map(u=>{const v=u.peakMonths.includes(t)?'<span class="status-pill" style="background:#c0562115;color:#c05621">ピーク月</span>':'<span class="status-pill" style="background:#2f855a15;color:#2f855a">提案開始</span>',g=u.monthlyQuantity.reduce((x,C)=>x+C,0);return`<tr>
        <td class="mono" style="padding:6px 8px">${u.code}</td>
        <td style="padding:6px 8px">${u.name}</td>
        <td style="padding:6px 8px">${v}</td>
        <td class="mono numeric" style="padding:6px 8px">${u.monthlyQuantity[t].toLocaleString()}</td>
        <td class="mono numeric" style="padding:6px 8px">${g.toLocaleString()}</td>
        <td style="padding:6px 8px">${u.peakMonths.map(x=>Fe[x]).join(", ")}</td>
      </tr>`}).join("");return`
    <div class="table-wrap" style="margin-bottom:1rem">
      <h4 style="margin-bottom:0.5rem;display:flex;align-items:center;gap:8px">
        <span class="status-pill" style="background:${ze[r]}15;color:${ze[r]}">${Da[r]}</span>
        <span style="font-size:0.85rem;color:#666">${Fe[t]}の対象: ${d.length}品</span>
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
    </div>`}).filter(Boolean);return o.length===0?`<div style="padding:1rem;color:#666;text-align:center">${Fe[t]}に提案対象の商品はありません</div>`:o.join("")}function Ip(e){return!e||e.targetCustomers.length===0?`
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
      <td class="mono numeric" style="padding:6px 8px">${Pp(n.lastYearAmount)}</td>
      <td style="padding:6px 8px"><button class="button" style="font-size:0.75rem;padding:2px 8px" data-action="create-proposal" data-customer="${n.code}">提案作成</button></td>
    </tr>
  `).join("")}</tbody>
    </table>
  </div>`}const Tp=["日","月","火","水","木","金","土"];function Mp(e){const[t,n]=e.split("-").map(Number),o=new Date(t,n-1,1),r=new Date(t,n,0),l=[];for(let d=0;d<o.getDay();d++)l.push({outside:!0});for(let d=1;d<=r.getDate();d++)l.push({date:`${e}-${String(d).padStart(2,"0")}`});for(;l.length%7!==0;)l.push({outside:!0});return l}function Np(e,t,n){const[o,r]=t.split("-").map(Number),l=new Date(o,r-2,1),d=new Date(o,r,1),p=`${l.getFullYear()}-${String(l.getMonth()+1).padStart(2,"0")}`,u=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`,y=new Date().toISOString().slice(0,10),g=Mp(t).map(T=>{if(T.outside)return'<div class="sc-cell sc-outside"></div>';const P=T.date,s=Number(P.split("-")[2]),i=new Date(`${P}T00:00:00`).getDay(),c=e?.[P],m=P===y,h=P===n;let b="",w="";return c&&(b=`<span class="sc-badge">${c.count}件</span>`,w=c.cityGroups.slice(0,3).map($=>`<span class="sc-city-tag">${$.city}<em>${$.count}</em></span>`).join(""),c.cityGroups.length>3&&(w+=`<span class="sc-city-more">+${c.cityGroups.length-3}</span>`)),`
      <div class="sc-cell ${m?"sc-today":""} ${h?"sc-selected":""} ${c?"sc-has-data":""}"
           data-sc-date="${P}">
        <div class="sc-day-header">
          <span class="sc-day-num ${i===0?"sc-sun":i===6?"sc-sat":""}">${s}</span>
          ${b}
        </div>
        <div class="sc-cities">${w}</div>
      </div>
    `}).join(""),x=n&&e?.[n]?Rp(e[n]):n?`<div class="sc-detail-empty"><p>📦 ${n.slice(5)} は出荷なし</p></div>`:'<div class="sc-detail-empty"><p>日付を選択すると出荷先一覧が表示されます</p></div>',C=Object.values(e??{}).reduce((T,P)=>T+P.count,0),A=Object.values(e??{}).reduce((T,P)=>T+P.totalAmount,0);return`
    <section class="panel sc-panel">
      <div class="sc-header">
        <div class="sc-title-row">
          <h2 class="sc-title">📦 出荷カレンダー</h2>
          <div class="sc-month-summary">
            ${C>0?`月計: <strong>${C}件</strong> / <strong>¥${A.toLocaleString()}</strong>`:""}
          </div>
        </div>
        <div class="sc-nav">
          <button class="sc-nav-btn" data-sc-ym="${p}">◀</button>
          <span class="sc-month-label">${o}年${r}月</span>
          <button class="sc-nav-btn" data-sc-ym="${u}">▶</button>
        </div>
      </div>

      <div class="sc-body">
        <div class="sc-calendar-col">
          <div class="sc-weekdays">
            ${Tp.map((T,P)=>`<div class="sc-weekday ${P===0?"sc-sun":P===6?"sc-sat":""}">${T}</div>`).join("")}
          </div>
          <div class="sc-grid">
            ${e===null?'<div class="sc-loading"><div class="loading-spinner"></div><p>読み込み中…</p></div>':g}
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
  `}function Rp(e){const t=e.date.replace(/-/g,"/").slice(5),n={};for(const r of e.entries)(n[r.city]??=[]).push(r);const o=Object.entries(n).sort((r,l)=>l[1].length-r[1].length).map(([r,l])=>{const d=l.sort((p,u)=>u.amount-p.amount).map(p=>`
          <div class="sc-customer-row">
            <span class="sc-customer-name" title="${p.customerName}">${p.customerName}</span>
            <span class="sc-customer-amt">${p.amount>0?`¥${p.amount.toLocaleString()}`:"-"}</span>
          </div>`).join("");return`
        <div class="sc-city-section">
          <div class="sc-city-label">📍 ${r}（${l.length}件）</div>
          ${d}
        </div>`}).join("");return`
    <p class="sc-detail-date">${t}の出荷</p>
    <p class="sc-detail-meta">${e.count}件 / ¥${e.totalAmount.toLocaleString()}</p>
    ${o}
  `}const Op=new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}),fa=["月","火","水","木","金"],Bn=6;function Bp(e,t){if(!e)return 9999;const n=new Date(e);return isNaN(n.getTime())?9999:Math.floor((t.getTime()-n.getTime())/(1e3*60*60*24))}function jp(e,t){if(t.length===0)return 0;const n=[...t].sort((r,l)=>r-l);return n.filter(r=>r<=e).length/n.length}function zp(e,t){return e.includes("離反リスク")?"緊急訪問 - 離反防止ヒアリング":e.includes("季節提案タイミング")?"季節商品の提案・試飲サンプル持参":t>30?"定期巡回 - 状況確認・追加注文確認":"関係維持 - ご挨拶"}function jn(e){const t=new Date,n=e.map(u=>u.annualRevenue),o=e.map(u=>{const y=Bp(u.lastOrderDate,t);let v=0;const g=[];y>=60&&(v+=50,g.push("離反リスク")),u.hasSeasonalProposal&&(v+=30,g.push("季節提案タイミング")),y>=30&&y<60&&(v+=20,g.push("定期巡回"));const x=jp(u.annualRevenue,n),C=Math.round(x*20);C>0&&(v+=C,g.push("金額ウェイト"));const A=zp(g,y);return{code:u.code,name:u.name,phone:u.phone,address:u.address1,areaCode:u.areaCode,businessType:u.businessType,priorityScore:v,reasons:g,lastOrderDate:u.lastOrderDate,daysSinceOrder:y,annualRevenue:u.annualRevenue,recommendedAction:A}}).filter(u=>u.priorityScore>0).sort((u,y)=>y.priorityScore-u.priorityScore),r=new Map;for(const u of o){const y=u.areaCode||"その他";r.has(y)||r.set(y,[]),r.get(y).push(u)}const l=[...r.entries()].sort((u,y)=>y[1].reduce((v,g)=>v+g.priorityScore,0)-u[1].reduce((v,g)=>v+g.priorityScore,0)),d=[];let p=0;for(const[u,y]of l){const v=y.sort((g,x)=>x.priorityScore-g.priorityScore);for(let g=0;g<v.length&&!(p>=fa.length);g+=Bn){const x=v.slice(g,g+Bn);d.push({dayLabel:fa[p],area:u,visits:x}),p++}if(p>=fa.length)break}return{candidates:o,weekPlan:d,filterArea:"",filterMinScore:0}}function Fp(e){const{candidates:t,weekPlan:n,filterArea:o,filterMinScore:r}=e,l=t.filter(g=>!(o&&g.areaCode!==o||r>0&&g.priorityScore<r)),d=Array.from(new Set(t.map(g=>g.areaCode))).sort(),p=l.length,u=l.filter(g=>g.priorityScore>=50).length,y=l.filter(g=>g.reasons.includes("離反リスク")).length,v=n.reduce((g,x)=>g+x.visits.length,0);return`
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
            ${d.map(g=>`<option value="${g}"${o===g?" selected":""}>${g}</option>`).join("")}
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
      ${n.length===0?"<p>訪問候補がありません。</p>":Vp(n)}
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
            ${l.map(g=>Up(g)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function Vp(e){return`
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
  `}function Up(e){return`
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
      <td class="numeric">${Op.format(e.annualRevenue)}</td>
      <td>${e.recommendedAction}</td>
    </tr>
  `}function Yp(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},o=e.map(y=>{const v=y.capacity>0?Math.round(y.currentVolume/y.capacity*100):0;return`
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
      `}).join(""),r=e.filter(y=>y.status==="in_use").length,l=e.filter(y=>y.status==="aging").length,d=e.filter(y=>y.status==="empty").length,p=e.reduce((y,v)=>y+v.capacity,0),u=e.reduce((y,v)=>y+v.currentVolume,0);return`
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
          <tbody>${o||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function va(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Jp(e,t,n){const o=e.rows.map((y,v)=>`
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
        <td class="numeric"><strong>${va(y.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${v}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),r=e.deductions.map((y,v)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${v}" data-ded-field="type">
            ${Object.keys(_a).map(g=>`<option value="${g}" ${g===y.type?"selected":""}>${_a[g]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${v}" data-ded-field="categoryCode">
            ${xs.map(g=>`<option value="${g.code}" ${g.code===y.categoryCode?"selected":""}>${g.code}:${g.name}</option>`).join("")}
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
    `).join(""),l=Array.from({length:12},(y,v)=>v+1),d=e.rows.reduce((y,v)=>y+v.exportDeduction+v.sampleDeduction,0),p=e.rows.reduce((y,v)=>y+v.productionVolume,0),u=p>0?d/p*100:0;return`
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
        <p class="kpi-value">${va(e.totalTax)}</p>
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
              <th class="numeric">${va(e.totalTax)}</th>
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
  `}const Kp={success:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M6.5 6.5L11.5 11.5M11.5 6.5L6.5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',warning:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 7V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="13" r="0.8" fill="currentColor"/></svg>',info:'<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8.5" stroke="currentColor"/><path d="M9 8V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="5.5" r="0.8" fill="currentColor"/></svg>'};let He=null,Hp=0;const qa=[];function Qp(){return He&&document.body.contains(He)||(He=document.createElement("div"),He.className="toast-container",document.body.appendChild(He)),He}function B(e,t="success",n){const o=Qp(),r=++Hp,l=t==="error"?5e3:t==="warning"?4e3:3e3,d=document.createElement("div");d.className=`toast toast-${t}`,d.setAttribute("role","status"),d.setAttribute("aria-live","polite"),d.innerHTML=`
    <span class="toast-icon">${Kp[t]}</span>
    <span class="toast-msg">${Gp(e)}</span>
    <button class="toast-dismiss" aria-label="閉じる">✕</button>
  `;const p={id:r,message:e,type:t,el:d};qa.push(p),o.appendChild(d),requestAnimationFrame(()=>{d.classList.add("toast-enter")});const u=()=>Wp(p);d.querySelector(".toast-dismiss").addEventListener("click",u),setTimeout(()=>{d.classList.add("toast-exit"),d.addEventListener("animationend",u,{once:!0})},l)}function Wp(e){const t=qa.indexOf(e);t!==-1&&(qa.splice(t,1),e.el.remove())}function Gp(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Pe(e,t={}){const{title:n="確認",confirmLabel:o="OK",cancelLabel:r="キャンセル",variant:l="primary"}=t;return new Promise(d=>{const p=document.createElement("div");p.className="modal-backdrop confirm-backdrop",p.setAttribute("role","dialog"),p.setAttribute("aria-modal","true"),p.innerHTML=`
      <div class="modal-panel confirm-panel">
        <div class="confirm-body">
          <div class="confirm-icon confirm-icon-${l}">
            ${l==="danger"?Xp:Zp}
          </div>
          <h3 class="confirm-title">${jt(n)}</h3>
          <p class="confirm-message">${jt(e)}</p>
        </div>
        <div class="confirm-actions">
          <button class="button secondary confirm-cancel">${jt(r)}</button>
          <button class="button ${l} confirm-ok">${jt(o)}</button>
        </div>
      </div>
    `;const u=v=>{p.classList.add("confirm-exit"),p.addEventListener("animationend",()=>{p.remove()},{once:!0}),d(v)};p.querySelector(".confirm-cancel").addEventListener("click",()=>u(!1)),p.querySelector(".confirm-ok").addEventListener("click",()=>u(!0)),p.addEventListener("click",v=>{v.target===p&&u(!1)});const y=v=>{v.key==="Escape"&&(document.removeEventListener("keydown",y),u(!1))};document.addEventListener("keydown",y),document.body.appendChild(p),requestAnimationFrame(()=>{p.querySelector(".confirm-ok")?.focus()})})}const Xp=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10 10L18 18M18 10L10 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`,Zp=`<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
  <circle cx="14" cy="14" r="13" stroke="currentColor" stroke-width="1.5"/>
  <path d="M14 8V9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M14 12V20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;function jt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function zn(e){const n=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Ia(e,t,n){if(t.length===0&&(!n||n.length===0))return;const o=n&&n.length>0?n:Object.keys(t[0]??{}).map(y=>({key:y,label:y})),l=`\uFEFF${[o.map(y=>zn(y.label)).join(","),...t.map(y=>o.map(v=>zn(y[v.key])).join(","))].join(`\r
`)}`,d=new Blob([l],{type:"text/csv;charset=utf-8;"}),p=URL.createObjectURL(d),u=document.createElement("a");u.href=p,u.download=e,document.body.append(u),u.click(),u.remove(),window.setTimeout(()=>URL.revokeObjectURL(p),0)}const eu=Object.fromEntries(aa.map(e=>[e.value,e.label])),tu=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/customer-analysis","/invoice-entry","/quote","/quote-settings","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer","/map","/workflow","/mobile-order","/tour","/mail-senders","/calendar","/integrations","/shopify","/fax","/users","/profile","/audit","/prospects","/slack","/calls","/list-builder","/raw-browser","/demand-forecast","/churn-alert","/seasonal-calendar","/visit-planner","/demand","/shipment-calendar","/brewing-plan","/procurement","/brewing-process"];let ot=[];async function au(){const{supabaseQueryAll:e}=await q(async()=>{const{supabaseQueryAll:n}=await Promise.resolve().then(()=>Z);return{supabaseQueryAll:n}},void 0);ot=(await e("customers",{select:"name,email,delivery_area_code",email:"neq.",is_active:"eq.true"})).filter(n=>typeof n.email=="string"&&n.email.length>0).map(n=>({name:String(n.name??""),email:String(n.email??""),area:String(n.delivery_area_code??""),historySegment:"seasonal"}))}const Fn=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/customer-analysis",title:"得意先分析"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"},{path:"/map",title:"取引先マップ"},{path:"/workflow",title:"受注ワークフロー"},{path:"/mobile-order",title:"モバイル受注"},{path:"/tour",title:"酒蔵見学"},{path:"/mail-senders",title:"メール送信元管理"},{path:"/calendar",title:"カレンダー"},{path:"/integrations",title:"外部連携設定"},{path:"/shopify",title:"Shopify注文"},{path:"/fax",title:"FAX OCR"},{path:"/users",title:"ユーザー管理"},{path:"/profile",title:"プロフィール"},{path:"/audit",title:"操作ログ"},{path:"/prospects",title:"新規営業"},{path:"/slack",title:"Slack通知"},{path:"/calls",title:"通話履歴(IVRy)"},{path:"/list-builder",title:"リスト取得ツール"},{path:"/raw-browser",title:"データブラウザ"},{path:"/churn-alert",title:"離反アラート・休眠顧客"},{path:"/seasonal-calendar",title:"季節提案カレンダー"},{path:"/visit-planner",title:"訪問計画・ルート最適化"},{path:"/demand",title:"需要分析・安全在庫・生産計画"},{path:"/shipment-calendar",title:"出荷カレンダー"},{path:"/brewing-plan",title:"醸造計画"},{path:"/procurement",title:"調達計画"},{path:"/brewing-process",title:"醸造工程"}];function io(e){const t=Oa[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function an(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function nu(){const e=io("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const sa=new Date,su=sa.toISOString().slice(0,7),ou=sa.getFullYear(),ru=sa.getMonth()+1,iu=sa.toISOString().slice(0,10),lu="C0011",Qe=nu();function lo(e){const t="/".endsWith("/")?"/".slice(0,-1):"/",n=e.startsWith(t)?e.slice(t.length)||"/":e;return tu.includes(n)?n:"/"}function nn(e){switch(e){case"/invoice-entry":case"/quote":case"/quote-settings":case"/delivery":case"/billing":case"/invoice":case"/ledger":case"/shipment-calendar":return"sales";case"/analytics":case"/customer-analysis":case"/product-power":case"/customer-efficiency":case"/report":return"analytics";case"/prospects":case"/map":case"/list-builder":case"/calls":case"/email":case"/mail-senders":case"/workflow":case"/mobile-order":case"/shopify":case"/fax":case"/churn-alert":case"/seasonal-calendar":case"/visit-planner":return"crm";case"/purchase":case"/raw-material":return"orders";case"/jikomi":case"/tanks":case"/kentei":case"/materials":case"/tax":case"/demand":case"/brewing-plan":case"/procurement":case"/brewing-process":return"brewery";case"/master":case"/calendar":case"/store":case"/tour":case"/print":case"/form-designer":return"master";case"/setup":case"/integrations":case"/slack":case"/import":case"/raw-browser":case"/users":case"/profile":case"/audit":return"settings";default:return"dashboard"}}const Vn=lo(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,syncDashboard:null,systemHealth:null,rawTableList:[],rawRecords:[],rawSelectedTable:null,rawPage:1,rawTotalCount:0,invoiceRecords:[],customerLedger:null,salesAnalytics:null,customerAnalysis:null,productABC:null,invoiceForm:an(),invoiceSaving:!1,invoiceSavedDocNo:null,invoicePriceGroup:"",pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:su,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:ou,taxMonth:ru,taxVolume:null,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,mapRegionFilter:"",workflowOrders:[],mobileOrder:{step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},tourInquiries:[],tourActiveId:null,mailSenders:[],mailSenderEditingId:null,emailSenderId:"default",calendarEvents:[],calendarYearMonth:new Date().toISOString().slice(0,7),calendarFilterCategory:"",calendarEdit:null,integrations:[],integrationEditingId:null,shopifyOrders:[],faxRecords:[],faxProcessing:!1,faxOcrText:null,userProfiles:[],userEditingId:null,myProfile:null,auditLogs:[],prospects:[],prospectActivities:[],prospectEditingId:null,prospectViewMode:"kanban",slackRules:[],slackLogs:[],materialEditing:null,materialEditingIsNew:!1,deliveryLocations:[],mapCustomers:[],callLogs:[],mapFilters:{filterStatus:"all",filterArea:"",filterBiz:""},leadLists:[],leadItems:[],leadActiveListId:null,leadSearchQuery:"",leadSearchArea:"",leadSearchType:"",leadSearching:!1,leadSearchResults:[],printTemplate:"chain_store",printOptions:{...Ld,overlayImageUrl:`${"/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...Cd},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:iu,route:Vn,currentCategory:nn(Vn),sidebarOpen:!1,announcements:[],dismissedAnnouncements:new Set,updateAvailable:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},invoiceSelectedDocNo:null,invoiceSelectedLines:null,ledgerCustomerCode:lu,salesPeriod:"month",customRange:{start:"",end:""},quoteState:Wt(ka()),quoteCustomerQuery:"",quoteProductQuery:"",quotePricing:null,quoteList:[],quoteListLoading:!1,quoteEditId:null,quoteCompanySettings:ka(),productPower:[],productFilter:"all",productPeriod:"year",productDaily:[],productCustomStart:"",productCustomEnd:"",productSortState:[],customerSortState:[],dashboardSortState:[],masterSortState:[],analyticsSortState:[],customerEfficiency:[],customerEfficiencyYear:(()=>{const e=new Date;return e.getMonth()>=3?e.getFullYear():e.getFullYear()-1})(),customerEfficiencyGroupBy:"billing",masterTab:"customers",masterFilter:{...Xa},analyticsTab:"products",analyticsPeriod:"all",analyticsPeriodFilter:"",analyticsPeriodRows:[],analyticsPeriodChartData:[],analyticsPrevYearChartData:[],analyticsChartMetric:"amount",analyticsFiscalMode:"calendar",analyticsPeriodOptions:[],analyticsStaffFilter:"",analyticsTagFilter:"",analyticsStaffPeriod:"all",analyticsStaffPeriodFilter:"",analyticsStaffPeriodOptions:[],analyticsStaffTotals:[],analyticsStaffDrilldown:null,analyticsDrilldown:null,emailAudienceMode:Qe.mode,emailRegion:Qe.region,emailHistorySegment:Qe.historySegment,emailTemplateId:Qe.templateId,emailSubject:Qe.subject,emailBody:Qe.body,emailSaveMessage:Qe.saveMessage,emailSending:!1,demandForecast:{...xl},shipmentCalendarData:null,shipmentCalendarYearMonth:new Date().toISOString().slice(0,7),shipmentCalendarSelectedDate:null,churnAlert:null,churnNotes:[],seasonalCalendar:null,visitPlanner:null,demandAnalysis:null,safetyStockParams:[],productionPlan:[],demandTab:"demand",demandPlanYearMonth:new Date().toISOString().slice(0,7),demandYearsBack:3,demandPlanTypeFilter:"monthly",brewingPlanData:[],brewingMonthlyTrend:[],brewingPlanFY:(()=>{const e=new Date;return e.getMonth()>=9?e.getFullYear():e.getFullYear()-1})(),demandSort:null,calendarShifts:Jt(new Date().toISOString().slice(0,7),1,0),calendarDefaultPart:1,calendarDefaultEmp:0,calendarSelectedDate:null,calendarLabelExcluded:new Set,calendarCapacity:{partCapacity:ct,empCapacity:dt},brewingSchedule:[],brewingProductDetail:[],brewingExcludedProducts:new Set,brewingCustomCategories:[],brewingOverrides:{},brewingStockEntries:[],brewingTypeLinks:{},brewingAvailableTypes:[],brewingAlcoholSettings:{},brewingYearlyShipments:[],brewingSeasonalPattern:[],brewingForecastOverrides:{},brewingRiceParams:{},riceVarieties:[],ricePurchaseCommitments:[],procurementDecisions:{},brewingBatches:[],brewingProcessSteps:[],bpExpandedBatchId:"",bpShowNewForm:!1,bpWorkerSettings:{workerCount:2,weeklyHoursLimit:40,dayStartHour:6,deadlineDate:"",allowSunday:!1},bpStepLabor:[],globalSearchOpen:!1,globalQuery:"",orderHeaders:[],authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function Un(e){return e.slice(0,10)}function cu(e){return{...e}}function Xt(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function co(){a.invoiceForm=an(),a.invoiceSavedDocNo=null,a.invoicePriceGroup="",a.invoiceErrors={},Xt()}function po(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((n,o)=>{n.productCode.trim()||(t[`lines.${o}.productCode`]="商品コードは必須です。"),n.productName.trim()||(t[`lines.${o}.productName`]="商品名は必須です。"),n.quantity<=0&&(t[`lines.${o}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(t[`lines.${o}.unitPrice`]="単価は0円以上で入力してください。")}),t}function du(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,cu(t))}function pu(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((o,r)=>{const l=r===0?1:2,d=1200*(r+1);return{productCode:o.code,productName:o.name,quantity:l,unitPrice:d,unit:"本",amount:l*d}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function uu(e){const t=a.masterStats?.customers.find(n=>n.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function mu(e){const t=a.masterStats?.customers.find(n=>n.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,a.invoicePriceGroup=t.priceGroup||"",!0):!1}function uo(e){if(Te(e),a.invoiceErrors=po(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){S();return}a.invoiceSaving=!0,S(),rs(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=an(),S()}).catch(()=>{a.invoiceSaving=!1,S()})}function mo(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((o,r)=>new Date(r.date).getTime()-new Date(o.date).getTime()).filter(o=>{const r=new Date(o.date);return!(t&&r<t||n&&r>n)})}function yo(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?ot:ot.filter(e=>e.area===a.emailRegion);case"history":return ot.filter(e=>e.historySegment===a.emailHistorySegment);default:return ot}}function yu(){const e=yo();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending,senderId:a.emailSenderId,senders:a.mailSenders}}function ba(e){const t=yo(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:t.length,recipients:t.map(o=>o.email),status:e}}function sn(){return a.user,!1}function kt(){a.globalSearchOpen=!1,a.globalQuery=""}function hu(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:Fn.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:Fn}}function gu(){let e=[],t,n="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?mo(a.salesSummary):[]).map(o=>({documentNo:o.documentNo,date:o.date,customerCode:o.customerCode,customerName:o.customerName,amount:o.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((o,r)=>r.balanceAmount-o.balanceAmount).map(o=>({...o})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":e=a.purchaseList.map(o=>({...o})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(o=>({...o})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":e=a.tankList.map(o=>({...o})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":e=a.kenteiList.map(o=>({...o})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":e=a.materialList.map(o=>({...o})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(o=>({...o}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(e=a.masterStats?.products.map(o=>({...o}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Ia(n,e,t)}function wa(e){const t=`${"/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=nn(e),a.sidebarOpen=!1,kt(),on(e)}async function on(e){a.actionLoading=!0,S();try{switch(e){case"/quote":if(a.quoteEditId===null&&a.quoteList.length===0&&(a.quoteListLoading=!0,S(),a.quoteList=await Ga(),a.quoteListLoading=!1),a.prospects.length===0){const{fetchProspects:t}=await q(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>R);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/invoice":a.invoiceRecords.length===0&&(a.invoiceRecords=await St(a.invoiceFilter));break;case"/analytics":(!a.salesAnalytics||a.salesAnalytics.monthlySales.length===0)&&(a.salesAnalytics=await za());break;case"/delivery":a.deliveryNote||(a.deliveryNote=await Fa(a.deliverySearchDocNo));break;case"/shipment-calendar":{const{fetchShipmentCalendar:t}=await q(async()=>{const{fetchShipmentCalendar:n}=await Promise.resolve().then(()=>R);return{fetchShipmentCalendar:n}},void 0);a.shipmentCalendarData=await t(a.shipmentCalendarYearMonth);break}case"/billing":a.billingSummary||(a.billingSummary=await Va(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await ea());break;case"/product-power":a.productPower.length===0&&(a.productPower=await ds());break;case"/customer-efficiency":a.customerEfficiency=await wt(a.customerEfficiencyYear,a.customerEfficiencyGroupBy);break;case"/customer-analysis":a.customerAnalysis||(a.customerAnalysis=await ps());break;case"/demand-forecast":if(a.demandForecast.forecasts.length===0){const{fetchDemandForecasts:t,fetchDeliverySchedule:n}=await q(async()=>{const{fetchDemandForecasts:l,fetchDeliverySchedule:d}=await Promise.resolve().then(()=>R);return{fetchDemandForecasts:l,fetchDeliverySchedule:d}},void 0),[o,r]=await Promise.all([t(),n()]);a.demandForecast.forecasts=o.map(l=>({code:l.productCode,name:l.productName,segment:l.segment,monthlyQuantity:new Array(12).fill(0),avgMonthly:Math.round(l.avgMonthly),adjustedAvg:Math.round(l.avgMonthly),nextMonthForecast:Math.round(l.forecastQuantity),annualForecast:Math.round(l.avgMonthly*12),safetyStock:Math.round(l.safetyStock)})),a.demandForecast.deliveries=$l(r)}break;case"/churn-alert":{const{fetchChurnAlerts:t,fetchChurnNotes:n}=await q(async()=>{const{fetchChurnAlerts:o,fetchChurnNotes:r}=await Promise.resolve().then(()=>R);return{fetchChurnAlerts:o,fetchChurnNotes:r}},void 0);if(!a.churnAlert){const o=await t();a.churnAlert=$p(o)}a.churnNotes=await n();break}case"/seasonal-calendar":if(!a.seasonalCalendar){const{fetchProductShipmentsFromTable:t}=await q(async()=>{const{fetchProductShipmentsFromTable:o}=await Promise.resolve().then(()=>R);return{fetchProductShipmentsFromTable:o}},void 0),n=await t();if(n.length>0)a.seasonalCalendar=On(n.map(o=>({code:o.code,name:o.name,category:"",monthlyQuantity:o.monthlyQuantity})));else{const{fetchProductMonthlyShipments:o}=await q(async()=>{const{fetchProductMonthlyShipments:l}=await Promise.resolve().then(()=>R);return{fetchProductMonthlyShipments:l}},void 0),r=await o();a.seasonalCalendar=On(r.map(l=>({code:l.code,name:l.name,category:"",monthlyQuantity:l.monthlyQuantity})))}}break;case"/visit-planner":if(!a.visitPlanner){const{fetchVisitPriorities:t}=await q(async()=>{const{fetchVisitPriorities:o}=await Promise.resolve().then(()=>R);return{fetchVisitPriorities:o}},void 0),n=await t();if(n.length>0)a.visitPlanner={candidates:n.map(o=>({code:o.customer_code,name:o.customer_name,phone:o.phone,address:o.address,areaCode:o.area_code,businessType:o.business_type,priorityScore:o.priority_score,reasons:o.reasons,lastOrderDate:o.last_order_date,daysSinceOrder:o.days_since_order,annualRevenue:o.annual_revenue,recommendedAction:o.recommended_action})),weekPlan:[],filterArea:"",filterMinScore:0},a.visitPlanner=jn(n.map(o=>({code:o.customer_code,name:o.customer_name,phone:o.phone,address1:o.address,areaCode:o.area_code,businessType:o.business_type,annualRevenue:o.annual_revenue,lastOrderDate:o.last_order_date,hasSeasonalProposal:o.reasons.some(r=>r.includes("季節"))})));else{const{supabaseQueryAll:o}=await q(async()=>{const{supabaseQueryAll:u}=await Promise.resolve().then(()=>Z);return{supabaseQueryAll:u}},void 0),[r,l]=await Promise.all([o("sales_document_headers",{select:"sales_date,legacy_customer_code,total_amount"}),a.masterStats?Promise.resolve(a.masterStats.customers):Ba().then(u=>u.customers)]),d=a.masterStats?.customers??l,p=new Map;r.forEach(u=>{const y=u.legacy_customer_code||"",v=u.sales_date||"",g=Number(u.total_amount)||0,x=p.get(y);!x||v>x.lastDate?p.set(y,{lastDate:v,total:(x?.total??0)+g}):x.total+=g}),a.visitPlanner=jn(d.filter(u=>u.isActive).map(u=>({code:u.code,name:u.name,phone:u.phone,address1:u.address1,areaCode:u.areaCode,businessType:u.businessType,annualRevenue:p.get(u.code)?.total??0,lastOrderDate:p.get(u.code)?.lastDate??"",hasSeasonalProposal:!1})))}}break;case"/demand":{const{fetchDemandAnalysis:t,fetchSafetyStockParams:n,fetchProductionPlan:o,fetchLabelExclusions:r}=await q(async()=>{const{fetchDemandAnalysis:d,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:y}=await Promise.resolve().then(()=>R);return{fetchDemandAnalysis:d,fetchSafetyStockParams:p,fetchProductionPlan:u,fetchLabelExclusions:y}},void 0);if(!a.demandAnalysis){const[d,p]=await Promise.all([t(a.demandYearsBack*12),n()]);a.demandAnalysis=d,a.safetyStockParams=p}if(a.productionPlan.length===0){const d=await o(a.demandPlanYearMonth);d.length>0?a.productionPlan=d:a.demandAnalysis&&a.safetyStockParams.length>0&&(a.productionPlan=buildPlanFromAnalysis(a.demandPlanYearMonth))}const l=await r(a.demandPlanYearMonth);if(a.calendarLabelExcluded=new Set(l),a.productionPlan.length>0){const d=a.productionPlan.filter(p=>!a.calendarLabelExcluded.has(p.productCode));Ie(a.calendarShifts,d,a.calendarCapacity)}break}case"/procurement":case"/brewing-plan":{const{fetchBrewingPlanSummary:t,fetchBrewingMonthlyTrend:n,fetchBrewingSchedule:o,fetchBrewingProductDetail:r,fetchBrewingCustomCategories:l,fetchBrewingCategoryOverrides:d,fetchAllBrewingStockEntries:p,fetchCategoryTypeLinks:u,fetchAvailableProductionTypes:y,fetchBrewingAlcoholSettings:v,fetchBrewingYearlyShipments:g,fetchBrewingSeasonalPattern:x,fetchBrewingForecastOverrides:C,fetchBrewingRiceParams:A,fetchRiceVarieties:T,fetchRicePurchaseCommitments:P,fetchProcurementDecisions:s}=await q(async()=>{const{fetchBrewingPlanSummary:W,fetchBrewingMonthlyTrend:J,fetchBrewingSchedule:K,fetchBrewingProductDetail:le,fetchBrewingCustomCategories:re,fetchBrewingCategoryOverrides:ce,fetchAllBrewingStockEntries:Y,fetchCategoryTypeLinks:Q,fetchAvailableProductionTypes:X,fetchBrewingAlcoholSettings:ie,fetchBrewingYearlyShipments:$e,fetchBrewingSeasonalPattern:me,fetchBrewingForecastOverrides:be,fetchBrewingRiceParams:Oe,fetchRiceVarieties:oa,fetchRicePurchaseCommitments:At,fetchProcurementDecisions:fo}=await Promise.resolve().then(()=>R);return{fetchBrewingPlanSummary:W,fetchBrewingMonthlyTrend:J,fetchBrewingSchedule:K,fetchBrewingProductDetail:le,fetchBrewingCustomCategories:re,fetchBrewingCategoryOverrides:ce,fetchAllBrewingStockEntries:Y,fetchCategoryTypeLinks:Q,fetchAvailableProductionTypes:X,fetchBrewingAlcoholSettings:ie,fetchBrewingYearlyShipments:$e,fetchBrewingSeasonalPattern:me,fetchBrewingForecastOverrides:be,fetchBrewingRiceParams:Oe,fetchRiceVarieties:oa,fetchRicePurchaseCommitments:At,fetchProcurementDecisions:fo}},void 0),i=a.brewingPlanFY,c=`${i}-10-01`,m=`${i+1}-09-30`,[h,b,w,$,_,k,E,L,I,M,O,N,j,V,z,U,H]=await Promise.all([t(c,m).catch(()=>[]),n(c,m).catch(()=>[]),o(i).catch(()=>[]),r(c,m).catch(()=>[]),l().catch(()=>[]),d().catch(()=>({})),p().catch(()=>[]),u().catch(()=>({})),y().catch(()=>[]),v().catch(()=>({})),g().catch(()=>[]),x().catch(()=>[]),C().catch(()=>({})),A().catch(()=>({})),T().catch(()=>[]),P(i).catch(()=>[]),s(i).catch(()=>({}))]);a.brewingPlanData=h,a.brewingMonthlyTrend=b,a.brewingSchedule=w,a.brewingProductDetail=$,a.brewingCustomCategories=_,a.brewingOverrides=k,a.brewingStockEntries=E,a.brewingTypeLinks=L,a.brewingAvailableTypes=I,a.brewingYearlyShipments=O,a.brewingSeasonalPattern=N,a.brewingForecastOverrides=j,a.brewingRiceParams=V,a.riceVarieties=z,a.ricePurchaseCommitments=U,a.procurementDecisions=H,a.brewingAlcoholSettings=M;break}case"/brewing-process":{const{fetchBrewingBatches:t,fetchBrewingProcessSteps:n,fetchBrewingCustomCategories:o,fetchBrewingSchedule:r,fetchWorkerSettings:l,fetchStepLabor:d,fetchBrewingRiceParams:p}=await q(async()=>{const{fetchBrewingBatches:T,fetchBrewingProcessSteps:P,fetchBrewingCustomCategories:s,fetchBrewingSchedule:i,fetchWorkerSettings:c,fetchStepLabor:m,fetchBrewingRiceParams:h}=await Promise.resolve().then(()=>R);return{fetchBrewingBatches:T,fetchBrewingProcessSteps:P,fetchBrewingCustomCategories:s,fetchBrewingSchedule:i,fetchWorkerSettings:c,fetchStepLabor:m,fetchBrewingRiceParams:h}},void 0),u=a.brewingPlanFY,[y,v,g,x,C,A]=await Promise.all([t(u).catch(()=>[]),o().catch(()=>[]),r(u).catch(()=>[]),l().catch(()=>({workerCount:2,weeklyHoursLimit:40,dayStartHour:6})),d().catch(()=>[]),p().catch(()=>({}))]);a.brewingBatches=y,a.brewingSchedule=g,a.bpWorkerSettings=x,a.bpStepLabor=C,a.brewingRiceParams=A,y.length>0?a.brewingProcessSteps=await n(y.map(T=>T.id)).catch(()=>[]):a.brewingProcessSteps=[],a.brewingCustomCategories=v;break}case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await ms());break;case"/tanks":a.tankList.length===0&&(a.tankList=await ys());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await hs());break;case"/materials":a.materialList.length===0&&(a.materialList=await gs());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([fs(),vs()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([bs(),ws()]));break;case"/tax":(!a.taxDeclaration||!a.taxVolume)&&([a.taxDeclaration,a.taxVolume]=await Promise.all([Ya(a.taxYear,a.taxMonth),Ja(a.taxYear,a.taxMonth)]));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([Ka(a.storeSalesDate),_s()]));break;case"/mail-senders":case"/email":{const{fetchMailSenders:t}=await q(async()=>{const{fetchMailSenders:n}=await Promise.resolve().then(()=>R);return{fetchMailSenders:n}},void 0);if(a.mailSenders=await t(),!a.emailSenderId||!a.mailSenders.find(n=>n.id===a.emailSenderId)){const n=a.mailSenders.find(o=>o.isDefault)??a.mailSenders[0];n&&(a.emailSenderId=n.id)}}break;case"/calendar":{const{fetchCalendarEvents:t}=await q(async()=>{const{fetchCalendarEvents:n}=await Promise.resolve().then(()=>R);return{fetchCalendarEvents:n}},void 0);a.calendarEvents=await t(a.calendarYearMonth)}break;case"/integrations":{const{fetchIntegrationSettings:t}=await q(async()=>{const{fetchIntegrationSettings:n}=await Promise.resolve().then(()=>R);return{fetchIntegrationSettings:n}},void 0);a.integrations=await t()}break;case"/shopify":{const{fetchShopifyOrders:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchShopifyOrders:o,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>R);return{fetchShopifyOrders:o,fetchIntegrationSettings:r}},void 0);a.shopifyOrders=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/fax":{const{fetchFaxInbox:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchFaxInbox:o,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>R);return{fetchFaxInbox:o,fetchIntegrationSettings:r}},void 0);a.faxRecords=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/ledger":a.customerLedger=await ja(a.ledgerCustomerCode);break;case"/setup":[a.syncDashboard,a.systemHealth]=await Promise.all([ts(),as()]);break;case"/raw-browser":a.rawTableList.length===0&&(a.rawTableList=await Ds());break;case"/users":{const{fetchUserProfiles:t}=await q(async()=>{const{fetchUserProfiles:n}=await Promise.resolve().then(()=>R);return{fetchUserProfiles:n}},void 0);a.userProfiles=await t()}break;case"/profile":{const{fetchMyProfile:t,fetchAuditLogs:n,fetchMailSenders:o}=await q(async()=>{const{fetchMyProfile:l,fetchAuditLogs:d,fetchMailSenders:p}=await Promise.resolve().then(()=>R);return{fetchMyProfile:l,fetchAuditLogs:d,fetchMailSenders:p}},void 0),r=a.user?.email??a.myProfile?.email??"";r&&(a.myProfile=await t(r)),a.mailSenders.length===0&&(a.mailSenders=await o()),a.auditLogs=await n(50)}break;case"/audit":{const{fetchAuditLogs:t}=await q(async()=>{const{fetchAuditLogs:n}=await Promise.resolve().then(()=>R);return{fetchAuditLogs:n}},void 0);a.auditLogs=await t(200)}break;case"/prospects":{const{fetchProspects:t}=await q(async()=>{const{fetchProspects:n}=await Promise.resolve().then(()=>R);return{fetchProspects:n}},void 0);a.prospects=await t()}break;case"/map":{const{fetchMapCustomers:t,fetchDeliveryLocations:n}=await q(async()=>{const{fetchMapCustomers:l,fetchDeliveryLocations:d}=await Promise.resolve().then(()=>R);return{fetchMapCustomers:l,fetchDeliveryLocations:d}},void 0),[o,r]=await Promise.all([t(),n()]);a.mapCustomers=o,a.deliveryLocations=r}break;case"/calls":{const{fetchCallLogs:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchCallLogs:o,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>R);return{fetchCallLogs:o,fetchIntegrationSettings:r}},void 0);a.callLogs=await t(100),a.integrations.length===0&&(a.integrations=await n())}break;case"/list-builder":{const{fetchLeadLists:t,fetchIntegrationSettings:n}=await q(async()=>{const{fetchLeadLists:o,fetchIntegrationSettings:r}=await Promise.resolve().then(()=>R);return{fetchLeadLists:o,fetchIntegrationSettings:r}},void 0);a.leadLists=await t(),a.integrations.length===0&&(a.integrations=await n())}break;case"/workflow":{const{fetchWorkflowOrdersFromDb:t}=await q(async()=>{const{fetchWorkflowOrdersFromDb:n}=await Promise.resolve().then(()=>R);return{fetchWorkflowOrdersFromDb:n}},void 0);a.workflowOrders=await t()}break;case"/tour":{const{fetchTourInquiriesFromDb:t}=await q(async()=>{const{fetchTourInquiriesFromDb:n}=await Promise.resolve().then(()=>R);return{fetchTourInquiriesFromDb:n}},void 0);a.tourInquiries=await t()}break;case"/slack":{const{fetchSlackRules:t,fetchSlackLogs:n,fetchIntegrationSettings:o}=await q(async()=>{const{fetchSlackRules:r,fetchSlackLogs:l,fetchIntegrationSettings:d}=await Promise.resolve().then(()=>R);return{fetchSlackRules:r,fetchSlackLogs:l,fetchIntegrationSettings:d}},void 0);a.slackRules=await t(),a.slackLogs=await n(50),a.integrations.length===0&&(a.integrations=await o())}break;case"/":break;default:break}}catch(t){console.error("Route data load error:",e,t),B(`データ読み込みエラー: ${t.message??"不明"}`,"error")}finally{a.actionLoading=!1,S()}}function Yn(){if(sn())return mc(a.authError,a.authSubmitting);if(a.loading)return`
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
    `;switch(a.route){case"/cat/sales":return Lt("sales");case"/cat/brewery":return Lt("brewery");case"/cat/purchase":return Lt("purchase");case"/cat/more":return Lt("more");case"/invoice-entry":return Bl(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/quote":return a.quoteEditId===null?Yl(a.quoteList,a.quoteListLoading):Vs(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);case"/quote-settings":return Kl(a.quoteCompanySettings);case"/email":return Ml(yu());case"/delivery":return a.deliveryNote?Il(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/shipment-calendar":return Np(a.shipmentCalendarData,a.shipmentCalendarYearMonth,a.shipmentCalendarSelectedDate);case"/billing":return a.billingSummary?yl(a.billingSummary,a.billingYearMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/report":return a.salesReport?Hc(a.salesReport):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/product-power":return tc(a.productPower,a.productFilter,a.productDaily,a.productPeriod,a.productCustomStart,a.productCustomEnd,a.productSortState);case"/customer-efficiency":return ac(a.customerEfficiency,a.customerSortState,a.customerEfficiencyYear,a.customerEfficiencyGroupBy);case"/customer-analysis":return a.customerAnalysis?Bc(a.customerAnalysis):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/demand-forecast":return Pl(a.demandForecast);case"/demand":return Wd(a.demandAnalysis,a.safetyStockParams,a.productionPlan,a.demandTab,a.demandPlanYearMonth,a.demandYearsBack,a.demandPlanTypeFilter,a.demandSort,a.calendarShifts,a.calendarSelectedDate,a.calendarLabelExcluded,a.calendarCapacity);case"/brewing-plan":return op(a.brewingPlanData,a.brewingMonthlyTrend,a.brewingPlanFY,a.brewingProductDetail,a.brewingExcludedProducts,a.brewingCustomCategories,a.brewingOverrides,a.brewingStockEntries,a.brewingAlcoholSettings,a.brewingYearlyShipments,a.brewingSeasonalPattern,a.brewingForecastOverrides,a.brewingRiceParams);case"/procurement":{const e={};if(a.brewingYearlyShipments.length>0){const t=new Date,n=t.getMonth()+1,o=n>=10?t.getFullYear():t.getFullYear()-1,r=[...new Set(a.brewingYearlyShipments.map(u=>u.fy))].filter(u=>u<o).sort(),l=new Map;for(const u of a.brewingSeasonalPattern)l.has(u.brewCategory)||l.set(u.brewCategory,new Map),l.get(u.brewCategory).set(u.monthNum,u.avgMonthlyL);const d=[];for(let u=n;u<=9;u++)d.push(u);if(n>=10)for(let u=1;u<=9;u++)d.push(u);const p=new Map;for(const u of a.brewingYearlyShipments)p.has(u.brewCategory)||p.set(u.brewCategory,new Map),p.get(u.brewCategory).set(u.fy,{shipL:u.shipmentL,annualL:u.annualizedL});for(const[u,y]of p){const v=r.filter(b=>y.has(b)).map(b=>y.get(b).shipL);let g=0;if(v.length>=2){const b=[];for(let w=1;w<v.length;w++)v[w-1]>0&&b.push((v[w]-v[w-1])/v[w-1]);g=b.length>0?b.reduce((w,$)=>w+$,0)/b.length:0}const x=u in a.brewingForecastOverrides?a.brewingForecastOverrides[u]:g,C=v.length>0?v[v.length-1]:y.get(o)?.annualL??0,A=l.get(u)??new Map,T=d.reduce((b,w)=>b+(A.get(w)??0),0),P=a.brewingStockEntries.filter(b=>b.brewCategory===u).reduce((b,w)=>b+w.volumeL,0),s=a.brewingAlcoholSettings[u],i=s&&s.targetAlcoholPct>0?s.rawAlcoholPct/s.targetAlcoholPct:1,c=Math.round(P*i),m=Math.max(0,c-Math.round(T)),h=Math.round(C*(1+x));e[u]=Math.max(0,h-m)}}return lp(e,a.brewingRiceParams,a.brewingCustomCategories,a.brewingSchedule,a.brewingPlanFY,a.riceVarieties,a.ricePurchaseCommitments,a.procurementDecisions)}case"/churn-alert":return a.churnAlert?kp(a.churnAlert,a.churnNotes):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">離反データを分析中…</p></div></section>';case"/seasonal-calendar":return a.seasonalCalendar?Cp(a.seasonalCalendar):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">季節データを分析中…</p></div></section>';case"/visit-planner":return a.visitPlanner?Fp(a.visitPlanner):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">訪問計画を生成中…</p></div></section>';case"/brewing-process":{const e=[...new Set(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール",...a.brewingCustomCategories.map(t=>t.name)])];return wp(a.brewingBatches,a.brewingProcessSteps,e,{expandedBatchId:a.bpExpandedBatchId,showNewForm:a.bpShowNewForm,schedule:a.brewingSchedule.map(t=>({brewCategory:t.brewCategory,fy:t.fy,brewMonth:t.brewMonth,durationMonths:t.durationMonths,plannedVolumeL:t.plannedVolumeL})),fy:a.brewingPlanFY,workerSettings:a.bpWorkerSettings,stepLabor:a.bpStepLabor})}case"/jikomi":return a.jikomiView==="calendar"?`${xn(a.jikomiList,a.jikomiView)}${dc(a.jikomiList)}`:xn(a.jikomiList,a.jikomiView);case"/tanks":return Yp(a.tankList);case"/kentei":return pc(a.kenteiList);case"/materials":return kc(a.materialList)+Sc(a.materialEditing,a.materialEditingIsNew);case"/purchase":return Cc(a.purchaseList,a.payableList);case"/raw-material":return Dc(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?Jp(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/store":return Xc(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?Mc(a.pipelineMeta,fe,oe,a.syncDashboard,a.systemHealth):'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">データを読み込んでいます…</p></div></section>';case"/raw-browser":return Bd(a.rawSelectedTable,a.rawRecords,a.rawTableList,a.rawPage,a.rawTotalCount);case"/import":return ed(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return Td(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return ad(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode);case"/map":return a.mapCustomers.length===0?'<section class="panel"><div class="loading-overlay"><div class="loading-spinner"></div><p class="loading-text">マップデータを読み込み中…</p></div></section>':nd(a.mapCustomers,a.deliveryLocations,a.mapFilters);case"/workflow":return rd(a.workflowOrders);case"/mobile-order":return id(a.mobileOrder,a.masterStats?.customers??[],a.masterStats?.products??[]);case"/tour":return cd(a.tourInquiries,a.tourActiveId);case"/mail-senders":return ud(a.mailSenders,a.mailSenderEditingId);case"/calendar":return md(a.calendarEvents,a.calendarYearMonth,a.calendarFilterCategory,a.calendarEdit);case"/integrations":return hd(a.integrations,a.integrationEditingId);case"/shopify":{const e=a.integrations.find(t=>t.id==="shopify");return gd(a.shopifyOrders,e?.lastSyncAt??null)}case"/fax":return fd(a.faxRecords,a.faxProcessing,a.faxOcrText);case"/users":return vd(a.userProfiles,a.userEditingId,a.myProfile);case"/profile":return bd(a.myProfile,a.auditLogs.filter(e=>e.userEmail===a.myProfile?.email),a.mailSenders);case"/audit":return wd(a.auditLogs);case"/prospects":{const e={prospects:a.prospects,activities:a.prospectActivities,editingId:a.prospectEditingId,viewMode:a.prospectViewMode};return xd(e)}case"/slack":{const e=a.integrations.find(t=>t.provider==="slack")??null;return kd(e,a.slackRules,a.slackLogs)}case"/calls":{const e=a.integrations.find(t=>t.provider==="ivry");return Pd(a.callLogs,a.masterStats?.customers??[],e?.lastSyncAt??null,e?.isEnabled??!1)}case"/list-builder":{const e={lists:a.leadLists,activeListId:a.leadActiveListId,items:a.leadItems,searchQuery:a.leadSearchQuery,searchArea:a.leadSearchArea,searchBusinessType:a.leadSearchType,searching:a.leadSearching,searchResults:a.leadSearchResults};return Ad(e)}}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.salesAnalytics)return"";switch(a.route){case"/sales":return Gc(mo(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return Ac([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return _c(a.masterStats,a.masterTab,a.masterFilter,a.masterSortState);case"/invoice":return sc(a.invoiceRecords,a.invoiceFilter,a.invoiceSelectedDocNo,a.invoiceSelectedLines);case"/ledger":return bl(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return Qs(a.salesAnalytics,a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter,a.analyticsPeriodRows,a.analyticsPeriodOptions,a.analyticsStaffFilter,a.analyticsTagFilter,a.analyticsStaffDrilldown,a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter,a.analyticsStaffPeriodOptions,a.analyticsStaffTotals,a.analyticsSortState,a.analyticsDrilldown,a.analyticsPeriodChartData,a.analyticsPrevYearChartData,a.analyticsChartMetric,a.analyticsFiscalMode);case"/":return vu();default:return Ll(a.salesSummary,a.pipelineMeta,a.salesAnalytics,{upcomingEvents:a.calendarEvents,tourInquiries:a.tourInquiries,workflowOrdersCount:{new:a.workflowOrders.filter(e=>e.stage==="new").length,picking:a.workflowOrders.filter(e=>e.stage==="picking").length,packed:a.workflowOrders.filter(e=>e.stage==="packed").length,shipped:a.workflowOrders.filter(e=>e.stage==="shipped").length,total:a.workflowOrders.length},lowStockCount:a.materialList.filter(e=>e.currentStock<e.minimumStock*1.5).length,masterCounts:a.masterStats?{customers:a.masterStats.summary.customerCount,products:a.masterStats.summary.productCount,suppliers:a.syncDashboard?.tables.find(e=>e.tableName==="suppliers")?.rowCount??0,specialPrices:a.syncDashboard?.tables.find(e=>e.tableName==="customer_product_prices")?.rowCount??0}:void 0,churnSummary:a.churnAlert?{atRiskCount:a.churnAlert.atRiskCustomers.length,dormantCount:a.churnAlert.dormantCustomers.length,decliningCount:a.churnAlert.decliningCustomers.length,totalImpact:[...a.churnAlert.atRiskCustomers,...a.churnAlert.dormantCustomers,...a.churnAlert.decliningCustomers].reduce((e,t)=>e+t.totalAmountLast12m,0)}:void 0,orderHeaders:a.orderHeaders},a.salesPeriod,a.customRange,a.dashboardSortState)}}function fu(){const e={info:{bg:"#edf6ff",border:"#b8d4e8",icon:"ℹ️"},warning:{bg:"#fff8e6",border:"#e6c54d",icon:"⚠️"},maintenance:{bg:"#fff3e0",border:"#f5a623",icon:"🔧"},update:{bg:"#e8f5e9",border:"#66bb6a",icon:"🆕"}},n=a.announcements.filter(r=>!a.dismissedAnnouncements.has(r.id)).map(r=>{const l=e[r.level]??e.info;return`
      <div class="announcement-bar" style="background:${l.bg};border-bottom:2px solid ${l.border};">
        <span class="announcement-text">${l.icon} ${r.message}</span>
        ${r.dismissible?`<button class="announcement-dismiss" data-action="dismiss-announcement" data-id="${r.id}" aria-label="閉じる">✕</button>`:""}
      </div>`}).join(""),o=a.updateAvailable?`<div class="announcement-bar" style="background:#e8f5e9;border-bottom:2px solid #66bb6a;">
        <span class="announcement-text">🆕 新しいバージョンが利用可能です</span>
        <button class="button primary small" data-action="reload-app">更新する</button>
      </div>`:"";return n+o}function vu(){function e(n,o,r,l){return`<a href="${`${"/".replace(/\/$/,"")||"/"}${n}`}" data-link="${n}" class="home-card">
      <span class="home-card-icon">${o}</span>
      <span class="home-card-label">${r}</span>
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
  `}function bu(){if(sn())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${Yn()}</div>
        </main>
      </div>
    `;const e={"/invoice-entry":"伝票入力","/quote":a.quoteEditId?a.quoteEditId==="new"?"見積作成":"見積編集":"見積一覧","/quote-settings":"見積設定","/email":"メール配信","/delivery":"納品書","/shipment-calendar":"出荷カレンダー","/billing":"月次請求","/report":"集計帳票","/invoice":"伝票照会","/ledger":"得意先台帳","/payment":"入金状況","/sales":"売上一覧","/analytics":"売上分析","/customer-analysis":"得意先分析","/product-power":"商品力分析","/customer-efficiency":"営業効率","/churn-alert":"営業アクション","/visit-planner":"訪問計画","/seasonal-calendar":"季節提案","/map":"取引先マップ","/prospects":"新規営業","/list-builder":"リスト取得","/calls":"通話履歴","/workflow":"受注ワークフロー","/mobile-order":"モバイル受注","/shopify":"Shopify注文","/fax":"FAX OCR","/purchase":"仕入・買掛","/raw-material":"手形・原料","/jikomi":"仕込管理","/tanks":"タンク管理","/kentei":"検定管理","/materials":"資材管理","/tax":"酒税申告","/demand":"需要・生産計画","/brewing-plan":"醸造計画","/procurement":"調達計画","/brewing-process":"醸造工程","/master":"マスタ管理","/calendar":"カレンダー","/store":"店舗・直売所","/tour":"酒蔵見学","/print":"印刷","/setup":"連動設定","/integrations":"外部連携","/slack":"Slack通知","/import":"データ取込","/raw-browser":"データブラウザ","/users":"ユーザー管理","/profile":"プロフィール","/audit":"操作ログ"},t=a.route==="/",n=e[a.route]??"",o=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?Rl(a.masterStats.customers,a.pickerQuery):Lc(a.masterStats.products,a.pickerQuery):"",r=a.globalSearchOpen?Nl(a.globalQuery,hu()):"",l=a.user?`<span class="app-header-user">${a.user.email}</span>
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
      ${fu()}
      <main class="main-v2">
        <div class="view ${a.actionLoading?"is-busy":""}">${Yn()}</div>
        <button class="no-print" data-action="print-page" title="印刷" style="position:fixed;bottom:24px;right:24px;z-index:900;width:48px;height:48px;border-radius:50%;background:#1e40af;color:white;border:none;cursor:pointer;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;" aria-label="印刷">🖨</button>
      </main>
      ${o}
      ${r}
    </div>
  `}async function wu(){a.actionLoading=!0,S();try{const{fetchSalesSummary:e}=await q(async()=>{const{fetchSalesSummary:t}=await Promise.resolve().then(()=>R);return{fetchSalesSummary:t}},void 0);a.salesSummary=await e()}finally{a.actionLoading=!1,S()}}async function xu(e){a.actionLoading=!0,S();try{a.invoiceRecords=await St(e)}finally{a.actionLoading=!1,S()}}async function $u(e){a.actionLoading=!0,S();try{a.customerLedger=await ja(e)}finally{a.actionLoading=!1,S()}}function Te(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,n)=>{const o=parseFloat(e.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,r=parseFloat(e.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??t.unit,quantity:o,unitPrice:r,amount:o*r}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function We(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function _u(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,S()}),e.querySelectorAll("[data-action='global-search-close']").forEach(s=>{s.addEventListener("click",i=>{s.classList.contains("global-search")&&i.target instanceof HTMLElement&&!i.target.classList.contains("global-search")||(kt(),S())})}),e.querySelector("#global-search-input")?.addEventListener("input",s=>{a.globalQuery=s.target.value,S()}),e.querySelectorAll("[data-action='global-nav']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.path;i&&(kt(),wa(i))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{gu()}),e.querySelectorAll("[data-jikomi-tab]").forEach(s=>{s.addEventListener("click",()=>{a.jikomiView=s.dataset.jikomiTab,S()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const s=e.querySelector("#auth-email")?.value.trim()??"",i=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,S(),$o(s,i).then(async c=>{a.user=c,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null;const{fetchMyProfile:m,recordAudit:h}=await q(async()=>{const{fetchMyProfile:b,recordAudit:w}=await Promise.resolve().then(()=>R);return{fetchMyProfile:b,recordAudit:w}},void 0);a.myProfile=await m(c.email),await h({action:"sign_in",userEmail:c.email}),S()}).catch(async c=>{try{const m=await ln(s,i);a.user=m,a.authSkipped=!1,a.authError=null;const{fetchMyProfile:h}=await q(async()=>{const{fetchMyProfile:b}=await Promise.resolve().then(()=>R);return{fetchMyProfile:b}},void 0);a.myProfile=await h(m.email)}catch{a.authError=c instanceof Error?c.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,S()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,S()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{_o().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,S()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(s=>{s.addEventListener("click",()=>{a.sidebarOpen=!1,S()})});const t=e.querySelector(".sidebar");if(t&&a.sidebarOpen){let s=0;t.addEventListener("touchstart",i=>{s=i.touches[0].clientX},{passive:!0}),t.addEventListener("touchend",i=>{i.changedTouches[0].clientX-s<-60&&(a.sidebarOpen=!1,S())},{passive:!0})}e.querySelectorAll("[data-action='dismiss-announcement']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.id??"";a.dismissedAnnouncements.add(i),S()})}),e.querySelector("[data-action='reload-app']")?.addEventListener("click",()=>{location.reload()}),e.querySelector("[data-action='share-page']")?.addEventListener("click",async()=>{const s=window.location.href,i=document.title;if(navigator.share)try{await navigator.share({url:s,title:i})}catch{}else try{await navigator.clipboard.writeText(s),B("URLをコピーしました","success")}catch{B("コピーに失敗しました","error")}}),e.querySelectorAll("[data-link]").forEach(s=>{s.addEventListener("click",i=>{i.preventDefault(),wa(s.dataset.link)})}),e.querySelector("#feature-request-form")?.addEventListener("submit",async s=>{s.preventDefault();const i=e.querySelector("#fr-title")?.value??"",c=e.querySelector("#fr-category")?.value??"feature",m=e.querySelector("#fr-description")?.value??"",h=e.querySelector("#fr-result");if(!i.trim())return;const b=await is(i,c,m);if(h&&(h.textContent=b?"送信しました":"送信に失敗しました",h.className=`fr-result ${b?"success":"error"}`),b){const w=e.querySelector("#feature-request-form");w&&w.reset()}}),e.querySelectorAll("[data-period]").forEach(s=>{s.addEventListener("click",()=>{a.salesPeriod=s.dataset.period,S()})}),e.querySelector("[data-action='apply-range']")?.addEventListener("click",()=>{const s=e.querySelector("#range-start")?.value??"",i=e.querySelector("#range-end")?.value??"";s&&i&&(a.customRange={start:s,end:i},a.salesPeriod="custom",S())}),e.querySelectorAll("[data-edit-customer]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.editCustomer??"",c=a.masterStats?.customers.find(h=>h.id===i);if(!c)return;const m=document.createElement("div");m.innerHTML=yc(c),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-customer-form")?.addEventListener("submit",async h=>{h.preventDefault();const b=document.getElementById("edit-result"),w=document.getElementById("ec-trade-type")?.value||null,$=await ls(i,{name:document.getElementById("ec-name").value,kana_name:document.getElementById("ec-kana").value,phone:document.getElementById("ec-phone").value,fax:document.getElementById("ec-fax").value,postal_code:document.getElementById("ec-postal").value,address1:document.getElementById("ec-address").value,closing_day:parseInt(document.getElementById("ec-closing").value)||null,payment_day:parseInt(document.getElementById("ec-payment").value)||null,trade_type:w,manual_override:!0});b&&(b.textContent=$?"保存しました":"保存に失敗",b.className=`fr-result ${$?"success":"error"}`),$&&(document.getElementById("edit-modal")?.remove(),rt())})})}),e.querySelectorAll("[data-edit-product]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.editProduct??"",c=a.masterStats?.products.find(h=>h.id===i);if(!c)return;const m=document.createElement("div");m.innerHTML=hc(c),document.body.appendChild(m.firstElementChild),document.querySelector("[data-action='close-modal']")?.addEventListener("click",()=>{document.getElementById("edit-modal")?.remove()}),document.getElementById("edit-product-form")?.addEventListener("submit",async h=>{h.preventDefault();const b=document.getElementById("edit-result"),w=await cs(i,{name:document.getElementById("ep-name").value,category_code:document.getElementById("ep-category").value,alcohol_degree:parseFloat(document.getElementById("ep-alcohol").value)||null,volume_ml:parseInt(document.getElementById("ep-volume").value)||null,bottle_type:document.getElementById("ep-bottle").value,purchase_price:parseInt(document.getElementById("ep-purchase").value)||null,default_sale_price:parseInt(document.getElementById("ep-sale").value)||null,manual_override:!0});b&&(b.textContent=w?"保存しました":"保存に失敗",b.className=`fr-result ${w?"success":"error"}`),w&&(document.getElementById("edit-modal")?.remove(),rt())})})}),e.querySelector("[data-action='quote-new']")?.addEventListener("click",()=>{a.quoteState=Wt(a.quoteCompanySettings),a.quoteEditId="new",a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,S()}),e.querySelectorAll("[data-open-quote]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.openQuote,c=await Is(i);if(!c){B("見積の読み込みに失敗しました","error");return}a.quoteState={id:c.id,quoteNo:c.quote_no,quoteDate:c.quote_date,validUntil:c.valid_until??"",customerCode:c.legacy_customer_code??"",customerName:c.customer_name,customerAddress:c.customer_address,subject:c.subject,lines:c.lines.map(m=>({productCode:m.legacy_product_code??"",productName:m.product_name,janCode:m.jan_code??"",caseQty:m.case_qty,quantity:m.quantity,unit:m.unit,unitPrice:m.unit_price,retailPrice:m.retail_price,amount:m.amount})),remarks:c.remarks,taxRate:c.tax_rate,deliveryDate:c.delivery_date,paymentTerms:c.payment_terms,deliveryPlace:c.delivery_place,templateType:c.template_type??"sake",previewMode:!1},a.quoteEditId=i,a.quoteCustomerQuery="",a.quoteProductQuery="",a.quotePricing=null,S()})}),e.querySelectorAll("[data-delete-quote]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.deleteQuote,c=s.dataset.quoteNo??i;if(!await Pe(`見積 ${c} を削除しますか？`))return;await Jn("quotes",i)?(a.quoteList=a.quoteList.filter(b=>b.id!==i),B("削除しました","success"),S()):B("削除に失敗しました","error")})}),e.querySelector("[data-action='quote-back-list']")?.addEventListener("click",()=>{a.quoteEditId=null,a.quoteListLoading=!0,S(),Ga().then(s=>{a.quoteList=s,a.quoteListLoading=!1,S()})}),e.querySelectorAll("[name='q-template']").forEach(s=>{s.addEventListener("change",()=>{a.quoteState.templateType=s.value,S()})});function n(s){return(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function o(s){return s.length?s.map(i=>`<button class="search-item" type="button" data-select-customer="${n(i.code)}" data-cust-name="${n(i.name)}" data-cust-addr="${n(i.address1||"")}"><span class="mono">${n(i.code)}</span><span style="font-size:13px;font-weight:600;">${n(i.name)}</span></button>`).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function r(s){s.querySelectorAll("[data-select-customer]").forEach(i=>{i.addEventListener("click",async()=>{const c=i.dataset.selectCustomer??"";a.quoteState.customerCode=c,a.quoteState.customerName=i.dataset.custName??"",a.quoteState.customerAddress=i.dataset.custAddr??"",a.quoteCustomerQuery="";const m=e.querySelector("#q-cust-search");m&&(m.value=""),s.remove(),a.quotePricing=await $a(a.masterStats?.customers??[],c),S()})})}function l(s){const i=e.querySelector("#q-cust-search")?.closest(".form-row");if(!i)return;let c=document.getElementById("cust-search-results");c||(c=document.createElement("div"),c.id="cust-search-results",c.className="search-results",i.after(c));const m=a.masterStats?.customers??[],h=s.trim().toLowerCase(),b=h.length===0?m:m.filter(w=>w.name.includes(s)||w.kanaName.includes(s)||w.code.includes(s)||w.name.toLowerCase().includes(h)||w.kanaName.toLowerCase().includes(h));c.innerHTML=o(b),r(c)}function d(s,i){return s.length?s.map(c=>{const m=i?Ua(c,i):{price:c.salePrice||0,label:"卸価格"},h=c.listPrice||0,b=m.label!=="標準価格"&&m.label!=="卸価格";return`<button class="search-item" type="button" data-add-product="${n(c.code)}" data-prod-name="${n(c.name)}" data-prod-price="${m.price}" data-prod-retail="${h}" data-prod-jan="${n(c.janCode??"")}" data-prod-unit="${n(c.unit)}" data-prod-case="${c.caseQty??""}"><span class="mono">${n(c.code)}</span><span style="font-size:13px;font-weight:600;line-height:1.4;">${n(c.name)}</span><span class="numeric"${b?' style="color:#2f855a;font-weight:700;"':""}>納入 ¥${m.price?m.price.toLocaleString("ja-JP"):"未設定"}<small style="font-weight:400;margin-left:4px;">(${n(m.label)})</small>${h?`　定価 ¥${h.toLocaleString("ja-JP")}`:""}</span></button>`}).join(""):'<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">該当なし</p>'}function p(s){s.querySelectorAll("[data-add-product]").forEach(i=>{i.addEventListener("click",()=>{const c=i.dataset.addProduct??"",m=i.dataset.prodName??"",h=parseInt(i.dataset.prodPrice??"0"),b=parseInt(i.dataset.prodRetail??"0")||null,w=i.dataset.prodJan??"",$=i.dataset.prodUnit||"本",_=i.dataset.prodCase??"",k=_?parseInt(_):null;a.quoteState.lines.push({productCode:c,productName:m,janCode:w,caseQty:k,quantity:1,unit:$,unitPrice:h,retailPrice:b,amount:h}),a.quoteProductQuery="";const E=e.querySelector("#q-prod-search");E&&(E.value=""),S()})})}function u(s){const i=e.querySelector("#q-prod-search")?.closest(".form-row");if(!i)return;let c=document.getElementById("prod-search-results");if(c||(c=document.createElement("div"),c.id="prod-search-results",c.className="search-results",i.after(c)),!a.masterStats){c.innerHTML='<p style="padding:10px 12px;color:var(--text-secondary);font-size:13px;">マスタ読込中…</p>';return}const m=a.masterStats.products,h=s.trim().toLowerCase(),b=h.length===0?m:m.filter(w=>w.name.includes(s)||w.kanaName.includes(s)||w.code.includes(s)||w.name.toLowerCase().includes(h)||w.kanaName.toLowerCase().includes(h));c.innerHTML=d(b,a.quotePricing),p(c)}function y(s,i){let c=null;function m(){c||(c=h=>{const b=document.getElementById(i);if(!b){document.removeEventListener("touchstart",c),document.removeEventListener("mousedown",c),c=null;return}s.contains(h.target)||b.contains(h.target)||(b.remove(),document.removeEventListener("touchstart",c),document.removeEventListener("mousedown",c),c=null)},document.addEventListener("touchstart",c,{passive:!0}),document.addEventListener("mousedown",c))}return m}(function(){const s=e.querySelector("#q-cust-search");if(!s)return;const i=y(s,"cust-search-results");s.addEventListener("focus",()=>{l(s.value),i()}),s.addEventListener("compositionend",()=>{a.quoteCustomerQuery=s.value,l(s.value)}),s.addEventListener("input",c=>{c.isComposing||(a.quoteCustomerQuery=s.value,l(s.value))}),s.value&&l(s.value)})(),(function(){const s=e.querySelector("#q-prod-search");if(!s)return;const i=y(s,"prod-search-results");s.addEventListener("focus",()=>{u(s.value),i()}),s.addEventListener("compositionend",()=>{a.quoteProductQuery=s.value,u(s.value)}),s.addEventListener("input",c=>{c.isComposing||(a.quoteProductQuery=s.value,u(s.value))}),s.value&&u(s.value)})(),e.querySelectorAll("[data-select-customer]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.selectCustomer??"";a.quoteState.customerCode=i,a.quoteState.customerName=s.dataset.custName??"",a.quoteState.customerAddress=s.dataset.custAddr??"",a.quoteState.isProspect=!1,a.quoteState.manualPriceType=void 0,a.quoteCustomerQuery="",a.quotePricing=await $a(a.masterStats?.customers??[],i),S()})}),e.querySelector("#q-price-type")?.addEventListener("change",s=>{const i=s.target.value;a.quoteState.manualPriceType=i,a.quotePricing?a.quotePricing={...a.quotePricing,priceType:i}:a.quotePricing={priceType:i,priceGroup:"",individualPrices:new Map},S()}),e.querySelectorAll("[data-add-product]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.addProduct??"",c=s.dataset.prodName??"",m=parseInt(s.dataset.prodPrice??"0"),h=parseInt(s.dataset.prodRetail??"0")||null,b=s.dataset.prodJan??"",w=s.dataset.prodUnit||"本",$=s.dataset.prodCase??"",_=$?parseInt($):null;a.quoteState.lines.push({productCode:i,productName:c,janCode:b,caseQty:_,quantity:1,unit:w,unitPrice:m,retailPrice:h,amount:m}),a.quoteProductQuery="",S()})}),(()=>{const s=e.querySelector("#q-prospect-search");if(!s)return;const i=y(s,"q-prospect-results");function c(m){let h=document.getElementById("q-prospect-results");if(!h)return;const b=m.trim(),w=b.length===0?a.prospects.slice(0,8):a.prospects.filter($=>$.companyName.includes(b)||($.contactName??"").includes(b)).slice(0,8);if(w.length===0){h.innerHTML="";return}h.className="search-results",h.innerHTML=w.map($=>`<button class="search-item" type="button" data-select-prospect="${$.id}" data-prospect-name="${n($.companyName)}" data-prospect-addr="${n($.address??"")}"><span style="font-size:13px;font-weight:600;">${n($.companyName)}</span><span style="font-size:11px;color:var(--text-secondary);margin-left:8px;">${n($.contactName??"")} ${$.address?"· "+$.address.slice(0,20):""}</span></button>`).join(""),h.querySelectorAll("[data-select-prospect]").forEach($=>{$.addEventListener("click",()=>{a.quoteState.customerCode="",a.quoteState.customerName=$.dataset.prospectName??"",a.quoteState.customerAddress=$.dataset.prospectAddr??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=$.dataset.selectProspect??"";const _=a.quoteState.manualPriceType??"";a.quotePricing={priceType:_,priceGroup:"",individualPrices:new Map},s.value="",h&&(h.innerHTML=""),S()})})}s.addEventListener("focus",()=>{c(s.value),i()}),s.addEventListener("input",m=>{m.isComposing||c(s.value)}),s.addEventListener("compositionend",()=>c(s.value))})(),e.querySelector("[data-action='new-prospect-from-quote']")?.addEventListener("click",()=>{const s=e.querySelector("#q-prospect-search")?.value.trim()??"",i=document.createElement("div");i.className="modal-backdrop",i.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;z-index:9999;overflow-y:auto;padding:16px 0;",i.innerHTML=`
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
    `,document.body.appendChild(i),i.querySelector("#pq-company")?.focus();const c=()=>i.remove();i.addEventListener("click",m=>{m.target===i&&c()}),i.querySelector("#prospect-quick-close")?.addEventListener("click",c),i.querySelector("#prospect-quick-close2")?.addEventListener("click",c),i.querySelector("#prospect-quick-save")?.addEventListener("click",async()=>{const m=(i.querySelector("#pq-company")?.value??"").trim();if(!m){B("会社名は必須です","warning");return}const h={id:crypto.randomUUID(),companyName:m,contactName:i.querySelector("#pq-contact")?.value.trim()||void 0,address:i.querySelector("#pq-address")?.value.trim()||void 0,phone:i.querySelector("#pq-phone")?.value.trim()||void 0,note:i.querySelector("#pq-note")?.value.trim()||void 0,stage:"warm",expectedAmount:0,probability:30},{saveProspect:b,fetchProspects:w}=await q(async()=>{const{saveProspect:k,fetchProspects:E}=await Promise.resolve().then(()=>R);return{saveProspect:k,fetchProspects:E}},void 0),$=await b(h);if(!$){B("登録失敗","error");return}a.prospects=await w(),a.quoteState.customerCode="",a.quoteState.customerName=$.companyName,a.quoteState.customerAddress=$.address??"",a.quoteState.isProspect=!0,a.quoteState.prospectId=$.id;const _=a.quoteState.manualPriceType??"";a.quotePricing={priceType:_,priceGroup:"",individualPrices:new Map},c(),B(`${$.companyName} を見込み顧客として登録しました`,"success"),S()})});function v(){It(a.quoteState);const s=e.querySelector("#q-preview-scaler");if(!s)return;s.innerHTML=Vs(a.quoteState,a.masterStats?.customers??[],a.masterStats?.products??[],a.quoteCustomerQuery,a.quoteProductQuery,a.quotePricing,a.quoteCompanySettings);const i=s.querySelector(".q-preview-doc"),c=s.parentElement?.clientWidth??0,m=i?.offsetWidth??0;if(c>0&&m>0&&m>c-24){const h=(c-24)/m;s.style.transform=`scale(${h})`,s.style.transformOrigin="top left",s.style.height=`${((i?.offsetHeight??0)+48)*h}px`}else s.style.transform="",s.style.height=""}for(const s of["q-no","q-date","q-valid","q-subject","q-payment-terms","q-delivery-date","q-delivery-place"])e.querySelector(`#${s}`)?.addEventListener("input",v);e.querySelector("#q-remarks")?.addEventListener("input",v),e.querySelectorAll(".qty-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.quantity=parseFloat(s.value)||0,c.amount=c.quantity*c.unitPrice,v())})}),e.querySelectorAll(".price-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.unitPrice=parseInt(s.value)||0,c.amount=c.quantity*c.unitPrice,v())})}),e.querySelectorAll(".jan-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.janCode=s.value,v())})}),e.querySelectorAll(".case-qty-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.caseQty=s.value?parseInt(s.value):null,v())})}),e.querySelectorAll(".retail-price-input").forEach(s=>{s.addEventListener("change",()=>{const i=parseInt(s.dataset.lineIdx??"0"),c=a.quoteState.lines[i];c&&(c.retailPrice=s.value?parseInt(s.value):null,v())})}),e.querySelectorAll("[data-remove-line]").forEach(s=>{s.addEventListener("click",()=>{const i=parseInt(s.dataset.removeLine??"0");a.quoteState.lines.splice(i,1),S()})}),e.querySelector("[data-action='quote-preview-mode']")?.addEventListener("click",()=>{It(a.quoteState),a.quoteState.previewMode=!0,S()}),e.querySelector("[data-action='quote-edit-mode']")?.addEventListener("click",()=>{a.quoteState.previewMode=!1,S()}),e.querySelector("[data-action='quote-download-pdf']")?.addEventListener("click",async s=>{const i=s.currentTarget;i.disabled=!0,i.textContent="生成中…",a.quoteState.previewMode||It(a.quoteState);try{await Gl(a.quoteState,a.quoteCompanySettings)}finally{i.disabled=!1,i.textContent="PDF"}}),e.querySelector("[data-action='save-quote']")?.addEventListener("click",async()=>{It(a.quoteState);const s=a.quoteState,i=s.lines.reduce(($,_)=>$+_.amount,0),c=Math.round(i*s.taxRate/100),m=i+c;if(!s.quoteNo)try{const{supabaseRpc:$}=await q(async()=>{const{supabaseRpc:k}=await Promise.resolve().then(()=>Z);return{supabaseRpc:k}},void 0),_=await $("generate_quote_no",{});s.quoteNo=_??`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}catch{s.quoteNo=`Q${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.floor(Math.random()*1e3).toString().padStart(3,"0")}`}const h=new Date().toISOString().slice(0,10),b=s.templateType==="sake"||s.templateType==="standard"?s.templateType:"sake",w={quote_no:s.quoteNo,quote_date:s.quoteDate||h,valid_until:s.validUntil||null,legacy_customer_code:s.customerCode||null,customer_name:s.customerName||"",customer_address:s.customerAddress||"",subject:s.subject||"",template_type:b,subtotal:i,tax_amount:c,total_amount:m,tax_rate:s.taxRate||10,remarks:s.remarks||"",delivery_date:s.deliveryDate||"",payment_terms:s.paymentTerms||"",delivery_place:s.deliveryPlace||"",updated_at:new Date().toISOString()};try{let $=s.id;if(s.id){const _=await fetch(`${fe}/rest/v1/quotes?id=eq.${encodeURIComponent(s.id)}`,{method:"PATCH",headers:{apikey:oe,Authorization:`Bearer ${oe}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(w)});if(!_.ok){const k=await _.text();throw new Error(`quotes更新失敗 ${_.status}: ${k}`)}await fetch(`${fe}/rest/v1/quote_lines?quote_id=eq.${encodeURIComponent(s.id)}`,{method:"DELETE",headers:{apikey:oe,Authorization:`Bearer ${oe}`}})}else{const _=await fetch(`${fe}/rest/v1/quotes`,{method:"POST",headers:{apikey:oe,Authorization:`Bearer ${oe}`,"Content-Type":"application/json",Prefer:"return=representation"},body:JSON.stringify(w)});if(!_.ok){const E=await _.text();throw new Error(`quotes作成失敗 ${_.status}: ${E}`)}const k=await _.json();if(!k?.[0]?.id)throw new Error("IDが返りませんでした");$=k[0].id,s.id=$}if(s.lines.length>0){const _=s.lines.map((E,L)=>({quote_id:$,line_no:L+1,legacy_product_code:E.productCode||null,product_name:E.productName,jan_code:E.janCode||null,case_qty:E.caseQty??null,quantity:E.quantity,unit:E.unit,unit_price:E.unitPrice,retail_price:E.retailPrice??null,amount:E.amount})),k=await fetch(`${fe}/rest/v1/quote_lines`,{method:"POST",headers:{apikey:oe,Authorization:`Bearer ${oe}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(_)});if(!k.ok){const E=await k.text();throw new Error(`明細保存失敗 ${k.status}: ${E}`)}}B(`見積 ${s.quoteNo} を保存しました`,"success"),S()}catch($){console.error("[save-quote]",$),B(`保存失敗: ${String($).slice(0,120)}`,"error")}}),e.querySelector("[data-action='save-quote-settings']")?.addEventListener("click",()=>{const s=c=>document.getElementById(c)?.value??"",i={...a.quoteCompanySettings,companyName:s("qs-company-name"),companyPostal:s("qs-company-postal"),companyAddress1:s("qs-company-addr1"),companyAddress2:s("qs-company-addr2"),companyTel:s("qs-company-tel"),companyFax:s("qs-company-fax"),companyEmail:s("qs-company-email"),companyRegistrationNo:s("qs-company-regno"),bankName:s("qs-bank-name"),bankBranch:s("qs-bank-branch"),bankAccountType:s("qs-bank-type"),bankAccountNo:s("qs-bank-no"),bankAccountHolder:s("qs-bank-holder"),defaultPaymentTerms:s("qs-payment-terms"),defaultHeaderNote:s("qs-header-note"),defaultFooterNote:s("qs-footer-note"),accentColor:document.getElementById("qs-accent-color")?.value||a.quoteCompanySettings.accentColor||"#0968e5"};Xe(i),st("quote_company",i),a.quoteCompanySettings=i,B("設定を保存しました","success"),S()}),e.querySelectorAll("[data-action='set-accent-color']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.color??"#0968e5";a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:i},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),S()})}),e.querySelector("#qs-accent-color")?.addEventListener("input",s=>{const i=s.target.value;a.quoteCompanySettings={...a.quoteCompanySettings,accentColor:i},Xe(a.quoteCompanySettings),S()}),e.querySelector("#qs-seal-file")?.addEventListener("change",s=>{const i=s.target.files?.[0];if(!i)return;const c=new FileReader;c.onload=()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:c.result},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),S()},c.readAsDataURL(i)}),e.querySelector("#qs-seal-size")?.addEventListener("input",s=>{const i=parseInt(s.target.value);a.quoteCompanySettings={...a.quoteCompanySettings,sealSize:i},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),S()}),e.querySelector("[data-action='remove-company-seal']")?.addEventListener("click",()=>{a.quoteCompanySettings={...a.quoteCompanySettings,sealImageDataUrl:""},Xe(a.quoteCompanySettings),st("quote_company",a.quoteCompanySettings),S()}),e.querySelectorAll("[data-action='dcal-prev'],[data-action='dcal-next']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.month;i&&(a.demandForecast.calendarMonth=i,S())})}),e.querySelectorAll("[data-action='forecast-segment']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.segment;a.demandForecast.selectedSegment=i,S()})}),e.querySelectorAll("[data-demand-tab]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.demandTab;if(i){if(a.demandTab=i,i==="calendar"){const c=new Date().toISOString().slice(0,10);c.startsWith(a.demandPlanYearMonth)&&(a.calendarSelectedDate=c)}S()}})});function g(s){const i=a.demandAnalysis,c=a.safetyStockParams;if(!i||c.length===0)return[];const[m,h]=s.split("-"),b=`${parseInt(m)-1}-${h}`,w=i.months.filter($=>$<s).slice(-3);return c.map($=>{const _=$.productionType==="make_to_order",k=i.matrix[$.productCode]?.[b]??0,E=w.map(N=>i.matrix[$.productCode]?.[N]??0),L=E.length>0?E.reduce((N,j)=>N+j,0)/E.length:$.avgMonthlyDemand,I=_?0:k>0?Math.ceil(k):Math.ceil(L),M=_?0:Math.ceil($.safetyStockQty),O=Math.max(0,I+M);return{id:"",yearMonth:s,productCode:$.productCode,productName:$.productName,demandForecast:I,safetyStockTarget:M,openingStock:0,requiredProduction:O,plannedQty:_?0:O,actualQty:0,status:"draft",productionType:$.productionType??"monthly",notes:""}})}e.querySelector("[data-action='demand-years-back']")?.addEventListener("change",async s=>{const i=parseInt(s.target.value)||3;a.demandYearsBack=i,a.demandAnalysis=null;const{fetchDemandAnalysis:c}=await q(async()=>{const{fetchDemandAnalysis:m}=await Promise.resolve().then(()=>R);return{fetchDemandAnalysis:m}},void 0);a.demandAnalysis=await c(i*12),S()}),e.querySelectorAll("[data-action='ss-lead-time']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.code??"",c=parseInt(s.value)||30;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==i)return m;const h=m.serviceLevel>=.99?2.33:m.serviceLevel>=.97?1.88:m.serviceLevel>=.95?1.65:m.serviceLevel>=.9?1.28:1.04,b=c/30,w=Math.ceil(h*m.demandStdDev*Math.sqrt(b)),$=Math.ceil(m.avgMonthlyDemand*b+w);return{...m,leadTimeDays:c,safetyStockQty:w,reorderPoint:$}}),S()})}),e.querySelectorAll("[data-action='ss-service-level']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.code??"",c=parseFloat(s.value)||.95;a.safetyStockParams=a.safetyStockParams.map(m=>{if(m.productCode!==i)return m;const h=c>=.99?2.33:c>=.97?1.88:c>=.95?1.65:c>=.9?1.28:1.04,b=m.leadTimeDays/30,w=Math.ceil(h*m.demandStdDev*Math.sqrt(b)),$=Math.ceil(m.avgMonthlyDemand*b+w);return{...m,serviceLevel:c,safetyStockQty:w,reorderPoint:$}}),S()})}),e.querySelector("[data-action='ss-save-all']")?.addEventListener("click",async s=>{if(a.safetyStockParams.length===0)return;const i=s.currentTarget;i.disabled=!0,i.textContent="保存中…";const{saveSafetyStockParamsBulk:c}=await q(async()=>{const{saveSafetyStockParamsBulk:h}=await Promise.resolve().then(()=>R);return{saveSafetyStockParamsBulk:h}},void 0),m=await c(a.safetyStockParams);i.disabled=!1,i.textContent=m?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{i.textContent="安全在庫を保存"},2500)}),e.querySelector("[data-action='bulk-apply-safety']")?.addEventListener("click",()=>{const s=parseFloat(document.getElementById("bulk-service-level")?.value??"0.95"),i=parseInt(document.getElementById("bulk-lead-time")?.value??"30");a.safetyStockParams=a.safetyStockParams.map(c=>{const m=s>=.99?2.33:s>=.97?1.88:s>=.95?1.65:s>=.9?1.28:1.04,h=i/30,b=Math.ceil(m*c.demandStdDev*Math.sqrt(h)),w=Math.ceil(c.avgMonthlyDemand*h+b);return{...c,serviceLevel:s,leadTimeDays:i,safetyStockQty:b,reorderPoint:w}}),S()}),e.querySelectorAll("[data-action='plan-prod-type']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.code??"",c=s.value;a.productionPlan=a.productionPlan.map(m=>m.productCode===i?{...m,productionType:c}:m)})}),e.querySelector("[data-action='plan-year-month']")?.addEventListener("change",async s=>{const i=s.target.value;if(!i)return;a.demandPlanYearMonth=i,a.calendarShifts=Jt(i,1,0);const{fetchProductionPlan:c}=await q(async()=>{const{fetchProductionPlan:h}=await Promise.resolve().then(()=>R);return{fetchProductionPlan:h}},void 0),m=await c(i);a.productionPlan=m.length>0?m:g(i),Ie(a.calendarShifts,a.productionPlan.filter(h=>!a.calendarLabelExcluded.has(h.productCode)),a.calendarCapacity),S()}),e.querySelectorAll("[data-action='plan-type-filter']").forEach(s=>{s.addEventListener("click",()=>{a.demandPlanTypeFilter=s.dataset.filter??"all",S()})}),e.querySelectorAll("[data-action='demand-sort']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.sortCol??"";a.demandSort?.column===i?a.demandSort=a.demandSort.dir==="desc"?{column:i,dir:"asc"}:null:a.demandSort={column:i,dir:"desc"},S()})}),e.querySelector("[data-action='plan-recalc']")?.addEventListener("click",()=>{a.productionPlan=g(a.demandPlanYearMonth),S()}),e.querySelector("[data-action='plan-csv-import']")?.addEventListener("change",s=>{const i=s.target.files?.[0];if(!i)return;const c=new FileReader;c.onload=async()=>{const{parseCSV:m}=await q(async()=>{const{parseCSV:M}=await Promise.resolve().then(()=>Rd);return{parseCSV:M}},void 0),{columns:h,rows:b}=m(c.result),w=document.getElementById("csv-import-status"),$=h.find(M=>/商品コード|product_code|code|コード/i.test(M)),_=h.find(M=>/在庫|stock|期首|opening/i.test(M)),k=h.find(M=>/計画|plan|planned|生産/i.test(M));if(!$){w&&(w.style.display="block",w.style.background="rgba(197,61,61,0.1)",w.style.color="#c53d3d",w.textContent=`エラー: 商品コード列が見つかりません。列名: ${h.join(", ")}`);return}let E=0,L=0,I=0;for(const M of b){const O=(M[$]??"").trim();if(!O)continue;const N=a.productionPlan.find(j=>j.productCode===O);if(N){if(E++,_&&M[_]!==void 0&&M[_]!==""){const j=parseFloat(M[_])||0;N.openingStock=j,N.requiredProduction=Math.max(0,N.demandForecast+N.safetyStockTarget-j),N.plannedQty>0&&!k&&(N.plannedQty=N.requiredProduction),L++}k&&M[k]!==void 0&&M[k]!==""&&(N.plannedQty=parseFloat(M[k])||0,I++)}}w&&(w.style.display="block",E===0?(w.style.background="rgba(183,121,31,0.1)",w.style.color="#b7791f",w.textContent=`一致する商品コードが見つかりませんでした（CSV: ${b.length}行）`):(w.style.background="rgba(47,133,90,0.1)",w.style.color="#2f855a",w.textContent=`${E}商品に反映: 在庫${L}件${I>0?` / 計画${I}件`:""} 更新`),setTimeout(()=>{w.style.display="none"},5e3)),S()},c.readAsText(i,"UTF-8"),s.target.value=""}),e.querySelector("[data-action='plan-save']")?.addEventListener("click",async()=>{if(a.productionPlan.length===0)return;e.querySelectorAll("[data-action='plan-qty']").forEach(c=>{const m=c.dataset.code??"",h=a.productionPlan.find(b=>b.productCode===m);h&&(h.plannedQty=parseFloat(c.value)||0)});const{saveProductionPlan:s}=await q(async()=>{const{saveProductionPlan:c}=await Promise.resolve().then(()=>R);return{saveProductionPlan:c}},void 0);await Promise.all(a.productionPlan.map(c=>s(c)));const{fetchProductionPlan:i}=await q(async()=>{const{fetchProductionPlan:c}=await Promise.resolve().then(()=>R);return{fetchProductionPlan:c}},void 0);a.productionPlan=await i(a.demandPlanYearMonth),S()}),e.querySelectorAll("[data-action='cal-toggle-day']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.date??"",c=a.calendarShifts.find(m=>m.date===i);c&&(c.confirmed?a.calendarSelectedDate=a.calendarSelectedDate===i?null:i:c.partTimers>0||c.employees>0?(c.partTimers=0,c.employees=0,Ie(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=i):(c.partTimers=1,c.employees=0,Ie(a.calendarShifts,a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode)),a.calendarCapacity),a.calendarSelectedDate=i),S())})}),e.querySelector("[data-action='cal-save-exclusions']")?.addEventListener("click",async s=>{const i=s.currentTarget;i.disabled=!0,i.textContent="保存中…";const{saveLabelExclusions:c}=await q(async()=>{const{saveLabelExclusions:b}=await Promise.resolve().then(()=>R);return{saveLabelExclusions:b}},void 0),m=[...a.calendarLabelExcluded],h=await c(a.demandPlanYearMonth,m);i.disabled=!1,i.textContent=h?"✓ 保存しました":"✗ 保存失敗",setTimeout(()=>{i.textContent="設定を保存"},2500)}),e.querySelectorAll("[data-action='cal-label-toggle']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.code??"",m=document.getElementById("cal-label-list")?.scrollTop??0;s.checked?a.calendarLabelExcluded.delete(i):a.calendarLabelExcluded.add(i);const h=a.productionPlan.filter(b=>!a.calendarLabelExcluded.has(b.productCode));Ie(a.calendarShifts,h,a.calendarCapacity),S(),requestAnimationFrame(()=>{const b=document.getElementById("cal-label-list");b&&(b.scrollTop=m)})})}),e.querySelectorAll("[data-action='cal-label-toggle-group']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.type??"",m=document.getElementById("cal-label-list")?.scrollTop??0,h=a.productionPlan.filter(w=>w.productionType===i);if(s.checked)for(const w of h)a.calendarLabelExcluded.delete(w.productCode);else for(const w of h)a.calendarLabelExcluded.add(w.productCode);const b=a.productionPlan.filter(w=>!a.calendarLabelExcluded.has(w.productCode));Ie(a.calendarShifts,b,a.calendarCapacity),S(),requestAnimationFrame(()=>{const w=document.getElementById("cal-label-list");w&&(w.scrollTop=m)})})}),e.querySelector("[data-action='cal-cap-part']")?.addEventListener("change",s=>{const i=parseInt(s.target.value)||ct;a.calendarCapacity.partCapacity=i;const c=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ie(a.calendarShifts,c,a.calendarCapacity),S()}),e.querySelector("[data-action='cal-cap-emp']")?.addEventListener("change",s=>{const i=parseInt(s.target.value)||dt;a.calendarCapacity.empCapacity=i;const c=a.productionPlan.filter(m=>!a.calendarLabelExcluded.has(m.productCode));Ie(a.calendarShifts,c,a.calendarCapacity),S()}),e.querySelectorAll("[data-action='cal-shift-part']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.date??"",c=parseInt(s.value)||0,m=a.calendarShifts.find(h=>h.date===i);m&&(m.partTimers=c),S()})}),e.querySelectorAll("[data-action='cal-shift-emp']").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.date??"",c=parseInt(s.value)||0,m=a.calendarShifts.find(h=>h.date===i);m&&(m.employees=c),S()})}),e.querySelector("[data-action='cal-year-month']")?.addEventListener("change",async s=>{const i=s.target.value;if(!i)return;a.demandPlanYearMonth=i,a.calendarSelectedDate=null,a.calendarShifts=Jt(i,1,0);const{fetchProductionPlan:c,fetchLabelExclusions:m}=await q(async()=>{const{fetchProductionPlan:w,fetchLabelExclusions:$}=await Promise.resolve().then(()=>R);return{fetchProductionPlan:w,fetchLabelExclusions:$}},void 0),[h,b]=await Promise.all([c(i),m(i)]);a.productionPlan=h.length>0?h:g(i),a.calendarLabelExcluded=new Set(b),Ie(a.calendarShifts,a.productionPlan.filter(w=>!a.calendarLabelExcluded.has(w.productCode)),a.calendarCapacity),S()}),e.querySelector("[data-action='cal-default-part']")?.addEventListener("change",s=>{const i=parseInt(s.target.value)||0;a.calendarDefaultPart=i;for(const c of a.calendarShifts)if(!c.confirmed){const m=new Date(c.date).getDay()===0||new Date(c.date).getDay()===6;c.partTimers=m?0:i}S()}),e.querySelector("[data-action='cal-default-emp']")?.addEventListener("change",s=>{const i=parseInt(s.target.value)||0;a.calendarDefaultEmp=i;for(const c of a.calendarShifts)if(!c.confirmed){const m=new Date(c.date).getDay()===0||new Date(c.date).getDay()===6;c.employees=m?0:i}S()}),e.querySelector("[data-action='cal-reset-shifts']")?.addEventListener("click",()=>{a.calendarShifts=Jt(a.demandPlanYearMonth,1,0),Ie(a.calendarShifts,a.productionPlan.filter(s=>!a.calendarLabelExcluded.has(s.productCode)),a.calendarCapacity),S()}),e.querySelector("[data-action='cal-confirm-all']")?.addEventListener("click",()=>{for(const s of a.calendarShifts)s.confirmed=!0;S()}),e.querySelectorAll("[data-action='select-month']").forEach(s=>{s.addEventListener("click",()=>{const i=parseInt(s.dataset.month??"0");a.seasonalCalendar&&(a.seasonalCalendar.selectedMonth=i,S())})}),e.querySelector("#visit-filter-area")?.addEventListener("change",s=>{a.visitPlanner&&(a.visitPlanner.filterArea=s.target.value,S())}),e.querySelector("#visit-filter-score")?.addEventListener("change",s=>{a.visitPlanner&&(a.visitPlanner.filterMinScore=parseInt(s.target.value)||0,S())}),e.querySelector("[data-action='refresh-analytics']")?.addEventListener("click",async s=>{const i=s.currentTarget;i.disabled=!0,i.textContent="更新中…";try{const{supabaseRpc:c}=await q(async()=>{const{supabaseRpc:m}=await Promise.resolve().then(()=>Z);return{supabaseRpc:m}},void 0);await c("refresh_analytics",{}),a.visitPlanner=null,a.shipmentCalendarData=null,B("分析データを更新しました","success"),S()}catch(c){console.error("[refresh-analytics]",c),B("更新に失敗しました","error"),i.disabled=!1,i.textContent="⟳ データ更新"}}),e.querySelectorAll("[data-sort-col]").forEach(s=>{s.addEventListener("click",i=>{const c=s.dataset.sortCol??"",m=i.shiftKey;a.route==="/product-power"?a.productSortState=pt(a.productSortState,c,m):a.route==="/customer-efficiency"?a.customerSortState=pt(a.customerSortState,c,m):a.route==="/"||a.route==="/sales"?a.dashboardSortState=pt(a.dashboardSortState,c,m):a.route==="/master"?a.masterSortState=pt(a.masterSortState,c,m):a.route==="/analytics"&&(a.analyticsSortState=pt(a.analyticsSortState,c,m)),S()})}),e.querySelectorAll("[data-action='efficiency-year-change']").forEach(s=>{s.addEventListener("click",async()=>{const i=parseInt(s.dataset.year??"",10);i&&(a.customerEfficiencyYear=i,a.customerEfficiency=await wt(i,a.customerEfficiencyGroupBy),S())})}),e.querySelector("[data-action='efficiency-year-select']")?.addEventListener("change",async s=>{const i=parseInt(s.target.value,10);i&&(a.customerEfficiencyYear=i,a.customerEfficiency=await wt(i,a.customerEfficiencyGroupBy),S())}),e.querySelectorAll("[data-action='efficiency-groupby-change']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.groupby??"billing";a.customerEfficiencyGroupBy=i,a.customerEfficiency=await wt(a.customerEfficiencyYear,i),S()})}),e.querySelectorAll("[data-product-period]").forEach(s=>{s.addEventListener("click",()=>{a.productPeriod=s.dataset.productPeriod??"year",S()})}),e.querySelector("[data-action='pp-apply-range']")?.addEventListener("click",()=>{const s=document.getElementById("pp-range-start")?.value??"",i=document.getElementById("pp-range-end")?.value??"";s&&i&&(a.productCustomStart=s,a.productCustomEnd=i,a.productPeriod="custom",S())}),e.querySelectorAll("[data-product-filter]").forEach(s=>{s.addEventListener("click",()=>{a.productFilter=s.dataset.productFilter??"all",S()})}),e.querySelector("[data-action='dashboard-refresh']")?.addEventListener("click",async s=>{const i=s.currentTarget;i.disabled=!0,i.textContent="更新中…",await rt(),i.disabled=!1,i.textContent="↻ 更新",B("ダッシュボードを更新しました","success")}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const s=e.querySelector("#sales-start")?.value??"",i=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:s,endDate:i},wu()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const s={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=s,a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,xu(s)}),e.addEventListener("click",s=>{const i=s.target.closest("tr[data-doc-no]");if(!i)return;const c=i.dataset.docNo??"";if(a.invoiceSelectedDocNo===c){a.invoiceSelectedDocNo=null,a.invoiceSelectedLines=null,S();return}a.invoiceSelectedDocNo=c,a.invoiceSelectedLines=null,S(),ns(c).then(m=>{a.invoiceSelectedDocNo===c&&(a.invoiceSelectedLines=m,S())})}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const s=e.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=s.trim().toUpperCase(),$u(a.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{a.masterTab=s.dataset.tab,a.masterFilter={...Xa},S()})}),e.querySelector("[data-action='master-filter']")?.addEventListener("click",()=>{a.masterFilter={query:e.querySelector("#master-search")?.value??"",businessType:e.querySelector("#master-business-type")?.value??"",tradeType:e.querySelector("#master-trade-type")?.value??"",areaCode:e.querySelector("#master-area-code")?.value??"",activeOnly:e.querySelector("#master-active-only")?.value??"",page:1},S()}),e.querySelector("#master-search")?.addEventListener("keydown",s=>{s.key==="Enter"&&e.querySelector("[data-action='master-filter']")?.click()}),e.querySelectorAll("[data-action='master-page']").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.page);i>=1&&(a.masterFilter={...a.masterFilter,page:i},S())})}),e.querySelectorAll("[data-action='raw-select-table']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.table;if(!i)return;a.rawSelectedTable=i,a.rawPage=1;const c=await Vt(i,1);a.rawRecords=c.records,a.rawTotalCount=c.total,S()})}),e.querySelector("[data-action='raw-page-prev']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable||a.rawPage<=1)return;a.rawPage-=1;const s=await Vt(a.rawSelectedTable,a.rawPage);a.rawRecords=s.records,a.rawTotalCount=s.total,S()}),e.querySelector("[data-action='raw-page-next']")?.addEventListener("click",async()=>{if(!a.rawSelectedTable)return;a.rawPage+=1;const s=await Vt(a.rawSelectedTable,a.rawPage);a.rawRecords=s.records,a.rawTotalCount=s.total,S()}),e.querySelectorAll("[data-analytics-tab]").forEach(s=>{s.addEventListener("click",async()=>{if(a.analyticsTab=s.dataset.analyticsTab,a.analyticsStaffDrilldown=null,a.analyticsDrilldown=null,a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsTab!=="staff"){if(a.analyticsPeriod!=="all"){const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:c}=await q(async()=>{const{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}=await Promise.resolve().then(()=>R);return{fetchAnalyticsByPeriod:m,fetchAvailablePeriods:h}},void 0);a.analyticsPeriodOptions=await c(a.analyticsTab,a.analyticsPeriod),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"",a.analyticsPeriodRows=await i(a.analyticsTab,a.analyticsPeriod,a.analyticsPeriodFilter)}}S()})}),e.querySelectorAll("[data-analytics-period]").forEach(s=>{s.addEventListener("click",async()=>{const{fetchAnalyticsByPeriod:i,fetchAvailablePeriods:c,fetchPeriodChartData:m,prevYearFilter:h}=await q(async()=>{const{fetchAnalyticsByPeriod:w,fetchAvailablePeriods:$,fetchPeriodChartData:_,prevYearFilter:k}=await Promise.resolve().then(()=>R);return{fetchAnalyticsByPeriod:w,fetchAvailablePeriods:$,fetchPeriodChartData:_,prevYearFilter:k}},void 0),b=s.dataset.analyticsPeriod;if(a.analyticsPeriod=b,a.analyticsDrilldown=null,b==="all")a.analyticsPeriodRows=[],a.analyticsPeriodOptions=[],a.analyticsPeriodFilter="",a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[];else{a.analyticsPeriodOptions=await c(a.analyticsTab,b),a.analyticsPeriodFilter=a.analyticsPeriodOptions[0]??"";const w=a.analyticsPeriodFilter,[$,_,k]=await Promise.all([i(a.analyticsTab,b,w),m(b,w),m(b,h(w))]);a.analyticsPeriodRows=$,a.analyticsPeriodChartData=_,a.analyticsPrevYearChartData=k}S()})}),e.querySelector("#analytics-period-select")?.addEventListener("change",async s=>{const{fetchAnalyticsByPeriod:i,fetchPeriodChartData:c,prevYearFilter:m}=await q(async()=>{const{fetchAnalyticsByPeriod:w,fetchPeriodChartData:$,prevYearFilter:_}=await Promise.resolve().then(()=>R);return{fetchAnalyticsByPeriod:w,fetchPeriodChartData:$,prevYearFilter:_}},void 0);a.analyticsPeriodFilter=s.target.value,a.analyticsDrilldown=null;const h=a.analyticsPeriodFilter;if(a.analyticsFiscalMode==="fiscal"&&a.analyticsPeriod==="yearly"){const{fiscalYearToDateRange:w}=await q(async()=>{const{fiscalYearToDateRange:O}=await Promise.resolve().then(()=>An);return{fiscalYearToDateRange:O}},void 0),$=parseInt(h),_=w($);w($-1);const k=a.analyticsTab==="customers"?"get_customer_totals_by_period":"get_product_totals_by_period",{supabaseRpc:E}=await q(async()=>{const{supabaseRpc:O}=await Promise.resolve().then(()=>Z);return{supabaseRpc:O}},void 0),[L,I,M]=await Promise.all([E(k,{p_date_from:_.from,p_date_to:_.to}),c("yearly",h),c("yearly",String($-1))]);a.analyticsPeriodRows=(L??[]).map(O=>({code:String(O.code??""),name:String(O.name??""),amount:Number(O.amount??0),quantity:Number(O.quantity??0),documents:Number(O.documents??0),volumeMl:Number(O.volume_ml??0)})),a.analyticsPeriodChartData=(I??[]).map(O=>({...O})),a.analyticsPrevYearChartData=(M??[]).map(O=>({...O}))}else{const[w,$,_]=await Promise.all([i(a.analyticsTab,a.analyticsPeriod,h),c(a.analyticsPeriod,h),c(a.analyticsPeriod,m(h))]);a.analyticsPeriodRows=w,a.analyticsPeriodChartData=$,a.analyticsPrevYearChartData=_}S()}),e.querySelectorAll("[data-fiscal-mode]").forEach(s=>{s.addEventListener("click",async()=>{if(a.analyticsFiscalMode=s.dataset.fiscalMode,a.analyticsPeriod==="yearly")if(a.analyticsPeriodRows=[],a.analyticsPeriodChartData=[],a.analyticsPrevYearChartData=[],a.analyticsPeriodFilter="",a.analyticsFiscalMode==="fiscal"){const{monthToFiscalYear:i}=await q(async()=>{const{monthToFiscalYear:m}=await Promise.resolve().then(()=>An);return{monthToFiscalYear:m}},void 0),c=new Set;for(const m of a.salesAnalytics.monthlySales)c.add(i(m.month));a.analyticsPeriodOptions=[...c].sort((m,h)=>h-m).map(String)}else{const{fetchAvailablePeriods:i}=await q(async()=>{const{fetchAvailablePeriods:c}=await Promise.resolve().then(()=>R);return{fetchAvailablePeriods:c}},void 0);a.analyticsPeriodOptions=await i(a.analyticsTab,"yearly")}S()})}),e.querySelectorAll("[data-chart-metric]").forEach(s=>{s.addEventListener("click",()=>{a.analyticsChartMetric=s.dataset.chartMetric,S()})}),e.querySelectorAll("[data-analytics-drilldown]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.analyticsDrilldown??"",c=s.dataset.drilldownName??i,m=a.analyticsTab,{fetchCustomerProductBreakdown:h,fetchProductCustomerBreakdown:b,fetchEntityMonthlySales:w,periodToDateRange:$}=await q(async()=>{const{fetchCustomerProductBreakdown:L,fetchProductCustomerBreakdown:I,fetchEntityMonthlySales:M,periodToDateRange:O}=await Promise.resolve().then(()=>R);return{fetchCustomerProductBreakdown:L,fetchProductCustomerBreakdown:I,fetchEntityMonthlySales:M,periodToDateRange:O}},void 0),_=a.analyticsPeriod!=="all"&&a.analyticsPeriodFilter?$(a.analyticsPeriod,a.analyticsPeriodFilter):null,[k,E]=await Promise.all([w(i,m==="customers"?"customer":"product"),m==="customers"?h(i,_?.from,_?.to):b(i,_?.from,_?.to)]);a.analyticsDrilldown={tab:m,code:i,name:c,monthlySales:k,breakdownRows:E},S()})}),e.querySelector("[data-action='close-analytics-drilldown']")?.addEventListener("click",()=>{a.analyticsDrilldown=null,S()}),e.querySelector("#staff-filter-input")?.addEventListener("input",s=>{a.analyticsStaffFilter=s.target.value,S()}),e.querySelectorAll("[data-staff-drilldown]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.staffDrilldown??"",c=s.dataset.staffName??"",{fetchStaffCustomerBreakdown:m,fetchStaffProductBreakdown:h,periodToDateRange:b}=await q(async()=>{const{fetchStaffCustomerBreakdown:E,fetchStaffProductBreakdown:L,periodToDateRange:I}=await Promise.resolve().then(()=>R);return{fetchStaffCustomerBreakdown:E,fetchStaffProductBreakdown:L,periodToDateRange:I}},void 0),w=b(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter),$=a.analyticsStaffDrilldown?.breakdownTab??"customers",[_,k]=await Promise.all([m(i,w?.from,w?.to),h(i,w?.from,w?.to)]);a.analyticsStaffDrilldown={code:i,name:c,breakdownTab:$,customerRows:_,productRows:k},S()})}),e.querySelectorAll("[data-staff-breakdown-tab]").forEach(s=>{s.addEventListener("click",()=>{a.analyticsStaffDrilldown&&(a.analyticsStaffDrilldown={...a.analyticsStaffDrilldown,breakdownTab:s.dataset.staffBreakdownTab},S())})}),e.querySelector("[data-action='close-staff-drilldown']")?.addEventListener("click",()=>{a.analyticsStaffDrilldown=null,S()}),e.querySelector("[data-analytics-tag-filter]")?.addEventListener("input",s=>{a.analyticsTagFilter=s.target.value,S()}),e.querySelectorAll("[data-staff-period]").forEach(s=>{s.addEventListener("click",async()=>{const{fetchAvailablePeriods:i,fetchStaffTotalsByPeriod:c,periodToDateRange:m}=await q(async()=>{const{fetchAvailablePeriods:b,fetchStaffTotalsByPeriod:w,periodToDateRange:$}=await Promise.resolve().then(()=>R);return{fetchAvailablePeriods:b,fetchStaffTotalsByPeriod:w,periodToDateRange:$}},void 0),h=s.dataset.staffPeriod;if(a.analyticsStaffPeriod=h,a.analyticsStaffDrilldown=null,h==="all")a.analyticsStaffPeriodFilter="",a.analyticsStaffPeriodOptions=[],a.analyticsStaffTotals=[];else{a.analyticsStaffPeriodOptions=await i("staff",h),a.analyticsStaffPeriodFilter=a.analyticsStaffPeriodOptions[0]??"";const b=m(h,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await c(b?.from,b?.to)}S()})}),e.querySelector("#staff-period-select")?.addEventListener("change",async s=>{const{fetchStaffTotalsByPeriod:i,periodToDateRange:c}=await q(async()=>{const{fetchStaffTotalsByPeriod:h,periodToDateRange:b}=await Promise.resolve().then(()=>R);return{fetchStaffTotalsByPeriod:h,periodToDateRange:b}},void 0);a.analyticsStaffPeriodFilter=s.target.value;const m=c(a.analyticsStaffPeriod,a.analyticsStaffPeriodFilter);a.analyticsStaffTotals=await i(m?.from,m?.to),a.analyticsStaffDrilldown=null,S()}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{Te(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},S()}),e.querySelectorAll("[data-action='remove-line']").forEach(s=>{s.addEventListener("click",()=>{Te(e);const i=parseInt(s.dataset.line??"0",10);a.invoiceForm.lines.splice(i,1),a.invoiceErrors=po(a.invoiceForm),S()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(s=>{s.addEventListener("click",()=>{Te(e),du(parseInt(s.dataset.line??"0",10)),a.invoiceErrors={},S()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{pu(),S()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{Te(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,S()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(s=>{s.addEventListener("click",()=>{Te(e);const i=parseInt(s.dataset.line??"0",10),c=a.invoiceForm.lines[i];a.pickerMode="product",a.pickerTargetLine=i,a.pickerQuery=c?c.productCode||c.productName:"",S()})}),e.querySelectorAll("[data-action='modal-close']").forEach(s=>{s.addEventListener("click",i=>{s.classList.contains("modal-backdrop")&&i.target instanceof HTMLElement&&!i.target.classList.contains("modal-backdrop")||(Xt(),S())})}),e.querySelectorAll("[data-action='picker-select']").forEach(s=>{const i=async()=>{const c=s.dataset.code??"",m=s.dataset.name??"";if(a.pickerMode==="customer"){a.invoiceForm.customerCode=c,a.invoiceForm.customerName=m,delete a.invoiceErrors.customerCode;const h=a.masterStats?.customers.find(b=>b.code===c);a.invoicePriceGroup=h?.priceGroup||"",!a.invoicePriceGroup&&c&&(a.invoicePriceGroup=await Sa(c))}else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const h=a.invoiceForm.lines[a.pickerTargetLine];if(h){h.productCode=c,h.productName=m;const b=await qs(a.invoicePriceGroup,c);b>0&&(h.unitPrice=b),h.amount=h.quantity*h.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`]}}Xt(),S()};s.addEventListener("click",i),s.addEventListener("keydown",c=>{c.key==="Enter"&&i()})}),e.querySelector("#modal-search")?.addEventListener("input",s=>{a.pickerQuery=s.target.value,S()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{co(),S()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{uo(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",async()=>{Te(e),uu(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,!a.invoicePriceGroup&&a.invoiceForm.customerCode&&(a.invoicePriceGroup=await Sa(a.invoiceForm.customerCode)),S())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{Te(e),mu(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,S())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(s=>{s.addEventListener("input",()=>{Te(e),a.invoiceSavedDocNo=null;const i=s.dataset.field;(i==="quantity"||i==="unitPrice")&&S()})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{Te(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const s=e.querySelector("#delivery-docno")?.value??"";if(a.deliverySearchDocNo=s.trim(),a.deliveryNote=null,a.actionLoading=!0,S(),!a.deliverySearchDocNo){B("伝票番号を入力してください","error"),a.actionLoading=!1,S();return}Fa(a.deliverySearchDocNo).then(i=>{a.deliveryNote=i,a.actionLoading=!1,S()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const s=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=s,a.billingSummary=null,a.actionLoading=!0,S(),Va(s).then(i=>{a.billingSummary=i,a.actionLoading=!1,S()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const s=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),i=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=s,a.taxMonth=i,a.taxDeclaration=null,a.taxVolume=null,a.actionLoading=!0,S(),Promise.all([Ya(s,i),Ja(s,i)]).then(([c,m])=>{a.taxDeclaration=c,a.taxVolume=m,a.actionLoading=!1,S()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:s}=await q(async()=>{const{generateTaxXML:b}=await Promise.resolve().then(()=>R);return{generateTaxXML:b}},void 0),i=s(a.taxDeclaration),c=new Blob([i],{type:"application/xml;charset=utf-8"}),m=URL.createObjectURL(c),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:s}=await q(async()=>{const{generateTaxCSV:b}=await Promise.resolve().then(()=>R);return{generateTaxCSV:b}},void 0),i=s(a.taxDeclaration),c=new Blob([i],{type:"text/csv;charset=utf-8"}),m=URL.createObjectURL(c),h=document.createElement("a");h.href=m,h.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,h.click(),URL.revokeObjectURL(m)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:s}=await q(async()=>{const{saveTaxDeclaration:i}=await Promise.resolve().then(()=>R);return{saveTaxDeclaration:i}},void 0);try{await s(a.taxDeclaration),B("下書き保存しました")}catch(i){B("保存に失敗: "+(i instanceof Error?i.message:String(i)),"error")}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(s=>{s.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const i=Number(s.dataset.taxRow),c=s.dataset.taxField,m=s.type==="number"?Number(s.value)||0:s.value,h=[...a.taxDeclaration.rows];h[i]={...h[i],[c]:m};const{recalculateTaxDeclaration:b}=await q(async()=>{const{recalculateTaxDeclaration:w}=await Promise.resolve().then(()=>R);return{recalculateTaxDeclaration:w}},void 0);a.taxDeclaration=b({...a.taxDeclaration,rows:h}),S()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(s=>{s.addEventListener("change",()=>{if(!a.taxDeclaration)return;const i=Number(s.dataset.dedRow),c=s.dataset.dedField,m=s.type==="number"?Number(s.value)||0:s.value,h=[...a.taxDeclaration.deductions];h[i]={...h[i],[c]:m},a.taxDeclaration={...a.taxDeclaration,deductions:h},S()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(s=>{s.addEventListener("change",()=>{if(!a.taxDeclaration)return;const i=s.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[i]:s.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:s,TAX_RATE_CATEGORIES:i}=await q(async()=>{const{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:b}=await Promise.resolve().then(()=>R);return{recalculateTaxDeclaration:h,TAX_RATE_CATEGORIES:b}},void 0),c=i[0],m={taxCategory:c.code,taxCategoryName:c.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:c.taxRatePerLiter,taxAmount:0};a.taxDeclaration=s({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,m]}),S()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(s=>{s.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const i=Number(s.dataset.taxRow),{recalculateTaxDeclaration:c}=await q(async()=>{const{recalculateTaxDeclaration:h}=await Promise.resolve().then(()=>R);return{recalculateTaxDeclaration:h}},void 0),m=a.taxDeclaration.rows.filter((h,b)=>b!==i);a.taxDeclaration=c({...a.taxDeclaration,rows:m}),S()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const s={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,s]},S()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(s=>{s.addEventListener("click",()=>{if(!a.taxDeclaration)return;const i=Number(s.dataset.dedRow),c=a.taxDeclaration.deductions.filter((m,h)=>h!==i);a.taxDeclaration={...a.taxDeclaration,deductions:c},S()})}),e.querySelectorAll("[data-store-tab]").forEach(s=>{s.addEventListener("click",()=>{a.storeTab=s.dataset.storeTab,S()})}),e.querySelectorAll("[data-import-entity]").forEach(s=>{s.addEventListener("click",()=>{a.importEntity=s.dataset.importEntity,a.importPreview=null,a.importResult=null,S()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const s=Zs(a.importEntity),i=new Blob([s],{type:"text/csv;charset=utf-8"}),c=URL.createObjectURL(i),m=document.createElement("a");m.href=c,m.download=`template_${a.importEntity}.csv`,m.click(),URL.revokeObjectURL(c)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const i=e.querySelector("#import-file")?.files?.[0];if(!i){B("CSVファイルを選択してください","warning");return}const c=new FileReader;c.onload=()=>{const m=String(c.result??""),{columns:h,rows:b}=Gs(m);a.importPreview=Xs(a.importEntity,h,b),a.importResult=null,S()},c.readAsText(i,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,S()}),e.querySelectorAll("[data-print-template]").forEach(s=>{s.addEventListener("click",()=>{a.printTemplate=s.dataset.printTemplate,S()})}),e.querySelectorAll("[data-print-field]").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.printField;let c=s.value;(i==="taxRate"||i==="previousBalance"||i==="paymentAmount")&&(c=Number(s.value)||0),a.printData={...a.printData,[i]:c},S()})}),e.querySelectorAll("[data-print-opt]").forEach(s=>{const i=()=>{const c=s.dataset.printOpt;let m;s.type==="checkbox"?m=s.checked:c==="copies"?m=Number(s.value)||1:c==="overlayOpacity"||c==="calibrationOffsetX"||c==="calibrationOffsetY"?m=Number(s.value)||0:m=s.value,a.printOptions={...a.printOptions,[c]:m},S()};s.addEventListener("change",i),s.type==="range"&&s.addEventListener("input",i)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(s=>{s.addEventListener("change",()=>{const i=Number(s.dataset.printLine),c=s.dataset.printLfield,m=[...a.printData.lines];let h=s.value;(c==="quantity"||c==="unitPrice")&&(h=Number(s.value)||0),m[i]={...m[i],[c]:h},m[i].amount=(Number(m[i].quantity)||0)*(Number(m[i].unitPrice)||0),a.printData={...a.printData,lines:m},S()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},S()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((c,m)=>m!==i)},S()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),B("印刷設定を保存しました")}catch(s){B("保存失敗: "+(s instanceof Error?s.message:String(s)),"error")}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const s=a.printCompany,i=prompt("会社名",s.name);if(i===null)return;const c=prompt("郵便番号",s.postalCode)??s.postalCode,m=prompt("住所",s.address1)??s.address1,h=prompt("TEL",s.tel)??s.tel,b=prompt("FAX",s.fax)??s.fax,w=prompt("適格請求書登録番号 (T+13桁)",s.registrationNo)??s.registrationNo,$=prompt("取引銀行名",s.bankName)??s.bankName,_=prompt("支店名",s.bankBranch)??s.bankBranch,k=prompt("口座番号",s.bankAccountNo)??s.bankAccountNo,E=prompt("口座名義",s.bankAccountHolder)??s.bankAccountHolder;a.printCompany={...s,name:i,postalCode:c,address1:m,tel:h,fax:b,registrationNo:w,bankName:$,bankBranch:_,bankAccountNo:k,bankAccountHolder:E},S()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,S()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const c=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",m=pa(s),{savePrintLayout:h}=await q(async()=>{const{savePrintLayout:w}=await Promise.resolve().then(()=>R);return{savePrintLayout:w}},void 0),b={id:`bp1701_${c.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:c,templateKey:"chain_store",positions:m};try{await h(b)?(B(`クラウド保存成功: ${c}`),a.fdSavedPositions=m,localStorage.setItem("sake_fd_positions",JSON.stringify(m)),S()):(B("クラウド保存に失敗しました。ローカルには保存されました","warning"),localStorage.setItem("sake_fd_positions",JSON.stringify(m)))}catch(w){B("保存エラー: "+(w instanceof Error?w.message:""),"error")}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const i=pa(s);a.fdSavedPositions=i;try{localStorage.setItem("sake_fd_positions",JSON.stringify(i)),B(`ローカル保存完了: ${Object.keys(i).length}件`)}catch(c){B("保存失敗: "+(c instanceof Error?c.message:""),"error")}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const c={templateKey:"chain_store",positions:pa(s),exportedAt:new Date().toISOString()},m=new Blob([JSON.stringify(c,null,2)],{type:"application/json"}),h=URL.createObjectURL(m),b=document.createElement("a");b.href=h,b.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,b.click(),URL.revokeObjectURL(h)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async s=>{const i=s.target.files?.[0];if(i)try{const c=await i.text(),h=JSON.parse(c).positions;if(!h)throw new Error("positions field not found");a.fdSavedPositions=h,localStorage.setItem("sake_fd_positions",JSON.stringify(h)),B(`インポート成功: ${Object.keys(h).length}件`),S()}catch(c){B("インポート失敗: "+(c instanceof Error?c.message:""),"error")}});const x=e.querySelector("#fd-saved-layouts");x&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:s}=await q(async()=>{const{fetchPrintLayouts:c}=await Promise.resolve().then(()=>R);return{fetchPrintLayouts:c}},void 0),i=await s("chain_store");i.length===0?x.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(x.innerHTML=`☁️ クラウド保存済み (${i.length}件):<br/>`+i.map(c=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${c.id}" style="margin:4px 4px 0 0;">${c.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${c.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),x.querySelectorAll("[data-action='fd-load-layout']").forEach(c=>{c.addEventListener("click",()=>{const m=c.dataset.layoutId,h=i.find(b=>b.id===m);h&&(a.fdSavedPositions=h.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(h.positions)),B(`読込完了: ${h.name}`),S())})}),x.querySelectorAll("[data-action='fd-delete-layout']").forEach(c=>{c.addEventListener("click",async()=>{const m=c.dataset.layoutId;if(!m||!await Pe("このレイアウトを削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deletePrintLayout:h}=await q(async()=>{const{deletePrintLayout:w}=await Promise.resolve().then(()=>R);return{deletePrintLayout:w}},void 0);await h(m)?(B("削除しました"),S()):B("削除失敗","error")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",async()=>{await Pe("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),S())});const C=e.querySelector("#fd-sel-x"),A=e.querySelector("#fd-sel-y");[C,A].forEach(s=>{s?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const i=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);i&&(C&&(i.style.left=C.value+"mm"),A&&(i.style.top=A.value+"mm"))})}),e.querySelectorAll(".wf-card").forEach(s=>{s.addEventListener("dragstart",i=>{s.classList.add("wf-dragging"),i.dataTransfer?.setData("text/plain",s.dataset.wfOrder??"")}),s.addEventListener("dragend",()=>s.classList.remove("wf-dragging"))}),e.querySelectorAll(".wf-col").forEach(s=>{s.addEventListener("dragover",i=>i.preventDefault()),s.addEventListener("drop",i=>{i.preventDefault();const c=i.dataTransfer?.getData("text/plain"),m=s.dataset.wfStage;if(!c||!m)return;const h=a.workflowOrders.find(b=>b.id===c);h&&(h.stage=m,S())})}),e.querySelectorAll("[data-mo-step]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.moStep;s.disabled||(a.mobileOrder.step=i,S())})}),e.querySelector("#mo-customer-q")?.addEventListener("input",s=>{a.mobileOrder.customerQuery=s.target.value,S()}),e.querySelector("#mo-product-q")?.addEventListener("input",s=>{a.mobileOrder.productQuery=s.target.value,S()}),e.querySelectorAll("[data-mo-select-customer]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.moSelectCustomer,c=a.masterStats?.customers.find(m=>m.id===i);c&&(a.mobileOrder.selectedCustomer=c),S()})}),e.querySelectorAll("[data-mo-add-product]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.moAddProduct,c=a.masterStats?.products.find(h=>h.code===i);if(!c)return;const m=1800;a.mobileOrder.cart.push({productCode:c.code,productName:c.name,quantity:1,unit:"本",unitPrice:m,amount:m}),S()})}),e.querySelectorAll("[data-mo-qty]").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.moQty),c=s.dataset.moProduct,m=a.mobileOrder.cart.find(h=>h.productCode===c);m&&(m.quantity=Math.max(0,m.quantity+i),m.amount=m.quantity*m.unitPrice,m.quantity===0&&(a.mobileOrder.cart=a.mobileOrder.cart.filter(h=>h.productCode!==c)),S())})}),e.querySelectorAll("[data-mo-remove]").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.moRemove);a.mobileOrder.cart.splice(i,1),S()})}),e.querySelector("[data-action='mo-submit']")?.addEventListener("click",async()=>{const s=e.querySelector("#mo-memo");a.mobileOrder.memo=s?.value??"";const i="MO"+Date.now().toString().slice(-8),c=e.querySelector("[data-action='mo-submit']");c&&(c.disabled=!0,c.textContent="送信中…");const m=a.mobileOrder.cart.reduce((h,b)=>h+b.amount,0);try{const{saveStoreOrder:h}=await q(async()=>{const{saveStoreOrder:b}=await Promise.resolve().then(()=>R);return{saveStoreOrder:b}},void 0);await h(i,a.mobileOrder.selectedCustomer?.name??"不明",a.mobileOrder.selectedCustomer?.code??null,m,a.mobileOrder.memo,a.mobileOrder.cart)}catch(h){console.error("受注保存失敗:",h),B("送信に失敗しました","error"),c&&(c.disabled=!1,c.textContent="受注を送信");return}a.mobileOrder.submittedDocNo=i,a.mobileOrder.step="done",S()}),e.querySelector("[data-action='mo-reset']")?.addEventListener("click",()=>{a.mobileOrder={step:"customer",selectedCustomer:null,cart:[],customerQuery:"",productQuery:"",memo:"",submittedDocNo:null},S()}),e.querySelectorAll("[data-tour-id]").forEach(s=>{s.addEventListener("click",()=>{a.tourActiveId=s.dataset.tourId??null,S()})}),e.querySelectorAll("[data-action='tour-insert-template']").forEach(s=>{s.addEventListener("click",()=>{const i=a.tourInquiries.find(w=>w.id===a.tourActiveId);if(!i)return;const c=s.dataset.template==="confirm"?dd:pd,m=e.querySelector("#tour-confirmed-time"),h=c.replaceAll("{name}",i.name).replaceAll("{partySize}",String(i.partySize)).replaceAll("{confirmedTime}",m?.value??i.visitDate),b=e.querySelector("#tour-reply-body");b&&(b.value=h)})}),e.querySelector("[data-action='tour-send-reply']")?.addEventListener("click",()=>{const s=document.querySelector("[data-action='tour-send-reply']")?.dataset.tourId??"",i=a.tourInquiries.find(m=>m.id===s);if(!i)return;const c=e.querySelector("#tour-confirmed-time");i.status="confirmed",i.repliedAt=new Date().toISOString(),i.confirmedTime=c?.value??"",B("返信メールを下書き保存し、ステータスを確定にしました"),S()}),e.querySelector("[data-action='lb-search']")?.addEventListener("click",async()=>{const s=e.querySelector("#lb-type")?.value??"",i=e.querySelector("#lb-area")?.value??"",c=e.querySelector("#lb-keyword")?.value??"";if(!s&&!c){B("業種かキーワードを入力してください","warning");return}a.leadSearchType=s,a.leadSearchArea=i,a.leadSearchQuery=c,a.leadSearching=!0,S();const m=a.integrations.find($=>$.provider==="google_maps");if(!m||!m.config.api_key){B("Google Maps APIキーが /integrations で未設定です","warning"),a.leadSearching=!1,S();return}const{searchPlaces:h}=await q(async()=>{const{searchPlaces:$}=await Promise.resolve().then(()=>R);return{searchPlaces:$}},void 0),b=[s,c].filter(Boolean).join(" "),w=await h(m,b,i);a.leadSearching=!1,w.error?B("検索失敗: "+w.error,"error"):a.leadSearchResults=w.results,S()}),e.querySelector("[data-action='lb-clear-search']")?.addEventListener("click",()=>{a.leadSearchResults=[],S()}),e.querySelector("[data-action='lb-save-list']")?.addEventListener("click",async()=>{if(a.leadSearchResults.length===0)return;const s=prompt("リスト名を入力:",`${a.leadSearchType} ${a.leadSearchArea}`);if(!s)return;const i=`ll_${Date.now()}`,c={id:i,name:s,query:a.leadSearchQuery,area:a.leadSearchArea,businessType:a.leadSearchType,totalCount:a.leadSearchResults.length,source:"google_places"},{saveLeadList:m,saveLeadItem:h,fetchLeadLists:b,fetchLeadItems:w}=await q(async()=>{const{saveLeadList:k,saveLeadItem:E,fetchLeadLists:L,fetchLeadItems:I}=await Promise.resolve().then(()=>R);return{saveLeadList:k,saveLeadItem:E,fetchLeadLists:L,fetchLeadItems:I}},void 0);await m(c);const $=e.querySelectorAll(".lb-search-check:checked"),_=Array.from($).map(k=>Number(k.dataset.idx));for(const k of _){const E=a.leadSearchResults[k];E&&await h({...E,id:`li_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,listId:i,businessType:a.leadSearchType})}a.leadLists=await b(),a.leadActiveListId=i,a.leadItems=await w(i),a.leadSearchResults=[],B(`${_.length}件を「${s}」として保存しました`),S()}),e.querySelectorAll("[data-action='lb-select-list']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??null;if(a.leadActiveListId=i,i){const{fetchLeadItems:c}=await q(async()=>{const{fetchLeadItems:m}=await Promise.resolve().then(()=>R);return{fetchLeadItems:m}},void 0);a.leadItems=await c(i)}S()})}),e.querySelectorAll("[data-action='lb-exclude']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",c=a.leadItems.find(b=>b.id===i);if(!c)return;const{saveLeadItem:m,fetchLeadItems:h}=await q(async()=>{const{saveLeadItem:b,fetchLeadItems:w}=await Promise.resolve().then(()=>R);return{saveLeadItem:b,fetchLeadItems:w}},void 0);await m({...c,status:"excluded"}),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),S()})}),e.querySelectorAll("[data-action='lb-convert-one']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",c=a.leadItems.find(w=>w.id===i);if(!c)return;const{convertLeadToProspect:m,fetchLeadItems:h}=await q(async()=>{const{convertLeadToProspect:w,fetchLeadItems:$}=await Promise.resolve().then(()=>R);return{convertLeadToProspect:w,fetchLeadItems:$}},void 0);await m(c)&&(B("見込客に追加しました: "+c.companyName),a.leadActiveListId&&(a.leadItems=await h(a.leadActiveListId)),S())})}),e.querySelector("[data-action='lb-bulk-convert']")?.addEventListener("click",async()=>{const s=e.querySelectorAll(".lb-item-check:checked");if(s.length===0&&!await Pe("全ての新規アイテムを見込客に変換しますか？"))return;const i=s.length>0?Array.from(s).map(b=>b.dataset.id):a.leadItems.filter(b=>b.status==="new").map(b=>b.id),{convertLeadToProspect:c,fetchLeadItems:m}=await q(async()=>{const{convertLeadToProspect:b,fetchLeadItems:w}=await Promise.resolve().then(()=>R);return{convertLeadToProspect:b,fetchLeadItems:w}},void 0);let h=0;for(const b of i){const w=a.leadItems.find($=>$.id===b);w&&w.status==="new"&&await c(w)&&h++}B(`${h}件を見込客に変換しました`),a.leadActiveListId&&(a.leadItems=await m(a.leadActiveListId)),S()}),e.querySelectorAll("[data-map-filter]").forEach(s=>{s.addEventListener("change",()=>{const i=s.dataset.mapFilter;let c;s.type==="checkbox"?c=s.checked:c=s.value,a.mapFilters={...a.mapFilters,[i]:c},S()})}),e.querySelectorAll(".churn-reason-select").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.churnCode??"",c=s.value;try{const{saveChurnNote:m}=await q(async()=>{const{saveChurnNote:w}=await Promise.resolve().then(()=>R);return{saveChurnNote:w}},void 0);await m({customerCode:i,reason:c,memo:"",actionedAt:null});const h=a.churnNotes.find(w=>w.customerCode===i);h?h.reason=c:a.churnNotes.push({customerCode:i,reason:c,memo:"",actionedAt:null,updatedAt:new Date().toISOString()});const b=s.closest("tr");if(b){const w=b.querySelector("td:nth-child(2)");if(w){let $=w.querySelector(".reason-badge");!$&&c&&($=document.createElement("span"),$.className="status-pill info reason-badge",$.style.fontSize="0.72rem",w.appendChild($)),$&&($.textContent=c?eu[c]??"":"")}}B("理由を保存しました")}catch(m){B("保存に失敗しました","error"),console.error(m)}})}),e.querySelectorAll(".churn-actioned-check").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.churnCode??"",c=s.checked,m=s.closest("tr");m&&(m.style.opacity=c?"0.45":"",m.setAttribute("data-actioned",c?"1":"0"));try{const{saveChurnNote:h}=await q(async()=>{const{saveChurnNote:_}=await Promise.resolve().then(()=>R);return{saveChurnNote:_}},void 0),b=a.churnNotes.find(_=>_.customerCode===i),w=b?.reason??"",$=new Date().toISOString().slice(0,10);await h({customerCode:i,reason:w,memo:"",actionedAt:c?$:null}),b?b.actionedAt=c?$:null:a.churnNotes.push({customerCode:i,reason:w,memo:"",actionedAt:c?$:null,updatedAt:new Date().toISOString()}),B(c?"対応済みにしました":"対応済みを解除しました")}catch(h){B("保存に失敗しました","error"),console.error(h)}})}),e.querySelector("[data-action='ivry-sync']")?.addEventListener("click",async()=>{const s=a.integrations.find(h=>h.provider==="ivry");if(!s||!s.isEnabled){B("IVRy連携が無効です。/integrations で有効化してください","warning");return}const{syncIvryCallLogs:i,fetchCallLogs:c}=await q(async()=>{const{syncIvryCallLogs:h,fetchCallLogs:b}=await Promise.resolve().then(()=>R);return{syncIvryCallLogs:h,fetchCallLogs:b}},void 0),m=await i(s);m.error?B("同期失敗: "+m.error,"error"):(B(`${m.count}件の通話履歴を同期しました`),a.callLogs=await c(100),S())}),e.querySelector("[data-action='ivry-push-phonebook']")?.addEventListener("click",async()=>{const s=a.integrations.find(h=>h.provider==="ivry");if(!s||!s.isEnabled){B("IVRy連携が無効です","warning");return}if(!await Pe("全ての取引先と見込客の電話帳をIVRyに送信しますか？"))return;const{syncPhoneBookToIvry:i}=await q(async()=>{const{syncPhoneBookToIvry:h}=await Promise.resolve().then(()=>R);return{syncPhoneBookToIvry:h}},void 0),c=[];a.masterStats?.customers.forEach(h=>{c.push({name:h.name,phone:"",customerCode:h.code,note:"既存取引先"})}),a.prospects.forEach(h=>{h.phone&&c.push({name:h.companyName,phone:h.phone,customerCode:h.id,note:`見込客 (${h.stage})`})});const m=await i(s,c);m.error?B("送信失敗: "+m.error,"error"):B(`${m.synced}件の連絡先を送信しました`)}),e.querySelectorAll("[data-action='call-link-customer']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",c=s.dataset.phone??"",m=prompt(`電話番号 ${c} を顧客コードに紐付け
顧客コードを入力:`);if(!m)return;const h=a.callLogs.find($=>$.id===i);if(!h)return;const{saveCallLog:b,fetchCallLogs:w}=await q(async()=>{const{saveCallLog:$,fetchCallLogs:_}=await Promise.resolve().then(()=>R);return{saveCallLog:$,fetchCallLogs:_}},void 0);await b({...h,matchedCustomerCode:m}),a.callLogs=await w(100),S()})}),e.querySelectorAll("[data-action='call-memo']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",c=a.callLogs.find(w=>w.id===i);if(!c)return;const m=prompt("メモを入力:",c.notes??"");if(m===null)return;const{saveCallLog:h,fetchCallLogs:b}=await q(async()=>{const{saveCallLog:w,fetchCallLogs:$}=await Promise.resolve().then(()=>R);return{saveCallLog:w,fetchCallLogs:$}},void 0);await h({...c,notes:m}),a.callLogs=await b(100),S()})}),e.querySelectorAll("[data-prospect-view]").forEach(s=>{s.addEventListener("click",()=>{a.prospectViewMode=s.dataset.prospectView,S()})}),e.querySelector("[data-action='prospect-new']")?.addEventListener("click",()=>{a.prospectEditingId="__new__",S()}),e.querySelectorAll("[data-action='prospect-edit']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??null;if(a.prospectEditingId=i,i){const{fetchProspectActivities:c}=await q(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>R);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await c(i)}S()})}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.prospectId??null;if(a.prospectEditingId=i,i){const{fetchProspectActivities:c}=await q(async()=>{const{fetchProspectActivities:m}=await Promise.resolve().then(()=>R);return{fetchProspectActivities:m}},void 0);a.prospectActivities=await c(i)}S()})}),e.querySelectorAll("[data-action='prospect-close']").forEach(s=>{s.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.prospectEditingId=null,a.prospectActivities=[],S())})}),e.querySelector("[data-action='prospect-save']")?.addEventListener("click",async()=>{const s=a.prospectEditingId==="__new__",i=s?`p_${Date.now()}`:a.prospectEditingId??"",c={id:i,companyName:e.querySelector("#prospect-company")?.value??"",contactName:e.querySelector("#prospect-contact")?.value??"",email:e.querySelector("#prospect-email")?.value??"",phone:e.querySelector("#prospect-phone")?.value??"",businessType:e.querySelector("#prospect-business-type")?.value??"",stage:e.querySelector("#prospect-stage")?.value??"cold",source:e.querySelector("#prospect-source")?.value??"",expectedAmount:Number(e.querySelector("#prospect-amount")?.value)||0,probability:Number(e.querySelector("#prospect-probability")?.value)||0,assignedStaffCode:e.querySelector("#prospect-staff")?.value??"",nextActionDate:e.querySelector("#prospect-next-date")?.value??"",nextAction:e.querySelector("#prospect-next-action")?.value??"",note:e.querySelector("#prospect-note")?.value??""};if(!c.companyName){B("会社名は必須です","warning");return}const{saveProspect:m,fetchProspects:h,recordAudit:b,sendSlackNotification:w}=await q(async()=>{const{saveProspect:_,fetchProspects:k,recordAudit:E,sendSlackNotification:L}=await Promise.resolve().then(()=>R);return{saveProspect:_,fetchProspects:k,recordAudit:E,sendSlackNotification:L}},void 0);await m(c)?(s&&await w("new_prospect",`新規見込客: ${c.companyName} / 想定 ¥${c.expectedAmount.toLocaleString("ja-JP")}`).catch(()=>{}),await b({action:s?"prospect_create":"prospect_update",entityType:"prospect",entityId:i,userEmail:a.user?.email}),a.prospects=await h(),a.prospectEditingId=null,S()):B("保存失敗","error")}),e.querySelectorAll("[data-action='prospect-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=s.dataset.id??"",{deleteProspect:c,fetchProspects:m}=await q(async()=>{const{deleteProspect:h,fetchProspects:b}=await Promise.resolve().then(()=>R);return{deleteProspect:h,fetchProspects:b}},void 0);await c(i)&&(a.prospects=await m(),S())})}),e.querySelectorAll("[data-action='prospect-quote-create']").forEach(s=>{s.addEventListener("click",i=>{i.stopPropagation();const c=s.dataset.id??"",m=s.dataset.name??"",h=s.dataset.addr??"";a.quoteState=Wt(a.quoteCompanySettings),a.quoteState.customerCode="",a.quoteState.customerName=m,a.quoteState.customerAddress=h,a.quoteState.isProspect=!0,a.quoteState.prospectId=c,a.quotePricing=null,a.quoteEditId="new",wa("/quote")})}),e.querySelector("[data-action='prospect-add-activity']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='prospect-add-activity']")?.dataset.id??"",i=e.querySelector("#prospect-activity-type")?.value??"call",c=e.querySelector("#prospect-activity-title")?.value??"";if(!c){B("内容を入力してください","warning");return}const{saveProspectActivity:m,fetchProspectActivities:h}=await q(async()=>{const{saveProspectActivity:b,fetchProspectActivities:w}=await Promise.resolve().then(()=>R);return{saveProspectActivity:b,fetchProspectActivities:w}},void 0);await m({id:`act_${Date.now()}`,prospectId:s,activityType:i,title:c,activityDate:new Date().toISOString(),staffCode:a.myProfile?.staffCode}),a.prospectActivities=await h(s),S()}),e.querySelectorAll(".pk-card[data-prospect-id]").forEach(s=>{s.addEventListener("dragstart",i=>{i.dataTransfer?.setData("text/plain",s.dataset.prospectId??"")})}),e.querySelectorAll(".pk-col[data-prospect-stage]").forEach(s=>{s.addEventListener("dragover",i=>i.preventDefault()),s.addEventListener("drop",async i=>{i.preventDefault();const c=i.dataTransfer?.getData("text/plain"),m=s.dataset.prospectStage;if(!c)return;const h=a.prospects.find(b=>b.id===c);if(h&&h.stage!==m){const b={...h,stage:m},{saveProspect:w}=await q(async()=>{const{saveProspect:$}=await Promise.resolve().then(()=>R);return{saveProspect:$}},void 0);await w(b),h.stage=m,S()}})}),e.querySelector("[data-action='slack-save']")?.addEventListener("click",async()=>{const{fetchIntegrationSettings:s,saveIntegrationSetting:i}=await q(async()=>{const{fetchIntegrationSettings:$,saveIntegrationSetting:_}=await Promise.resolve().then(()=>R);return{fetchIntegrationSettings:$,saveIntegrationSetting:_}},void 0),m=(a.integrations.length>0?a.integrations:await s()).find($=>$.provider==="slack");if(!m)return;const h=e.querySelector("#slack-webhook")?.value??"",b=e.querySelector("#slack-default-channel")?.value??"",w=e.querySelector("#slack-enabled")?.checked??!1;await i({...m,config:{...m.config,webhook_url:h,default_channel:b},isEnabled:w}),a.integrations=await s(),B("保存しました"),S()}),e.querySelector("[data-action='slack-save-rules']")?.addEventListener("click",async()=>{const{saveSlackRule:s,fetchSlackRules:i}=await q(async()=>{const{saveSlackRule:c,fetchSlackRules:m}=await Promise.resolve().then(()=>R);return{saveSlackRule:c,fetchSlackRules:m}},void 0);for(const c of a.slackRules){const m=e.querySelector(`[data-slack-rule-id="${c.id}"][data-slack-field="enabled"]`)?.checked??c.enabled,h=e.querySelector(`[data-slack-rule-id="${c.id}"][data-slack-field="channel"]`)?.value??c.channel;await s({...c,enabled:m,channel:h})}a.slackRules=await i(),B("ルールを保存しました"),S()}),e.querySelector("[data-action='slack-test']")?.addEventListener("click",async()=>{const{sendSlackNotification:s}=await q(async()=>{const{sendSlackNotification:c}=await Promise.resolve().then(()=>R);return{sendSlackNotification:c}},void 0),i=await s("new_order","🧪 これはテスト通知です (syusen-cloud)");i.ok?B("テスト送信成功"):B("送信失敗: "+(i.error??""),"error")}),e.querySelector("[data-action='material-receive']")?.addEventListener("click",()=>{a.materialEditing=null,a.materialEditingIsNew=!0,S()}),e.querySelectorAll("[data-action='material-adjust']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.id??"",c=a.materialList.find(m=>m.id===i);c&&(a.materialEditing=c,a.materialEditingIsNew=!1,S())})}),e.querySelectorAll("[data-action='material-close']").forEach(s=>{s.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.materialEditing=null,a.materialEditingIsNew=!1,S())})}),e.querySelector("[data-action='material-save']")?.addEventListener("click",async()=>{const i={id:a.materialEditingIsNew?`mat_${Date.now()}`:a.materialEditing?.id??"",code:e.querySelector("#mat-code")?.value??"",name:e.querySelector("#mat-name")?.value??"",unit:e.querySelector("#mat-unit")?.value??"個",currentStock:Number(e.querySelector("#mat-stock")?.value)||0,minimumStock:Number(e.querySelector("#mat-min")?.value)||0,unitCost:Number(e.querySelector("#mat-cost")?.value)||0,lastUpdated:e.querySelector("#mat-last-date")?.value??new Date().toISOString().slice(0,10)};if(i.materialType=e.querySelector("#mat-type")?.value??"",!i.code||!i.name){B("コードと品名は必須です","warning");return}const{saveMaterial:c,fetchMaterialList:m}=await q(async()=>{const{saveMaterial:b,fetchMaterialList:w}=await Promise.resolve().then(()=>R);return{saveMaterial:b,fetchMaterialList:w}},void 0);await c(i)?(a.materialList=await m(),a.materialEditing=null,a.materialEditingIsNew=!1,B("保存しました"),S()):B("保存失敗","error")}),e.querySelector("[data-action='material-delete']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='material-delete']")?.dataset.id??"";if(!s||!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteMaterial:i,fetchMaterialList:c}=await q(async()=>{const{deleteMaterial:m,fetchMaterialList:h}=await Promise.resolve().then(()=>R);return{deleteMaterial:m,fetchMaterialList:h}},void 0);await i(s)&&(a.materialList=await c(),a.materialEditing=null,S())}),e.querySelector("[data-action='user-new']")?.addEventListener("click",()=>{a.userEditingId="__new__",S()}),e.querySelectorAll("[data-action='user-edit']").forEach(s=>{s.addEventListener("click",()=>{a.userEditingId=s.dataset.id??null,S()})}),e.querySelector("[data-action='user-cancel']")?.addEventListener("click",()=>{a.userEditingId=null,S()}),e.querySelector("[data-action='user-save']")?.addEventListener("click",async()=>{const s=a.userEditingId==="__new__",i=s?crypto.randomUUID():a.userEditingId??"",c=e.querySelector("#user-email")?.value.trim()??"",m=e.querySelector("#user-name")?.value.trim()??"";if(!c||!m){B("名前とメールアドレスは必須です","warning");return}const h={id:i,email:c,displayName:m,staffCode:e.querySelector("#user-code")?.value??"",department:e.querySelector("#user-dept")?.value??"all",role:e.querySelector("#user-role")?.value??"staff",phone:e.querySelector("#user-phone")?.value??"",isActive:e.querySelector("#user-active")?.checked??!0};if(s){const k=e.querySelector("#user-password")?.value??"";if(k.length<8){B("パスワードは8文字以上必要です","warning");return}try{await ln(c,k)}catch(E){B("Auth登録失敗: "+(E instanceof Error?E.message:""),"error");return}}const{saveUserProfile:b,fetchUserProfiles:w,recordAudit:$}=await q(async()=>{const{saveUserProfile:k,fetchUserProfiles:E,recordAudit:L}=await Promise.resolve().then(()=>R);return{saveUserProfile:k,fetchUserProfiles:E,recordAudit:L}},void 0);await b(h)?(await $({action:s?"user_create":"user_update",entityType:"user",entityId:i,userEmail:a.user?.email}),a.userProfiles=await w(),a.userEditingId=null,B("保存しました"),S()):B("保存失敗","error")}),e.querySelectorAll("[data-action='user-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=s.dataset.id??"",{deleteUserProfile:c,fetchUserProfiles:m,recordAudit:h}=await q(async()=>{const{deleteUserProfile:w,fetchUserProfiles:$,recordAudit:_}=await Promise.resolve().then(()=>R);return{deleteUserProfile:w,fetchUserProfiles:$,recordAudit:_}},void 0);await c(i)?(await h({action:"user_delete",entityType:"user",entityId:i,userEmail:a.user?.email}),a.userProfiles=await m(),S()):B("削除失敗","error")})}),e.querySelector("[data-action='profile-save-sender']")?.addEventListener("click",async()=>{if(!a.myProfile)return;const s=e.querySelector("#profile-sender")?.value??"",i={...a.myProfile,defaultMailSenderId:s},{saveUserProfile:c}=await q(async()=>{const{saveUserProfile:m}=await Promise.resolve().then(()=>R);return{saveUserProfile:m}},void 0);await c(i),a.myProfile=i,B("保存しました"),S()}),e.querySelector("[data-action='profile-change-password']")?.addEventListener("click",async()=>{const s=e.querySelector("#profile-new-password")?.value??"";if(s.length<8){B("8文字以上のパスワードを入力してください","warning");return}try{await ko(s),B("パスワードを変更しました")}catch(i){B("変更失敗: "+(i instanceof Error?i.message:""),"error")}}),e.querySelectorAll("[data-action='int-edit']").forEach(s=>{s.addEventListener("click",()=>{a.integrationEditingId=s.dataset.id??null,S()})}),e.querySelector("[data-action='int-cancel']")?.addEventListener("click",()=>{a.integrationEditingId=null,S()}),e.querySelector("[data-action='int-save']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='int-save']")?.dataset.id??"",i=a.integrations.find($=>$.id===s);if(!i)return;const c={...i.config};Object.keys(c).forEach($=>{const _=e.querySelector(`#int-${$}`);_&&(c[$]=_.value)});const m=e.querySelector("#int-enabled")?.checked??!1,{saveIntegrationSetting:h,fetchIntegrationSettings:b}=await q(async()=>{const{saveIntegrationSetting:$,fetchIntegrationSettings:_}=await Promise.resolve().then(()=>R);return{saveIntegrationSetting:$,fetchIntegrationSettings:_}},void 0);await h({...i,config:c,isEnabled:m})?(a.integrations=await b(),a.integrationEditingId=null,B("保存しました"),S()):B("保存失敗","error")}),e.querySelectorAll("[data-action='int-sync-shopify'], [data-action='shopify-sync']").forEach(s=>{s.addEventListener("click",async()=>{const i=a.integrations.find(b=>b.provider==="shopify");if(!i){B("Shopify連携が未設定です","warning");return}s.textContent="同期中…",s.disabled=!0;const{syncShopifyOrders:c,fetchShopifyOrders:m}=await q(async()=>{const{syncShopifyOrders:b,fetchShopifyOrders:w}=await Promise.resolve().then(()=>R);return{syncShopifyOrders:b,fetchShopifyOrders:w}},void 0),h=await c(i);h.error?B("同期失敗: "+h.error,"error"):(B(`${h.count}件を同期しました`),a.shopifyOrders=await m()),S()})}),e.querySelectorAll("[data-action='int-sync-gcal']").forEach(s=>{s.addEventListener("click",async()=>{const i=a.integrations.find(b=>b.provider==="google_calendar");if(!i)return;s.textContent="同期中…",s.disabled=!0;const{syncGoogleCalendar:c,fetchCalendarEvents:m}=await q(async()=>{const{syncGoogleCalendar:b,fetchCalendarEvents:w}=await Promise.resolve().then(()=>R);return{syncGoogleCalendar:b,fetchCalendarEvents:w}},void 0),h=await c(i);h.error?B("同期失敗: "+h.error,"error"):(B(`${h.count}件を同期しました`),a.calendarEvents=await m(a.calendarYearMonth)),S()})}),e.querySelector("[data-action='fax-upload']")?.addEventListener("click",async()=>{const i=e.querySelector("#fax-file")?.files?.[0];if(!i){B("FAX画像を選択してください","warning");return}const c=a.integrations.find(m=>m.provider==="cloud_vision");if(!c||!c.config.api_key){B("Cloud Vision API Key が設定されていません。/integrations で設定してください","warning");return}a.faxProcessing=!0,a.faxOcrText=null,S();try{const m=new FileReader;m.onload=async()=>{const h=String(m.result??""),{ocrFaxImage:b,saveFaxRecord:w,fetchFaxInbox:$}=await q(async()=>{const{ocrFaxImage:L,saveFaxRecord:I,fetchFaxInbox:M}=await Promise.resolve().then(()=>R);return{ocrFaxImage:L,saveFaxRecord:I,fetchFaxInbox:M}},void 0),_=await b(c,h),k=e.querySelector("#fax-sender-name")?.value??"",E=e.querySelector("#fax-sender-phone")?.value??"";await w({id:`fax_${Date.now()}`,receivedAt:new Date().toISOString(),senderName:k,senderPhone:E,ocrStatus:_.error?"failed":"done",ocrText:_.text}),a.faxOcrText=_.error?`エラー: ${_.error}`:_.text,a.faxRecords=await $(),a.faxProcessing=!1,S()},m.readAsDataURL(i)}catch(m){B("OCR失敗: "+(m instanceof Error?m.message:""),"error"),a.faxProcessing=!1,S()}}),e.querySelector("[data-action='ms-new']")?.addEventListener("click",()=>{a.mailSenderEditingId="__new__",S()}),e.querySelectorAll("[data-action='ms-edit']").forEach(s=>{s.addEventListener("click",()=>{a.mailSenderEditingId=s.dataset.id??null,S()})}),e.querySelector("[data-action='ms-cancel']")?.addEventListener("click",()=>{a.mailSenderEditingId=null,S()}),e.querySelector("[data-action='ms-save']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='ms-save']")?.dataset.id||`sender_${Date.now()}`,i={id:s,name:e.querySelector("#ms-name")?.value||"",email:e.querySelector("#ms-email")?.value||"",displayName:e.querySelector("#ms-display-name")?.value||"",replyTo:e.querySelector("#ms-reply-to")?.value||"",signature:e.querySelector("#ms-signature")?.value||"",isDefault:e.querySelector("#ms-default")?.checked??!1,isVerified:a.mailSenders.find(b=>b.id===s)?.isVerified??!1};if(!i.name||!i.email){B("名前とメールアドレスは必須です","warning");return}const{saveMailSender:c,fetchMailSenders:m}=await q(async()=>{const{saveMailSender:b,fetchMailSenders:w}=await Promise.resolve().then(()=>R);return{saveMailSender:b,fetchMailSenders:w}},void 0);await c(i)?(a.mailSenders=await m(),a.mailSenderEditingId=null,B("保存しました"),S()):B("保存に失敗しました","error")}),e.querySelectorAll("[data-action='ms-delete']").forEach(s=>{s.addEventListener("click",async()=>{if(!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const i=s.dataset.id??"",{deleteMailSender:c,fetchMailSenders:m}=await q(async()=>{const{deleteMailSender:b,fetchMailSenders:w}=await Promise.resolve().then(()=>R);return{deleteMailSender:b,fetchMailSenders:w}},void 0);await c(i)?(a.mailSenders=await m(),S()):B("削除失敗","error")})}),e.querySelector("[data-action='delivery-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='billing-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='tax-print']")?.addEventListener("click",()=>{window.print()}),e.querySelector("[data-action='print-page']")?.addEventListener("click",()=>{e.querySelectorAll("details").forEach(s=>{s.open=!0}),window.print()}),e.querySelector("[data-action='demand-csv-export']")?.addEventListener("click",()=>{if(!a.demandAnalysis){B("データなし","error");return}const s=a.demandAnalysis,i=Object.entries(s.matrix).map(([m,h])=>{const b={productCode:m};return s.months.forEach(w=>{b[w]=h[w]??0}),b}),c=[{key:"productCode",label:"商品コード"},...s.months.map(m=>({key:m,label:m}))];Ia("demand-analysis.csv",i,c)}),e.querySelector("[data-action='plan-csv-export']")?.addEventListener("click",()=>{if(a.productionPlan.length===0){B("データなし","error");return}const s=a.productionPlan.map(c=>({...c}));Ia("production-plan.csv",s,[{key:"productCode",label:"商品コード"},{key:"productName",label:"商品名"},{key:"productionType",label:"生産区分"},{key:"demandForecast",label:"需要予測"},{key:"safetyStockTarget",label:"安全在庫"},{key:"openingStock",label:"在庫数"},{key:"requiredProduction",label:"必要生産量"},{key:"plannedQty",label:"計画数"},{key:"actualQty",label:"実績"},{key:"status",label:"ステータス"}])}),e.querySelector("[data-action='billing-close-all']")?.addEventListener("click",async()=>{await Pe("当月の全請求を締め切りますか？")&&B("締め処理はデータベース側の設定が必要です","info")}),e.querySelector("#brewing-fy-select")?.addEventListener("change",async s=>{const i=parseInt(s.target.value);a.brewingPlanFY=i;const{fetchBrewingPlanSummary:c,fetchBrewingMonthlyTrend:m,fetchBrewingSchedule:h,fetchBrewingProductDetail:b,fetchBrewingCustomCategories:w,fetchBrewingCategoryOverrides:$,fetchAllBrewingStockEntries:_}=await q(async()=>{const{fetchBrewingPlanSummary:j,fetchBrewingMonthlyTrend:V,fetchBrewingSchedule:z,fetchBrewingProductDetail:U,fetchBrewingCustomCategories:H,fetchBrewingCategoryOverrides:W,fetchAllBrewingStockEntries:J}=await Promise.resolve().then(()=>R);return{fetchBrewingPlanSummary:j,fetchBrewingMonthlyTrend:V,fetchBrewingSchedule:z,fetchBrewingProductDetail:U,fetchBrewingCustomCategories:H,fetchBrewingCategoryOverrides:W,fetchAllBrewingStockEntries:J}},void 0),[k,E,L,I,M,O,N]=await Promise.all([c(`${i}-10-01`,`${i+1}-09-30`),m(`${i}-10-01`,`${i+1}-09-30`),h(i),b(`${i}-10-01`,`${i+1}-09-30`),w(),$(),_()]);a.brewingPlanData=k,a.brewingMonthlyTrend=E,a.brewingSchedule=L,a.brewingProductDetail=I,a.brewingStockEntries=N,a.brewingCustomCategories=M,a.brewingOverrides=O,a.brewingExcludedProducts=new Set,S()}),e.querySelectorAll("[data-action='brew-move-to-child']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.code??"",c=s.dataset.parent??"";if(!i||!c)return;if(s.checked){a.brewingExcludedProducts.delete(i),S();return}a.brewingExcludedProducts.add(i);const m=a.brewingCustomCategories.filter(h=>h.parentCategory===c);if(m.length===1){const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:b,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:$}=await q(async()=>{const{setBrewingCategoryOverride:O,fetchBrewingPlanSummary:N,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:V}=await Promise.resolve().then(()=>R);return{setBrewingCategoryOverride:O,fetchBrewingPlanSummary:N,fetchBrewingProductDetail:j,fetchBrewingCategoryOverrides:V}},void 0);await h(i,m[0].name);const _=a.brewingPlanFY,{fetchBrewingYearlyShipments:k}=await q(async()=>{const{fetchBrewingYearlyShipments:O}=await Promise.resolve().then(()=>R);return{fetchBrewingYearlyShipments:O}},void 0),[E,L,I,M]=await Promise.all([b(`${_}-10-01`,`${_+1}-09-30`),w(`${_}-10-01`,`${_+1}-09-30`),$(),k()]);a.brewingPlanData=E,a.brewingProductDetail=L,a.brewingOverrides=I,a.brewingYearlyShipments=M,a.brewingExcludedProducts.delete(i)}S()})}),e.querySelectorAll("[data-action='brew-confirm-to-child']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.code??"",c=s.dataset.cat??"";if(!i||!c)return;const{setBrewingCategoryOverride:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:w,fetchBrewingYearlyShipments:$}=await q(async()=>{const{setBrewingCategoryOverride:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:j,fetchBrewingYearlyShipments:V}=await Promise.resolve().then(()=>R);return{setBrewingCategoryOverride:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:j,fetchBrewingYearlyShipments:V}},void 0);await m(i,c);const _=a.brewingPlanFY,[k,E,L,I]=await Promise.all([h(`${_}-10-01`,`${_+1}-09-30`),b(`${_}-10-01`,`${_+1}-09-30`),w(),$()]);a.brewingPlanData=k,a.brewingProductDetail=E,a.brewingOverrides=L,a.brewingYearlyShipments=I,S()})}),e.querySelectorAll("[data-action='brew-unconfirm']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.code??"";if(!i)return;const{setBrewingCategoryOverride:c,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h,fetchBrewingCategoryOverrides:b,fetchBrewingYearlyShipments:w}=await q(async()=>{const{setBrewingCategoryOverride:I,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:N,fetchBrewingYearlyShipments:j}=await Promise.resolve().then(()=>R);return{setBrewingCategoryOverride:I,fetchBrewingPlanSummary:M,fetchBrewingProductDetail:O,fetchBrewingCategoryOverrides:N,fetchBrewingYearlyShipments:j}},void 0);await c(i,null);const $=a.brewingPlanFY,[_,k,E,L]=await Promise.all([m(`${$}-10-01`,`${$+1}-09-30`),h(`${$}-10-01`,`${$+1}-09-30`),b(),w()]);a.brewingPlanData=_,a.brewingProductDetail=k,a.brewingOverrides=E,a.brewingYearlyShipments=L,S()})}),(()=>{const s=e.querySelector("#gantt-timeline");if(!s)return;const i=[9,10,11,12,1,2,3,4,5],c=i.length;let m=null,h=null;s.querySelectorAll(".gantt-bar").forEach(E=>{E.style.pointerEvents="auto"});function b(E){return"touches"in E?E.touches[0].clientX:E.clientX}function w(E){const L=E.target,I=L.closest(".gantt-bar");if(!I)return;const M=I.parentElement,O=I.dataset.cat??"",N=parseInt(I.dataset.month??"0"),j=parseInt(I.dataset.dur??"1"),V=parseInt(I.dataset.vol??"0"),z=M.offsetWidth/c;let U="move";L.classList.contains("gantt-resize-right")?U="resize-right":L.classList.contains("gantt-resize-left")&&(U="resize-left"),I.style.cursor=U==="move"?"grabbing":"ew-resize",I.style.opacity="0.8",I.style.zIndex="10",m={bar:I,mode:U,cat:O,origMonth:N,origDur:j,origVol:V,startX:b(E),cellW:z,origLeftPct:parseFloat(I.style.left),origWidthPct:parseFloat(I.style.width)},E.preventDefault()}function $(E){if(!m)return;const{bar:L,mode:I,origDur:M,startX:O,cellW:N,origLeftPct:j,origWidthPct:V}=m,z=b(E)-O,U=Math.round(z/N),H=Math.round(j/100*c);if(I==="move"){const W=Math.max(0,Math.min(c-M,H+U));L.style.left=(W/c*100).toFixed(2)+"%"}else if(I==="resize-right"){const W=Math.max(1,Math.min(c-H,M+U));L.style.width=(W/c*100).toFixed(2)+"%"}else if(I==="resize-left"){const W=Math.max(0,Math.min(H+M-1,H+U)),J=M-(W-H);L.style.left=(W/c*100).toFixed(2)+"%",L.style.width=(J/c*100).toFixed(2)+"%"}}async function _(E){if(!m)return;const{bar:L,cat:I,origMonth:M,origDur:O,origVol:N}=m,j=Math.round(parseFloat(L.style.left)/100*c),V=Math.max(1,Math.round(parseFloat(L.style.width)/100*c)),z=i[Math.max(0,Math.min(c-1,j))];if(L.style.cursor="grab",L.style.opacity="1",L.style.zIndex="",m=null,z===M&&V===O)return;const{saveBrewingSchedule:U,fetchBrewingSchedule:H}=await q(async()=>{const{saveBrewingSchedule:J,fetchBrewingSchedule:K}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:J,fetchBrewingSchedule:K}},void 0),W=a.brewingSchedule.filter(J=>J.brewCategory===I).map(J=>J.brewMonth===M?{brewMonth:z,durationMonths:V,plannedVolumeL:N}:{brewMonth:J.brewMonth,durationMonths:J.durationMonths,plannedVolumeL:J.plannedVolumeL});await U(I,a.brewingPlanFY,W),a.brewingSchedule=await H(a.brewingPlanFY),S()}s.addEventListener("mousedown",w),s.addEventListener("touchstart",w,{passive:!1}),document.addEventListener("mousemove",$),document.addEventListener("touchmove",$,{passive:!1}),document.addEventListener("mouseup",_),document.addEventListener("touchend",_);function k(E){const L=E.dataset.cat??"",I=parseInt(E.dataset.month??"0"),M=parseInt(E.dataset.vol??"0"),O=parseInt(E.dataset.max??"99999"),N=E.querySelector(".gantt-bar-label");if(!N||N.querySelector("input"))return;const j=document.createElement("input");j.type="number",j.min="0",j.max=String(O),j.step="100",j.value=String(M),j.style.cssText="width:60px;height:24px;font-size:12px;text-align:center;border:1px solid #2563eb;border-radius:3px;pointer-events:auto;",N.textContent="",N.style.pointerEvents="auto",N.appendChild(j),j.focus(),j.select();const V=async()=>{const z=parseFloat(j.value)||0;if(N.style.pointerEvents="none",N.textContent=T(Math.round(z))+"L",Math.abs(z-M)<1)return;const{saveBrewingSchedule:U,fetchBrewingSchedule:H}=await q(async()=>{const{saveBrewingSchedule:J,fetchBrewingSchedule:K}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:J,fetchBrewingSchedule:K}},void 0),W=a.brewingSchedule.filter(J=>J.brewCategory===L).map(J=>({brewMonth:J.brewMonth,durationMonths:J.durationMonths,plannedVolumeL:J.brewMonth===I?z:J.plannedVolumeL}));await U(L,a.brewingPlanFY,W),a.brewingSchedule=await H(a.brewingPlanFY),S()};j.addEventListener("blur",V),j.addEventListener("keydown",z=>{z.key==="Enter"&&j.blur()})}s.addEventListener("dblclick",E=>{const L=E.target.closest(".gantt-bar");L&&k(L)}),s.addEventListener("touchstart",E=>{const L=E.target.closest(".gantt-bar");if(L){if(h){clearTimeout(h),h=null,k(L);return}h=setTimeout(()=>{h=null},300)}},{passive:!0}),s.querySelectorAll(".gantt-bar-container").forEach(E=>{E.style.pointerEvents="auto";const L=async I=>{if(m)return;const M=E.dataset.cat??"",O=parseInt(E.dataset.max??"0"),N=E.getBoundingClientRect(),j=I-N.left,V=Math.floor(j/(N.width/c)),z=i[Math.max(0,Math.min(c-1,V))];if(a.brewingSchedule.some(K=>K.brewCategory===M&&K.brewMonth===z))return;const U=Math.round(O*.3)||500,{saveBrewingSchedule:H,fetchBrewingSchedule:W}=await q(async()=>{const{saveBrewingSchedule:K,fetchBrewingSchedule:le}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:K,fetchBrewingSchedule:le}},void 0),J=[...a.brewingSchedule.filter(K=>K.brewCategory===M).map(K=>({brewMonth:K.brewMonth,durationMonths:K.durationMonths,plannedVolumeL:K.plannedVolumeL})),{brewMonth:z,durationMonths:2,plannedVolumeL:U}];await H(M,a.brewingPlanFY,J),a.brewingSchedule=await W(a.brewingPlanFY),S()};E.addEventListener("click",I=>{I.target.closest(".gantt-bar")||L(I.clientX)})})})();function T(s){return s.toLocaleString("ja-JP")}(()=>{const s=e.querySelector("#bp-gantt");if(!s)return;let i=null;function c(b){const w=b.target,$=w.closest(".bp-gantt-bar");if(!$)return;let _="move";w.classList.contains("bp-gantt-resize-right")?_="resize-right":w.classList.contains("bp-gantt-resize-left")&&(_="resize-left");const k="touches"in b?b.touches[0].clientX:b.clientX;$.style.opacity="0.7",$.style.zIndex="10",i={bar:$,mode:_,stepId:$.dataset.stepId??"",startX:k,origLeft:parseFloat($.style.left),origWidth:parseFloat($.style.width)},b.preventDefault()}function m(b){if(!i)return;const $=("touches"in b?b.touches[0].clientX:b.clientX)-i.startX;i.mode==="move"?i.bar.style.left=i.origLeft+$+"px":i.mode==="resize-right"?i.bar.style.width=Math.max(6,i.origWidth+$)+"px":(i.bar.style.left=i.origLeft+$+"px",i.bar.style.width=Math.max(6,i.origWidth-$)+"px")}async function h(){if(!i)return;const{bar:b,stepId:w,origLeft:$,origWidth:_}=i,k=parseFloat(b.style.left),E=parseFloat(b.style.width);b.style.opacity="1",b.style.zIndex="",i=null;const L=Math.round((k-$)/6),I=Math.round((E-_)/6);if(L===0&&I===0)return;const M=b.dataset.plannedStart??"",O=b.dataset.plannedEnd??"";if(!M||!O)return;const N=(H,W)=>{const J=new Date(H);return J.setDate(J.getDate()+W),J.toISOString().slice(0,10)};let j=M,V=O;L!==0&&I===0?(j=N(M,L),V=N(O,L)):I!==0&&L===0?V=N(O,I):(j=N(M,L),V=N(O,L+I));const{updateBrewingProcessStep:z,fetchBrewingProcessSteps:U}=await q(async()=>{const{updateBrewingProcessStep:H,fetchBrewingProcessSteps:W}=await Promise.resolve().then(()=>R);return{updateBrewingProcessStep:H,fetchBrewingProcessSteps:W}},void 0);await z(w,{planned_start:j,planned_end:V}),a.brewingProcessSteps=await U(a.brewingBatches.map(H=>H.id)),S()}s.addEventListener("mousedown",c),s.addEventListener("touchstart",c,{passive:!1}),document.addEventListener("mousemove",m),document.addEventListener("touchmove",m,{passive:!1}),document.addEventListener("mouseup",h),document.addEventListener("touchend",h)})(),e.querySelector("[data-action='bp-auto-schedule']")?.addEventListener("click",async()=>{if(a.brewingBatches.length===0)return;const s=e.querySelector("[data-action='bp-auto-schedule']");s&&(s.textContent="計算中...",s.disabled=!0);const{autoScheduleAllBatches:i,fetchBrewingBatches:c,fetchBrewingProcessSteps:m}=await q(async()=>{const{autoScheduleAllBatches:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:w}=await Promise.resolve().then(()=>R);return{autoScheduleAllBatches:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:w}},void 0);await i(a.brewingBatches,a.bpWorkerSettings,a.bpStepLabor),a.brewingBatches=await c(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(h=>h.id)):[],S()});for(const s of["bp-worker-count","bp-worker-hours","bp-worker-start"])e.querySelector(`[data-action='${s}']`)?.addEventListener("change",async i=>{const c=parseFloat(i.target.value)||0;s==="bp-worker-count"?a.bpWorkerSettings.workerCount=c:s==="bp-worker-hours"?a.bpWorkerSettings.weeklyHoursLimit=c:a.bpWorkerSettings.dayStartHour=c;const{saveWorkerSettings:m}=await q(async()=>{const{saveWorkerSettings:h}=await Promise.resolve().then(()=>R);return{saveWorkerSettings:h}},void 0);await m(a.bpWorkerSettings),S()});e.querySelector("[data-action='bp-worker-deadline']")?.addEventListener("change",async s=>{a.bpWorkerSettings.deadlineDate=s.target.value;const{saveWorkerSettings:i}=await q(async()=>{const{saveWorkerSettings:c}=await Promise.resolve().then(()=>R);return{saveWorkerSettings:c}},void 0);await i(a.bpWorkerSettings),S()}),e.querySelector("[data-action='bp-worker-sunday']")?.addEventListener("change",async s=>{a.bpWorkerSettings.allowSunday=s.target.checked;const{saveWorkerSettings:i}=await q(async()=>{const{saveWorkerSettings:c}=await Promise.resolve().then(()=>R);return{saveWorkerSettings:c}},void 0);await i(a.bpWorkerSettings),S()}),e.querySelector("[data-action='bp-import-schedule']")?.addEventListener("click",async()=>{const s=e.querySelectorAll("[data-action='bp-import-check']:checked");if(s.length===0)return;const{createBrewingBatch:i,fetchBrewingBatches:c,fetchBrewingProcessSteps:m}=await q(async()=>{const{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:w}=await Promise.resolve().then(()=>R);return{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:w}},void 0);for(const h of s){const b=h.dataset.cat??"",w=h.dataset.code??"",$=parseFloat(h.dataset.vol??"0"),_=h.dataset.date??"";!b||!w||!_||await i(b,w,a.brewingPlanFY,$,_,a.brewingProcessSteps,a.brewingRiceParams)}a.brewingBatches=await c(a.brewingPlanFY),a.brewingBatches.length>0&&(a.brewingProcessSteps=await m(a.brewingBatches.map(h=>h.id))),S()}),e.querySelector("[data-action='bp-show-new-form']")?.addEventListener("click",()=>{a.bpShowNewForm=!a.bpShowNewForm,S()}),e.querySelector("[data-action='bp-create-batch']")?.addEventListener("click",async()=>{const s=e.querySelector("#bp-new-cat")?.value??"",i=e.querySelector("#bp-new-code")?.value?.trim()??"",c=parseFloat(e.querySelector("#bp-new-vol")?.value??"0"),m=e.querySelector("#bp-new-date")?.value??"";if(!s||!i||!m)return;const{createBrewingBatch:h,fetchBrewingBatches:b,fetchBrewingProcessSteps:w}=await q(async()=>{const{createBrewingBatch:$,fetchBrewingBatches:_,fetchBrewingProcessSteps:k}=await Promise.resolve().then(()=>R);return{createBrewingBatch:$,fetchBrewingBatches:_,fetchBrewingProcessSteps:k}},void 0);await h(s,i,a.brewingPlanFY,c,m,a.brewingProcessSteps,a.brewingRiceParams),a.brewingBatches=await b(a.brewingPlanFY),a.brewingProcessSteps=await w(a.brewingBatches.map($=>$.id)),a.bpShowNewForm=!1,S()}),e.querySelectorAll("[data-action='bp-toggle-detail']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.batchId??"";a.bpExpandedBatchId=a.bpExpandedBatchId===i?"":i,S()})}),e.querySelectorAll("[data-action='bp-step-status']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.stepId??"";if(!i)return;const{updateBrewingProcessStep:c}=await q(async()=>{const{updateBrewingProcessStep:b}=await Promise.resolve().then(()=>R);return{updateBrewingProcessStep:b}},void 0),m={status:s.value};s.value==="進行中"&&!s.dataset.actualStart&&(m.actual_start=new Date().toISOString().split("T")[0]),s.value==="完了"&&!s.dataset.actualEnd&&(m.actual_end=new Date().toISOString().split("T")[0]),await c(i,m);const{fetchBrewingProcessSteps:h}=await q(async()=>{const{fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>R);return{fetchBrewingProcessSteps:b}},void 0);a.brewingProcessSteps=await h(a.brewingBatches.map(b=>b.id)),S()})}),e.querySelectorAll("[data-action='bp-step-temp']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.stepId??"";if(!i)return;const{updateBrewingProcessStep:c}=await q(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>R);return{updateBrewingProcessStep:m}},void 0);await c(i,{temperature:parseFloat(s.value)||null})})}),e.querySelectorAll("[data-action='bp-step-notes']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.stepId??"";if(!i)return;const{updateBrewingProcessStep:c}=await q(async()=>{const{updateBrewingProcessStep:m}=await Promise.resolve().then(()=>R);return{updateBrewingProcessStep:m}},void 0);await c(i,{notes:s.value})})});let P="";e.querySelectorAll("[data-action='bp-show-delete-modal']").forEach(s=>{s.addEventListener("click",()=>{P=s.dataset.batchId??"";const i=e.querySelector("#bp-delete-modal"),c=e.querySelector("#bp-delete-batch-name");i&&(i.style.display="flex"),c&&(c.textContent=s.dataset.batchCode??"")})}),e.querySelector("[data-action='bp-delete-cancel']")?.addEventListener("click",()=>{const s=e.querySelector("#bp-delete-modal");s&&(s.style.display="none"),P=""}),e.querySelector("[data-action='bp-delete-confirm']")?.addEventListener("click",async()=>{if(!P)return;const s=e.querySelector("#bp-delete-modal");s&&(s.style.display="none");const{supabaseDelete:i}=await q(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>Z);return{supabaseDelete:h}},void 0);await i("brewing_process_batches",P);const{fetchBrewingBatches:c,fetchBrewingProcessSteps:m}=await q(async()=>{const{fetchBrewingBatches:h,fetchBrewingProcessSteps:b}=await Promise.resolve().then(()=>R);return{fetchBrewingBatches:h,fetchBrewingProcessSteps:b}},void 0);a.brewingBatches=await c(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await m(a.brewingBatches.map(h=>h.id)):[],a.bpExpandedBatchId="",P="",S()}),e.querySelector("#bp-delete-modal")?.addEventListener("click",s=>{s.target===s.currentTarget&&(s.currentTarget.style.display="none",P="")}),e.querySelectorAll("[data-action='bp-batch-vol']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.batchId??"";if(!i)return;const{updateBrewingBatch:c}=await q(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>R);return{updateBrewingBatch:m}},void 0);await c(i,{planned_volume_l:parseFloat(s.value)||0})})}),e.querySelectorAll("[data-action='bp-batch-date']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.batchId??"";if(!i)return;const{updateBrewingBatch:c}=await q(async()=>{const{updateBrewingBatch:m}=await Promise.resolve().then(()=>R);return{updateBrewingBatch:m}},void 0);await c(i,{start_date:s.value})})}),e.querySelectorAll("[data-action='bp-batch-status']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.batchId??"";if(!i)return;const{updateBrewingBatch:c,fetchBrewingBatches:m,fetchBrewingProcessSteps:h}=await q(async()=>{const{updateBrewingBatch:b,fetchBrewingBatches:w,fetchBrewingProcessSteps:$}=await Promise.resolve().then(()=>R);return{updateBrewingBatch:b,fetchBrewingBatches:w,fetchBrewingProcessSteps:$}},void 0);await c(i,{status:s.value}),a.brewingBatches=await m(a.brewingPlanFY),a.brewingProcessSteps=a.brewingBatches.length>0?await h(a.brewingBatches.map(b=>b.id)):[],S()})}),e.querySelectorAll("[data-action='proc-add-schedule']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",c=e.querySelector(`[data-action='proc-add-month-select'][data-cat='${i}']`),m=e.querySelector(`[data-action='proc-add-month-vol'][data-cat='${i}']`),h=parseInt(c?.value??"0"),b=parseFloat(m?.value??"0");if(!i||!h||b<=0)return;const $=[...a.brewingSchedule.filter(E=>E.brewCategory===i).map(E=>({brewMonth:E.brewMonth,durationMonths:E.durationMonths,plannedVolumeL:E.plannedVolumeL})),{brewMonth:h,durationMonths:2,plannedVolumeL:b}],{saveBrewingSchedule:_,fetchBrewingSchedule:k}=await q(async()=>{const{saveBrewingSchedule:E,fetchBrewingSchedule:L}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:E,fetchBrewingSchedule:L}},void 0);await _(i,a.brewingPlanFY,$),a.brewingSchedule=await k(a.brewingPlanFY),S()})}),e.querySelectorAll("[data-action='proc-remove-schedule']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",c=parseInt(s.dataset.month??"0");if(!i||!c)return;const m=a.brewingSchedule.filter(w=>w.brewCategory===i&&w.brewMonth!==c).map(w=>({brewMonth:w.brewMonth,durationMonths:w.durationMonths,plannedVolumeL:w.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await q(async()=>{const{saveBrewingSchedule:w,fetchBrewingSchedule:$}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:w,fetchBrewingSchedule:$}},void 0);await h(i,a.brewingPlanFY,m),a.brewingSchedule=await b(a.brewingPlanFY),S()})}),e.querySelectorAll("[data-action='proc-sched-remove']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",c=parseInt(s.dataset.month??"0");if(!i||!c)return;const m=a.brewingSchedule.filter(w=>w.brewCategory===i&&w.brewMonth!==c).map(w=>({brewMonth:w.brewMonth,durationMonths:w.durationMonths,plannedVolumeL:w.plannedVolumeL})),{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await q(async()=>{const{saveBrewingSchedule:w,fetchBrewingSchedule:$}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:w,fetchBrewingSchedule:$}},void 0);await h(i,a.brewingPlanFY,m),a.brewingSchedule=await b(a.brewingPlanFY),S()})}),e.querySelectorAll("[data-action='proc-sched-edit-vol']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",c=parseInt(s.dataset.month??"0"),m=parseFloat(s.value)||0;if(!i||!c)return;const h=a.brewingSchedule.filter($=>$.brewCategory===i).map($=>({brewMonth:$.brewMonth,durationMonths:$.durationMonths,plannedVolumeL:$.brewMonth===c?m:$.plannedVolumeL})),{saveBrewingSchedule:b,fetchBrewingSchedule:w}=await q(async()=>{const{saveBrewingSchedule:$,fetchBrewingSchedule:_}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:$,fetchBrewingSchedule:_}},void 0);await b(i,a.brewingPlanFY,h),a.brewingSchedule=await w(a.brewingPlanFY),S()})}),e.querySelectorAll("[data-action='proc-edit-vol']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",c=parseFloat(s.value)||0;if(!i)return;const{saveProcurementDecision:m}=await q(async()=>{const{saveProcurementDecision:h}=await Promise.resolve().then(()=>R);return{saveProcurementDecision:h}},void 0);await m(i,a.brewingPlanFY,c),a.procurementDecisions[i]=c,S()})}),e.querySelector("[data-action='proc-add-commitment']")?.addEventListener("click",async()=>{const s=(e.querySelector("#proc-commit-variety")?.value??"").trim(),i=parseFloat(e.querySelector("#proc-commit-bales")?.value??"0"),c=parseFloat(e.querySelector("#proc-commit-price")?.value??"0"),m=parseInt(e.querySelector("#proc-commit-month")?.value??"0")||null,h=(e.querySelector("#proc-commit-supplier")?.value??"").trim();if(!s||i<=0)return;const{saveRicePurchaseCommitment:b,fetchRicePurchaseCommitments:w}=await q(async()=>{const{saveRicePurchaseCommitment:$,fetchRicePurchaseCommitments:_}=await Promise.resolve().then(()=>R);return{saveRicePurchaseCommitment:$,fetchRicePurchaseCommitments:_}},void 0);await b({varietyName:s,committedBales:i,pricePerKg:c,deliveryMonth:m,supplier:h,fy:a.brewingPlanFY}),a.ricePurchaseCommitments=await w(a.brewingPlanFY),S()}),e.querySelector("[data-action='proc-add-variety']")?.addEventListener("click",async()=>{const s=e.querySelector("#proc-variety-name"),i=e.querySelector("#proc-variety-price"),c=s?.value.trim()??"",m=parseFloat(i?.value??"400")||400;if(!c)return;const{addRiceVariety:h,fetchRiceVarieties:b}=await q(async()=>{const{addRiceVariety:$,fetchRiceVarieties:_}=await Promise.resolve().then(()=>R);return{addRiceVariety:$,fetchRiceVarieties:_}},void 0);await h(c,m)&&(a.riceVarieties=await b(),s&&(s.value=""),i&&(i.value=""),B(`「${c}」を追加しました`)),S()}),e.querySelectorAll("[data-action='proc-delete-variety']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",{deleteRiceVariety:c,fetchRiceVarieties:m}=await q(async()=>{const{deleteRiceVariety:b,fetchRiceVarieties:w}=await Promise.resolve().then(()=>R);return{deleteRiceVariety:b,fetchRiceVarieties:w}},void 0);await c(i)&&(a.riceVarieties=await m()),S()})}),e.querySelectorAll("[data-action='brew-rice-variety-select']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",c=s.dataset.field??"",m=s.value;if(!i||!c)return;const h=a.brewingRiceParams[i]??{brewCategory:i,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[c]=m;const b=a.riceVarieties.find($=>$.name===m);b&&(c==="kojiVariety"&&(h.kojiPricePerKg=b.defaultPricePerKg),c==="kakeVariety"&&(h.kakePricePerKg=b.defaultPricePerKg)),a.brewingRiceParams[i]=h;const{saveBrewingRiceParams:w}=await q(async()=>{const{saveBrewingRiceParams:$}=await Promise.resolve().then(()=>R);return{saveBrewingRiceParams:$}},void 0);await w(i,h),S()})}),e.querySelector("[data-action='proc-add-new-cat']")?.addEventListener("click",async()=>{const s=e.querySelector("#proc-new-cat-name"),i=e.querySelector("#proc-new-cat-vol"),c=s?.value.trim()??"",m=parseFloat(i?.value??"0");if(!c){B("区分名を入力してください","warning");return}if(m<=0){B("醸造予定量を入力してください","warning");return}const{saveBrewingSchedule:h,fetchBrewingSchedule:b}=await q(async()=>{const{saveBrewingSchedule:w,fetchBrewingSchedule:$}=await Promise.resolve().then(()=>R);return{saveBrewingSchedule:w,fetchBrewingSchedule:$}},void 0);await h(c,a.brewingPlanFY,[{brewMonth:10,durationMonths:2,plannedVolumeL:m}]),a.brewingSchedule=await b(a.brewingPlanFY),s&&(s.value=""),i&&(i.value=""),B(`「${c}」を追加しました`),S()}),e.querySelector("[data-action='brew-rice-bulk-apply']")?.addEventListener("click",async()=>{const s=parseFloat(e.querySelector("#rice-bulk-per-l")?.value??"0.50"),i=parseFloat(e.querySelector("#rice-bulk-koji")?.value??"0.30");if(isNaN(s)||isNaN(i))return;const{saveBrewingRiceParams:c}=await q(async()=>{const{saveBrewingRiceParams:b}=await Promise.resolve().then(()=>R);return{saveBrewingRiceParams:b}},void 0),m=Object.keys(a.brewingRiceParams),h=new Set([...m,...a.brewingYearlyShipments.map(b=>b.brewCategory)]);for(const b of h){const w=a.brewingRiceParams[b]??{brewCategory:b,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};w.ricePerLiterKg=s,w.kojiRatio=i,a.brewingRiceParams[b]=w,await c(b,w)}S()}),e.querySelectorAll("[data-action='brew-rice-edit']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",c=s.dataset.field??"",m=parseFloat(s.value);if(!i||!c||isNaN(m))return;const h=a.brewingRiceParams[i]??{brewCategory:i,polishingRatio:.7,ricePerLiterKg:.5,kojiRatio:.3,kojiVariety:"山田錦",kojiPricePerKg:600,kakeVariety:"一般米",kakePricePerKg:350,alcoholAdditionRatio:0};h[c]=m,a.brewingRiceParams[i]=h;const{saveBrewingRiceParams:b}=await q(async()=>{const{saveBrewingRiceParams:w}=await Promise.resolve().then(()=>R);return{saveBrewingRiceParams:w}},void 0);await b(i,h),S()})}),e.querySelectorAll("[data-action='brew-growth-edit']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",c=parseFloat(s.value);if(!i)return;const{saveBrewingForecastOverride:m}=await q(async()=>{const{saveBrewingForecastOverride:h}=await Promise.resolve().then(()=>R);return{saveBrewingForecastOverride:h}},void 0);if(isNaN(c))await m(i,null),delete a.brewingForecastOverrides[i];else{const h=c/100;await m(i,h),a.brewingForecastOverrides[i]=h}S()})}),e.querySelectorAll("[data-action='brew-alc-save']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",c="bc-"+encodeURIComponent(i).replace(/%/g,"-"),m=e.querySelector(`#alc-raw-${c}`),h=e.querySelector(`#alc-target-${c}`),b=parseFloat(m?.value??"18")||18,w=parseFloat(h?.value??"15")||15,{saveBrewingAlcoholSetting:$}=await q(async()=>{const{saveBrewingAlcoholSetting:k}=await Promise.resolve().then(()=>R);return{saveBrewingAlcoholSetting:k}},void 0);await $(i,b,w)&&(a.brewingAlcoholSettings[i]={brewCategory:i,rawAlcoholPct:b,targetAlcoholPct:w}),S()})}),e.querySelectorAll("[data-action='brew-move-product']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.code??"",c=s.value,m=s.dataset.current??"";if(c===m)return;const{setBrewingCategoryOverride:h,fetchBrewingPlanSummary:b,fetchBrewingProductDetail:w,fetchBrewingCategoryOverrides:$}=await q(async()=>{const{setBrewingCategoryOverride:k,fetchBrewingPlanSummary:E,fetchBrewingProductDetail:L,fetchBrewingCategoryOverrides:I}=await Promise.resolve().then(()=>R);return{setBrewingCategoryOverride:k,fetchBrewingPlanSummary:E,fetchBrewingProductDetail:L,fetchBrewingCategoryOverrides:I}},void 0);if(await h(i,c)){const k=a.brewingPlanFY,[E,L,I]=await Promise.all([b(`${k}-10-01`,`${k+1}-09-30`),w(`${k}-10-01`,`${k+1}-09-30`),$()]);a.brewingPlanData=E,a.brewingProductDetail=L,a.brewingOverrides=I}S()})}),e.querySelectorAll("[data-action='brew-link-type']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.cat??"",c=s.value;if(!i||!c)return;const{linkTypeToCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:w,fetchCategoryTypeLinks:$}=await q(async()=>{const{linkTypeToCategory:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:V}=await Promise.resolve().then(()=>R);return{linkTypeToCategory:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:V}},void 0);await m(i,c);const _=a.brewingPlanFY,[k,E,L,I]=await Promise.all([h(`${_}-10-01`,`${_+1}-09-30`),b(`${_}-10-01`,`${_+1}-09-30`),w(),$()]);a.brewingPlanData=k,a.brewingProductDetail=E,a.brewingOverrides=L,a.brewingTypeLinks=I,S()})}),e.querySelectorAll("[data-action='brew-unlink-type']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",c=s.dataset.type??"";if(!i||!c)return;const{unlinkTypeFromCategory:m,fetchBrewingPlanSummary:h,fetchBrewingProductDetail:b,fetchBrewingCategoryOverrides:w,fetchCategoryTypeLinks:$}=await q(async()=>{const{unlinkTypeFromCategory:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:V}=await Promise.resolve().then(()=>R);return{unlinkTypeFromCategory:M,fetchBrewingPlanSummary:O,fetchBrewingProductDetail:N,fetchBrewingCategoryOverrides:j,fetchCategoryTypeLinks:V}},void 0);await m(i,c);const _=a.brewingPlanFY,[k,E,L,I]=await Promise.all([h(`${_}-10-01`,`${_+1}-09-30`),b(`${_}-10-01`,`${_+1}-09-30`),w(),$()]);a.brewingPlanData=k,a.brewingProductDetail=E,a.brewingOverrides=L,a.brewingTypeLinks=I,S()})}),e.querySelector("[data-action='brew-add-category']")?.addEventListener("click",async()=>{const s=e.querySelector("#brew-new-category-name"),i=e.querySelector("#brew-new-category-parent"),c=s?.value.trim()??"",m=i?.value??"";if(!c)return;if(!m){B("親区分を選択してください","warning");return}if(["純米大吟醸","大吟醸","純米吟醸","純米","本醸造","普通酒","リキュール","その他",...a.brewingCustomCategories.map($=>$.name)].includes(c)){B("同名の区分が既に存在します","warning");return}const{addBrewingCustomCategory:b}=await q(async()=>{const{addBrewingCustomCategory:$}=await Promise.resolve().then(()=>R);return{addBrewingCustomCategory:$}},void 0);await b(c,m)?(a.brewingCustomCategories.push({name:c,parentCategory:m}),s&&(s.value=""),B(`「${c}」を追加しました（${m}系）`)):B("追加に失敗しました","error"),S()}),e.querySelectorAll("[data-action='brew-delete-category']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"";if(!i)return;const{deleteBrewingCustomCategory:c,fetchBrewingPlanSummary:m,fetchBrewingProductDetail:h}=await q(async()=>{const{deleteBrewingCustomCategory:w,fetchBrewingPlanSummary:$,fetchBrewingProductDetail:_}=await Promise.resolve().then(()=>R);return{deleteBrewingCustomCategory:w,fetchBrewingPlanSummary:$,fetchBrewingProductDetail:_}},void 0);if(await c(i)){a.brewingCustomCategories=a.brewingCustomCategories.filter(k=>k.name!==i);for(const[k,E]of Object.entries(a.brewingOverrides))E===i&&delete a.brewingOverrides[k];const w=a.brewingPlanFY,[$,_]=await Promise.all([m(`${w}-10-01`,`${w+1}-09-30`),h(`${w}-10-01`,`${w+1}-09-30`)]);a.brewingPlanData=$,a.brewingProductDetail=_,B(`「${i}」を削除しました`)}S()})}),e.querySelectorAll("[data-action='brew-add-entry']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",c=s.dataset.catId??"",h=e.querySelector(`#new-entry-target-${c}`)?.value??i,b=e.querySelector(`#new-entry-label-${c}`),w=e.querySelector(`#new-entry-vol-${c}`),$=b?.value.trim()??"",_=parseFloat(w?.value??"0");if(_<=0)return;const{addBrewingStockEntry:k,fetchBrewingPlanSummary:E,fetchAllBrewingStockEntries:L}=await q(async()=>{const{addBrewingStockEntry:M,fetchBrewingPlanSummary:O,fetchAllBrewingStockEntries:N}=await Promise.resolve().then(()=>R);return{addBrewingStockEntry:M,fetchBrewingPlanSummary:O,fetchAllBrewingStockEntries:N}},void 0);if(await k(h,$||`タンク${a.brewingStockEntries.filter(M=>M.brewCategory===h).length+1}`,_)){const M=a.brewingPlanFY,[O,N]=await Promise.all([E(`${M}-10-01`,`${M+1}-09-30`),L()]);a.brewingPlanData=O,a.brewingStockEntries=N}S(),requestAnimationFrame(()=>{const M=document.getElementById(`stock-display-${c}`),O=document.getElementById(`stock-edit-${c}`),N=document.querySelector(`.btn-edit-stock[data-cat-id="${c}"]`);M&&(M.style.display="none"),O&&(O.style.display=""),N&&(N.style.display="none")})})}),e.querySelectorAll("[data-action='brew-reassign-entry']").forEach(s=>{s.addEventListener("change",async()=>{const i=s.dataset.id??"",c=s.value;if(!i||!c)return;const{reassignBrewingStockEntry:m,fetchBrewingPlanSummary:h,fetchAllBrewingStockEntries:b}=await q(async()=>{const{reassignBrewingStockEntry:$,fetchBrewingPlanSummary:_,fetchAllBrewingStockEntries:k}=await Promise.resolve().then(()=>R);return{reassignBrewingStockEntry:$,fetchBrewingPlanSummary:_,fetchAllBrewingStockEntries:k}},void 0);if(await m(i,c)){const $=a.brewingPlanFY,[_,k]=await Promise.all([h(`${$}-10-01`,`${$+1}-09-30`),b()]);a.brewingPlanData=_,a.brewingStockEntries=k}S(),requestAnimationFrame(()=>{e.querySelectorAll(".btn-edit-stock").forEach($=>{const _=document.getElementById(`stock-display-${$.dataset.catId}`),k=document.getElementById(`stock-edit-${$.dataset.catId}`);k&&k.querySelector(`[data-id="${i}"]`)&&(_&&(_.style.display="none"),k.style.display="",$.style.display="none")})})})}),e.querySelectorAll("[data-action='brew-delete-entry']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.id??"",c=s.dataset.cat??"",m="bc-"+encodeURIComponent(c).replace(/%/g,"-"),{deleteBrewingStockEntry:h,fetchBrewingPlanSummary:b,fetchAllBrewingStockEntries:w}=await q(async()=>{const{deleteBrewingStockEntry:_,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:E}=await Promise.resolve().then(()=>R);return{deleteBrewingStockEntry:_,fetchBrewingPlanSummary:k,fetchAllBrewingStockEntries:E}},void 0);if(await h(i)){const _=a.brewingPlanFY,[k,E]=await Promise.all([b(`${_}-10-01`,`${_+1}-09-30`),w()]);a.brewingPlanData=k,a.brewingStockEntries=E}S(),requestAnimationFrame(()=>{const _=document.getElementById(`stock-display-${m}`),k=document.getElementById(`stock-edit-${m}`),E=document.querySelector(`.btn-edit-stock[data-cat-id="${m}"]`);_&&(_.style.display="none"),k&&(k.style.display=""),E&&(E.style.display="none")})})}),e.querySelectorAll(".btn-edit-stock").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.catId??"",c=e.querySelector(`#stock-display-${i}`),m=e.querySelector(`#stock-edit-${i}`);c&&(c.style.display="none"),m&&(m.style.display=""),s.style.display="none"})}),e.querySelectorAll(".btn-cancel-stock").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.catId??"",c=e.querySelector(`#stock-display-${i}`),m=e.querySelector(`#stock-edit-${i}`),h=e.querySelector(`.btn-edit-stock[data-cat-id="${i}"]`);c&&(c.style.display=""),m&&(m.style.display="none"),h&&(h.style.display="")})}),e.querySelectorAll(".btn-add-schedule-row").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.catId??"",c=e.querySelector(`#schedule-rows-${i}`);if(!c)return;const m=c.querySelectorAll(".schedule-edit-row").length,h=document.createElement("div");h.innerHTML=buildScheduleEditRowHTML(i,m,9,2,0,"");const b=h.firstElementChild;c.appendChild(b),b.querySelector(".btn-remove-schedule-row")?.addEventListener("click",()=>b.remove())})}),e.querySelectorAll(".btn-remove-schedule-row").forEach(s=>{s.addEventListener("click",()=>s.closest(".schedule-edit-row")?.remove())}),e.querySelectorAll(".btn-save-stock").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.cat??"",c=s.dataset.catId??"",m=e.querySelector(`#stock-input-${c}`),h=parseFloat(m?.value??"");if(isNaN(h)||h<0){alert("有効な数値を入力してください");return}s.textContent="保存中...",s.setAttribute("disabled","true");try{const{upsertBrewingStock:b,fetchBrewingPlanSummary:w,fetchBrewingMonthlyTrend:$}=await q(async()=>{const{upsertBrewingStock:L,fetchBrewingPlanSummary:I,fetchBrewingMonthlyTrend:M}=await Promise.resolve().then(()=>R);return{upsertBrewingStock:L,fetchBrewingPlanSummary:I,fetchBrewingMonthlyTrend:M}},void 0),_=a.brewingPlanFY;await b(i,h,0);const[k,E]=await Promise.all([w(`${_}-10-01`,`${_+1}-09-30`),$(`${_}-10-01`,`${_+1}-09-30`)]);a.brewingPlanData=k,a.brewingMonthlyTrend=E,S()}catch(b){console.error("[brewing save]",b),alert(`保存エラー: ${String(b)}`),s.textContent="保存",s.removeAttribute("disabled")}})}),e.querySelectorAll("[data-toggle-cat]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.toggleCat??"",c=`sub-row-${"bc-"+encodeURIComponent(i).replace(/%/g,"-")}`,m=e.querySelectorAll(`.${c}`),h=s.querySelector(".toggle-icon"),b=m[0]?.style.display!=="none";m.forEach(w=>{w.style.display=b?"none":""}),h&&(h.innerHTML=b?"&#9654;":"&#9660;")})}),e.querySelector("[data-action='jikomi-new']")?.addEventListener("click",()=>{B("新規仕込の登録はマスタ管理から行ってください","info")}),e.querySelector("[data-action='kentei-new']")?.addEventListener("click",()=>{B("新規検定の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='kentei-edit']").forEach(s=>{s.addEventListener("click",()=>{B("検定の編集はマスタ管理から行ってください","info")})}),e.querySelector("[data-action='purchase-new']")?.addEventListener("click",()=>{B("新規仕入の登録はマスタ管理から行ってください","info")}),e.querySelectorAll("[data-action='payable-pay']").forEach(s=>{s.addEventListener("click",async()=>{await Pe("この買掛を入金済みにしますか？")&&B("入金処理はデータベース側の設定が必要です","info")})}),e.querySelectorAll("[data-action='bill-detail']").forEach(s=>{s.addEventListener("click",()=>{B("請求書詳細は印刷センターから確認してください","info")})}),e.querySelector("[data-action='bill-new']")?.addEventListener("click",()=>{B("新規請求書の作成は伝票入力から行ってください","info")}),e.querySelectorAll("[data-action='tank-detail']").forEach(s=>{s.addEventListener("click",()=>{const i=s.closest("tr")?.querySelector("td")?.textContent??"";B(`タンク ${i} の詳細: 仕込台帳を参照してください`,"info")})}),e.querySelector("[data-action='order-new']")?.addEventListener("click",()=>{B("新規注文はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-action='order-detail']").forEach(s=>{s.addEventListener("click",()=>{const i=s.closest("tr")?.querySelector("td")?.textContent??"";B(`注文 ${i} の詳細を表示します`,"info")})}),e.querySelector("[data-action='fax-create-invoice']")?.addEventListener("click",()=>{B("FAXから伝票を起票するには、伝票入力画面をご利用ください","info")}),e.querySelectorAll("[data-action='fax-view']").forEach(s=>{s.addEventListener("click",()=>{B("FAX詳細の表示は準備中です","info")})}),e.querySelector("[data-action='tour-show-form']")?.addEventListener("click",()=>{window.open("/tour-form","_blank")}),e.querySelector("[data-action='prospect-convert']")?.addEventListener("click",()=>{B("得意先化するにはマスタ管理で得意先を作成してください","info")}),e.querySelectorAll("[data-action='create-proposal']").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.customer??"";B(`得意先 ${i} への提案書を作成するには見積作成画面をご利用ください`,"info")})}),e.querySelector("[data-action='lb-new-manual']")?.addEventListener("click",()=>{B("手動リスト作成は準備中です","info")}),e.querySelector("[data-action='lb-delete-list']")?.addEventListener("click",async()=>{const s=e.querySelector("[data-action='lb-delete-list']")?.dataset.id;if(!s||!await Pe("このリストを削除しますか？"))return;const{supabaseDelete:c}=await q(async()=>{const{supabaseDelete:h}=await Promise.resolve().then(()=>Z);return{supabaseDelete:h}},void 0);if(await c("lead_lists",s)){const{fetchLeadLists:h}=await q(async()=>{const{fetchLeadLists:b}=await Promise.resolve().then(()=>R);return{fetchLeadLists:b}},void 0);a.leadLists=await h(),B("削除しました","success"),S()}else B("削除に失敗しました","error")}),e.querySelector("[data-action='wf-new-order']")?.addEventListener("click",()=>{B("新規受注の登録はモバイル注文画面から行ってください","info")}),e.querySelectorAll("[data-sc-ym]").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.scYm;if(!i)return;a.shipmentCalendarYearMonth=i,a.shipmentCalendarData=null,a.shipmentCalendarSelectedDate=null,S();const{fetchShipmentCalendar:c}=await q(async()=>{const{fetchShipmentCalendar:m}=await Promise.resolve().then(()=>R);return{fetchShipmentCalendar:m}},void 0);a.shipmentCalendarData=await c(i),S()})}),e.querySelectorAll("[data-sc-date]").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.scDate;i!==void 0&&(a.shipmentCalendarSelectedDate=i?a.shipmentCalendarSelectedDate===i?null:i:null,S())})}),e.querySelectorAll("[data-action='cal-prev'], [data-action='cal-next'], [data-action='cal-today']").forEach(s=>{s.addEventListener("click",async()=>{a.calendarYearMonth=s.dataset.ym??a.calendarYearMonth;const{fetchCalendarEvents:i}=await q(async()=>{const{fetchCalendarEvents:c}=await Promise.resolve().then(()=>R);return{fetchCalendarEvents:c}},void 0);a.calendarEvents=await i(a.calendarYearMonth),S()})}),e.querySelector("#cal-month-input")?.addEventListener("change",async s=>{a.calendarYearMonth=s.target.value;const{fetchCalendarEvents:i}=await q(async()=>{const{fetchCalendarEvents:c}=await Promise.resolve().then(()=>R);return{fetchCalendarEvents:c}},void 0);a.calendarEvents=await i(a.calendarYearMonth),S()}),e.querySelector("#cal-filter-category")?.addEventListener("change",s=>{a.calendarFilterCategory=s.target.value,S()}),e.querySelector("[data-action='cal-new']")?.addEventListener("click",()=>{const s=new Date;a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:new Date(s.getTime()+3600*1e3).toISOString(),isAllDay:!1}},S()}),e.querySelectorAll("[data-cal-date]").forEach(s=>{s.tagName!=="BUTTON"&&s.addEventListener("click",i=>{if(i.target.closest(".cal-event"))return;const c=s.dataset.calDate??"";a.calendarEdit={isOpen:!0,isNew:!0,event:{id:`evt_${Date.now()}`,title:"",category:"general",startsAt:`${c}T10:00:00`,isAllDay:!1}},S()})}),e.querySelectorAll("[data-cal-event-id]").forEach(s=>{s.addEventListener("click",i=>{i.stopPropagation();const c=s.dataset.calEventId,m=a.calendarEvents.find(h=>h.id===c);m&&(a.calendarEdit={isOpen:!0,isNew:!1,event:{...m}},S())})}),e.querySelectorAll("[data-action='cal-close']").forEach(s=>{s.addEventListener("click",i=>{i.currentTarget!==i.target&&!i.target.matches("button")||(a.calendarEdit=null,S())})}),e.querySelector("[data-action='cal-save']")?.addEventListener("click",async()=>{if(!a.calendarEdit)return;const{saveCalendarEvent:s,fetchCalendarEvents:i,CALENDAR_CATEGORY_COLORS:c}=await q(async()=>{const{saveCalendarEvent:$,fetchCalendarEvents:_,CALENDAR_CATEGORY_COLORS:k}=await Promise.resolve().then(()=>R);return{saveCalendarEvent:$,fetchCalendarEvents:_,CALENDAR_CATEGORY_COLORS:k}},void 0),m=document.querySelector("[data-action='cal-save']")?.dataset.id||a.calendarEdit.event.id||`evt_${Date.now()}`,h=e.querySelector("#cal-category")?.value??"general",b={id:m,title:e.querySelector("#cal-title")?.value??"",category:h,startsAt:new Date(e.querySelector("#cal-starts")?.value??new Date().toISOString()).toISOString(),endsAt:e.querySelector("#cal-ends")?.value?new Date(e.querySelector("#cal-ends").value).toISOString():void 0,isAllDay:e.querySelector("#cal-allday")?.checked??!1,location:e.querySelector("#cal-location")?.value??"",relatedCustomerCode:e.querySelector("#cal-customer")?.value??"",description:e.querySelector("#cal-description")?.value??"",color:c[h]};if(!b.title){B("タイトルは必須です","warning");return}await s(b)?(a.calendarEvents=await i(a.calendarYearMonth),a.calendarEdit=null,B("保存しました"),S()):B("保存失敗","error")}),e.querySelector("[data-action='cal-delete']")?.addEventListener("click",async()=>{const s=document.querySelector("[data-action='cal-delete']")?.dataset.id??"";if(!s||!await Pe("削除しますか？",{variant:"danger",confirmLabel:"削除する"}))return;const{deleteCalendarEvent:i,fetchCalendarEvents:c}=await q(async()=>{const{deleteCalendarEvent:h,fetchCalendarEvents:b}=await Promise.resolve().then(()=>R);return{deleteCalendarEvent:h,fetchCalendarEvents:b}},void 0);await i(s)?(a.calendarEvents=await c(a.calendarYearMonth),a.calendarEdit=null,B("削除しました"),S()):B("削除失敗","error")}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,S();try{const s=a.importPreview.rows.filter(c=>c._valid),i=await eo(a.importEntity,s);a.importResult=`取り込み完了: ${i.inserted}件成功 / ${i.failed}件失敗`,a.importPreview=null}catch(s){a.importResult=`エラー: ${s instanceof Error?s.message:String(s)}`}finally{a.importing=!1,S()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const s=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=s,a.storeSales=[],a.actionLoading=!0,S(),Ka(s).then(i=>{a.storeSales=i,a.actionLoading=!1,S()})}),e.querySelectorAll("[data-action='copy-config']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.configValue??"";if(i)try{await navigator.clipboard.writeText(i),s.textContent="コピー済み",window.setTimeout(()=>{s.textContent="コピー"},1600)}catch(c){console.warn("Clipboard copy failed",c)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const i=JSON.stringify({supabase_url:fe,supabase_anon_key:oe,z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),c=new Blob([i],{type:"application/json;charset=utf-8"}),m=URL.createObjectURL(c),h=document.createElement("a");h.href=m,h.download="relay_config.json",h.click(),URL.revokeObjectURL(m)}),e.querySelectorAll("[data-action='copy-code']").forEach(s=>{s.addEventListener("click",async()=>{const i=s.dataset.code??"";if(i)try{await navigator.clipboard.writeText(decodeURIComponent(i)),s.textContent="コピー済み",window.setTimeout(()=>{s.textContent="コピー"},1600)}catch(c){console.warn("Clipboard code copy failed",c)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(s=>{s.addEventListener("change",()=>{We(e),a.emailSaveMessage=null,S()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(s=>{s.addEventListener("change",()=>{We(e),a.emailSaveMessage=null,S()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{We(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{We(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(s=>{s.addEventListener("click",()=>{a.emailTemplateId=s.dataset.templateId??"custom";const i=io(a.emailTemplateId);a.emailSubject=i.subject,a.emailBody=i.body,a.emailSaveMessage=null,S()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{We(e);const s=`

商品詳細はこちら: https://kaneishuzo.co.jp/products`;a.emailBody.includes("https://kaneishuzo.co.jp/products")||(a.emailBody=`${a.emailBody.trimEnd()}${s}`),a.emailSaveMessage=null,S()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{We(e),a.actionLoading=!0,S(),Ft(ba("draft")).then(s=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(s.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,S()})}),e.querySelector("#email-sender")?.addEventListener("change",s=>{a.emailSenderId=s.target.value}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{We(e),a.actionLoading=!0,a.emailSending=!0,S();const s=ba("sent");a.mailSenders.find(i=>i.id===a.emailSenderId),Ss().then(async i=>{await Ft({...s,recipientCount:i.sent}),a.emailSaveMessage=`${i.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,S(),B(`${i.sent}件送信完了`)}).catch(async()=>{await Ft(ba("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,S(),B("APIキー未設定のため下書き保存しました","warning")})})}function S(){const e=document.querySelector("#app");if(!e)return;try{e.innerHTML=bu()}catch(o){console.error("[renderApp] render error:",o),e.innerHTML=`<div style="padding:32px;color:red;font-family:monospace;white-space:pre-wrap;">[描画エラー] ${String(o)}

${o?.stack??""}</div>`;return}const t=e.querySelector(".app-page-title");document.title=t?.textContent?`${t.textContent} | 酒仙iクラウド`:"酒仙iクラウド",_u(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),sn()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const o of["fd-scaler","print-scaler","q-preview-scaler"]){const r=e.querySelector(`#${o}`),l=r?.querySelector(".fd-canvas, .print-preview, .q-preview-doc"),d=l?.querySelector(".print-page")??l;if(!r||!d)continue;const p=r.parentElement?.clientWidth??0,u=d.offsetWidth;if(p>0&&u>0&&u>p-24){const y=(p-24)/u;r.style.transform=`scale(${y})`,r.style.transformOrigin="top left",r.style.height=`${(d.offsetHeight+48)*y}px`}else r.style.transform="",r.style.height=""}});const n=a.sidebarOpen||a.pickerMode!==null||a.globalSearchOpen;document.body.style.overflow=n?"hidden":"",document.body.style.touchAction=n?"none":""}const ho="sake-cloud-cache",Su=300*1e3;function ku(){try{const e={ts:Date.now(),masterStats:a.masterStats,pipelineMeta:a.pipelineMeta};localStorage.setItem(ho,JSON.stringify(e))}catch{}}function Pu(){try{const e=localStorage.getItem(ho);if(!e)return!1;const t=JSON.parse(e);return Date.now()-t.ts>Su?!1:(t.masterStats&&(a.masterStats=t.masterStats),t.pipelineMeta&&(a.pipelineMeta=t.pipelineMeta),!0)}catch{return!1}}let go=0;async function rt(){const e=Pu();e&&(a.loading=!1,S()),a.loading=!e,e||S();try{const[t,n,o,r,l,d,p]=await Promise.all([Xn(),Zn(),Ba(),es(),St(a.invoiceFilter),za(),Gn("quote_company")]);if(a.salesSummary=t,a.paymentStatus=n,a.masterStats=o,a.pipelineMeta=r,a.invoiceRecords=l,a.salesAnalytics=d,p){const u={...Ut,...ka(),...p};a.quoteCompanySettings=u,Xe(u)}if(ot.length===0&&au(),!a.salesFilter.startDate||!a.salesFilter.endDate){const y=[...t.salesRecords].sort((x,C)=>new Date(C.date).getTime()-new Date(x.date).getTime())[0]?.date??new Date().toISOString(),v=new Date(y),g=new Date(v);g.setDate(v.getDate()-30),a.salesFilter={startDate:Un(g.toISOString()),endDate:Un(v.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await St(a.invoiceFilter)),a.error=null,ku()}catch(t){e||(a.error=t instanceof Error?t.message:"データの取得に失敗しました。")}finally{a.loading=!1,S(),on(a.route),go=Date.now()}}window.addEventListener("popstate",()=>{a.route=lo(location.pathname),a.currentCategory=nn(a.route),a.sidebarOpen=!1,kt(),on(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,S();return}if(e.key==="Escape"){if(a.globalSearchOpen){kt(),S();return}if(a.pickerMode){Xt(),S();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(co(),S());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&uo(t)}});a.user=Zt()?So():null;a.user?.email&&(async()=>{const{fetchMyProfile:e}=await q(async()=>{const{fetchMyProfile:t}=await Promise.resolve().then(()=>R);return{fetchMyProfile:t}},void 0);a.myProfile=await e(a.user.email),S()})();try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const n=localStorage.getItem("sake_fd_positions");n&&(a.fdSavedPositions=JSON.parse(n))}catch{}(function(){let t=null,n=0,o=0,r=0,l=0,d=1;document.addEventListener("mousedown",p=>{const u=p.target.closest(".fd-draggable");if(!u||!a.fdDesignMode)return;p.preventDefault();const y=u.closest(".fd-canvas");if(!y)return;const v=y.getBoundingClientRect();if(v.width===0)return;d=228.6/v.width,t=u,n=p.clientX,o=p.clientY,r=parseFloat(u.style.left)||0,l=parseFloat(u.style.top)||0,document.querySelectorAll(".fd-active").forEach(A=>A.classList.remove("fd-active")),u.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=u.dataset.fdId??null;const g=document.querySelector("#fd-selected-info");g&&(g.textContent=`選択中: ${u.title}`);const x=document.querySelector("#fd-sel-x"),C=document.querySelector("#fd-sel-y");x&&(x.value=String(r)),C&&(C.value=String(l))}),document.addEventListener("mousemove",p=>{if(!t)return;const u=(p.clientX-n)*d,y=(p.clientY-o)*d,v=Math.round((r+u)*2)/2,g=Math.round((l+y)*2)/2;t.style.left=v+"mm",t.style.top=g+"mm";const x=document.querySelector("#fd-sel-x"),C=document.querySelector("#fd-sel-y");x&&(x.value=String(v)),C&&(C.value=String(g))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",p=>{if(!a.fdDesignMode||!a.fdActiveFieldId||p.key!=="ArrowLeft"&&p.key!=="ArrowRight"&&p.key!=="ArrowUp"&&p.key!=="ArrowDown"||p.target.tagName==="INPUT"||p.target.tagName==="TEXTAREA")return;const u=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!u)return;p.preventDefault();const y=.5;let v=parseFloat(u.style.left)||0,g=parseFloat(u.style.top)||0;p.key==="ArrowLeft"?v-=y:p.key==="ArrowRight"?v+=y:p.key==="ArrowUp"?g-=y:p.key==="ArrowDown"&&(g+=y),u.style.left=v+"mm",u.style.top=g+"mm";const x=document.querySelector("#fd-sel-x"),C=document.querySelector("#fd-sel-y");x&&(x.value=String(v)),C&&(C.value=String(g))})})();rt();const Eu=300*1e3;setInterval(()=>{!a.loading&&!document.hidden&&rt()},Eu);document.addEventListener("visibilitychange",()=>{!document.hidden&&Date.now()-go>60*1e3&&rt()});let Ta="";fetch(`${location.origin}/index.html?_t=${Date.now()}`).then(e=>e.text()).then(e=>{Ta=e}).catch(()=>{});setInterval(async()=>{if(!(!Ta||document.hidden))try{await(await fetch(`${location.origin}/index.html?_t=${Date.now()}`)).text()!==Ta&&!a.updateAvailable&&(a.updateAvailable=!0,S())}catch{}},120*1e3);export{q as _};
