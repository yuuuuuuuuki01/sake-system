(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();const We="modulepreload",Ge=function(t){return"/sake-system/"+t},Vt={},T=function(e,n,s){let o=Promise.resolve();if(n&&n.length>0){let r=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var d=r;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");o=r(n.map(u=>{if(u=Ge(u),u in Vt)return;Vt[u]=!0;const p=u.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const g=document.createElement("link");if(g.rel=p?"stylesheet":We,p||(g.as="script"),g.crossOrigin="",g.href=u,c&&g.setAttribute("nonce",c),document.head.appendChild(g),p)return new Promise((j,E)=>{g.addEventListener("load",j),g.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return o.then(l=>{for(const c of l||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})},tt="https://loarwnuyvfxiscjjsmiz.supabase.co",Dt="";async function Ct(t,e){return null}async function w(t,e={}){return[]}const de=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:Dt,SUPABASE_URL:tt,supabaseInsert:Ct,supabaseQuery:w},Symbol.toStringTag,{value:"Module"})),Nt="sake_auth";function ue(t){localStorage.setItem(Nt,JSON.stringify(t))}function pe(){return{apikey:Dt,"Content-Type":"application/json"}}function Xe(t){try{const[,e]=t.split(".");if(!e)return null;const n=e.replaceAll("-","+").replaceAll("_","/"),s=n.padEnd(Math.ceil(n.length/4)*4,"=");return JSON.parse(atob(s))}catch{return null}}async function me(t,e){const n=await fetch(`${tt}/auth/v1/${t}`,{method:"POST",headers:pe(),body:JSON.stringify(e)}),s=await n.json().catch(()=>({}));if(!n.ok)throw new Error(s.error_description??s.msg??`HTTP ${n.status}`);return s}async function Ze(t,e){const n=await me("token?grant_type=password",{email:t,password:e});return ue({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??t}}async function ta(t,e){const n=await me("signup",{email:t,password:e});return n.access_token&&n.refresh_token&&ue({access_token:n.access_token,refresh_token:n.refresh_token}),{email:n.user?.email??t}}async function ea(){const t=_t();if(localStorage.removeItem(Nt),!!t?.access_token)try{await fetch(`${tt}/auth/v1/logout`,{method:"POST",headers:{...pe(),Authorization:`Bearer ${t.access_token}`}})}catch(e){console.warn("Supabase sign out failed",e)}}function _t(){const t=localStorage.getItem(Nt);if(!t)return null;try{const e=JSON.parse(t);return!e.access_token||!e.refresh_token?null:{access_token:e.access_token,refresh_token:e.refresh_token}}catch{return null}}function aa(){const t=_t();if(!t)return null;const e=Xe(t.access_token),n=typeof e?.email=="string"?e.email:null;return n?{email:n}:null}const At={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},ut={generatedAt:"2026-04-15T09:15:00+09:00",kpis:{todaySales:1248e3,todayDelta:8.2,monthSales:18245e3,monthDelta:5.6,unpaidCount:7,unpaidAmount:264e4},dailySales:Array.from({length:30},(t,e)=>{const n=new Date("2026-03-17T00:00:00+09:00");return n.setDate(n.getDate()+e),{date:n.toISOString(),amount:42e4+e*73123%62e4}}),salesRecords:Array.from({length:20},(t,e)=>{const n=new Date("2026-04-15T00:00:00+09:00");return n.setDate(n.getDate()-e),{id:`sale-${e+1}`,documentNo:`D${String(240100+e).padStart(6,"0")}`,date:n.toISOString(),customerCode:`C${String(e+11).padStart(4,"0")}`,customerName:["青葉商事","北斗酒販","中央フーズ","東海酒店"][e%4],amount:68e3+e%6*24500}})},sa={generatedAt:"2026-04-15T09:15:00+09:00",records:[{id:"pay-1",customerCode:"C0011",customerName:"青葉商事",billedAmount:54e4,paymentAmount:0,balanceAmount:54e4,lastPaymentDate:null,status:"unpaid"},{id:"pay-2",customerCode:"C0012",customerName:"北斗酒販",billedAmount:72e4,paymentAmount:3e5,balanceAmount:42e4,lastPaymentDate:"2026-04-11T14:30:00+09:00",status:"partial"},{id:"pay-3",customerCode:"C0013",customerName:"中央フーズ",billedAmount:68e4,paymentAmount:68e4,balanceAmount:0,lastPaymentDate:"2026-04-14T10:00:00+09:00",status:"paid"},{id:"pay-4",customerCode:"C0014",customerName:"東海酒店",billedAmount:41e4,paymentAmount:18e4,balanceAmount:23e4,lastPaymentDate:"2026-04-10T09:10:00+09:00",status:"partial"}]},R={generatedAt:"2026-04-15T09:15:00+09:00",summary:{customerCount:164,activeCustomerCount:152,productCount:486,activeProductCount:461},customers:Array.from({length:12},(t,e)=>({id:`customer-${e+1}`,code:`C${String(e+1).padStart(4,"0")}`,name:["青葉商事","北斗酒販","中央フーズ","東海酒店","三和物産","南星リカー"][e%6],closingDay:[15,20,25,31][e%4],paymentDay:[5,10,15,20][e%4],isActive:e%5!==0})),products:Array.from({length:12},(t,e)=>({id:`product-${e+1}`,code:`P${String(e+1).padStart(5,"0")}`,janCode:`4901234567${String(e).padStart(3,"0")}`,name:["純米吟醸 720ml","本醸造 1.8L","特別純米 300ml","梅酒 500ml"][e%4],category:["清酒","焼酎","リキュール"][e%3],isActive:e%6!==0}))},na={generatedAt:"2026-04-15T09:15:00+09:00",lastSyncAt:"2026-04-15T09:12:21+09:00",status:"success",jobName:"daily-sync",message:"同期完了。売上・入金・マスタを最新化しました。"},he=ut.salesRecords.map((t,e)=>({...t,itemCount:e%4+1})),oa={C0011:{customerCode:"C0011",customerName:"青葉商事",balanceAmount:54e4,salesTotal:114e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-1",date:"2026-04-15T00:00:00+09:00",documentNo:"D240100",amount:42e4},{id:"ledger-sale-2",date:"2026-04-08T00:00:00+09:00",documentNo:"D240087",amount:39e4},{id:"ledger-sale-3",date:"2026-03-28T00:00:00+09:00",documentNo:"D240059",amount:33e4}],paymentHistory:[{id:"ledger-payment-1",date:"2026-04-10T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-2",date:"2026-03-31T00:00:00+09:00",amount:3e5,method:"振込"}]},C0012:{customerCode:"C0012",customerName:"北斗酒販",balanceAmount:42e4,salesTotal:102e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-4",date:"2026-04-14T00:00:00+09:00",documentNo:"D240101",amount:36e4},{id:"ledger-sale-5",date:"2026-04-05T00:00:00+09:00",documentNo:"D240082",amount:32e4},{id:"ledger-sale-6",date:"2026-03-25T00:00:00+09:00",documentNo:"D240054",amount:34e4}],paymentHistory:[{id:"ledger-payment-3",date:"2026-04-11T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-4",date:"2026-03-30T00:00:00+09:00",amount:3e5,method:"現金"}]}},pt={productTotals:[{code:"P00001",name:"純米吟醸 720ml",amount:584e4,quantity:820,documents:148},{code:"P00002",name:"本醸造 1.8L",amount:498e4,quantity:610,documents:131},{code:"P00003",name:"特別純米 300ml",amount:356e4,quantity:1240,documents:112},{code:"P00004",name:"梅酒 500ml",amount:287e4,quantity:540,documents:89}],customerTotals:[{code:"C0011",name:"青葉商事",amount:462e4,quantity:320,documents:54},{code:"C0012",name:"北斗酒販",amount:438e4,quantity:294,documents:49},{code:"C0013",name:"中央フーズ",amount:391e4,quantity:276,documents:45},{code:"C0014",name:"東海酒店",amount:324e4,quantity:221,documents:37}]};function k(t){if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="string"){const e=Number(t);return Number.isFinite(e)?e:0}return 0}function ia(t){switch((t??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function la(t){return typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"?["true","1","active","enabled","yes","y"].includes(t.toLowerCase()):!1}function A(t,e,n=""){for(const s of e){const o=t[s];if(typeof o=="string"&&o.length>0)return o}return n}function Ut(t,e,n=0){for(const s of e)if(s in t)return k(t[s]);return n}function zt(t,e,n=!0){for(const s of e)if(s in t)return la(t[s]);return n}function ye(t,e,n){for(const s of e){const o=t[s];if(typeof o!="string"||o.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(o))return new Date(`${o}T00:00:00Z`).toISOString();const i=new Date(o);if(!Number.isNaN(i.getTime()))return i.toISOString()}return n}function ve(t){return t.slice(0,7)}function Lt(t,e){return{id:String(t.id??`invoice-${e+1}`),documentNo:t.document_no??t.legacy_document_no??`D${String(240100+e).padStart(6,"0")}`,date:ye(t,["sales_date","document_date"],new Date().toISOString()),customerCode:t.customer_code??t.legacy_customer_code??`C${String(e+1).padStart(4,"0")}`,customerName:t.customer_name??t.customer_code??t.legacy_customer_code??"不明",itemCount:0,amount:k(t.total_amount??t.billed_amount)}}function Ht(t,e){const n=e.startDate?new Date(`${e.startDate}T00:00:00`):null,s=e.endDate?new Date(`${e.endDate}T23:59:59`):null,o=e.documentNo.trim().toLowerCase(),i=e.customerCode.trim().toLowerCase();return t.filter(d=>{const l=new Date(d.date);return!(n&&l<n||s&&l>s||o&&!d.documentNo.toLowerCase().includes(o)||i&&!d.customerCode.toLowerCase().includes(i))}).sort((d,l)=>new Date(l.date).getTime()-new Date(d.date).getTime())}function Yt(t){const e=t.trim().toUpperCase(),n=oa[e];if(n)return n;const s=ut.salesRecords.find(o=>o.customerCode.toUpperCase()===e);return{customerCode:e||"未指定",customerName:s?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}function ca(){const t=new Map,e=new Map,n=new Map;return he.forEach((s,o)=>{const i=ve(s.date);t.set(i,(t.get(i)??0)+s.amount);const d=e.get(s.customerCode)??{code:s.customerCode,name:s.customerName,amount:0,quantity:0,documents:0};d.amount+=s.amount,d.quantity+=s.itemCount,d.documents+=1,e.set(s.customerCode,d);const l=`P${String(o%4+1).padStart(5,"0")}`,c=pt.productTotals[o%pt.productTotals.length],r=n.get(l)??{code:l,name:c?.name??`商品${o+1}`,amount:0,quantity:0,documents:0};r.amount+=s.amount,r.quantity+=s.itemCount*12,r.documents+=1,n.set(l,r)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(t.entries()).sort(([s],[o])=>s.localeCompare(o)).map(([s,o])=>({month:s,amount:o})),productTotals:Array.from(n.values()).sort((s,o)=>o.amount-s.amount),customerTotals:Array.from(e.values()).sort((s,o)=>o.amount-s.amount)}}async function $(t,e){try{const n=await fetch(`/sake-system/${t}`,{headers:{Accept:"application/json"}});if(!n.ok)throw new Error(`HTTP ${n.status}`);return await n.json()}catch(n){return console.warn(`Failed to fetch ${t}, using fallback data`,n),e}}async function be(){const t=await w("daily_sales_fact",{});if(t.length>0){const e=await w("customer_payment_status",{}),s=new Date().toISOString().slice(0,10),o=s.slice(0,7),i=[...t].sort((r,u)=>r.sales_date.localeCompare(u.sales_date)).slice(-30).map(r=>({date:new Date(`${r.sales_date}T00:00:00Z`).toISOString(),amount:k(r.sales_amount)})),d=t.reduce((r,u)=>u.sales_date===s?r+k(u.sales_amount):r,0),l=t.reduce((r,u)=>u.sales_date.startsWith(o)?r+k(u.sales_amount):r,0),c=e.filter(r=>k(r.balance_amount)>0);return{generatedAt:new Date().toISOString(),kpis:{todaySales:d,todayDelta:0,monthSales:l,monthDelta:0,unpaidCount:c.length,unpaidAmount:c.reduce((r,u)=>r+k(u.balance_amount),0)},dailySales:i,salesRecords:ut.salesRecords}}return $("data/api/latest/sales-summary.json",ut)}async function ge(){const t=await w("customer_payment_status",{});return t.length>0?{generatedAt:new Date().toISOString(),records:t.map((e,n)=>{const s=e.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${s}-${n+1}`,customerCode:s,customerName:s,billedAmount:k(e.billed_amount),paymentAmount:k(e.paid_amount),balanceAmount:k(e.balance_amount),lastPaymentDate:null,status:ia(e.payment_status)}})}:$("data/api/latest/payment-status.json",sa)}async function fe(){const[t,e]=await Promise.all([w(),w()]);if(t.length>0||e.length>0){const n=t.length?t.map((o,i)=>({id:A(o,["id","customer_id","code"],`customer-${i+1}`),code:A(o,["code","customer_code","legacy_customer_code"],`C${String(i+1).padStart(4,"0")}`),name:A(o,["name","customer_name","display_name"],`Customer ${i+1}`),closingDay:Ut(o,["closing_day","close_day"],31),paymentDay:Ut(o,["payment_day","due_day"],15),isActive:zt(o,["is_active","active","enabled"],!0)})):R.customers,s=e.length?e.map((o,i)=>({id:A(o,["id","product_id","code"],`product-${i+1}`),code:A(o,["code","product_code"],`P${String(i+1).padStart(5,"0")}`),janCode:A(o,["jan_code","jan","barcode"],""),name:A(o,["name","product_name","display_name"],`Product ${i+1}`),category:A(o,["category","category_name"],"未分類"),isActive:zt(o,["is_active","active","enabled"],!0)})):R.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:t.length||R.summary.customerCount,activeCustomerCount:t.length?n.filter(o=>o.isActive).length:R.summary.activeCustomerCount,productCount:e.length||R.summary.productCount,activeProductCount:e.length?s.filter(o=>o.isActive).length:R.summary.activeProductCount},customers:n,products:s}}return $("data/api/latest/master-stats.json",R)}function $e(){return $("data/api/latest/pipeline-meta.json",na)}async function mt(t){const[e,n]=await Promise.all([w("sales_document_headers",{}),w("sales_document_lines",{})]);if(e.length>0){const s=new Map;n.forEach(i=>{const d=String(i.header_id??i.document_header_id??i.document_no??i.id??"");d&&s.set(d,(s.get(d)??0)+1)});const o=e.map((i,d)=>{const l=Lt(i,d),c=String(i.id??i.document_no??i.legacy_document_no??"");return{...l,itemCount:s.get(c)??l.itemCount}});return Ht(o,t)}return Ht(he,t)}async function Pt(t){const e=t.trim().toUpperCase();if(!e)return Yt("");const[n,s,o]=await Promise.all([w("sales_document_headers",{}),w("customer_payments",{}),w("customer_payment_status",{})]);if(n.length>0||s.length>0){const i=n.map((c,r)=>{const u=Lt(c,r);return{id:u.id,date:u.date,documentNo:u.documentNo,amount:u.amount}}),d=s.map((c,r)=>({id:String(c.id??`payment-${r+1}`),date:ye(c,["payment_date","received_date"],new Date().toISOString()),amount:k(c.payment_amount??c.amount),method:c.payment_method??c.method??"入金"})),l=o.find(c=>(c.legacy_customer_code??"").toUpperCase()===e);return{customerCode:e,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??e,balanceAmount:k(l?.balance_amount),salesTotal:i.reduce((c,r)=>c+r.amount,0),paymentTotal:d.reduce((c,r)=>c+r.amount,0),salesHistory:i,paymentHistory:d}}return Yt(e)}async function ke(){const[t,e,n]=await Promise.all([w("daily_sales_fact",{}),w("sales_document_headers",{}),w("sales_document_lines",{})]);if(t.length>0){const s=new Map;t.forEach(d=>{const l=ve(d.sales_date);s.set(l,(s.get(l)??0)+k(d.sales_amount))});const o=new Map;e.forEach((d,l)=>{const c=Lt(d,l),r=o.get(c.customerCode)??{code:c.customerCode,name:c.customerName,amount:0,quantity:0,documents:0};r.amount+=c.amount,r.documents+=1,o.set(c.customerCode,r)});const i=new Map;return n.forEach((d,l)=>{const c=d.product_code??d.legacy_product_code??`P${String(l+1).padStart(5,"0")}`,r=i.get(c)??{code:c,name:d.product_name??c,amount:0,quantity:0,documents:0};r.amount+=k(d.line_amount??d.amount),r.quantity+=k(d.quantity),r.documents+=1,i.set(c,r)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(s.entries()).sort(([d],[l])=>d.localeCompare(l)).map(([d,l])=>({month:d,amount:l})).slice(-12),productTotals:i.size>0?Array.from(i.values()).sort((d,l)=>l.amount-d.amount):pt.productTotals,customerTotals:o.size>0?Array.from(o.values()).sort((d,l)=>l.amount-d.amount):pt.customerTotals}}return ca()}const St={sales:"売上",return:"返品",export_return:"輸出戻入"};async function Se(t){const e=t.lines.reduce((o,i)=>o+i.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await Ct("sales_document_headers",{legacy_customer_code:t.customerCode,sales_date:t.invoiceDate,document_type:t.invoiceType,staff_code:t.staffCode}))?.id??`local-${n}`,documentNo:n,totalAmount:e,status:"confirmed",createdAt:new Date().toISOString()}}const Kt={documentNo:"D240122",invoiceDate:"2026-04-14",customerCode:"C0011",customerName:"青葉商事 株式会社",customerAddress:"〒123-4567 東京都千代田区〇〇 1-2-3",lines:[{productCode:"P00012",productName:"純米吟醸 720ml",quantity:6,unitPrice:12e3,unit:"本",amount:72e3},{productCode:"P00008",productName:"本醸造 1.8L",quantity:4,unitPrice:8500,unit:"本",amount:34e3},{productCode:"P00021",productName:"梅酒 500ml",quantity:12,unitPrice:5800,unit:"本",amount:69600}],totalAmount:175600,taxAmount:15960,note:""};async function jt(t){const e=await w("sales_document_headers",{});if(e.length>0){const n=e[0],s=k(n.total_amount);return{documentNo:t,invoiceDate:A(n,["sales_date","document_date"],""),customerCode:A(n,["legacy_customer_code","customer_code"],""),customerName:A(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:s,taxAmount:Math.floor(s*10/110),note:""}}return{...Kt,documentNo:t||Kt.documentNo}}const ra={targetYearMonth:"2026-04",closingDay:15,totalBilling:482e4,customers:[{customerCode:"C0011",customerName:"青葉商事",closingDay:15,salesAmount:54e4,taxAmount:54e3,prevBalance:28e4,paymentAmount:28e4,billingAmount:594e3,status:"open"},{customerCode:"C0012",customerName:"北斗酒販",closingDay:15,salesAmount:72e4,taxAmount:72e3,prevBalance:14e4,paymentAmount:14e4,billingAmount:792e3,status:"closed"},{customerCode:"C0013",customerName:"中央フーズ",closingDay:15,salesAmount:38e4,taxAmount:38e3,prevBalance:0,paymentAmount:0,billingAmount:418e3,status:"open"},{customerCode:"C0014",customerName:"東海酒店",closingDay:15,salesAmount:61e4,taxAmount:61e3,prevBalance:23e4,paymentAmount:15e4,billingAmount:751e3,status:"open"}]};async function Tt(t){return $(`data/api/latest/billing-${t}.json`,{...ra,targetYearMonth:t})}const da=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],ua={generatedAt:new Date().toISOString(),months:da,salesByProduct:[{label:"純米吟醸 720ml",values:[380,410,520,480,390,320,450,480,510,420,380,350].map(t=>t*1e4)},{label:"本醸造 1.8L",values:[290,310,380,340,280,250,320,360,390,310,280,260].map(t=>t*1e4)},{label:"梅酒 500ml",values:[210,240,310,290,230,180,260,300,320,250,200,190].map(t=>t*1e4)}],salesByCustomer:[{label:"青葉商事",values:[480,510,620,590,480,390,540,580,610,510,460,430].map(t=>t*1e4)},{label:"北斗酒販",values:[390,420,520,490,400,330,460,500,530,430,380,360].map(t=>t*1e4)}],costSimulation:[{productCode:"P00012",productName:"純米吟醸 720ml",costPrice:7200,sellPrice:12e3,margin:4800,marginRate:40},{productCode:"P00008",productName:"本醸造 1.8L",costPrice:4800,sellPrice:8500,margin:3700,marginRate:43.5},{productCode:"P00021",productName:"梅酒 500ml",costPrice:3200,sellPrice:5800,margin:2600,marginRate:44.8}]};async function we(){return $("data/api/latest/sales-report.json",ua)}const xe={planned:"計画中",active:"仕込中",done:"完了"},pa=[{id:"j1",jikomiNo:"J2026-01",productName:"純米吟醸",riceType:"山田錦",plannedKg:400,actualKg:400,startDate:"2026-01-10",expectedDoneDate:"2026-02-20",status:"done",tankNo:"T01",note:""},{id:"j2",jikomiNo:"J2026-02",productName:"本醸造",riceType:"日本晴",plannedKg:600,actualKg:600,startDate:"2026-02-01",expectedDoneDate:"2026-03-15",status:"done",tankNo:"T02",note:""},{id:"j3",jikomiNo:"J2026-03",productName:"特別純米",riceType:"五百万石",plannedKg:500,actualKg:480,startDate:"2026-03-05",expectedDoneDate:"2026-04-20",status:"active",tankNo:"T03",note:"経過良好"},{id:"j4",jikomiNo:"J2026-04",productName:"純米大吟醸",riceType:"山田錦",plannedKg:300,actualKg:0,startDate:"2026-04-15",expectedDoneDate:"2026-06-01",status:"planned",tankNo:"T04",note:""}];async function De(){return $("data/api/latest/jikomi.json",pa)}const ma=[{id:"t1",tankNo:"T01",capacity:3e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-01"},{id:"t2",tankNo:"T02",capacity:4e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-20"},{id:"t3",tankNo:"T03",capacity:3500,currentVolume:2800,productName:"特別純米",jikomiNo:"J2026-03",status:"in_use",lastUpdated:"2026-04-10"},{id:"t4",tankNo:"T04",capacity:2e3,currentVolume:0,productName:"純米大吟醸",jikomiNo:"J2026-04",status:"in_use",lastUpdated:"2026-04-15"},{id:"t5",tankNo:"T05",capacity:5e3,currentVolume:3200,productName:"本醸造（貯蔵）",jikomiNo:"J2026-02",status:"aging",lastUpdated:"2026-03-20"}];async function Ce(){return $("data/api/latest/tanks.json",ma)}const ha=[{id:"k1",kenteiNo:"K2026-001",jikomiNo:"J2026-01",productName:"純米吟醸",kenteiDate:"2026-02-25",alcoholDegree:16.2,extractDegree:3.8,sakaMeterValue:2.5,volume:2850,taxCategory:"清酒",status:"approved"},{id:"k2",kenteiNo:"K2026-002",jikomiNo:"J2026-02",productName:"本醸造",kenteiDate:"2026-03-18",alcoholDegree:15.5,extractDegree:4.1,sakaMeterValue:1.8,volume:3600,taxCategory:"清酒",status:"submitted"},{id:"k3",kenteiNo:"K2026-003",jikomiNo:"J2026-03",productName:"特別純米",kenteiDate:"2026-04-18",alcoholDegree:0,extractDegree:0,sakaMeterValue:0,volume:0,taxCategory:"清酒",status:"pending"}];async function Ne(){return $("data/api/latest/kentei.json",ha)}const ya=[{id:"m1",code:"M001",name:"720ml瓶",unit:"本",currentStock:2400,minimumStock:500,unitCost:85,lastUpdated:"2026-04-10"},{id:"m2",code:"M002",name:"1.8L瓶",unit:"本",currentStock:1800,minimumStock:300,unitCost:140,lastUpdated:"2026-04-10"},{id:"m3",code:"M003",name:"300ml瓶",unit:"本",currentStock:3600,minimumStock:600,unitCost:55,lastUpdated:"2026-04-08"},{id:"m4",code:"M004",name:"キャップ（金）",unit:"個",currentStock:8e3,minimumStock:1e3,unitCost:12,lastUpdated:"2026-04-05"},{id:"m5",code:"M005",name:"ラベル（純米吟醸）",unit:"枚",currentStock:1200,minimumStock:300,unitCost:28,lastUpdated:"2026-04-01"},{id:"m6",code:"M006",name:"化粧箱（720ml）",unit:"個",currentStock:180,minimumStock:100,unitCost:320,lastUpdated:"2026-04-01"}];async function _e(){return $("data/api/latest/materials.json",ya)}const va=[{id:"p1",documentNo:"K240050",purchaseDate:"2026-04-05",supplierCode:"S001",supplierName:"山田農場",itemName:"山田錦（精米65%）",quantity:500,unitPrice:480,amount:24e4,status:"confirmed"},{id:"p2",documentNo:"K240051",purchaseDate:"2026-04-06",supplierCode:"S002",supplierName:"日本瓶工業",itemName:"720ml瓶",quantity:1200,unitPrice:85,amount:102e3,status:"confirmed"},{id:"p3",documentNo:"K240052",purchaseDate:"2026-04-10",supplierCode:"S003",supplierName:"山本麹店",itemName:"米麹",quantity:80,unitPrice:1200,amount:96e3,status:"pending"},{id:"p4",documentNo:"K240053",purchaseDate:"2026-04-12",supplierCode:"S001",supplierName:"山田農場",itemName:"五百万石（精米60%）",quantity:300,unitPrice:420,amount:126e3,status:"pending"}],ba=[{supplierCode:"S001",supplierName:"山田農場",totalPurchase:366e3,paidAmount:24e4,balance:126e3,nextPaymentDate:"2026-04-30",status:"partial"},{supplierCode:"S002",supplierName:"日本瓶工業",totalPurchase:102e3,paidAmount:102e3,balance:0,nextPaymentDate:"",status:"paid"},{supplierCode:"S003",supplierName:"山本麹店",totalPurchase:96e3,paidAmount:0,balance:96e3,nextPaymentDate:"2026-04-30",status:"unpaid"}],ga=[{id:"b1",billNo:"H240001",supplierName:"山田農場",amount:24e4,issueDate:"2026-03-31",dueDate:"2026-04-30",status:"holding"},{id:"b2",billNo:"H240002",supplierName:"大阪資材",amount:185e3,issueDate:"2026-03-31",dueDate:"2026-05-31",status:"holding"},{id:"b3",billNo:"H230045",supplierName:"中部農業",amount:32e4,issueDate:"2026-02-28",dueDate:"2026-03-31",status:"cleared"}],fa=[{code:"R001",name:"山田錦（精米65%）",unit:"kg",currentStock:380,minimumStock:100,lastPurchaseDate:"2026-04-05",unitCost:480},{code:"R002",name:"五百万石（精米60%）",unit:"kg",currentStock:290,minimumStock:100,lastPurchaseDate:"2026-04-12",unitCost:420},{code:"R003",name:"米麹",unit:"kg",currentStock:62,minimumStock:20,lastPurchaseDate:"2026-04-10",unitCost:1200},{code:"R004",name:"醸造用アルコール",unit:"L",currentStock:240,minimumStock:50,lastPurchaseDate:"2026-03-20",unitCost:180},{code:"R005",name:"清酒用酵母",unit:"g",currentStock:500,minimumStock:100,lastPurchaseDate:"2026-02-15",unitCost:3200}];async function Ae(){return $("data/api/latest/purchases.json",va)}async function Le(){return $("data/api/latest/payables.json",ba)}async function Pe(){return $("data/api/latest/bills.json",ga)}async function je(){return $("data/api/latest/raw-stock.json",fa)}const Te=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],wt={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},$a={targetYear:2026,targetMonth:3,companyName:"金井酒造店",companyNo:"1234567890123",companyAddress:"神奈川県秦野市堀山下182",companyRepresentative:"金井 和雄",taxOffice:"小田原税務署",rows:[{taxCategory:"01",taxCategoryName:"清酒（普通酒）",alcoholDegree:15.5,productionVolume:3800,previousBalance:0,currentAdjustment:0,exportDeduction:100,sampleDeduction:100,taxableVolume:3600,volume:3600,taxRate:100,taxAmount:36e4},{taxCategory:"02",taxCategoryName:"清酒（純米酒）",alcoholDegree:16.2,productionVolume:2900,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:2850,volume:2850,taxRate:100,taxAmount:285e3},{taxCategory:"03",taxCategoryName:"清酒（吟醸酒）",alcoholDegree:16.5,productionVolume:1250,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:1200,volume:1200,taxRate:100,taxAmount:12e4}],deductions:[{type:"export",categoryCode:"01",volume:100,reason:"シンガポール向け輸出",documentNo:"EX2026-003"},{type:"sample",categoryCode:"01",volume:100,reason:"展示会サンプル出荷"},{type:"sample",categoryCode:"02",volume:50,reason:"品評会出品"},{type:"sample",categoryCode:"03",volume:50,reason:"全国新酒鑑評会出品"}],totalVolume:7650,totalTax:765e3,status:"draft",submittedAt:null};async function Et(t,e){return $(`data/api/latest/tax-${t}-${String(e).padStart(2,"0")}.json`,{...$a,targetYear:t,targetMonth:e})}function N(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function Ee(t){const e=t.rows.map(s=>`    <Category>
      <Code>${N(s.taxCategory)}</Code>
      <Name>${N(s.taxCategoryName)}</Name>
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
`),n=t.deductions.map(s=>`    <Deduction type="${N(s.type)}">
      <CategoryCode>${N(s.categoryCode)}</CategoryCode>
      <Volume>${s.volume}</Volume>
      <Reason>${N(s.reason)}</Reason>${s.documentNo?`
      <DocumentNo>${N(s.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${t.targetYear}</TargetYear>
    <TargetMonth>${String(t.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${N(t.companyNo)}</TaxpayerId>
    <TaxpayerName>${N(t.companyName)}</TaxpayerName>
    <TaxpayerAddress>${N(t.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${N(t.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${N(t.taxOffice)}</TaxOffice>
    <Status>${t.status}</Status>
  </Header>
  <Categories>
${e}
  </Categories>
  <Deductions>
${n}
  </Deductions>
  <Total>
    <TotalVolume>${t.totalVolume}</TotalVolume>
    <TotalTax>${t.totalTax}</TotalTax>
  </Total>
</TaxDeclaration>
`}function ka(t){const e=String(t);return/[,"\n]/.test(e)?`"${e.replaceAll('"','""')}"`:e}function Sa(t){const n=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),s=t.rows.map(i=>[i.taxCategory,i.taxCategoryName,i.alcoholDegree,i.productionVolume,i.previousBalance,i.currentAdjustment,i.exportDeduction,i.sampleDeduction,i.taxableVolume,i.taxRate,i.taxAmount].map(ka).join(",")),o=`,合計,,${t.rows.reduce((i,d)=>i+d.productionVolume,0)},,,${t.rows.reduce((i,d)=>i+d.exportDeduction,0)},${t.rows.reduce((i,d)=>i+d.sampleDeduction,0)},${t.totalVolume},,${t.totalTax}`;return"\uFEFF"+[n,...s,o].join(`
`)+`
`}function wa(t){const e=t.rows.map(o=>{const i=Math.max(0,o.productionVolume+o.previousBalance+o.currentAdjustment-o.exportDeduction-o.sampleDeduction),d=Math.round(i*o.taxRate);return{...o,taxableVolume:i,volume:i,taxAmount:d}}),n=e.reduce((o,i)=>o+i.taxableVolume,0),s=e.reduce((o,i)=>o+i.taxAmount,0);return{...t,rows:e,totalVolume:n,totalTax:s}}async function xa(t){const{supabaseInsert:e}=await T(async()=>{const{supabaseInsert:n}=await Promise.resolve().then(()=>de);return{supabaseInsert:n}},void 0);await e("tax_declarations",{target_year:t.targetYear,target_month:t.targetMonth,company_name:t.companyName,company_no:t.companyNo,company_address:t.companyAddress,company_representative:t.companyRepresentative,tax_office:t.taxOffice,total_taxable_volume:t.totalVolume,total_tax_amount:t.totalTax,status:t.status,xml_data:Ee(t),submitted_at:t.submittedAt})}const Da=Array.from({length:10},(t,e)=>({id:`ss${e+1}`,saleDate:"2026-04-15",saleTime:`${9+e}:${String(e*7%60).padStart(2,"0")}`,productCode:`P${String(e%4+1).padStart(5,"0")}`,productName:["純米吟醸 720ml","本醸造 1.8L","梅酒 500ml","特別純米 300ml"][e%4],quantity:1+e%3,unitPrice:[2200,1800,980,680][e%4],amount:(1+e%3)*[2200,1800,980,680][e%4],paymentMethod:["cash","card","paypay","cash"][e%4]})),Ca=[{id:"o1",orderNo:"ORD-2604001",orderDate:"2026-04-13",customerName:"鈴木 太郎",postalCode:"150-0001",address:"東京都渋谷区〇〇1-1",items:[{productName:"純米吟醸 720ml",quantity:2,amount:4400}],totalAmount:4400,status:"shipped",shippingDate:"2026-04-14"},{id:"o2",orderNo:"ORD-2604002",orderDate:"2026-04-14",customerName:"田中 花子",postalCode:"530-0001",address:"大阪府大阪市北区〇〇2-3",items:[{productName:"梅酒 500ml",quantity:3,amount:2940},{productName:"本醸造 1.8L",quantity:1,amount:1800}],totalAmount:4740,status:"processing",shippingDate:""},{id:"o3",orderNo:"ORD-2604003",orderDate:"2026-04-15",customerName:"佐藤 一郎",postalCode:"460-0001",address:"愛知県名古屋市中区〇〇3-5",items:[{productName:"特別純米 300ml ×6本セット",quantity:1,amount:3980}],totalAmount:3980,status:"new",shippingDate:""}];async function Rt(t){return $(`data/api/latest/store-sales-${t}.json`,Da)}async function Re(){return $("data/api/latest/store-orders.json",Ca)}async function dt(t){const e=await Ct("email_campaigns",{subject:t.subject,body:t.body,template_id:t.templateId,audience_mode:t.audienceMode,audience_filter:t.audienceFilter,recipient_count:t.recipientCount,sent_count:t.status==="sent"?t.recipientCount:0,status:t.status,sent_at:t.status==="sent"?new Date().toISOString():null});return{id:e?.id??`local-email-${Date.now()}`,subject:e?.subject??t.subject,body:e?.body??t.body,templateId:e?.template_id??t.templateId,audienceMode:e?.audience_mode??t.audienceMode,audienceFilter:e?.audience_filter??t.audienceFilter,recipientCount:e?.recipient_count??t.recipientCount,status:e?.status??t.status,createdAt:e?.created_at??new Date().toISOString(),updatedAt:e?.updated_at??new Date().toISOString()}}async function Me(t){throw new Error("VITE_RESEND_API_KEY is not configured")}const J=Object.freeze(Object.defineProperty({__proto__:null,INVOICE_TYPE_LABELS:St,JIKOMI_STATUS_LABELS:xe,SEASONAL_TEMPLATES:At,TAX_DEDUCTION_LABELS:wt,TAX_RATE_CATEGORIES:Te,fetchBillList:Pe,fetchBillingSummary:Tt,fetchCustomerLedger:Pt,fetchDeliveryNote:jt,fetchInvoices:mt,fetchJikomiList:De,fetchKenteiList:Ne,fetchMasterStats:fe,fetchMaterialList:_e,fetchPayableList:Le,fetchPaymentStatus:ge,fetchPipelineMeta:$e,fetchPurchaseList:Ae,fetchRawMaterialStock:je,fetchSalesAnalytics:ke,fetchSalesReport:we,fetchSalesSummary:be,fetchStoreOrders:Re,fetchStoreSales:Rt,fetchTankList:Ce,fetchTaxDeclaration:Et,generateTaxCSV:Sa,generateTaxXML:Ee,recalculateTaxDeclaration:wa,saveEmailCampaign:dt,saveInvoice:Se,saveTaxDeclaration:xa,sendEmailCampaign:Me},Symbol.toStringTag,{value:"Module"}));function B(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}const Na={open:"未締め",closed:"締め済"};function _a(t,e){const n=t.customers.map(s=>`
      <tr>
        <td>
          <div class="table-title">${s.customerName}</div>
          <div class="table-sub mono">${s.customerCode}</div>
        </td>
        <td class="numeric">${s.closingDay}日</td>
        <td class="numeric">${B(s.salesAmount)}</td>
        <td class="numeric">${B(s.taxAmount)}</td>
        <td class="numeric">${B(s.prevBalance)}</td>
        <td class="numeric">${B(s.paymentAmount)}</td>
        <td class="numeric"><strong>${B(s.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${s.status==="closed"?"success":"warning"}">${Na[s.status]}</span>
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
          <input id="billing-month" type="month" value="${e}" />
        </label>
        <label class="field">
          <span>締め日</span>
          <select id="billing-day">
            ${[10,15,20,25,31].map(s=>`<option value="${s}" ${t.closingDay===s?"selected":""}>${s}日締め</option>`).join("")}
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
        <p class="kpi-value">${B(t.totalBilling)}</p>
        <p class="kpi-sub">${t.targetYearMonth} / ${t.closingDay}日締め</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">得意先数</p>
        <p class="kpi-value">${t.customers.length} 社</p>
        <p class="kpi-sub">締め済 ${t.customers.filter(s=>s.status==="closed").length} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>得意先別請求一覧</h2>
          <p class="panel-caption">${t.targetYearMonth} 分</p>
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
  `}const Aa={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"}]},La={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},more:{eyebrow:"その他トップ",title:"周辺業務メニュー",description:"税務、店舗、分析、設定などの補助機能をまとめて配置しています。"}};function Qt(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function et(t){const e=La[t],n=Aa[t].map(s=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Qt(s.title)}</p>
            <p class="category-card-description">${Qt(s.description)}</p>
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
        <p class="eyebrow">${e.eyebrow}</p>
        <h1>${e.title}</h1>
        <p class="meta-note">${e.description}</p>
      </div>
    </section>

    <section class="category-grid">
      ${n}
    </section>
  `}function qe(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function G(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Pa(t){return t.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':t.salesHistory.map(e=>`
        <tr>
          <td>${qe(e.date)}</td>
          <td class="mono">${e.documentNo}</td>
          <td class="numeric">${G(e.amount)}</td>
        </tr>
      `).join("")}function ja(t){return t.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':t.paymentHistory.map(e=>`
        <tr>
          <td>${qe(e.date)}</td>
          <td>${e.method}</td>
          <td class="numeric">${G(e.amount)}</td>
        </tr>
      `).join("")}function Ta(t,e){return`
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
          <input id="ledger-customer-code" type="text" value="${e}" placeholder="C0011" />
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
            <h2>${t.customerName}</h2>
            <p class="panel-caption mono">${t.customerCode}</p>
          </div>
        </div>
        <dl class="summary-list">
          <div>
            <dt>売上累計</dt>
            <dd>${G(t.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${G(t.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${t.balanceAmount>0?"balance-warning":""}">${G(t.balanceAmount)}</dd>
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
            <tbody>${Pa(t)}</tbody>
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
            <tbody>${ja(t)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function at(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function st(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t))}function Y(t,e){for(const n of e){const s=t[n];if(typeof s=="number"&&Number.isFinite(s))return s;if(typeof s=="string"){const o=Number(s);if(Number.isFinite(o))return o}}return null}function Ea(t){const e=t?.productTotals;if(!e||e.length===0)return"―";const n=e.reduce((o,i)=>{const d=Y(i,["amount","salesAmount"]),l=Y(i,["marginRate","grossMarginRate"]);return d===null||d<=0||l===null?o:{weightedAmount:o.weightedAmount+d,weightedRate:o.weightedRate+d*l}},{weightedAmount:0,weightedRate:0});if(n.weightedAmount>0)return`${(n.weightedRate/n.weightedAmount).toFixed(1)}%`;const s=e.reduce((o,i)=>{const d=i,l=Y(d,["amount","salesAmount"]),c=Y(d,["grossProfit","grossAmount","margin"]),r=Y(d,["costAmount","cost","costPrice"]);if(l===null||l<=0)return o;const u=c??(r!==null?l-r:null);return u===null?o:{sales:o.sales+l,gross:o.gross+u}},{sales:0,gross:0});return s.sales>0?`${(s.gross/s.sales*100).toFixed(1)}%`:"―"}function Ra(t){const s={top:20,right:20,bottom:30,left:50},o=760-s.left-s.right,i=260-s.top-s.bottom,d=Math.max(...t.map(u=>u.amount),1),l=o/t.length,c=t.map((u,p)=>{const h=u.amount/d*i,g=s.left+p*l+4,j=s.top+i-h,E=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(u.date));return`
        <g>
          <rect x="${g}" y="${j}" width="${Math.max(l-8,8)}" height="${h}" rx="4" fill="#0F5B8D" opacity="${.58+p/t.length*.34}" />
          ${p%5===0?`<text x="${g+6}" y="252" class="chart-axis">${E}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(u=>{const p=s.top+i-i*u,h=Math.round(d*u/1e3);return`
        <g>
          <line x1="${s.left}" y1="${p}" x2="${760-s.right}" y2="${p}" class="chart-grid" />
          <text x="6" y="${p+4}" class="chart-axis">${h.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${c}
    </svg>
  `}function Ma(t,e,n){const s={success:"正常",warning:"注意",error:"異常",running:"実行中"},o=t.salesRecords.slice(0,10).map(i=>`
            <tr>
              <td class="mono">${i.documentNo}</td>
              <td>${st(i.date)}</td>
              <td>${i.customerName}</td>
              <td class="numeric">${at(i.amount)}</td>
            </tr>
          `).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${e.status}">${s[e.status]}</span>
        <span class="meta-note">最終同期 ${st(e.lastSyncAt)}</span>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${at(t.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${t.kpis.todayDelta>0?"+":""}${t.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月累計</p>
        <p class="kpi-value">${at(t.kpis.monthSales)}</p>
        <p class="kpi-sub">前年同月比 ${t.kpis.monthDelta>0?"+":""}${t.kpis.monthDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${t.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${at(t.kpis.unpaidAmount)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">月次粗利率</p>
        <p class="kpi-value">${Ea(n)}</p>
        <p class="kpi-sub">売上分析データから集計</p>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel">
        <div class="panel-header">
          <div>
            <h2>日次売上</h2>
            <p class="panel-caption">直近30日の売上推移</p>
          </div>
        </div>
        ${Ra(t.dailySales)}
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
              <dt>ジョブ</dt>
              <dd>${e.jobName}</dd>
            </div>
            <div>
              <dt>最終同期</dt>
              <dd>${st(e.lastSyncAt)}</dd>
            </div>
            <div>
              <dt>更新時刻</dt>
              <dd>${st(e.generatedAt)}</dd>
            </div>
          </dl>
        </div>
        <div class="sync-panel-bottom">
          <p class="sync-message">${e.message}</p>
          <div class="quick-links">
            <div class="panel-header">
              <div>
                <h2>クイックリンク</h2>
                <p class="panel-caption">よく使う業務画面へ移動</p>
              </div>
            </div>
            <div class="quick-link-grid">
              <button class="button secondary" type="button" data-link="/invoice-entry">伝票入力</button>
              <button class="button secondary" type="button" data-link="/delivery">納品書</button>
              <button class="button secondary" type="button" data-link="/billing">月次請求</button>
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
          <tbody>${o}</tbody>
        </table>
      </div>
    </section>
  `}function qa(t){return t?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(t)):""}function V(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Oa(t,e){const n=t.lines.length?t.lines.map((o,i)=>`
          <tr>
            <td class="numeric">${i+1}</td>
            <td class="mono">${o.productCode}</td>
            <td>${o.productName}</td>
            <td class="numeric">${o.quantity.toLocaleString("ja-JP")}</td>
            <td>${o.unit}</td>
            <td class="numeric">${V(o.unitPrice)}</td>
            <td class="numeric">${V(o.amount)}</td>
          </tr>
        `).join(""):'<tr><td colspan="7" class="empty-row">明細データがありません。</td></tr>',s=t.totalAmount-t.taxAmount;return`
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
          <input id="delivery-docno" type="text" placeholder="D240122" value="${e}" />
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="delivery-search">呼出し</button>
        </div>
      </div>
    </section>

    <article class="panel delivery-note-body" id="delivery-print-area">
      <div class="delivery-header">
        <div class="delivery-to">
          <p class="delivery-address">${t.customerAddress}</p>
          <h2 class="delivery-customer">${t.customerName} 御中</h2>
          <p class="delivery-label-large">納　品　書</p>
        </div>
        <div class="delivery-meta">
          <table class="delivery-meta-table">
            <tr><th>伝票番号</th><td class="mono">${t.documentNo}</td></tr>
            <tr><th>納品日</th><td>${qa(t.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${V(t.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${V(s)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${V(t.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${V(t.totalAmount)}</span></div>
        </div>
        ${t.note?`<p class="delivery-note-text">備考：${t.note}</p>`:""}
      </div>
    </article>
  `}function P(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ia(t){return P(t).replaceAll(`
`,"<br />")}function Fa(t){const n=[...Object.values(At),{id:"custom",season:"カスタム",subject:"",body:""}].map(o=>`
        <button
          class="template-card ${t.selectedTemplateId===o.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${o.id}"
        >
          <span class="template-card-kicker">${o.season}</span>
          <strong>${P(o.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),s=t.previewRecipients.length?t.previewRecipients.map(o=>`
            <li>
              <span>${P(o.name)}</span>
              <span class="table-sub">${P(o.email)} / ${P(o.area)}</span>
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
            <input type="radio" name="email-audience-mode" value="all" ${t.audienceMode==="all"?"checked":""} />
            <span>全顧客</span>
          </label>
          <label class="choice-card">
            <input type="radio" name="email-audience-mode" value="area" ${t.audienceMode==="area"?"checked":""} />
            <span>エリア別</span>
          </label>
          <label class="choice-card">
            <input type="radio" name="email-audience-mode" value="history" ${t.audienceMode==="history"?"checked":""} />
            <span>過去購入履歴で絞り込み</span>
          </label>
        </div>
        <div class="filter-grid email-filter-grid">
          <label class="field">
            <span>エリア</span>
            <select id="email-region">
              <option value="all" ${t.region==="all"?"selected":""}>全エリア</option>
              <option value="北海道" ${t.region==="北海道"?"selected":""}>北海道</option>
              <option value="関東" ${t.region==="関東"?"selected":""}>関東</option>
              <option value="中部" ${t.region==="中部"?"selected":""}>中部</option>
              <option value="関西" ${t.region==="関西"?"selected":""}>関西</option>
              <option value="九州" ${t.region==="九州"?"selected":""}>九州</option>
            </select>
          </label>
          <label class="field">
            <span>購入履歴</span>
            <select id="email-history-segment">
              <option value="seasonal" ${t.historySegment==="seasonal"?"selected":""}>季節商品購入客</option>
              <option value="premium" ${t.historySegment==="premium"?"selected":""}>吟醸系購入客</option>
              <option value="liqueur" ${t.historySegment==="liqueur"?"selected":""}>リキュール購入客</option>
            </select>
          </label>
        </div>
        <p class="recipient-count">${t.recipientCount.toLocaleString("ja-JP")} 件が対象です。</p>
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
          <input id="email-subject" type="text" value="${P(t.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${P(t.body)}</textarea>
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
        <div class="email-preview">
          <p class="panel-title">${P(t.subject||"件名未入力")}</p>
          <div class="preview-box">${t.body?Ia(t.body):"本文未入力"}</div>
        </div>
        ${t.saveMessage?`<p class="meta-note">${P(t.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${t.sending?"disabled":""}>
            ${t.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function _(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function nt(t,e){return e.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${t}</p>
      <div class="search-result-list">
        ${e.join("")}
      </div>
    </section>
  `}function Ja(t,e){const n=[nt("得意先",e.customers.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${_(o.name)}</strong>
            <span class="table-sub mono">${_(o.code)}</span>
          </button>
        `)),nt("商品",e.products.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${_(o.name)}</strong>
            <span class="table-sub mono">${_(o.code)}</span>
          </button>
        `)),nt("伝票",e.documents.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${_(o.documentNo)}</strong>
            <span class="table-sub">${_(o.customerName)} / ${_(o.date)}</span>
          </button>
        `)),nt("ページ",e.pages.map(o=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${_(o.path)}"
          >
            <strong>${_(o.title)}</strong>
            <span class="table-sub mono">${_(o.path)}</span>
          </button>
        `))].filter(Boolean).join(""),s=t.trim()?'<p class="empty-note">該当する検索結果がありません。</p>':'<p class="empty-note">得意先・商品・伝票・ページを横断検索できます。</p>';return`
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
            value="${_(t)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${n||s}
          </div>
        </div>
      </div>
    </div>
  `}function K(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Oe(t){const e=t.resultsHtml.trim()?t.resultsHtml:`<p class="empty-note">${K(t.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${K(t.title)}">
        <div class="modal-header">
          <h2>${K(t.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${K(t.placeholder)}"
            value="${K(t.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${e}</div>
        </div>
      </div>
    </div>
  `}function ot(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Wt(t){return t.trim().toLowerCase()}function Ba(t,e){const n=Wt(e),s=t.filter(i=>n?[i.code,i.name,i.name].map(Wt).some(d=>d.includes(n)):!0).slice(0,50),o=s.length?`
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
                      data-code="${ot(i.code)}"
                      data-name="${ot(i.name)}"
                    >
                      <td class="mono">${ot(i.code)}</td>
                      <td>${ot(i.name)}</td>
                      <td>${i.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Oe({title:"得意先検索",searchQuery:e,placeholder:"コード・名前で検索",resultsHtml:o,emptyMessage:"該当する得意先が見つかりません。"})}function Va(t){return t.toISOString().slice(0,10)}function F(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function M(t,e){return t[e]?`<div class="field-error">${F(t[e])}</div>`:""}function U(t,e,n=""){return[n,t[e]?"has-error":""].filter(Boolean).join(" ")}function Ua(t,e,n,s){const o=Object.keys(St).map(c=>`<option value="${c}" ${t.invoiceType===c?"selected":""}>${St[c]}</option>`).join(""),i=t.lines.map((c,r)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${U(s,`lines.${r}.productCode`,"input-cell")}" type="text" data-line="${r}" data-field="productCode" value="${F(c.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${r}" aria-label="商品検索">🔍</button>
          </div>
          ${M(s,`lines.${r}.productCode`)}
        </td>
        <td>
          <input class="${U(s,`lines.${r}.productName`,"input-cell")}" type="text" data-line="${r}" data-field="productName" value="${F(c.productName)}" placeholder="商品名" />
          ${M(s,`lines.${r}.productName`)}
        </td>
        <td>
          <input class="${U(s,`lines.${r}.quantity`,"input-cell numeric")}" type="number" data-line="${r}" data-field="quantity" value="${c.quantity}" min="0" />
          ${M(s,`lines.${r}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${r}" data-field="unit" value="${c.unit}" placeholder="本" /></td>
        <td>
          <input class="${U(s,`lines.${r}.unitPrice`,"input-cell numeric")}" type="number" data-line="${r}" data-field="unitPrice" value="${c.unitPrice}" min="0" />
          ${M(s,`lines.${r}.unitPrice`)}
        </td>
        <td class="numeric">${c.amount>0?c.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${r}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${r}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),d=t.lines.reduce((c,r)=>c+r.amount,0),l=Math.floor(d*10/110);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">伝票入力</p>
        <h1>売上伝票入力</h1>
      </div>
      ${e?`<div class="meta-stack"><span class="status-pill success">保存済 ${e}</span></div>`:""}
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>伝票基本情報</h2>
        <button class="button secondary" type="button" data-action="copy-past-invoice">過去伝票から複製</button>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>伝票種別</span>
          <select id="inv-type">${o}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${U(s,"invoiceDate")}" id="inv-date" type="date" value="${t.invoiceDate||Va(new Date)}" />
          ${M(s,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${U(s,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${F(t.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${M(s,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${F(t.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${F(t.staffCode)}" />
        </label>
      </div>
      ${M(s,"lines")}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>明細</h2>
          <p class="panel-caption">${t.lines.length} 行</p>
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
          <span class="total-value">${(d-l).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${l.toLocaleString("ja-JP")} 円</span>
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
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${F(t.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}function za(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function Ha(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Ya(t,e){const n=t.length?t.map(s=>`
            <tr>
              <td class="mono">${s.documentNo}</td>
              <td>${za(s.date)}</td>
              <td>
                <div class="table-title">${s.customerName}</div>
                <div class="table-sub mono">${s.customerCode}</div>
              </td>
              <td class="numeric">${s.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Ha(s.amount)}</td>
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
          <input id="invoice-document-no" type="text" value="${e.documentNo}" placeholder="D240100" />
        </label>
        <label class="field">
          <span>開始日</span>
          <input id="invoice-start" type="date" value="${e.startDate}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="invoice-end" type="date" value="${e.endDate}" />
        </label>
        <label class="field">
          <span>得意先コード</span>
          <input id="invoice-customer-code" type="text" value="${e.customerCode}" placeholder="C0011" />
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
          <p class="panel-caption">${t.length.toLocaleString("ja-JP")} 件</p>
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
      ${t.length===0?'<p class="empty-note">条件に一致する伝票はありません。</p>':""}
    </section>
  `}function Ka(t){return new Date(t.getFullYear(),t.getMonth(),1)}function Qa(t,e){return new Date(t.getFullYear(),t.getMonth()+e,1)}function Ie(t,e){const n=new Date(t);return n.setDate(n.getDate()+e),n}function Fe(t){const e=new Date(t),n=e.getDay();return e.setDate(e.getDate()-n),e.setHours(0,0,0,0),e}function Gt(t){const e=Ie(Fe(t),6);return e.setHours(23,59,59,999),e}function Xt(t){return new Date(`${t}T00:00:00`)}function Zt(t){return`${t.getMonth()+1}/${t.getDate()}`}function Wa(t){return t.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function Ga(){const t=new Date,e=Fe(Qa(Ka(t),-3)),n=Gt(new Date(t.getFullYear(),t.getMonth()+4,0)),s=[];let o=new Date(e);for(;o<=n;){const i=Gt(o);s.push({start:new Date(o),end:i,label:`${Zt(o)} - ${Zt(i)}`}),o=Ie(o,7)}return s}function Xa(t){const e=Ga(),n=`160px repeat(${e.length}, minmax(56px, 1fr))`,s=e.map(i=>`
        <div class="gantt-week">
          <span>${i.label}</span>
        </div>
      `).join(""),o=t.length?t.map(i=>{const d=Xt(i.startDate),l=Xt(i.expectedDoneDate),c=Math.max(0,e.findIndex(p=>p.end>=d)),r=Math.max(c,e.reduce((p,h,g)=>h.start<=l?g:p,c)),u=[`仕込番号: ${i.jikomiNo}`,`銘柄: ${i.productName}`,`期間: ${i.startDate} - ${i.expectedDoneDate}`,`タンク: ${i.tankNo}`,`備考: ${i.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${n}">
              <div class="gantt-label">
                <strong>${i.jikomiNo}</strong>
                <span class="table-sub">${i.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${e.length}">
                <div
                  class="gantt-bar ${i.status}"
                  style="grid-column:${c+1} / ${r+2}"
                  title="${Wa(u)}"
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
        ${o}
      </div>
    </section>
  `}function te(t,e){const n={planned:"neutral",active:"warning",done:"success"},s=t.map(l=>`
      <tr>
        <td class="mono">${l.jikomiNo}</td>
        <td>${l.productName}</td>
        <td>${l.riceType}</td>
        <td class="numeric">${l.plannedKg.toLocaleString("ja-JP")} kg</td>
        <td class="numeric">${l.actualKg>0?l.actualKg.toLocaleString("ja-JP")+" kg":"―"}</td>
        <td>${l.startDate}</td>
        <td>${l.expectedDoneDate}</td>
        <td class="mono">${l.tankNo}</td>
        <td>
          <span class="status-pill ${n[l.status]}">${xe[l.status]}</span>
        </td>
        <td>${l.note||"―"}</td>
      </tr>
    `).join(""),o=t.filter(l=>l.status==="active").length,i=t.filter(l=>l.status==="done").length,d=t.filter(l=>l.status==="planned").length;return`
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
        <p class="kpi-value">${o} 本</p>
        <p class="kpi-sub">アクティブ</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">計画中</p>
        <p class="kpi-value">${d} 本</p>
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
          <button class="tab-button ${e==="list"?"active":""}" data-jikomi-tab="list">一覧</button>
          <button class="tab-button ${e==="calendar"?"active":""}" data-jikomi-tab="calendar">カレンダー</button>
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>仕込一覧</h2>
          <p class="panel-caption">${t.length} 件</p>
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
  `}function Za(t){const e={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},s=t.map(c=>`
      <tr>
        <td class="mono">${c.kenteiNo}</td>
        <td class="mono">${c.jikomiNo}</td>
        <td>${c.productName}</td>
        <td>${c.kenteiDate}</td>
        <td class="numeric">${c.alcoholDegree>0?c.alcoholDegree.toFixed(1)+"度":"―"}</td>
        <td class="numeric">${c.extractDegree>0?c.extractDegree.toFixed(1):"―"}</td>
        <td class="numeric">${c.sakaMeterValue!==0?c.sakaMeterValue.toFixed(1):"―"}</td>
        <td class="numeric">${c.volume>0?c.volume.toLocaleString("ja-JP")+" L":"―"}</td>
        <td>${c.taxCategory}</td>
        <td>
          <span class="status-pill ${n[c.status]}">${e[c.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${c.id}">
            ${c.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),o=t.filter(c=>c.status==="approved").length,i=t.filter(c=>c.status==="submitted").length,d=t.filter(c=>c.status==="pending").length;return`
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
        <p class="kpi-value">${t.filter(c=>c.status==="approved").reduce((c,r)=>c+r.volume,0).toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">酒税対象</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">申請中</p>
        <p class="kpi-value">${i} 件</p>
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
          <p class="panel-caption">承認済 ${o} 件 / 合計 ${t.length} 件</p>
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
  `}function ts(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function es(t,e){return`
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
        ${t?`<p class="field-error">${ts(t)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${e?"disabled":""}>
            ${e?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function as(t){return t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td>${e.name}</td>
          <td class="numeric">${e.closingDay}日</td>
          <td class="numeric">${e.paymentDay}日</td>
          <td><span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function ss(t){return t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td class="mono">${e.janCode}</td>
          <td>${e.name}</td>
          <td>${e.category}</td>
          <td><span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function ns(t,e){return`
    <section class="page-head">
      <div>
        <p class="eyebrow">マスタ</p>
        <h1>得意先・商品マスタ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">得意先</p>
        <p class="kpi-value">${t.summary.customerCount.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">有効 ${t.summary.activeCustomerCount.toLocaleString("ja-JP")} 件</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">商品</p>
        <p class="kpi-value">${t.summary.productCount.toLocaleString("ja-JP")}</p>
        <p class="kpi-sub">有効 ${t.summary.activeProductCount.toLocaleString("ja-JP")} 件</p>
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
            <button class="tab-button ${e==="customers"?"active":""}" data-tab="customers">得意先一覧</button>
            <button class="tab-button ${e==="products"?"active":""}" data-tab="products">商品一覧</button>
          </div>
        </div>
      </div>
      <div class="table-wrap">
        ${e==="customers"?`
          <table>
            <thead>
              <tr>
                <th>得意先コード</th>
                <th>得意先名</th>
                <th class="numeric">締日</th>
                <th class="numeric">入金日</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>${as(t.customers)}</tbody>
          </table>
        `:`
          <table>
            <thead>
              <tr>
                <th>商品コード</th>
                <th>JAN</th>
                <th>商品名</th>
                <th>カテゴリ</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>${ss(t.products)}</tbody>
          </table>
        `}
      </div>
    </section>
  `}function vt(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function os(t){const e=t.map(o=>{const d=(o.minimumStock>0?o.currentStock/o.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${o.code}</td>
          <td>${o.name}</td>
          <td class="numeric ${d?"text-danger":""}">
            ${o.currentStock.toLocaleString("ja-JP")} ${o.unit}
            ${d?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${o.minimumStock.toLocaleString("ja-JP")} ${o.unit}</td>
          <td class="numeric">${vt(o.unitCost)}</td>
          <td class="numeric">${vt(o.currentStock*o.unitCost)}</td>
          <td>${o.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${o.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=t.filter(o=>o.minimumStock>0&&o.currentStock/o.minimumStock<1.5).length,s=t.reduce((o,i)=>o+i.currentStock*i.unitCost,0);return`
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
        <p class="kpi-value">${vt(s)}</p>
        <p class="kpi-sub">${t.length} 品目</p>
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
          <tbody>${e||'<tr><td colspan="8" class="empty-row">資材データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function is(t){return t?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t)):"-"}function bt(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}const ls={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function cs(t){return`
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
          <tbody>${t.map(n=>`
        <tr>
          <td>
            <div class="table-title">${n.customerName}</div>
            <div class="table-sub mono">${n.customerCode}</div>
          </td>
          <td class="numeric">${bt(n.billedAmount)}</td>
          <td class="numeric">${bt(n.paymentAmount)}</td>
          <td class="numeric">${bt(n.balanceAmount)}</td>
          <td>${is(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${ls[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function z(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ee(t){return t.trim().toLowerCase()}function rs(t,e){const n=ee(e),s=t.filter(i=>n?[i.code,i.name,i.janCode].map(ee).some(d=>d.includes(n)):!0),o=s.length?`
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
                      data-code="${z(i.code)}"
                      data-name="${z(i.name)}"
                    >
                      <td class="mono">${z(i.code)}</td>
                      <td>${z(i.name)}</td>
                      <td class="mono">${z(i.janCode)}</td>
                      <td>${z(i.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Oe({title:"商品検索",searchQuery:e,placeholder:"コード・名前・JANで検索",resultsHtml:o,emptyMessage:"該当する商品が見つかりません。"})}function q(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ds(t,e){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},s={pending:"warning",confirmed:"neutral",paid:"success"},o={unpaid:"未払い",partial:"一部支払",paid:"支払済"},i={unpaid:"warning",partial:"neutral",paid:"success"},d=t.map(p=>`
      <tr>
        <td class="mono">${p.documentNo}</td>
        <td>${p.purchaseDate}</td>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td>${p.itemName}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${q(p.unitPrice)}</td>
        <td class="numeric"><strong>${q(p.amount)}</strong></td>
        <td>
          <span class="status-pill ${s[p.status]}">${n[p.status]}</span>
        </td>
      </tr>
    `).join(""),l=e.map(p=>`
      <tr>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td class="numeric">${q(p.totalPurchase)}</td>
        <td class="numeric">${q(p.paidAmount)}</td>
        <td class="numeric"><strong>${q(p.balance)}</strong></td>
        <td>${p.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${i[p.status]}">${o[p.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${p.supplierCode}" ${p.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),c=t.reduce((p,h)=>p+h.amount,0),r=e.reduce((p,h)=>p+h.balance,0),u=e.filter(p=>p.status!=="paid").length;return`
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
        <p class="kpi-value">${q(c)}</p>
        <p class="kpi-sub">${t.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${q(r)}</p>
        <p class="kpi-sub">未払い ${u} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>仕入伝票一覧</h2>
          <p class="panel-caption">${t.length} 件</p>
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
        <p class="panel-caption">${e.length} 社</p>
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
          <tbody>${l||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function Q(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function us(t,e){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},s={holding:"neutral",due:"warning",cleared:"success"},o=t.map(u=>`
      <tr>
        <td class="mono">${u.billNo}</td>
        <td>${u.supplierName}</td>
        <td class="numeric">${Q(u.amount)}</td>
        <td>${u.issueDate}</td>
        <td>${u.dueDate}</td>
        <td>
          <span class="status-pill ${s[u.status]}">${n[u.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${u.id}" ${u.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),i=e.map(u=>{const p=u.minimumStock>0&&u.currentStock<u.minimumStock*1.2;return`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric ${p?"text-danger":""}">
            ${u.currentStock.toLocaleString("ja-JP")} ${u.unit}
            ${p?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${u.minimumStock.toLocaleString("ja-JP")} ${u.unit}</td>
          <td class="numeric">${Q(u.unitCost)}</td>
          <td class="numeric">${Q(u.currentStock*u.unitCost)}</td>
          <td>${u.lastPurchaseDate}</td>
        </tr>
      `}).join(""),d=t.filter(u=>u.status==="holding"),l=d.reduce((u,p)=>u+p.amount,0),c=e.reduce((u,p)=>u+p.currentStock*p.unitCost,0),r=e.filter(u=>u.minimumStock>0&&u.currentStock<u.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${Q(l)}</p>
        <p class="kpi-sub">${d.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${Q(c)}</p>
        <p class="kpi-sub">要補充 ${r} 品目</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>手形一覧</h2>
        <p class="panel-caption">${t.length} 枚</p>
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
          <tbody>${o||'<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>原料在庫</h2>
        <p class="panel-caption">${e.length} 品目</p>
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
  `}function ps(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t))}function S(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function xt(t){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(t)}"
      >
        コピー
      </button>
      <pre class="code-block">${S(t)}</pre>
    </div>
  `}function ms(t){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(t)}"
    >
      コピー
    </button>
  `}function it(t){return`
    <div class="setup-command-row">
      <code class="inline-code">${S(t)}</code>
      ${ms(t)}
    </div>
  `}function H(t){return`
    <div class="setup-step" data-step="${t.step}">
      <h3>${S(t.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${S(t.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${t.instructions.map(e=>`<li>${S(e)}</li>`).join("")}
        </ol>
      </div>
      ${t.code?xt(t.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${t.success.map(e=>`<li>${S(e)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${t.errors.map(e=>`<li>${S(e)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function lt(t){return`
    <div class="setup-step setup-step-compact" data-step="${S(t.stepLabel)}">
      <h3>${S(t.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${S(t.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${t.body}
      </div>
    </div>
  `}function hs(t,e,n){const s={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${ps(t.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${t.status}">${s[t.status]}</span>
        </p>
        <p class="kpi-sub">${S(t.message)}</p>
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
      ${lt({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${it("git --version")}
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
      ${lt({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${it("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${lt({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${it("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${it("python get-pip.py")}
        `})}
      ${lt({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${H({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${H({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${H({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${H({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${H({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${H({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${xt(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${xt(`{
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
            <span class="config-value">${S(e)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${S(e)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${S("（未設定：Supabaseダッシュボードから取得してください）")}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${S(n)}"
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
  `}function ys(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function vs(t){return t.replace("-","/")}function bs(t){if(t.length===0)return'<div class="chart-empty">データなし</div>';const e=760,n=280,s={top:16,right:24,bottom:36,left:64},o=e-s.left-s.right,i=n-s.top-s.bottom,d=Math.max(...t.map(u=>u.amount),1),l=o/t.length,c=[0,.25,.5,.75,1].map(u=>{const p=s.top+i-i*u,h=`${Math.round(d*u/1e4).toLocaleString("ja-JP")}万円`;return`
        <g>
          <line x1="${s.left}" y1="${p}" x2="${e-s.right}" y2="${p}" class="chart-grid" />
          <text x="8" y="${p+4}" class="chart-axis">${h}</text>
        </g>
      `}).join(""),r=t.map((u,p)=>{const h=u.amount/d*i,g=Math.max(l-18,24),j=s.left+p*l+(l-g)/2,E=s.top+i-h;return`
        <g>
          <rect x="${j}" y="${E}" width="${g}" height="${h}" rx="6" class="analytics-bar" />
          <text x="${j+g/2}" y="${n-10}" class="chart-axis centered-axis">${vs(u.month)}</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${e} ${n}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${c}
      ${r}
    </svg>
  `}function gs(t){return t.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td>${e.name}</td>
          <td class="numeric">${ys(e.amount)}</td>
          <td class="numeric">${e.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${e.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function fs(t,e){const n=e==="products"?"商品別集計":"得意先別集計",s=e==="products"?t.productTotals:t.customerTotals;return`
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
        ${bs(t.monthlySales)}
      </article>

      <article class="panel">
        <div class="panel-header tabs-header">
          <div>
            <h2>${n}</h2>
            <p class="panel-caption">売上金額順に表示</p>
          </div>
          <div class="tab-group">
            <button class="tab-button ${e==="products"?"active":""}" data-analytics-tab="products">商品別</button>
            <button class="tab-button ${e==="customers"?"active":""}" data-analytics-tab="customers">得意先別</button>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>コード</th>
                <th>名称</th>
                <th class="numeric">売上額</th>
                <th class="numeric">数量</th>
                <th class="numeric">伝票数</th>
              </tr>
            </thead>
            <tbody>${gs(s)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function W(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function $s(t){const e=Math.max(...t.salesByProduct.flatMap(i=>i.values),1),n=t.salesByProduct.map(i=>{const d=i.values.map((l,c)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(l/e*120)}px" title="${t.months[c]}: ${W(l)}"></div>
            <span class="bar-label">${t.months[c].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${i.label}</p>
          <div class="bar-chart">${d}</div>
        </div>
      `}).join(""),s=t.costSimulation.map(i=>`
      <tr>
        <td class="mono">${i.productCode}</td>
        <td>${i.productName}</td>
        <td class="numeric">${W(i.costPrice)}</td>
        <td class="numeric">${W(i.sellPrice)}</td>
        <td class="numeric">${W(i.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${i.marginRate>=40?"success":"warning"}">${i.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),o=t.salesByCustomer.map(i=>{const d=i.values.reduce((l,c)=>l+c,0);return`
        <tr>
          <td>${i.label}</td>
          ${i.values.map(l=>`<td class="numeric">${(l/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${W(d)}</strong></td>
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
              ${t.months.map(i=>`<th class="numeric">${i}</th>`).join("")}
              <th class="numeric">合計</th>
            </tr>
          </thead>
          <tbody>${o}</tbody>
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
  `}function ks(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function Ss(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ae(t){return t.toISOString().slice(0,10)}function ws(t,e,n){const s=t.length?t.map(o=>`
            <tr>
              <td class="mono">${o.documentNo}</td>
              <td>${ks(o.date)}</td>
              <td>
                <div class="table-title">${o.customerName}</div>
                <div class="table-sub mono">${o.customerCode}</div>
              </td>
              <td class="numeric">${Ss(o.amount)}</td>
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
          <input id="sales-start" type="date" value="${e||ae(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||ae(new Date)}" />
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
          <p class="panel-caption">${t.length.toLocaleString("ja-JP")} 件</p>
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
  `}function ct(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function xs(t,e,n,s){const o={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},i={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},d={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},l=t.map(p=>`
      <tr>
        <td>${p.saleTime}</td>
        <td class="mono">${p.productCode}</td>
        <td>${p.productName}</td>
        <td class="numeric">${p.quantity}</td>
        <td class="numeric">${ct(p.unitPrice)}</td>
        <td class="numeric"><strong>${ct(p.amount)}</strong></td>
        <td>${o[p.paymentMethod]}</td>
      </tr>
    `).join(""),c=e.map(p=>`
      <tr>
        <td class="mono">${p.orderNo}</td>
        <td>${p.orderDate}</td>
        <td>${p.customerName}</td>
        <td>${p.postalCode} ${p.address}</td>
        <td>${p.items.map(h=>`${h.productName} ×${h.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${ct(p.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${d[p.status]}">${i[p.status]}</span>
        </td>
        <td>${p.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${p.id}">詳細</button>
        </td>
      </tr>
    `).join(""),r=t.reduce((p,h)=>p+h.amount,0),u=e.filter(p=>p.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${ct(r)}</p>
        <p class="kpi-sub">${t.length} 件 / ${s}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規受注</p>
        <p class="kpi-value">${u} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">受注合計</p>
        <p class="kpi-value">${e.length} 件</p>
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
            <tbody>${l||'<tr><td colspan="7" class="empty-row">販売データがありません。</td></tr>'}</tbody>
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
            <tbody>${c||'<tr><td colspan="9" class="empty-row">受注データがありません。</td></tr>'}</tbody>
          </table>
        </div>
        `}
    </section>
  `}const gt={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Ds={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function Cs(t,e,n,s){const o=Ds[t],i=Object.keys(gt).map(l=>`
      <button class="tab-button ${t===l?"active":""}" data-import-entity="${l}">
        ${gt[l]}
      </button>
    `).join(""),d=e?`
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>プレビュー（先頭10件 / 全${e.totalRows}件）</h2>
          <p class="panel-caption">
            OK: ${e.validRows}件 / NG: ${e.invalidRows}件
          </p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              ${e.columns.map(l=>`<th>${l}</th>`).join("")}
              <th>検証</th>
            </tr>
          </thead>
          <tbody>
            ${e.rows.slice(0,10).map((l,c)=>`
              <tr class="${l._valid?"":"has-error"}">
                <td>${c+1}</td>
                ${e.columns.map(r=>`<td>${String(l[r]??"")}</td>`).join("")}
                <td>${l._valid?'<span class="status-pill success">OK</span>':`<span class="status-pill warning">${l._error??"NG"}</span>`}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="action-bar">
        <button class="button secondary" data-action="import-cancel">キャンセル</button>
        <button class="button primary" data-action="import-execute"
          ${n||e.validRows===0?"disabled":""}>
          ${n?"取り込み中…":`${e.validRows}件をSupabaseに登録`}
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
        <h2>${gt[t]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${o.required.map(l=>`<code class="config-value">${l}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${o.optional.map(l=>`<code class="config-value">${l}</code>`).join(" / ")}</dd>
        </div>
      </div>
      <div class="action-bar">
        <button class="button secondary" data-action="download-template" data-entity="${t}">
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

    ${s?`<section class="panel"><p class="sync-message">${s}</p></section>`:""}
  `}const se={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},Ns={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},_s={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function f(t){return"¥"+t.toLocaleString("ja-JP")}function X(t){const e=new Date(t);return`${e.getFullYear()}年${e.getMonth()+1}月${e.getDate()}日`}function Je(t,e){const n=t.reduce((i,d)=>i+d.amount,0),s=Math.floor(n*e),o=n+s;return{subtotal:n,taxAmount:s,total:o}}const v={currentDateY:{x:14,y:4,size:9},currentDateM:{x:21,y:4,size:9},currentDateD:{x:28,y:4,size:9},documentNo:{x:195,y:4,size:10,bold:!0},settlementCheck:{x:216,y:5,size:9},vendorName:{x:6,y:17,size:10,bold:!0},vendorAddress:{x:6,y:22,size:7},chainStoreCode:{x:64,y:18,size:9},categoryCode:{x:89,y:18,size:9},slipNumber:{x:127,y:18,size:9},vendorCode:{x:163,y:18,size:9},customerName:{x:6,y:28,size:10,bold:!0},orderDateY:{x:82,y:29,size:8},orderDateM:{x:87,y:29,size:8},orderDateD:{x:92,y:29,size:8},deliveryDateY:{x:106,y:29,size:8},deliveryDateM:{x:111,y:29,size:8},deliveryDateD:{x:116,y:29,size:8},orderNo:{x:143,y:29,size:9},partnerCode:{x:176,y:29,size:9},detailStartY:42,detailRowH:6.5,detailCols:{productName:{x:4,w:40,align:"left",size:7.5},productCode:{x:45,w:18,align:"left",size:7.5},color:{x:64,w:8,align:"center",size:7.5},size:{x:73,w:14,align:"center",size:7.5},unit:{x:88,w:7,align:"center",size:7.5},quantity:{x:96,w:13,align:"right",size:8},correctedQty:{x:115,w:13,align:"right",size:8},discount:{x:129,w:9,align:"right",size:8},unitPrice:{x:139,w:14,align:"right",size:8},costAmount:{x:154,w:16,align:"right",size:8,bold:!0},retailPrice:{x:171,w:13,align:"right",size:8},note:{x:185,w:20,align:"right",size:8}},totalQty:{x:105,y:92,size:9,bold:!0},receivedTotal:{x:128,y:92,size:9},returnTotal:{x:152,y:92,size:9},correctedCostTotal:{x:176,y:92,size:10,bold:!0},correctedRetailTotal:{x:205,y:92,size:10,bold:!0}};function b(t,e){const n=t.align??"left",s=t.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${t.x}mm`,`top:${t.y}mm`,t.w?`width:${t.w}mm`:"",`text-align:${n}`,`font-size:${s}pt`,t.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${e}</div>`}function ft(t){if(!t)return{y:"",m:"",d:""};const e=new Date(t),n=e.getFullYear(),s=n-2018;return{y:s>0?String(s).padStart(2,"0"):String(n).slice(-2),m:String(e.getMonth()+1).padStart(2,"0"),d:String(e.getDate()).padStart(2,"0")}}function As(t,e,n){const s=ft(t.documentDate),o=ft(t.orderDate??t.documentDate),i=ft(t.deliveryDate??t.documentDate),d=t.lines.slice(0,6).map((y,x)=>{const Qe=v.detailStartY+x*v.detailRowH,D=v.detailCols,Ft=[],C=(Jt,Bt)=>{Bt&&Ft.push(b({...Jt,y:Qe,x:Jt.x+0},Bt))};return C(D.productName,y.productName+(y.spec?` ${y.spec}`:"")),C(D.productCode,y.productCode),C(D.color,y.color??""),C(D.size,[y.size,y.caseQty?`×${y.caseQty}`:""].filter(Boolean).join(" ")),C(D.unit,y.unit),C(D.quantity,y.quantity>0?y.quantity.toLocaleString("ja-JP"):""),C(D.correctedQty,y.correctedQuantity?y.correctedQuantity.toLocaleString("ja-JP"):""),C(D.discount,y.discount?y.discount.toLocaleString("ja-JP"):""),C(D.unitPrice,y.unitPrice>0?y.unitPrice.toLocaleString("ja-JP"):""),C(D.costAmount,y.amount>0?y.amount.toLocaleString("ja-JP"):""),C(D.retailPrice,y.retailPrice?y.retailPrice.toLocaleString("ja-JP"):""),C(D.note,y.receivedAmount?y.receivedAmount.toLocaleString("ja-JP"):""),Ft.join("")}).join(""),l=t.lines.reduce((y,x)=>y+(x.amount||0),0),c=t.lines.reduce((y,x)=>y+(x.retailPrice||0)*(x.correctedQuantity??x.quantity),0),r=t.lines.reduce((y,x)=>y+(x.receivedAmount||0),0),u=t.lines.reduce((y,x)=>y+(x.returnAmount||0),0),p=t.lines.reduce((y,x)=>y+x.quantity,0),h=n.showReferenceOverlay?`background-image: url('${n.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",g=n.calibrationOffsetX||0,j=n.calibrationOffsetY||0,E=`transform: translate(${g}mm, ${j}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${h}">
        ${n.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-n.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${E}">
        ${b(v.currentDateY,s.y)}
        ${b(v.currentDateM,s.m)}
        ${b(v.currentDateD,s.d)}
        ${b(v.documentNo,t.documentNo)}
        ${t.settlementPrint?b(v.settlementCheck,"✓"):""}

        ${b(v.vendorName,e.name)}
        ${b(v.vendorAddress,e.address1)}
        ${b(v.chainStoreCode,t.chainStoreCode??"")}
        ${b(v.categoryCode,t.categoryCode??"")}
        ${b(v.slipNumber,t.documentNo)}
        ${b(v.vendorCode,t.slipTypeCode??"")}

        ${b(v.customerName,`${t.customerName} ${t.customerHonorific}`)}
        ${b(v.orderDateY,o.y)}
        ${b(v.orderDateM,o.m)}
        ${b(v.orderDateD,o.d)}
        ${b(v.deliveryDateY,i.y)}
        ${b(v.deliveryDateM,i.m)}
        ${b(v.deliveryDateD,i.d)}
        ${b(v.orderNo,t.orderNo??"")}
        ${b(v.partnerCode,t.vendorCode??"")}

        ${d}

        ${b(v.totalQty,p.toLocaleString("ja-JP"))}
        ${b(v.receivedTotal,r.toLocaleString("ja-JP"))}
        ${b(v.returnTotal,u.toLocaleString("ja-JP"))}
        ${b(v.correctedCostTotal,l.toLocaleString("ja-JP"))}
        ${b(v.correctedRetailTotal,c.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function Ls(t,e,n){const{subtotal:s,taxAmount:o,total:i}=Je(t.lines,t.taxRate),d=t.previousBalance??0,l=t.paymentAmount??0,c=d-l+i,r=t.lines.map(p=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${p.note??""}</td>
        <td>${p.productName}${p.spec?` <span style="color:#636e72;font-size:9pt;">/ ${p.spec}</span>`:""}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${p.unit}</td>`:""}
        <td class="numeric">${f(p.unitPrice)}</td>
        <td class="numeric">${f(p.amount)}</td>
      </tr>
    `).join(""),u=Array.from({length:Math.max(0,6-t.lines.length)}).map(()=>`
      <tr class="freee-empty">
        <td></td><td></td><td></td>${n.showUnit?"<td></td>":""}<td></td><td></td>
      </tr>
    `).join("");return`
    <div class="print-page invoice-freee ${n.fontSize}">
      <!-- ヘッダー -->
      <div class="freee-header">
        <div>
          <h1 class="freee-title">御 請 求 書</h1>
          <p class="freee-doc-no">No. ${t.documentNo}</p>
        </div>
        <div class="freee-from">
          <p class="freee-company-name">${e.name}</p>
          <p>〒${e.postalCode}</p>
          <p>${e.address1}${e.address2?` ${e.address2}`:""}</p>
          <p>TEL: ${e.tel}　FAX: ${e.fax}</p>
          ${n.showRegistrationNo?`<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${e.registrationNo}</span></p>`:""}
          ${n.showSeal?`<div class="freee-seal-wrap">${e.sealImageUrl?`<img src="${e.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />`:'<div class="freee-seal-placeholder">印</div>'}</div>`:""}
        </div>
      </div>

      <!-- 宛先 -->
      <div class="freee-to">
        ${t.customerPostalCode?`<p class="freee-to-postal">〒${t.customerPostalCode}</p>`:""}
        ${t.customerAddress?`<p class="freee-to-addr">${t.customerAddress}</p>`:""}
        <div class="freee-to-name">${t.customerName} ${t.customerHonorific}</div>
      </div>

      <!-- 日付 -->
      <dl class="freee-meta">
        <div><dt>請求日</dt><dd>${X(t.documentDate)}</dd></div>
        ${t.dueDate?`<div><dt>お支払期限</dt><dd>${X(t.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${t.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${f(c)}</span>
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
        <tbody>${r}${u}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(t.taxRate*100)}%対象: ${f(s)} / 消費税: ${f(o)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${d?`<tr><th>前回御請求額</th><td>${f(d)}</td></tr>`:""}
          ${l?`<tr><th>ご入金額</th><td>▲ ${f(l)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${f(s)}</td></tr>
          <tr><th>消費税 (${Math.round(t.taxRate*100)}%)</th><td>${f(o)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${f(c)}</td></tr>
        </table>
      </div>

      <!-- 振込先 -->
      ${n.showBankInfo?`
        <div class="freee-bank">
          <h3>お振込先</h3>
          <p><strong>${e.bankName}</strong> ${e.bankBranch}　${e.bankAccountType} ${e.bankAccountNo}</p>
          <p>口座名義: ${e.bankAccountHolder}</p>
          <p class="freee-bank-note">※ お振込手数料はお客様にてご負担くださいますようお願い申し上げます。</p>
        </div>`:""}

      <!-- 備考 -->
      ${n.showRemarks&&t.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${t.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}
    </div>
  `}function Ps(t,e,n){const{subtotal:s,taxAmount:o,total:i}=Je(t.lines,t.taxRate),d=t.lines.map(c=>`
      <tr>
        <td>${c.productName}${c.spec?` <span style="color:#636e72;font-size:9pt;">/ ${c.spec}</span>`:""}</td>
        <td class="numeric">${c.quantity.toLocaleString("ja-JP")}</td>
        ${n.showUnit?`<td>${c.unit}</td>`:""}
        <td class="numeric">${f(c.unitPrice)}</td>
        <td class="numeric">${f(c.amount)}</td>
      </tr>
    `).join(""),l=Array.from({length:Math.max(0,5-t.lines.length)}).map(()=>`
      <tr class="freee-empty">
        <td></td><td></td>${n.showUnit?"<td></td>":""}<td></td><td></td>
      </tr>
    `).join("");return`
    <div class="print-page quotation-freee ${n.fontSize}">
      <!-- ヘッダー: タイトル + 会社情報 -->
      <div class="freee-header">
        <div>
          <h1 class="freee-title">御 見 積 書</h1>
          <p class="freee-doc-no">No. ${t.documentNo}</p>
        </div>
        <div class="freee-from">
          <p class="freee-company-name">${e.name}</p>
          <p>〒${e.postalCode}</p>
          <p>${e.address1}${e.address2?` ${e.address2}`:""}</p>
          <p>TEL: ${e.tel}　FAX: ${e.fax}</p>
          ${n.showRegistrationNo?`<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${e.registrationNo}</span></p>`:""}
          ${n.showSeal?`<div class="freee-seal-wrap">${e.sealImageUrl?`<img src="${e.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />`:'<div class="freee-seal-placeholder">印</div>'}</div>`:""}
        </div>
      </div>

      <!-- 宛先 -->
      <div class="freee-to">
        ${t.customerPostalCode?`<p class="freee-to-postal">〒${t.customerPostalCode}</p>`:""}
        ${t.customerAddress?`<p class="freee-to-addr">${t.customerAddress}</p>`:""}
        <div class="freee-to-name">${t.customerName} ${t.customerHonorific}</div>
      </div>

      <!-- 件名・日付 -->
      ${t.title?`<p class="freee-subject"><strong>件名:</strong>${t.title}</p>`:""}
      <dl class="freee-meta">
        <div><dt>見積日</dt><dd>${X(t.documentDate)}</dd></div>
        ${t.expireDate?`<div><dt>有効期限</dt><dd>${X(t.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${t.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${f(i)}</span>
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
        <tbody>${d}${l}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${n.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(t.taxRate*100)}%対象: ${f(s)} / 消費税: ${f(o)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${f(s)}</td></tr>
          <tr><th>消費税 (${Math.round(t.taxRate*100)}%)</th><td>${f(o)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${f(i)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${n.showRemarks&&t.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${t.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${t.expireDate?X(t.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function js(t,e,n,s){const o=Object.keys(se).map(l=>`
      <button class="tab-button ${t===l?"active":""}" data-print-template="${l}">
        ${se[l]}
      </button>
    `).join("");let i="";switch(t){case"chain_store":i=As(s,n,e);break;case"quotation":i=Ps(s,n,e);break;case"invoice_monthly":i=Ls(s,n,e);break}const d=s.lines.map((l,c)=>`
      <tr>
        <td><input class="input-cell mono" type="text" data-print-line="${c}" data-print-lfield="productCode" value="${l.productCode}" /></td>
        <td><input class="input-cell" type="text" data-print-line="${c}" data-print-lfield="productName" value="${l.productName}" /></td>
        <td><input class="input-cell" type="text" data-print-line="${c}" data-print-lfield="spec" value="${l.spec??""}" placeholder="720ml" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${c}" data-print-lfield="quantity" value="${l.quantity}" /></td>
        <td><input class="input-cell" type="text" data-print-line="${c}" data-print-lfield="unit" value="${l.unit}" placeholder="本" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${c}" data-print-lfield="unitPrice" value="${l.unitPrice}" /></td>
        <td class="numeric">${l.amount>0?l.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${c}" title="削除">✕</button></td>
      </tr>
    `).join("");return`
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">印刷センター</p>
        <h1>伝票・見積・請求の印刷</h1>
      </div>
      <div class="meta-stack">
        <button class="button primary" data-action="print-execute" onclick="window.print()">🖨️ 印刷する</button>
      </div>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <h2>テンプレート選択</h2>
      </div>
      <div class="tab-group">${o}</div>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <h2>書類情報</h2>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>書類番号</span>
          <input type="text" data-print-field="documentNo" value="${s.documentNo}" />
        </label>
        <label class="field">
          <span>${t==="quotation"?"見積日":t==="invoice_monthly"?"請求日":"納品日"}</span>
          <input type="date" data-print-field="documentDate" value="${s.documentDate}" />
        </label>
        ${t==="quotation"?`<label class="field"><span>有効期限</span><input type="date" data-print-field="expireDate" value="${s.expireDate??""}" /></label>`:""}
        ${t==="invoice_monthly"?`<label class="field"><span>お支払期限</span><input type="date" data-print-field="dueDate" value="${s.dueDate??""}" /></label>`:""}
        <label class="field">
          <span>得意先コード</span>
          <input type="text" data-print-field="customerCode" value="${s.customerCode??""}" />
        </label>
        <label class="field">
          <span>得意先名</span>
          <input type="text" data-print-field="customerName" value="${s.customerName}" />
        </label>
        <label class="field">
          <span>敬称</span>
          <select data-print-field="customerHonorific">
            <option value="御中" ${s.customerHonorific==="御中"?"selected":""}>御中</option>
            <option value="様" ${s.customerHonorific==="様"?"selected":""}>様</option>
            <option value="殿" ${s.customerHonorific==="殿"?"selected":""}>殿</option>
          </select>
        </label>
        <label class="field">
          <span>郵便番号</span>
          <input type="text" data-print-field="customerPostalCode" value="${s.customerPostalCode??""}" placeholder="100-0001" />
        </label>
        <label class="field">
          <span>住所</span>
          <input type="text" data-print-field="customerAddress" value="${s.customerAddress??""}" />
        </label>
        ${t==="quotation"?`<label class="field"><span>件名</span><input type="text" data-print-field="title" value="${s.title??""}" placeholder="純米吟醸 出荷見積" /></label>`:""}
        ${t==="chain_store"?`
              <label class="field"><span>発注日</span><input type="date" data-print-field="orderDate" value="${s.orderDate??""}" /></label>
              <label class="field"><span>納品日</span><input type="date" data-print-field="deliveryDate" value="${s.deliveryDate??""}" /></label>
              <label class="field"><span>柱店コード</span><input type="text" data-print-field="chainStoreCode" value="${s.chainStoreCode??""}" placeholder="0123" /></label>
              <label class="field"><span>分類コード</span><input type="text" data-print-field="categoryCode" value="${s.categoryCode??""}" placeholder="21" /></label>
              <label class="field"><span>取引コード</span><input type="text" data-print-field="slipTypeCode" value="${s.slipTypeCode??""}" placeholder="11" /></label>
              <label class="field"><span>受注No.</span><input type="text" data-print-field="orderNo" value="${s.orderNo??""}" /></label>
              <label class="field"><span>取引先コード</span><input type="text" data-print-field="vendorCode" value="${s.vendorCode??""}" /></label>
              <label class="field"><span>部門コード</span><input type="text" data-print-field="departmentCode" value="${s.departmentCode??""}" /></label>
            `:""}
        <label class="field">
          <span>消費税率</span>
          <select data-print-field="taxRate">
            <option value="0.10" ${s.taxRate===.1?"selected":""}>10%</option>
            <option value="0.08" ${s.taxRate===.08?"selected":""}>8% 軽減税率</option>
          </select>
        </label>
        ${t==="invoice_monthly"?`
              <label class="field"><span>前回請求額</span><input type="number" data-print-field="previousBalance" value="${s.previousBalance??0}" /></label>
              <label class="field"><span>ご入金額</span><input type="number" data-print-field="paymentAmount" value="${s.paymentAmount??0}" /></label>
            `:""}
      </div>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <div>
          <h2>明細</h2>
          <p class="panel-caption">${s.lines.length} 行</p>
        </div>
        <button class="button secondary" data-action="print-add-line">＋ 行追加</button>
      </div>
      <div class="table-wrap">
        <table class="entry-table">
          <thead>
            <tr>
              <th>商品CD</th>
              <th>品名</th>
              <th>規格</th>
              <th class="numeric">数量</th>
              <th>単位</th>
              <th class="numeric">単価</th>
              <th class="numeric">金額</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${d||'<tr><td colspan="8" class="empty-row">「＋行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <label class="field" style="margin-top:16px;">
        <span>備考</span>
        <textarea data-print-field="remarks" rows="2">${s.remarks??""}</textarea>
      </label>
    </section>

    <section class="panel no-print">
      <div class="panel-header">
        <h2>印刷オプション</h2>
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>用紙サイズ</span>
          <select data-print-opt="pageSize">
            <option value="A4" ${e.pageSize==="A4"?"selected":""}>A4</option>
            <option value="A5" ${e.pageSize==="A5"?"selected":""}>A5</option>
            <option value="B5" ${e.pageSize==="B5"?"selected":""}>B5</option>
          </select>
        </label>
        <label class="field">
          <span>向き</span>
          <select data-print-opt="orientation">
            <option value="portrait" ${e.orientation==="portrait"?"selected":""}>縦</option>
            <option value="landscape" ${e.orientation==="landscape"?"selected":""}>横</option>
          </select>
        </label>
        <label class="field">
          <span>文字サイズ</span>
          <select data-print-opt="fontSize">
            <option value="small" ${e.fontSize==="small"?"selected":""}>小</option>
            <option value="medium" ${e.fontSize==="medium"?"selected":""}>中</option>
            <option value="large" ${e.fontSize==="large"?"selected":""}>大</option>
          </select>
        </label>
        <label class="field">
          <span>カラーモード</span>
          <select data-print-opt="colorMode">
            <option value="color" ${e.colorMode==="color"?"selected":""}>カラー</option>
            <option value="mono" ${e.colorMode==="mono"?"selected":""}>モノクロ</option>
          </select>
        </label>
      </div>
      <div style="margin-top:16px; display:flex; flex-wrap:wrap; gap:16px;">
        <label><input type="checkbox" data-print-opt="showSeal" ${e.showSeal?"checked":""} /> 印影を表示</label>
        <label><input type="checkbox" data-print-opt="showRegistrationNo" ${e.showRegistrationNo?"checked":""} /> インボイス登録番号</label>
        <label><input type="checkbox" data-print-opt="showBankInfo" ${e.showBankInfo?"checked":""} /> 振込先</label>
        <label><input type="checkbox" data-print-opt="showJanCode" ${e.showJanCode?"checked":""} /> JANコード</label>
        <label><input type="checkbox" data-print-opt="showUnit" ${e.showUnit?"checked":""} /> 単位列</label>
        <label><input type="checkbox" data-print-opt="showRemarks" ${e.showRemarks?"checked":""} /> 備考</label>
      </div>
      ${t==="chain_store"?`
      <div style="margin-top:16px; padding:12px; background:var(--surface-alt); border-radius:8px; border:1px dashed var(--border-strong);">
        <h3 style="margin:0 0 8px; font-size:13px;">📐 BP1701 オーバーレイ印刷</h3>
        <p class="form-hint" style="margin:0 0 12px;">
          事前印刷済みの BP1701 伝票用紙を印刷機にセットし、<b>データ部分のみ</b>を所定座標に印字する方式です。
          プレビュー画像（実物BP1701）と重ねて位置を確認してください。
        </p>
        <div style="display:flex; flex-wrap:wrap; gap:16px; align-items:center;">
          <label><input type="checkbox" data-print-opt="showReferenceOverlay" ${e.showReferenceOverlay?"checked":""} /> 参考画像を背景に表示</label>
          <label style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px;">画像の濃さ</span>
            <input type="range" min="0" max="1" step="0.05" value="${e.overlayOpacity}" data-print-opt="overlayOpacity" style="width:140px;" />
            <span style="font-size:12px; min-width:32px;">${Math.round(e.overlayOpacity*100)}%</span>
          </label>
        </div>
        <h4 style="margin:12px 0 4px; font-size:12px; color:var(--text-secondary);">プリンタずれ調整（印刷結果を確認してから微調整）</h4>
        <div style="display:flex; flex-wrap:wrap; gap:16px;">
          <label style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px;">X (横, mm)</span>
            <input type="number" step="0.5" value="${e.calibrationOffsetX}" data-print-opt="calibrationOffsetX" style="width:80px;" />
          </label>
          <label style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px;">Y (縦, mm)</span>
            <input type="number" step="0.5" value="${e.calibrationOffsetY}" data-print-opt="calibrationOffsetY" style="width:80px;" />
          </label>
          <span class="form-hint" style="margin:0;">＋方向＝右/下、 −方向＝左/上</span>
        </div>
      </div>
      `:""}
      <div class="action-bar" style="margin-top:12px;">
        <button class="button secondary" data-action="print-save-settings">💾 この設定を保存</button>
        <button class="button secondary" data-action="print-open-company">🏢 会社情報を編集</button>
      </div>
    </section>

    <section class="panel print-preview-panel">
      <div class="panel-header no-print">
        <h2>プレビュー</h2>
        <p class="panel-caption">実際に印刷されるイメージ</p>
      </div>
      <div class="print-preview ${e.colorMode}">
        ${i}
      </div>
    </section>
  `}const Ts={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},Es={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function Rs(t){t.charCodeAt(0)===65279&&(t=t.slice(1));const e=[];let n=[],s="",o=!1;for(let l=0;l<t.length;l++){const c=t[l];o?c==='"'?t[l+1]==='"'?(s+='"',l++):o=!1:s+=c:c==='"'?o=!0:c===","?(n.push(s),s=""):c===`
`||c==="\r"?(c==="\r"&&t[l+1]===`
`&&l++,n.push(s),n.some(r=>r!=="")&&e.push(n),n=[],s=""):s+=c}if((s!==""||n.length>0)&&(n.push(s),n.some(l=>l!=="")&&e.push(n)),e.length===0)return{columns:[],rows:[]};const i=e[0].map(l=>l.trim()),d=[];for(let l=1;l<e.length;l++){const c={};i.forEach((r,u)=>{c[r]=(e[l][u]??"").trim()}),d.push(c)}return{columns:i,rows:d}}function Ms(t,e,n){const s=Ts[t],o=s.filter(l=>!e.includes(l)),i=n.map(l=>{const c=[];o.length>0&&c.push(`必須列欠損: ${o.join(",")}`);for(const r of s)e.includes(r)&&!l[r]&&c.push(`${r}が空`);return{...l,_valid:c.length===0,_error:c[0]}}),d=i.filter(l=>l._valid).length;return{entity:t,columns:e,rows:i,totalRows:n.length,validRows:d,invalidRows:i.length-d}}function qs(t){const n=Es[t],o={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[t];return"\uFEFF"+n.join(",")+`
`+o.join(",")+`
`}async function Os(t,e){const{supabaseInsert:n}=await T(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>de);return{supabaseInsert:l}},void 0);let s=0,o=0;const d={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[t];for(const l of e){if(!l._valid)continue;const{_valid:c,_error:r,...u}=l,p={...u};if(!p.id){const h=t==="customers"?"legacy_customer_code":t==="products"?"legacy_product_code":t==="suppliers"?"legacy_supplier_code":"legacy_staff_code";p.id=String(u[h]??`${t}-${Date.now()}-${s+o}`)}for(const h of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof p[h]=="string"&&p[h]!==""){const g=Number(p[h]);Number.isFinite(g)&&(p[h]=g)}try{await n(d,p)!==null?s++:o++}catch{o++}}return{inserted:s,failed:o}}function Is(t){const e={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},s=t.map(r=>{const u=r.capacity>0?Math.round(r.currentVolume/r.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${r.tankNo}</strong></td>
          <td class="numeric">${r.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${r.currentVolume>0?r.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${u}%"></div>
            </div>
            <span class="progress-label">${u}%</span>
          </td>
          <td>${r.productName||"―"}</td>
          <td class="mono">${r.jikomiNo||"―"}</td>
          <td>
            <span class="status-pill ${n[r.status]}">${e[r.status]}</span>
          </td>
          <td>${r.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${r.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),o=t.filter(r=>r.status==="in_use").length,i=t.filter(r=>r.status==="aging").length,d=t.filter(r=>r.status==="empty").length,l=t.reduce((r,u)=>r+u.capacity,0),c=t.reduce((r,u)=>r+u.currentVolume,0);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">蔵内管理</p>
        <h1>タンク管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">総容量</p>
        <p class="kpi-value">${l.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">使用率 ${l>0?Math.round(c/l*100):0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${o} 基</p>
        <p class="kpi-sub">熟成中 ${i} 基</p>
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
          <p class="panel-caption">${t.length} 基</p>
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
  `}function $t(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Fs(t,e,n){const s=t.rows.map((r,u)=>`
      <tr>
        <td class="mono">${r.taxCategory}</td>
        <td>${r.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${u}" data-tax-field="alcoholDegree" value="${r.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="productionVolume" value="${r.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="previousBalance" value="${r.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="exportDeduction" value="${r.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="sampleDeduction" value="${r.sampleDeduction}" />
        </td>
        <td class="numeric">${r.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${r.taxRate}</td>
        <td class="numeric"><strong>${$t(r.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),o=t.deductions.map((r,u)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="type">
            ${Object.keys(wt).map(p=>`<option value="${p}" ${p===r.type?"selected":""}>${wt[p]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="categoryCode">
            ${Te.map(p=>`<option value="${p.code}" ${p.code===r.categoryCode?"selected":""}>${p.code}:${p.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${u}" data-ded-field="volume" value="${r.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${u}" data-ded-field="reason" value="${r.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${u}" data-ded-field="documentNo" value="${r.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),i=Array.from({length:12},(r,u)=>u+1),d=t.rows.reduce((r,u)=>r+u.exportDeduction+u.sampleDeduction,0),l=t.rows.reduce((r,u)=>r+u.productionVolume,0),c=l>0?d/l*100:0;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">税務管理</p>
        <h1>酒税申告書 (eTax連携対応)</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status==="submitted"||t.status==="accepted"?"success":"warning"}">
          ${t.status==="submitted"?"申告済":t.status==="accepted"?"受理済":"下書き"}
        </span>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>対象年</span>
          <select id="tax-year">
            ${[2025,2026,2027].map(r=>`<option value="${r}" ${e===r?"selected":""}>${r}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${i.map(r=>`<option value="${r}" ${n===r?"selected":""}>${r}月</option>`).join("")}
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
        <p class="kpi-value">${$t(t.totalTax)}</p>
        <p class="kpi-sub">${t.targetYear}年${t.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${t.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${t.rows.length} 区分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">控除数量</p>
        <p class="kpi-value">${d.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${t.deductions.length} 件</p>
      </article>
      <article class="panel kpi-card ${c>3?"kpi-alert":""}">
        <p class="panel-title">控除率</p>
        <p class="kpi-value">${c.toFixed(1)}%</p>
        <p class="kpi-sub">${c>3?"⚠ 見本/試験3%上限注意":"上限内"}</p>
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
          <input type="text" data-tax-field="companyName" value="${t.companyName}" />
        </label>
        <label class="field">
          <span>製造者番号</span>
          <input type="text" data-tax-field="companyNo" value="${t.companyNo}" />
        </label>
        <label class="field">
          <span>代表者</span>
          <input type="text" data-tax-field="companyRepresentative" value="${t.companyRepresentative}" />
        </label>
        <label class="field">
          <span>所在地</span>
          <input type="text" data-tax-field="companyAddress" value="${t.companyAddress}" />
        </label>
        <label class="field">
          <span>所轄税務署</span>
          <input type="text" data-tax-field="taxOffice" value="${t.taxOffice}" />
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
              <th class="numeric">${t.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${$t(t.totalTax)}</th>
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
          <tbody>${o||'<tr><td colspan="6" class="empty-row">「＋控除追加」で控除を追加してください。</td></tr>'}</tbody>
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
        <button class="button primary" data-action="tax-submit" ${t.status==="submitted"?"disabled":""}>
          ${t.status==="submitted"?"申告済":"申告する"}
        </button>
      </div>
      <p class="form-hint" style="margin-top: 12px;">
        XMLはeTax受付システム形式（e-Taxソフトへ取り込み可能）、CSVは会計ソフト・税理士向け。印刷ボタンで紙提出用のPDF化もできます。
      </p>
    </section>
  `}function ne(t){const n=(t==null?"":t instanceof Date?t.toISOString():String(t)).replaceAll('"','""');return/[",\n\r]/.test(n)?`"${n}"`:n}function Js(t,e,n){if(e.length===0&&(!n||n.length===0))return;const s=n&&n.length>0?n:Object.keys(e[0]??{}).map(r=>({key:r,label:r})),i=`\uFEFF${[s.map(r=>ne(r.label)).join(","),...e.map(r=>s.map(u=>ne(r[u.key])).join(","))].join(`\r
`)}`,d=new Blob([i],{type:"text/csv;charset=utf-8;"}),l=URL.createObjectURL(d),c=document.createElement("a");c.href=l,c.download=t,document.body.append(c),c.click(),c.remove(),window.setTimeout(()=>URL.revokeObjectURL(l),0)}const Bs=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/invoice-entry","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print"],rt=[{name:"青葉商事",email:"aoba@example.jp",area:"関東",historySegment:"seasonal"},{name:"北斗酒販",email:"hokuto@example.jp",area:"北海道",historySegment:"premium"},{name:"中央フーズ",email:"chuo@example.jp",area:"関東",historySegment:"seasonal"},{name:"東海酒店",email:"tokai@example.jp",area:"中部",historySegment:"premium"},{name:"三和物産",email:"sanwa@example.jp",area:"関西",historySegment:"liqueur"},{name:"南星リカー",email:"nansei@example.jp",area:"九州",historySegment:"seasonal"},{name:"山川酒店",email:"yamakawa@example.jp",area:"関西",historySegment:"premium"},{name:"瑞穂商店",email:"mizuho@example.jp",area:"中部",historySegment:"seasonal"}],oe=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"}];function Be(t){const e=At[t];return e?{subject:e.subject,body:e.body}:{subject:"",body:""}}function Mt(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Vs(){const t=Be("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:t.subject,body:t.body,saveMessage:null}}const yt=new Date,Us=yt.toISOString().slice(0,7),zs=yt.getFullYear(),Hs=yt.getMonth()+1,Ys=yt.toISOString().slice(0,10),Ks="C0011",O=Vs();function Ve(t){const e="/sake-system/".endsWith("/")?"/sake-system/".slice(0,-1):"/sake-system/",n=t.startsWith(e)?t.slice(e.length)||"/":t;return Bs.includes(n)?n:"/"}function qt(t){switch(t){case"/cat/sales":case"/invoice":case"/ledger":case"/invoice-entry":case"/delivery":case"/billing":case"/report":return"sales";case"/cat/brewery":case"/jikomi":case"/tanks":case"/kentei":case"/materials":return"brewery";case"/cat/purchase":case"/purchase":case"/raw-material":return"purchase";case"/cat/more":case"/master":case"/analytics":case"/tax":case"/store":case"/setup":return"more";case"/email":return"email";default:return"dashboard"}}const ie=Ve(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,invoiceRecords:[],customerLedger:null,salesAnalytics:null,invoiceForm:Mt(),invoiceSaving:!1,invoiceSavedDocNo:null,pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Us,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:zs,taxMonth:Hs,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,printTemplate:"chain_store",printOptions:{...Ns,overlayImageUrl:`${"/sake-system/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{..._s},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:Ys,route:ie,currentCategory:qt(ie),sidebarOpen:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:Ks,masterTab:"customers",analyticsTab:"products",emailAudienceMode:O.mode,emailRegion:O.region,emailHistorySegment:O.historySegment,emailTemplateId:O.templateId,emailSubject:O.subject,emailBody:O.body,emailSaveMessage:O.saveMessage,emailSending:!1,globalSearchOpen:!1,globalQuery:"",authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function le(t){return t.slice(0,10)}function Qs(t){return{...t}}function ht(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function Ue(){a.invoiceForm=Mt(),a.invoiceSavedDocNo=null,a.invoiceErrors={},ht()}function ze(t){const e={};return t.invoiceDate.trim()||(e.invoiceDate="伝票日付は必須です。"),t.customerCode.trim()||(e.customerCode="得意先コードは必須です。"),t.lines.length===0&&(e.lines="明細を1行以上入力してください。"),t.lines.forEach((n,s)=>{n.productCode.trim()||(e[`lines.${s}.productCode`]="商品コードは必須です。"),n.productName.trim()||(e[`lines.${s}.productName`]="商品名は必須です。"),n.quantity<=0&&(e[`lines.${s}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(e[`lines.${s}.unitPrice`]="単価は0円以上で入力してください。")}),e}function Ws(t){const e=a.invoiceForm.lines[t];e&&a.invoiceForm.lines.splice(t+1,0,Qs(e))}function Gs(){const t=a.invoiceRecords[0],e=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:t?.customerCode??e?.code??"",customerName:t?.customerName??e?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((s,o)=>{const i=o===0?1:2,d=1200*(o+1);return{productCode:s.code,productName:s.name,quantity:i,unitPrice:d,unit:"本",amount:i*d}}),note:t?`過去伝票 ${t.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function Xs(t){const e=a.masterStats?.customers.find(n=>n.code.toLowerCase()===t.trim().toLowerCase());return e?(a.invoiceForm.customerCode=e.code,a.invoiceForm.customerName=e.name,!0):!1}function Zs(t){const e=a.masterStats?.customers.find(n=>n.name===t.trim());return e?(a.invoiceForm.customerCode=e.code,a.invoiceForm.customerName=e.name,!0):!1}function He(t){if(L(t),a.invoiceErrors=ze(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){m();return}a.invoiceSaving=!0,m(),Se(a.invoiceForm).then(e=>{a.invoiceSavedDocNo=e.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=Mt(),m()}).catch(()=>{a.invoiceSaving=!1,m()})}function Ye(t){const e=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...t.salesRecords].sort((s,o)=>new Date(o.date).getTime()-new Date(s.date).getTime()).filter(s=>{const o=new Date(s.date);return!(e&&o<e||n&&o>n)})}function Ke(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?rt:rt.filter(t=>t.area===a.emailRegion);case"history":return rt.filter(t=>t.historySegment===a.emailHistorySegment);default:return rt}}function tn(){const t=Ke();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:t.length,previewRecipients:t.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending}}function kt(t){const e=Ke(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:e.length,recipients:e.map(s=>s.email),status:t}}function Ot(){return a.user,!1}function Z(){a.globalSearchOpen=!1,a.globalQuery=""}function en(){const t=a.globalQuery.trim().toLowerCase();return t?{customers:a.masterStats?.customers.filter(e=>e.code.toLowerCase().includes(t)||e.name.toLowerCase().includes(t))??[],products:a.masterStats?.products.filter(e=>e.code.toLowerCase().includes(t)||e.name.toLowerCase().includes(t))??[],documents:a.invoiceRecords.filter(e=>e.documentNo.toLowerCase().includes(t)||e.customerName.toLowerCase().includes(t)||e.date.toLowerCase().includes(t)),pages:oe.filter(e=>e.path.toLowerCase().includes(t)||e.title.toLowerCase().includes(t))}:{customers:[],products:[],documents:[],pages:oe}}function an(){let t=[],e,n="export.csv";switch(a.route){case"/sales":t=(a.salesSummary?Ye(a.salesSummary):[]).map(s=>({documentNo:s.documentNo,date:s.date,customerCode:s.customerCode,customerName:s.customerName,amount:s.amount})),e=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],n="sales.csv";break;case"/payment":t=[...a.paymentStatus?.records??[]].sort((s,o)=>o.balanceAmount-s.balanceAmount).map(s=>({...s})),e=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],n="payment-status.csv";break;case"/invoice":t=a.invoiceRecords.map(s=>({...s})),e=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],n="invoices.csv";break;case"/purchase":t=a.purchaseList.map(s=>({...s})),e=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],n="purchase.csv";break;case"/jikomi":t=a.jikomiList.map(s=>({...s})),e=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],n="jikomi.csv";break;case"/tanks":t=a.tankList.map(s=>({...s})),e=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],n="tanks.csv";break;case"/kentei":t=a.kenteiList.map(s=>({...s})),e=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],n="kentei.csv";break;case"/materials":t=a.materialList.map(s=>({...s})),e=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],n="materials.csv";break;case"/master":a.masterTab==="customers"?(t=a.masterStats?.customers.map(s=>({...s}))??[],e=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],n="master-customers.csv"):(t=a.masterStats?.products.map(s=>({...s}))??[],e=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],n="master-products.csv");break;default:return}Js(n,t,e)}function ce(t){const e=`${"/sake-system/".replace(/\/$/,"")}${t==="/"?"/":t}`;history.pushState(null,"",e),a.route=t,a.currentCategory=qt(t),a.sidebarOpen=!1,Z(),It(t)}async function It(t){a.actionLoading=!0,m();try{switch(t){case"/delivery":a.deliveryNote||(a.deliveryNote=await jt(a.deliverySearchDocNo||"D240122"));break;case"/billing":a.billingSummary||(a.billingSummary=await Tt(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await we());break;case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await De());break;case"/tanks":a.tankList.length===0&&(a.tankList=await Ce());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await Ne());break;case"/materials":a.materialList.length===0&&(a.materialList=await _e());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([Ae(),Le()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([Pe(),je()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await Et(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([Rt(a.storeSalesDate),Re()]));break;default:break}}catch(e){console.warn("Route data load error",e)}finally{a.actionLoading=!1,m()}}function re(){if(Ot())return es(a.authError,a.authSubmitting);if(a.loading)return'<section class="panel"><p>データを読み込んでいます。</p></section>';if(a.error)return`
      <section class="panel error-card">
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${a.error}</p>
      </section>
    `;switch(a.route){case"/cat/sales":return et("sales");case"/cat/brewery":return et("brewery");case"/cat/purchase":return et("purchase");case"/cat/more":return et("more");case"/invoice-entry":return Ua(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/email":return Fa(tn());case"/delivery":return a.deliveryNote?Oa(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/billing":return a.billingSummary?_a(a.billingSummary,a.billingYearMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/report":return a.salesReport?$s(a.salesReport):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/jikomi":return a.jikomiView==="calendar"?`${te(a.jikomiList,a.jikomiView)}${Xa(a.jikomiList)}`:te(a.jikomiList,a.jikomiView);case"/tanks":return Is(a.tankList);case"/kentei":return Za(a.kenteiList);case"/materials":return os(a.materialList);case"/purchase":return ds(a.purchaseList,a.payableList);case"/raw-material":return us(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?Fs(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/store":return xs(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?hs(a.pipelineMeta,tt,Dt):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/import":return Cs(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return js(a.printTemplate,a.printOptions,a.printCompany,a.printData)}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.customerLedger||!a.salesAnalytics)return"";switch(a.route){case"/sales":return ws(Ye(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return cs([...a.paymentStatus.records].sort((t,e)=>e.balanceAmount-t.balanceAmount));case"/master":return ns(a.masterStats,a.masterTab);case"/invoice":return Ya(a.invoiceRecords,a.invoiceFilter);case"/ledger":return Ta(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return fs(a.salesAnalytics,a.analyticsTab);default:return Ma(a.salesSummary,a.pipelineMeta,a.salesAnalytics)}}function sn(){if(Ot())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${re()}</div>
        </main>
      </div>
    `;const t={dashboard:[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"}]}],sales:[{label:"販売管理",items:[{path:"/cat/sales",label:"販売管理トップ",kicker:"Category"},{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/report",label:"集計帳票",kicker:"Report"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"}]}],brewery:[{label:"蔵内管理",items:[{path:"/cat/brewery",label:"蔵内管理トップ",kicker:"Category"},{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"}]}],purchase:[{label:"仕入管理",items:[{path:"/cat/purchase",label:"仕入管理トップ",kicker:"Category"},{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]}],more:[{label:"その他",items:[{path:"/cat/more",label:"その他トップ",kicker:"Category"},{path:"/tax",label:"酒税申告",kicker:"Tax"},{path:"/store",label:"店舗・直売所",kicker:"Store"},{path:"/analytics",label:"売上分析",kicker:"Analytics"},{path:"/master",label:"マスタ",kicker:"Master"},{path:"/email",label:"メール配信",kicker:"Mail"},{path:"/setup",label:"連動設定",kicker:"Setup"}]}],email:[{label:"メール配信",items:[{path:"/email",label:"季節商品案内",kicker:"Mail"}]}]},e=[{category:"dashboard",path:"/",label:"ダッシュボード"},{category:"sales",path:"/cat/sales",label:"販売管理"},{category:"brewery",path:"/cat/brewery",label:"蔵内管理"},{category:"purchase",path:"/cat/purchase",label:"仕入管理"},{category:"more",path:"/cat/more",label:"その他"},{category:"email",path:"/email",label:"メール配信"}],n=t[a.currentCategory].map(l=>`
        <div class="nav-group">
          <p class="nav-group-label">${l.label}</p>
          ${l.items.map(c=>`
                <a
                  href="${"/sake-system/".replace(/\/$/,"")}${c.path==="/"?"/":c.path}"
                  class="nav-link ${a.route===c.path?"active":""}"
                  data-link="${c.path}"
                >
                  <div>
                    <div class="nav-kicker">${c.kicker}</div>
                    <div class="nav-label">${c.label}</div>
                  </div>
                </a>
              `).join("")}
        </div>
      `).join(""),s=e.map(l=>`
        <a
          href="${"/sake-system/".replace(/\/$/,"")}${l.path==="/"?"/":l.path}"
          class="category-link ${a.currentCategory===l.category?"active":""}"
          data-link="${l.path}"
        >
          ${l.label}
        </a>
      `).join(""),o=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?Ba(a.masterStats.customers,a.pickerQuery):rs(a.masterStats.products,a.pickerQuery):"",i=a.globalSearchOpen?Ja(a.globalQuery,en()):"",d=a.user?`
        <div class="user-badge">
          <span>${a.user.email}</span>
          <button class="button secondary" type="button" data-action="auth-logout">ログアウト</button>
        </div>
      `:a.authSkipped?'<div class="user-badge demo">デモモード</div>':"";return`
    <div class="shell">
      <button
        class="menu-toggle"
        type="button"
        aria-label="メニューを開く"
        data-action="${a.sidebarOpen?"sidebar-close":"sidebar-open"}"
      >
        ☰
      </button>
      <button
        class="sidebar-backdrop ${a.sidebarOpen?"open":""}"
        type="button"
        aria-label="メニューを閉じる"
        data-action="sidebar-close"
      ></button>
      <aside class="sidebar ${a.sidebarOpen?"open":""}">
        <div class="brand">
          <span class="brand-mark">syusen-cloud</span>
          <h1>業務Web UI</h1>
          <p>酒仙i 次世代版</p>
        </div>
        <nav class="nav" aria-label="主要ナビゲーション">
          <div class="category-nav">${s}</div>
          <div class="subnav">${n}</div>
        </nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <button class="button secondary" type="button" data-action="global-search-open">検索 (Ctrl+K)</button>
          ${d}
        </header>
        <div class="view ${a.actionLoading?"is-busy":""}">${re()}</div>
      </main>
      ${o}
      ${i}
    </div>
  `}async function nn(t){a.actionLoading=!0,m();try{a.invoiceRecords=await mt(t)}finally{a.actionLoading=!1,m()}}async function on(t){a.actionLoading=!0,m();try{a.customerLedger=await Pt(t)}finally{a.actionLoading=!1,m()}}function L(t){a.invoiceForm={invoiceType:t.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:t.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:t.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:t.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:t.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((e,n)=>{const s=parseFloat(t.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,o=parseFloat(t.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...e,productCode:t.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??e.productCode,productName:t.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??e.productName,unit:t.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??e.unit,quantity:s,unitPrice:o,amount:s*o}}),note:t.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function I(t){const e=t.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=e,a.emailRegion=t.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=t.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=t.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=t.querySelector("#email-body")?.value??a.emailBody}function ln(t){t.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,m()}),t.querySelectorAll("[data-action='global-search-close']").forEach(e=>{e.addEventListener("click",n=>{e.classList.contains("global-search")&&n.target instanceof HTMLElement&&!n.target.classList.contains("global-search")||(Z(),m())})}),t.querySelector("#global-search-input")?.addEventListener("input",e=>{a.globalQuery=e.target.value,m()}),t.querySelectorAll("[data-action='global-nav']").forEach(e=>{e.addEventListener("click",()=>{const n=e.dataset.path;n&&(Z(),ce(n))})}),t.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{an()}),t.querySelectorAll("[data-jikomi-tab]").forEach(e=>{e.addEventListener("click",()=>{a.jikomiView=e.dataset.jikomiTab,m()})}),t.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const e=t.querySelector("#auth-email")?.value.trim()??"",n=t.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,m(),Ze(e,n).then(s=>{a.user=s,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null,m()}).catch(async s=>{try{const o=await ta(e,n);a.user=o,a.authSkipped=!1,a.authError=null}catch{a.authError=s instanceof Error?s.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,m()}})}),t.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,m()}),t.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{ea().finally(()=>{location.reload()})}),t.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,m()}),t.querySelectorAll("[data-action='sidebar-close']").forEach(e=>{e.addEventListener("click",()=>{a.sidebarOpen=!1,m()})}),t.querySelectorAll("[data-link]").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),ce(e.dataset.link)})}),t.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const e=t.querySelector("#sales-start")?.value??"",n=t.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:e,endDate:n},m()}),t.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const e={documentNo:t.querySelector("#invoice-document-no")?.value??"",startDate:t.querySelector("#invoice-start")?.value??"",endDate:t.querySelector("#invoice-end")?.value??"",customerCode:t.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=e,nn(e)}),t.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const e=t.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=e.trim().toUpperCase(),on(a.ledgerCustomerCode)}),t.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{a.masterTab=e.dataset.tab,m()})}),t.querySelectorAll("[data-analytics-tab]").forEach(e=>{e.addEventListener("click",()=>{a.analyticsTab=e.dataset.analyticsTab,m()})}),t.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{L(t),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},m()}),t.querySelectorAll("[data-action='remove-line']").forEach(e=>{e.addEventListener("click",()=>{L(t);const n=parseInt(e.dataset.line??"0",10);a.invoiceForm.lines.splice(n,1),a.invoiceErrors=ze(a.invoiceForm),m()})}),t.querySelectorAll("[data-action='duplicate-line']").forEach(e=>{e.addEventListener("click",()=>{L(t),Ws(parseInt(e.dataset.line??"0",10)),a.invoiceErrors={},m()})}),t.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Gs(),m()}),t.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{L(t),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,m()}),t.querySelectorAll("[data-action='open-product-picker']").forEach(e=>{e.addEventListener("click",()=>{L(t);const n=parseInt(e.dataset.line??"0",10),s=a.invoiceForm.lines[n];a.pickerMode="product",a.pickerTargetLine=n,a.pickerQuery=s?s.productCode||s.productName:"",m()})}),t.querySelectorAll("[data-action='modal-close']").forEach(e=>{e.addEventListener("click",n=>{e.classList.contains("modal-backdrop")&&n.target instanceof HTMLElement&&!n.target.classList.contains("modal-backdrop")||(ht(),m())})}),t.querySelectorAll("[data-action='picker-select']").forEach(e=>{const n=()=>{const s=e.dataset.code??"",o=e.dataset.name??"";if(a.pickerMode==="customer")a.invoiceForm.customerCode=s,a.invoiceForm.customerName=o,delete a.invoiceErrors.customerCode;else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const i=a.invoiceForm.lines[a.pickerTargetLine];i&&(i.productCode=s,i.productName=o,i.amount=i.quantity*i.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`])}ht(),m()};e.addEventListener("click",n),e.addEventListener("keydown",s=>{s.key==="Enter"&&n()})}),t.querySelector("#modal-search")?.addEventListener("input",e=>{a.pickerQuery=e.target.value,m()}),t.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Ue(),m()}),t.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{He(t)}),t.querySelector("#inv-customer-code")?.addEventListener("blur",()=>{L(t),Xs(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,m())}),t.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{L(t),Zs(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,m())}),t.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(e=>{e.addEventListener("input",()=>{L(t),a.invoiceSavedDocNo=null})}),t.querySelector("#inv-type")?.addEventListener("change",()=>{L(t),a.invoiceSavedDocNo=null}),t.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const e=t.querySelector("#delivery-docno")?.value??"";a.deliverySearchDocNo=e.trim(),a.deliveryNote=null,a.actionLoading=!0,m(),jt(a.deliverySearchDocNo||"D240122").then(n=>{a.deliveryNote=n,a.actionLoading=!1,m()})}),t.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const e=t.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=e,a.billingSummary=null,a.actionLoading=!0,m(),Tt(e).then(n=>{a.billingSummary=n,a.actionLoading=!1,m()})}),t.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const e=parseInt(t.querySelector("#tax-year")?.value??String(a.taxYear),10),n=parseInt(t.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=e,a.taxMonth=n,a.taxDeclaration=null,a.actionLoading=!0,m(),Et(e,n).then(s=>{a.taxDeclaration=s,a.actionLoading=!1,m()})}),t.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:e}=await T(async()=>{const{generateTaxXML:d}=await Promise.resolve().then(()=>J);return{generateTaxXML:d}},void 0),n=e(a.taxDeclaration),s=new Blob([n],{type:"application/xml;charset=utf-8"}),o=URL.createObjectURL(s),i=document.createElement("a");i.href=o,i.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,i.click(),URL.revokeObjectURL(o)}),t.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:e}=await T(async()=>{const{generateTaxCSV:d}=await Promise.resolve().then(()=>J);return{generateTaxCSV:d}},void 0),n=e(a.taxDeclaration),s=new Blob([n],{type:"text/csv;charset=utf-8"}),o=URL.createObjectURL(s),i=document.createElement("a");i.href=o,i.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,i.click(),URL.revokeObjectURL(o)}),t.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:e}=await T(async()=>{const{saveTaxDeclaration:n}=await Promise.resolve().then(()=>J);return{saveTaxDeclaration:n}},void 0);try{await e(a.taxDeclaration),alert("下書き保存しました（Supabase tax_declarationsに保存）")}catch(n){alert("保存に失敗: "+(n instanceof Error?n.message:String(n)))}}),t.querySelectorAll("[data-tax-row][data-tax-field]").forEach(e=>{e.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const n=Number(e.dataset.taxRow),s=e.dataset.taxField,o=e.type==="number"?Number(e.value)||0:e.value,i=[...a.taxDeclaration.rows];i[n]={...i[n],[s]:o};const{recalculateTaxDeclaration:d}=await T(async()=>{const{recalculateTaxDeclaration:l}=await Promise.resolve().then(()=>J);return{recalculateTaxDeclaration:l}},void 0);a.taxDeclaration=d({...a.taxDeclaration,rows:i}),m()})}),t.querySelectorAll("[data-ded-row][data-ded-field]").forEach(e=>{e.addEventListener("change",()=>{if(!a.taxDeclaration)return;const n=Number(e.dataset.dedRow),s=e.dataset.dedField,o=e.type==="number"?Number(e.value)||0:e.value,i=[...a.taxDeclaration.deductions];i[n]={...i[n],[s]:o},a.taxDeclaration={...a.taxDeclaration,deductions:i},m()})}),t.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(e=>{e.addEventListener("change",()=>{if(!a.taxDeclaration)return;const n=e.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[n]:e.value}})}),t.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:e,TAX_RATE_CATEGORIES:n}=await T(async()=>{const{recalculateTaxDeclaration:i,TAX_RATE_CATEGORIES:d}=await Promise.resolve().then(()=>J);return{recalculateTaxDeclaration:i,TAX_RATE_CATEGORIES:d}},void 0),s=n[0],o={taxCategory:s.code,taxCategoryName:s.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:s.taxRatePerLiter,taxAmount:0};a.taxDeclaration=e({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,o]}),m()}),t.querySelectorAll("[data-action='tax-remove-category']").forEach(e=>{e.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const n=Number(e.dataset.taxRow),{recalculateTaxDeclaration:s}=await T(async()=>{const{recalculateTaxDeclaration:i}=await Promise.resolve().then(()=>J);return{recalculateTaxDeclaration:i}},void 0),o=a.taxDeclaration.rows.filter((i,d)=>d!==n);a.taxDeclaration=s({...a.taxDeclaration,rows:o}),m()})}),t.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const e={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,e]},m()}),t.querySelectorAll("[data-action='tax-remove-deduction']").forEach(e=>{e.addEventListener("click",()=>{if(!a.taxDeclaration)return;const n=Number(e.dataset.dedRow),s=a.taxDeclaration.deductions.filter((o,i)=>i!==n);a.taxDeclaration={...a.taxDeclaration,deductions:s},m()})}),t.querySelectorAll("[data-store-tab]").forEach(e=>{e.addEventListener("click",()=>{a.storeTab=e.dataset.storeTab,m()})}),t.querySelectorAll("[data-import-entity]").forEach(e=>{e.addEventListener("click",()=>{a.importEntity=e.dataset.importEntity,a.importPreview=null,a.importResult=null,m()})}),t.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const e=qs(a.importEntity),n=new Blob([e],{type:"text/csv;charset=utf-8"}),s=URL.createObjectURL(n),o=document.createElement("a");o.href=s,o.download=`template_${a.importEntity}.csv`,o.click(),URL.revokeObjectURL(s)}),t.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const n=t.querySelector("#import-file")?.files?.[0];if(!n){alert("CSVファイルを選択してください");return}const s=new FileReader;s.onload=()=>{const o=String(s.result??""),{columns:i,rows:d}=Rs(o);a.importPreview=Ms(a.importEntity,i,d),a.importResult=null,m()},s.readAsText(n,"utf-8")}),t.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,m()}),t.querySelectorAll("[data-print-template]").forEach(e=>{e.addEventListener("click",()=>{a.printTemplate=e.dataset.printTemplate,m()})}),t.querySelectorAll("[data-print-field]").forEach(e=>{e.addEventListener("change",()=>{const n=e.dataset.printField;let s=e.value;(n==="taxRate"||n==="previousBalance"||n==="paymentAmount")&&(s=Number(e.value)||0),a.printData={...a.printData,[n]:s},m()})}),t.querySelectorAll("[data-print-opt]").forEach(e=>{const n=()=>{const s=e.dataset.printOpt;let o;e.type==="checkbox"?o=e.checked:s==="copies"?o=Number(e.value)||1:s==="overlayOpacity"||s==="calibrationOffsetX"||s==="calibrationOffsetY"?o=Number(e.value)||0:o=e.value,a.printOptions={...a.printOptions,[s]:o},m()};e.addEventListener("change",n),e.type==="range"&&e.addEventListener("input",n)}),t.querySelectorAll("[data-print-line][data-print-lfield]").forEach(e=>{e.addEventListener("change",()=>{const n=Number(e.dataset.printLine),s=e.dataset.printLfield,o=[...a.printData.lines];let i=e.value;(s==="quantity"||s==="unitPrice")&&(i=Number(e.value)||0),o[n]={...o[n],[s]:i},o[n].amount=(Number(o[n].quantity)||0)*(Number(o[n].unitPrice)||0),a.printData={...a.printData,lines:o},m()})}),t.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},m()}),t.querySelectorAll("[data-action='print-remove-line']").forEach(e=>{e.addEventListener("click",()=>{const n=Number(e.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((s,o)=>o!==n)},m()})}),t.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),alert("印刷設定を保存しました（次回以降も使えます）")}catch(e){alert("保存失敗: "+(e instanceof Error?e.message:String(e)))}}),t.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const e=a.printCompany,n=prompt("会社名",e.name);if(n===null)return;const s=prompt("郵便番号",e.postalCode)??e.postalCode,o=prompt("住所",e.address1)??e.address1,i=prompt("TEL",e.tel)??e.tel,d=prompt("FAX",e.fax)??e.fax,l=prompt("適格請求書登録番号 (T+13桁)",e.registrationNo)??e.registrationNo,c=prompt("取引銀行名",e.bankName)??e.bankName,r=prompt("支店名",e.bankBranch)??e.bankBranch,u=prompt("口座番号",e.bankAccountNo)??e.bankAccountNo,p=prompt("口座名義",e.bankAccountHolder)??e.bankAccountHolder;a.printCompany={...e,name:n,postalCode:s,address1:o,tel:i,fax:d,registrationNo:l,bankName:c,bankBranch:r,bankAccountNo:u,bankAccountHolder:p},m()}),t.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,m();try{const e=a.importPreview.rows.filter(s=>s._valid),n=await Os(a.importEntity,e);a.importResult=`取り込み完了: ${n.inserted}件成功 / ${n.failed}件失敗`,a.importPreview=null}catch(e){a.importResult=`エラー: ${e instanceof Error?e.message:String(e)}`}finally{a.importing=!1,m()}}}),t.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const e=t.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=e,a.storeSales=[],a.actionLoading=!0,m(),Rt(e).then(n=>{a.storeSales=n,a.actionLoading=!1,m()})}),t.querySelectorAll("[data-action='copy-config']").forEach(e=>{e.addEventListener("click",async()=>{const n=e.dataset.configValue??"";if(n)try{await navigator.clipboard.writeText(n),e.textContent="コピー済み",window.setTimeout(()=>{e.textContent="コピー"},1600)}catch(s){console.warn("Clipboard copy failed",s)}})}),t.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const n=JSON.stringify({supabase_url:tt,supabase_anon_key:"（Supabaseダッシュボードから取得して貼り付け）",z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),s=new Blob([n],{type:"application/json;charset=utf-8"}),o=URL.createObjectURL(s),i=document.createElement("a");i.href=o,i.download="relay_config.json",i.click(),URL.revokeObjectURL(o)}),t.querySelectorAll("[data-action='copy-code']").forEach(e=>{e.addEventListener("click",async()=>{const n=e.dataset.code??"";if(n)try{await navigator.clipboard.writeText(decodeURIComponent(n)),e.textContent="コピー済み",window.setTimeout(()=>{e.textContent="コピー"},1600)}catch(s){console.warn("Clipboard code copy failed",s)}})}),t.querySelectorAll("input[name='email-audience-mode']").forEach(e=>{e.addEventListener("change",()=>{I(t),a.emailSaveMessage=null,m()})}),t.querySelectorAll("#email-region, #email-history-segment").forEach(e=>{e.addEventListener("change",()=>{I(t),a.emailSaveMessage=null,m()})}),t.querySelector("#email-subject")?.addEventListener("input",()=>{I(t),a.emailSaveMessage=null}),t.querySelector("#email-body")?.addEventListener("input",()=>{I(t),a.emailSaveMessage=null}),t.querySelectorAll("[data-action='template-select']").forEach(e=>{e.addEventListener("click",()=>{a.emailTemplateId=e.dataset.templateId??"custom";const n=Be(a.emailTemplateId);a.emailSubject=n.subject,a.emailBody=n.body,a.emailSaveMessage=null,m()})}),t.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{I(t);const e=`

商品詳細はこちら: https://example.jp/products/seasonal`;a.emailBody.includes("https://example.jp/products/seasonal")||(a.emailBody=`${a.emailBody.trimEnd()}${e}`),a.emailSaveMessage=null,m()}),t.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{I(t),a.actionLoading=!0,m(),dt(kt("draft")).then(e=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,m()})}),t.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{I(t),a.actionLoading=!0,a.emailSending=!0,m();const e=kt("sent");Me().then(async n=>{await dt({...e,recipientCount:n.sent}),a.emailSaveMessage=`${n.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,m(),window.alert(`${n.sent}件送信完了`)}).catch(async()=>{await dt(kt("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,m(),window.alert("APIキー未設定のため下書き保存しました")})})}function m(){const t=document.querySelector("#app");t&&(t.innerHTML=sn(),ln(t),a.pickerMode&&t.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&t.querySelector("#global-search-input")?.focus(),Ot()&&t.querySelector("#auth-email")?.focus())}async function cn(){a.loading=!0,m();try{const[t,e,n,s,o,i,d]=await Promise.all([be(),ge(),fe(),$e(),mt(a.invoiceFilter),Pt(a.ledgerCustomerCode),ke()]);if(a.salesSummary=t,a.paymentStatus=e,a.masterStats=n,a.pipelineMeta=s,a.invoiceRecords=o,a.customerLedger=i,a.salesAnalytics=d,!a.salesFilter.startDate||!a.salesFilter.endDate){const c=[...t.salesRecords].sort((p,h)=>new Date(h.date).getTime()-new Date(p.date).getTime())[0]?.date??new Date().toISOString(),r=new Date(c),u=new Date(r);u.setDate(r.getDate()-30),a.salesFilter={startDate:le(u.toISOString()),endDate:le(r.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await mt(a.invoiceFilter)),a.error=null}catch(t){a.error=t instanceof Error?t.message:"データの取得に失敗しました。"}finally{a.loading=!1,m(),It(a.route)}}window.addEventListener("popstate",()=>{a.route=Ve(location.pathname),a.currentCategory=qt(a.route),a.sidebarOpen=!1,Z(),It(a.route)});window.addEventListener("keydown",t=>{if((t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="k"){t.preventDefault(),a.globalSearchOpen=!0,m();return}if(t.key==="Escape"){if(a.globalSearchOpen){Z(),m();return}if(a.pickerMode){ht(),m();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(Ue(),m());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="s"){t.preventDefault();const e=document.querySelector("#app");e&&He(e)}});a.user=_t()?aa():null;try{const t=localStorage.getItem("sake_print_options");t&&(a.printOptions={...a.printOptions,...JSON.parse(t)});const e=localStorage.getItem("sake_print_company");e&&(a.printCompany={...a.printCompany,...JSON.parse(e)})}catch{}cn();
