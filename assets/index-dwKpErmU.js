(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=i(s);fetch(s.href,o)}})();const Gt="modulepreload",Zt=function(e){return"/sake-system/"+e},Ye={},L=function(t,i,n){let s=Promise.resolve();if(i&&i.length>0){let d=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};var r=d;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");s=d(i.map(u=>{if(u=Zt(u),u in Ye)return;Ye[u]=!0;const p=u.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${y}`))return;const h=document.createElement("link");if(h.rel=p?"stylesheet":Gt,p||(h.as="script"),h.crossOrigin="",h.href=u,c&&h.setAttribute("nonce",c),document.head.appendChild(h),p)return new Promise((_,q)=>{h.addEventListener("load",_),h.addEventListener("error",()=>q(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return s.then(l=>{for(const c of l||[])c.status==="rejected"&&o(c.reason);return t().catch(o)})},te="https://loarwnuyvfxiscjjsmiz.supabase.co",Ne="";async function Ae(e,t){return null}async function x(e,t={}){return[]}const Le=Object.freeze(Object.defineProperty({__proto__:null,SUPABASE_ANON_KEY:Ne,SUPABASE_URL:te,supabaseInsert:Ae,supabaseQuery:x},Symbol.toStringTag,{value:"Module"})),Pe="sake_auth";function mt(e){localStorage.setItem(Pe,JSON.stringify(e))}function yt(){return{apikey:Ne,"Content-Type":"application/json"}}function ea(e){try{const[,t]=e.split(".");if(!t)return null;const i=t.replaceAll("-","+").replaceAll("_","/"),n=i.padEnd(Math.ceil(i.length/4)*4,"=");return JSON.parse(atob(n))}catch{return null}}async function ht(e,t){const i=await fetch(`${te}/auth/v1/${e}`,{method:"POST",headers:yt(),body:JSON.stringify(t)}),n=await i.json().catch(()=>({}));if(!i.ok)throw new Error(n.error_description??n.msg??`HTTP ${i.status}`);return n}async function ta(e,t){const i=await ht("token?grant_type=password",{email:e,password:t});return mt({access_token:i.access_token,refresh_token:i.refresh_token}),{email:i.user?.email??e}}async function aa(e,t){const i=await ht("signup",{email:e,password:t});return i.access_token&&i.refresh_token&&mt({access_token:i.access_token,refresh_token:i.refresh_token}),{email:i.user?.email??e}}async function sa(){const e=je();if(localStorage.removeItem(Pe),!!e?.access_token)try{await fetch(`${te}/auth/v1/logout`,{method:"POST",headers:{...yt(),Authorization:`Bearer ${e.access_token}`}})}catch(t){console.warn("Supabase sign out failed",t)}}function je(){const e=localStorage.getItem(Pe);if(!e)return null;try{const t=JSON.parse(e);return!t.access_token||!t.refresh_token?null:{access_token:t.access_token,refresh_token:t.refresh_token}}catch{return null}}function na(){const e=je();if(!e)return null;const t=ea(e.access_token),i=typeof t?.email=="string"?t.email:null;return i?{email:i}:null}const Ee={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},pe={generatedAt:"2026-04-15T09:15:00+09:00",kpis:{todaySales:1248e3,todayDelta:8.2,monthSales:18245e3,monthDelta:5.6,unpaidCount:7,unpaidAmount:264e4},dailySales:Array.from({length:30},(e,t)=>{const i=new Date("2026-03-17T00:00:00+09:00");return i.setDate(i.getDate()+t),{date:i.toISOString(),amount:42e4+t*73123%62e4}}),salesRecords:Array.from({length:20},(e,t)=>{const i=new Date("2026-04-15T00:00:00+09:00");return i.setDate(i.getDate()-t),{id:`sale-${t+1}`,documentNo:`D${String(240100+t).padStart(6,"0")}`,date:i.toISOString(),customerCode:`C${String(t+11).padStart(4,"0")}`,customerName:["青葉商事","北斗酒販","中央フーズ","東海酒店"][t%4],amount:68e3+t%6*24500}})},oa={generatedAt:"2026-04-15T09:15:00+09:00",records:[{id:"pay-1",customerCode:"C0011",customerName:"青葉商事",billedAmount:54e4,paymentAmount:0,balanceAmount:54e4,lastPaymentDate:null,status:"unpaid"},{id:"pay-2",customerCode:"C0012",customerName:"北斗酒販",billedAmount:72e4,paymentAmount:3e5,balanceAmount:42e4,lastPaymentDate:"2026-04-11T14:30:00+09:00",status:"partial"},{id:"pay-3",customerCode:"C0013",customerName:"中央フーズ",billedAmount:68e4,paymentAmount:68e4,balanceAmount:0,lastPaymentDate:"2026-04-14T10:00:00+09:00",status:"paid"},{id:"pay-4",customerCode:"C0014",customerName:"東海酒店",billedAmount:41e4,paymentAmount:18e4,balanceAmount:23e4,lastPaymentDate:"2026-04-10T09:10:00+09:00",status:"partial"}]},I={generatedAt:"2026-04-15T09:15:00+09:00",summary:{customerCount:164,activeCustomerCount:152,productCount:486,activeProductCount:461},customers:Array.from({length:12},(e,t)=>({id:`customer-${t+1}`,code:`C${String(t+1).padStart(4,"0")}`,name:["青葉商事","北斗酒販","中央フーズ","東海酒店","三和物産","南星リカー"][t%6],closingDay:[15,20,25,31][t%4],paymentDay:[5,10,15,20][t%4],isActive:t%5!==0})),products:Array.from({length:12},(e,t)=>({id:`product-${t+1}`,code:`P${String(t+1).padStart(5,"0")}`,janCode:`4901234567${String(t).padStart(3,"0")}`,name:["純米吟醸 720ml","本醸造 1.8L","特別純米 300ml","梅酒 500ml"][t%4],category:["清酒","焼酎","リキュール"][t%3],isActive:t%6!==0}))},ia={generatedAt:"2026-04-15T09:15:00+09:00",lastSyncAt:"2026-04-15T09:12:21+09:00",status:"success",jobName:"daily-sync",message:"同期完了。売上・入金・マスタを最新化しました。"},vt=pe.salesRecords.map((e,t)=>({...e,itemCount:t%4+1})),la={C0011:{customerCode:"C0011",customerName:"青葉商事",balanceAmount:54e4,salesTotal:114e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-1",date:"2026-04-15T00:00:00+09:00",documentNo:"D240100",amount:42e4},{id:"ledger-sale-2",date:"2026-04-08T00:00:00+09:00",documentNo:"D240087",amount:39e4},{id:"ledger-sale-3",date:"2026-03-28T00:00:00+09:00",documentNo:"D240059",amount:33e4}],paymentHistory:[{id:"ledger-payment-1",date:"2026-04-10T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-2",date:"2026-03-31T00:00:00+09:00",amount:3e5,method:"振込"}]},C0012:{customerCode:"C0012",customerName:"北斗酒販",balanceAmount:42e4,salesTotal:102e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-4",date:"2026-04-14T00:00:00+09:00",documentNo:"D240101",amount:36e4},{id:"ledger-sale-5",date:"2026-04-05T00:00:00+09:00",documentNo:"D240082",amount:32e4},{id:"ledger-sale-6",date:"2026-03-25T00:00:00+09:00",documentNo:"D240054",amount:34e4}],paymentHistory:[{id:"ledger-payment-3",date:"2026-04-11T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-4",date:"2026-03-30T00:00:00+09:00",amount:3e5,method:"現金"}]}},me={productTotals:[{code:"P00001",name:"純米吟醸 720ml",amount:584e4,quantity:820,documents:148},{code:"P00002",name:"本醸造 1.8L",amount:498e4,quantity:610,documents:131},{code:"P00003",name:"特別純米 300ml",amount:356e4,quantity:1240,documents:112},{code:"P00004",name:"梅酒 500ml",amount:287e4,quantity:540,documents:89}],customerTotals:[{code:"C0011",name:"青葉商事",amount:462e4,quantity:320,documents:54},{code:"C0012",name:"北斗酒販",amount:438e4,quantity:294,documents:49},{code:"C0013",name:"中央フーズ",amount:391e4,quantity:276,documents:45},{code:"C0014",name:"東海酒店",amount:324e4,quantity:221,documents:37}]};function w(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){const t=Number(e);return Number.isFinite(t)?t:0}return 0}function ca(e){switch((e??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function ra(e){return typeof e=="boolean"?e:typeof e=="number"?e!==0:typeof e=="string"?["true","1","active","enabled","yes","y"].includes(e.toLowerCase()):!1}function $(e,t,i=""){for(const n of t){const s=e[n];if(typeof s=="string"&&s.length>0)return s}return i}function Ke(e,t,i=0){for(const n of t)if(n in e)return w(e[n]);return i}function ye(e,t,i=!0){for(const n of t)if(n in e)return ra(e[n]);return i}function bt(e,t,i){for(const n of t){const s=e[n];if(typeof s!="string"||s.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(s))return new Date(`${s}T00:00:00Z`).toISOString();const o=new Date(s);if(!Number.isNaN(o.getTime()))return o.toISOString()}return i}function ft(e){return e.slice(0,7)}function Te(e,t){return{id:String(e.id??`invoice-${t+1}`),documentNo:e.document_no??e.legacy_document_no??`D${String(240100+t).padStart(6,"0")}`,date:bt(e,["sales_date","document_date"],new Date().toISOString()),customerCode:e.customer_code??e.legacy_customer_code??`C${String(t+1).padStart(4,"0")}`,customerName:e.customer_name??e.customer_code??e.legacy_customer_code??"不明",itemCount:0,amount:w(e.total_amount??e.billed_amount)}}function Qe(e,t){const i=t.startDate?new Date(`${t.startDate}T00:00:00`):null,n=t.endDate?new Date(`${t.endDate}T23:59:59`):null,s=t.documentNo.trim().toLowerCase(),o=t.customerCode.trim().toLowerCase();return e.filter(r=>{const l=new Date(r.date);return!(i&&l<i||n&&l>n||s&&!r.documentNo.toLowerCase().includes(s)||o&&!r.customerCode.toLowerCase().includes(o))}).sort((r,l)=>new Date(l.date).getTime()-new Date(r.date).getTime())}function We(e){const t=e.trim().toUpperCase(),i=la[t];if(i)return i;const n=pe.salesRecords.find(s=>s.customerCode.toUpperCase()===t);return{customerCode:t||"未指定",customerName:n?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}function da(){const e=new Map,t=new Map,i=new Map;return vt.forEach((n,s)=>{const o=ft(n.date);e.set(o,(e.get(o)??0)+n.amount);const r=t.get(n.customerCode)??{code:n.customerCode,name:n.customerName,amount:0,quantity:0,documents:0};r.amount+=n.amount,r.quantity+=n.itemCount,r.documents+=1,t.set(n.customerCode,r);const l=`P${String(s%4+1).padStart(5,"0")}`,c=me.productTotals[s%me.productTotals.length],d=i.get(l)??{code:l,name:c?.name??`商品${s+1}`,amount:0,quantity:0,documents:0};d.amount+=n.amount,d.quantity+=n.itemCount*12,d.documents+=1,i.set(l,d)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(e.entries()).sort(([n],[s])=>n.localeCompare(s)).map(([n,s])=>({month:n,amount:s})),productTotals:Array.from(i.values()).sort((n,s)=>s.amount-n.amount),customerTotals:Array.from(t.values()).sort((n,s)=>s.amount-n.amount)}}async function S(e,t){try{const i=await fetch(`/sake-system/${e}`,{headers:{Accept:"application/json"}});if(!i.ok)throw new Error(`HTTP ${i.status}`);return await i.json()}catch(i){return console.warn(`Failed to fetch ${e}, using fallback data`,i),t}}async function gt(){const e=await x("daily_sales_fact",{});if(e.length>0){const t=await x("customer_payment_status",{}),n=new Date().toISOString().slice(0,10),s=n.slice(0,7),o=[...e].sort((d,u)=>d.sales_date.localeCompare(u.sales_date)).slice(-30).map(d=>({date:new Date(`${d.sales_date}T00:00:00Z`).toISOString(),amount:w(d.sales_amount)})),r=e.reduce((d,u)=>u.sales_date===n?d+w(u.sales_amount):d,0),l=e.reduce((d,u)=>u.sales_date.startsWith(s)?d+w(u.sales_amount):d,0),c=t.filter(d=>w(d.balance_amount)>0);return{generatedAt:new Date().toISOString(),kpis:{todaySales:r,todayDelta:0,monthSales:l,monthDelta:0,unpaidCount:c.length,unpaidAmount:c.reduce((d,u)=>d+w(u.balance_amount),0)},dailySales:o,salesRecords:pe.salesRecords}}return S("data/api/latest/sales-summary.json",pe)}async function $t(){const e=await x("customer_payment_status",{});return e.length>0?{generatedAt:new Date().toISOString(),records:e.map((t,i)=>{const n=t.legacy_customer_code??`UNKNOWN-${i+1}`;return{id:`payment-${n}-${i+1}`,customerCode:n,customerName:n,billedAmount:w(t.billed_amount),paymentAmount:w(t.paid_amount),balanceAmount:w(t.balance_amount),lastPaymentDate:null,status:ca(t.payment_status)}})}:S("data/api/latest/payment-status.json",oa)}async function kt(){const[e,t]=await Promise.all([x(),x()]);if(e.length>0||t.length>0){const i=e.length?e.map((s,o)=>({id:$(s,["id","customer_id","code"],`customer-${o+1}`),code:$(s,["code","customer_code","legacy_customer_code"],`C${String(o+1).padStart(4,"0")}`),name:$(s,["name","customer_name","display_name"],`Customer ${o+1}`),closingDay:Ke(s,["closing_day","close_day"],31),paymentDay:Ke(s,["payment_day","due_day"],15),isActive:ye(s,["is_active","active","enabled"],!0)})):I.customers,n=t.length?t.map((s,o)=>({id:$(s,["id","product_id","code"],`product-${o+1}`),code:$(s,["code","product_code"],`P${String(o+1).padStart(5,"0")}`),janCode:$(s,["jan_code","jan","barcode"],""),name:$(s,["name","product_name","display_name"],`Product ${o+1}`),category:$(s,["category","category_name"],"未分類"),isActive:ye(s,["is_active","active","enabled"],!0)})):I.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:e.length||I.summary.customerCount,activeCustomerCount:e.length?i.filter(s=>s.isActive).length:I.summary.activeCustomerCount,productCount:t.length||I.summary.productCount,activeProductCount:t.length?n.filter(s=>s.isActive).length:I.summary.activeProductCount},customers:i,products:n}}return S("data/api/latest/master-stats.json",I)}function St(){return S("data/api/latest/pipeline-meta.json",ia)}async function he(e){const[t,i]=await Promise.all([x("sales_document_headers",{}),x("sales_document_lines",{})]);if(t.length>0){const n=new Map;i.forEach(o=>{const r=String(o.header_id??o.document_header_id??o.document_no??o.id??"");r&&n.set(r,(n.get(r)??0)+1)});const s=t.map((o,r)=>{const l=Te(o,r),c=String(o.id??o.document_no??o.legacy_document_no??"");return{...l,itemCount:n.get(c)??l.itemCount}});return Qe(s,e)}return Qe(vt,e)}async function Re(e){const t=e.trim().toUpperCase();if(!t)return We("");const[i,n,s]=await Promise.all([x("sales_document_headers",{}),x("customer_payments",{}),x("customer_payment_status",{})]);if(i.length>0||n.length>0){const o=i.map((c,d)=>{const u=Te(c,d);return{id:u.id,date:u.date,documentNo:u.documentNo,amount:u.amount}}),r=n.map((c,d)=>({id:String(c.id??`payment-${d+1}`),date:bt(c,["payment_date","received_date"],new Date().toISOString()),amount:w(c.payment_amount??c.amount),method:c.payment_method??c.method??"入金"})),l=s.find(c=>(c.legacy_customer_code??"").toUpperCase()===t);return{customerCode:t,customerName:i[0]?.customer_name??i[0]?.customer_code??i[0]?.legacy_customer_code??t,balanceAmount:w(l?.balance_amount),salesTotal:o.reduce((c,d)=>c+d.amount,0),paymentTotal:r.reduce((c,d)=>c+d.amount,0),salesHistory:o,paymentHistory:r}}return We(t)}async function wt(){const[e,t,i]=await Promise.all([x("daily_sales_fact",{}),x("sales_document_headers",{}),x("sales_document_lines",{})]);if(e.length>0){const n=new Map;e.forEach(r=>{const l=ft(r.sales_date);n.set(l,(n.get(l)??0)+w(r.sales_amount))});const s=new Map;t.forEach((r,l)=>{const c=Te(r,l),d=s.get(c.customerCode)??{code:c.customerCode,name:c.customerName,amount:0,quantity:0,documents:0};d.amount+=c.amount,d.documents+=1,s.set(c.customerCode,d)});const o=new Map;return i.forEach((r,l)=>{const c=r.product_code??r.legacy_product_code??`P${String(l+1).padStart(5,"0")}`,d=o.get(c)??{code:c,name:r.product_name??c,amount:0,quantity:0,documents:0};d.amount+=w(r.line_amount??r.amount),d.quantity+=w(r.quantity),d.documents+=1,o.set(c,d)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(n.entries()).sort(([r],[l])=>r.localeCompare(l)).map(([r,l])=>({month:r,amount:l})).slice(-12),productTotals:o.size>0?Array.from(o.values()).sort((r,l)=>l.amount-r.amount):me.productTotals,customerTotals:s.size>0?Array.from(s.values()).sort((r,l)=>l.amount-r.amount):me.customerTotals}}return da()}const De={sales:"売上",return:"返品",export_return:"輸出戻入"};async function xt(e){const t=e.lines.reduce((s,o)=>s+o.amount,0),i=`D${Date.now().toString().slice(-6)}`;return{id:(await Ae("sales_document_headers",{legacy_customer_code:e.customerCode,sales_date:e.invoiceDate,document_type:e.invoiceType,staff_code:e.staffCode}))?.id??`local-${i}`,documentNo:i,totalAmount:t,status:"confirmed",createdAt:new Date().toISOString()}}const Xe={documentNo:"D240122",invoiceDate:"2026-04-14",customerCode:"C0011",customerName:"青葉商事 株式会社",customerAddress:"〒123-4567 東京都千代田区〇〇 1-2-3",lines:[{productCode:"P00012",productName:"純米吟醸 720ml",quantity:6,unitPrice:12e3,unit:"本",amount:72e3},{productCode:"P00008",productName:"本醸造 1.8L",quantity:4,unitPrice:8500,unit:"本",amount:34e3},{productCode:"P00021",productName:"梅酒 500ml",quantity:12,unitPrice:5800,unit:"本",amount:69600}],totalAmount:175600,taxAmount:15960,note:""};async function qe(e){const t=await x("sales_document_headers",{});if(t.length>0){const i=t[0],n=w(i.total_amount);return{documentNo:e,invoiceDate:$(i,["sales_date","document_date"],""),customerCode:$(i,["legacy_customer_code","customer_code"],""),customerName:$(i,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:n,taxAmount:Math.floor(n*10/110),note:""}}return{...Xe,documentNo:e||Xe.documentNo}}const ua={targetYearMonth:"2026-04",closingDay:15,totalBilling:482e4,customers:[{customerCode:"C0011",customerName:"青葉商事",closingDay:15,salesAmount:54e4,taxAmount:54e3,prevBalance:28e4,paymentAmount:28e4,billingAmount:594e3,status:"open"},{customerCode:"C0012",customerName:"北斗酒販",closingDay:15,salesAmount:72e4,taxAmount:72e3,prevBalance:14e4,paymentAmount:14e4,billingAmount:792e3,status:"closed"},{customerCode:"C0013",customerName:"中央フーズ",closingDay:15,salesAmount:38e4,taxAmount:38e3,prevBalance:0,paymentAmount:0,billingAmount:418e3,status:"open"},{customerCode:"C0014",customerName:"東海酒店",closingDay:15,salesAmount:61e4,taxAmount:61e3,prevBalance:23e4,paymentAmount:15e4,billingAmount:751e3,status:"open"}]};async function Ie(e){return S(`data/api/latest/billing-${e}.json`,{...ua,targetYearMonth:e})}const pa=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],ma={generatedAt:new Date().toISOString(),months:pa,salesByProduct:[{label:"純米吟醸 720ml",values:[380,410,520,480,390,320,450,480,510,420,380,350].map(e=>e*1e4)},{label:"本醸造 1.8L",values:[290,310,380,340,280,250,320,360,390,310,280,260].map(e=>e*1e4)},{label:"梅酒 500ml",values:[210,240,310,290,230,180,260,300,320,250,200,190].map(e=>e*1e4)}],salesByCustomer:[{label:"青葉商事",values:[480,510,620,590,480,390,540,580,610,510,460,430].map(e=>e*1e4)},{label:"北斗酒販",values:[390,420,520,490,400,330,460,500,530,430,380,360].map(e=>e*1e4)}],costSimulation:[{productCode:"P00012",productName:"純米吟醸 720ml",costPrice:7200,sellPrice:12e3,margin:4800,marginRate:40},{productCode:"P00008",productName:"本醸造 1.8L",costPrice:4800,sellPrice:8500,margin:3700,marginRate:43.5},{productCode:"P00021",productName:"梅酒 500ml",costPrice:3200,sellPrice:5800,margin:2600,marginRate:44.8}]};async function Dt(){return S("data/api/latest/sales-report.json",ma)}const Ct={planned:"計画中",active:"仕込中",done:"完了"},ya=[{id:"j1",jikomiNo:"J2026-01",productName:"純米吟醸",riceType:"山田錦",plannedKg:400,actualKg:400,startDate:"2026-01-10",expectedDoneDate:"2026-02-20",status:"done",tankNo:"T01",note:""},{id:"j2",jikomiNo:"J2026-02",productName:"本醸造",riceType:"日本晴",plannedKg:600,actualKg:600,startDate:"2026-02-01",expectedDoneDate:"2026-03-15",status:"done",tankNo:"T02",note:""},{id:"j3",jikomiNo:"J2026-03",productName:"特別純米",riceType:"五百万石",plannedKg:500,actualKg:480,startDate:"2026-03-05",expectedDoneDate:"2026-04-20",status:"active",tankNo:"T03",note:"経過良好"},{id:"j4",jikomiNo:"J2026-04",productName:"純米大吟醸",riceType:"山田錦",plannedKg:300,actualKg:0,startDate:"2026-04-15",expectedDoneDate:"2026-06-01",status:"planned",tankNo:"T04",note:""}];async function _t(){return S("data/api/latest/jikomi.json",ya)}const ha=[{id:"t1",tankNo:"T01",capacity:3e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-01"},{id:"t2",tankNo:"T02",capacity:4e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-20"},{id:"t3",tankNo:"T03",capacity:3500,currentVolume:2800,productName:"特別純米",jikomiNo:"J2026-03",status:"in_use",lastUpdated:"2026-04-10"},{id:"t4",tankNo:"T04",capacity:2e3,currentVolume:0,productName:"純米大吟醸",jikomiNo:"J2026-04",status:"in_use",lastUpdated:"2026-04-15"},{id:"t5",tankNo:"T05",capacity:5e3,currentVolume:3200,productName:"本醸造（貯蔵）",jikomiNo:"J2026-02",status:"aging",lastUpdated:"2026-03-20"}];async function Nt(){return S("data/api/latest/tanks.json",ha)}const va=[{id:"k1",kenteiNo:"K2026-001",jikomiNo:"J2026-01",productName:"純米吟醸",kenteiDate:"2026-02-25",alcoholDegree:16.2,extractDegree:3.8,sakaMeterValue:2.5,volume:2850,taxCategory:"清酒",status:"approved"},{id:"k2",kenteiNo:"K2026-002",jikomiNo:"J2026-02",productName:"本醸造",kenteiDate:"2026-03-18",alcoholDegree:15.5,extractDegree:4.1,sakaMeterValue:1.8,volume:3600,taxCategory:"清酒",status:"submitted"},{id:"k3",kenteiNo:"K2026-003",jikomiNo:"J2026-03",productName:"特別純米",kenteiDate:"2026-04-18",alcoholDegree:0,extractDegree:0,sakaMeterValue:0,volume:0,taxCategory:"清酒",status:"pending"}];async function At(){return S("data/api/latest/kentei.json",va)}const ba=[{id:"m1",code:"M001",name:"720ml瓶",unit:"本",currentStock:2400,minimumStock:500,unitCost:85,lastUpdated:"2026-04-10"},{id:"m2",code:"M002",name:"1.8L瓶",unit:"本",currentStock:1800,minimumStock:300,unitCost:140,lastUpdated:"2026-04-10"},{id:"m3",code:"M003",name:"300ml瓶",unit:"本",currentStock:3600,minimumStock:600,unitCost:55,lastUpdated:"2026-04-08"},{id:"m4",code:"M004",name:"キャップ（金）",unit:"個",currentStock:8e3,minimumStock:1e3,unitCost:12,lastUpdated:"2026-04-05"},{id:"m5",code:"M005",name:"ラベル（純米吟醸）",unit:"枚",currentStock:1200,minimumStock:300,unitCost:28,lastUpdated:"2026-04-01"},{id:"m6",code:"M006",name:"化粧箱（720ml）",unit:"個",currentStock:180,minimumStock:100,unitCost:320,lastUpdated:"2026-04-01"}];async function Lt(){return S("data/api/latest/materials.json",ba)}const fa=[{id:"p1",documentNo:"K240050",purchaseDate:"2026-04-05",supplierCode:"S001",supplierName:"山田農場",itemName:"山田錦（精米65%）",quantity:500,unitPrice:480,amount:24e4,status:"confirmed"},{id:"p2",documentNo:"K240051",purchaseDate:"2026-04-06",supplierCode:"S002",supplierName:"日本瓶工業",itemName:"720ml瓶",quantity:1200,unitPrice:85,amount:102e3,status:"confirmed"},{id:"p3",documentNo:"K240052",purchaseDate:"2026-04-10",supplierCode:"S003",supplierName:"山本麹店",itemName:"米麹",quantity:80,unitPrice:1200,amount:96e3,status:"pending"},{id:"p4",documentNo:"K240053",purchaseDate:"2026-04-12",supplierCode:"S001",supplierName:"山田農場",itemName:"五百万石（精米60%）",quantity:300,unitPrice:420,amount:126e3,status:"pending"}],ga=[{supplierCode:"S001",supplierName:"山田農場",totalPurchase:366e3,paidAmount:24e4,balance:126e3,nextPaymentDate:"2026-04-30",status:"partial"},{supplierCode:"S002",supplierName:"日本瓶工業",totalPurchase:102e3,paidAmount:102e3,balance:0,nextPaymentDate:"",status:"paid"},{supplierCode:"S003",supplierName:"山本麹店",totalPurchase:96e3,paidAmount:0,balance:96e3,nextPaymentDate:"2026-04-30",status:"unpaid"}],$a=[{id:"b1",billNo:"H240001",supplierName:"山田農場",amount:24e4,issueDate:"2026-03-31",dueDate:"2026-04-30",status:"holding"},{id:"b2",billNo:"H240002",supplierName:"大阪資材",amount:185e3,issueDate:"2026-03-31",dueDate:"2026-05-31",status:"holding"},{id:"b3",billNo:"H230045",supplierName:"中部農業",amount:32e4,issueDate:"2026-02-28",dueDate:"2026-03-31",status:"cleared"}],ka=[{code:"R001",name:"山田錦（精米65%）",unit:"kg",currentStock:380,minimumStock:100,lastPurchaseDate:"2026-04-05",unitCost:480},{code:"R002",name:"五百万石（精米60%）",unit:"kg",currentStock:290,minimumStock:100,lastPurchaseDate:"2026-04-12",unitCost:420},{code:"R003",name:"米麹",unit:"kg",currentStock:62,minimumStock:20,lastPurchaseDate:"2026-04-10",unitCost:1200},{code:"R004",name:"醸造用アルコール",unit:"L",currentStock:240,minimumStock:50,lastPurchaseDate:"2026-03-20",unitCost:180},{code:"R005",name:"清酒用酵母",unit:"g",currentStock:500,minimumStock:100,lastPurchaseDate:"2026-02-15",unitCost:3200}];async function Pt(){return S("data/api/latest/purchases.json",fa)}async function jt(){return S("data/api/latest/payables.json",ga)}async function Et(){return S("data/api/latest/bills.json",$a)}async function Tt(){return S("data/api/latest/raw-stock.json",ka)}const Rt=[{code:"01",name:"清酒（普通酒）",taxRatePerLiter:100},{code:"02",name:"清酒（純米酒）",taxRatePerLiter:100},{code:"03",name:"清酒（吟醸酒）",taxRatePerLiter:100},{code:"04",name:"清酒（大吟醸酒）",taxRatePerLiter:100},{code:"05",name:"本格焼酎",taxRatePerLiter:250},{code:"06",name:"リキュール",taxRatePerLiter:200},{code:"07",name:"果実酒",taxRatePerLiter:100},{code:"08",name:"その他醸造酒",taxRatePerLiter:100}],Ce={export:"輸出",sample:"見本",research:"試験醸造",loss:"欠減"},Sa={targetYear:2026,targetMonth:3,companyName:"金井酒造店",companyNo:"1234567890123",companyAddress:"神奈川県秦野市堀山下182",companyRepresentative:"金井 和雄",taxOffice:"小田原税務署",rows:[{taxCategory:"01",taxCategoryName:"清酒（普通酒）",alcoholDegree:15.5,productionVolume:3800,previousBalance:0,currentAdjustment:0,exportDeduction:100,sampleDeduction:100,taxableVolume:3600,volume:3600,taxRate:100,taxAmount:36e4},{taxCategory:"02",taxCategoryName:"清酒（純米酒）",alcoholDegree:16.2,productionVolume:2900,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:2850,volume:2850,taxRate:100,taxAmount:285e3},{taxCategory:"03",taxCategoryName:"清酒（吟醸酒）",alcoholDegree:16.5,productionVolume:1250,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:50,taxableVolume:1200,volume:1200,taxRate:100,taxAmount:12e4}],deductions:[{type:"export",categoryCode:"01",volume:100,reason:"シンガポール向け輸出",documentNo:"EX2026-003"},{type:"sample",categoryCode:"01",volume:100,reason:"展示会サンプル出荷"},{type:"sample",categoryCode:"02",volume:50,reason:"品評会出品"},{type:"sample",categoryCode:"03",volume:50,reason:"全国新酒鑑評会出品"}],totalVolume:7650,totalTax:765e3,status:"draft",submittedAt:null};async function Oe(e,t){return S(`data/api/latest/tax-${e}-${String(t).padStart(2,"0")}.json`,{...Sa,targetYear:e,targetMonth:t})}function P(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&apos;")}function qt(e){const t=e.rows.map(n=>`    <Category>
      <Code>${P(n.taxCategory)}</Code>
      <Name>${P(n.taxCategoryName)}</Name>
      <AlcoholDegree>${n.alcoholDegree}</AlcoholDegree>
      <ProductionVolume>${n.productionVolume}</ProductionVolume>
      <PreviousBalance>${n.previousBalance}</PreviousBalance>
      <CurrentAdjustment>${n.currentAdjustment}</CurrentAdjustment>
      <ExportDeduction>${n.exportDeduction}</ExportDeduction>
      <SampleDeduction>${n.sampleDeduction}</SampleDeduction>
      <TaxableVolume>${n.taxableVolume}</TaxableVolume>
      <TaxRate>${n.taxRate}</TaxRate>
      <TaxAmount>${n.taxAmount}</TaxAmount>
    </Category>`).join(`
`),i=e.deductions.map(n=>`    <Deduction type="${P(n.type)}">
      <CategoryCode>${P(n.categoryCode)}</CategoryCode>
      <Volume>${n.volume}</Volume>
      <Reason>${P(n.reason)}</Reason>${n.documentNo?`
      <DocumentNo>${P(n.documentNo)}</DocumentNo>`:""}
    </Deduction>`).join(`
`);return`<?xml version="1.0" encoding="UTF-8"?>
<TaxDeclaration>
  <Header>
    <TargetYear>${e.targetYear}</TargetYear>
    <TargetMonth>${String(e.targetMonth).padStart(2,"0")}</TargetMonth>
    <TaxpayerId>${P(e.companyNo)}</TaxpayerId>
    <TaxpayerName>${P(e.companyName)}</TaxpayerName>
    <TaxpayerAddress>${P(e.companyAddress)}</TaxpayerAddress>
    <TaxpayerRepresentative>${P(e.companyRepresentative)}</TaxpayerRepresentative>
    <TaxOffice>${P(e.taxOffice)}</TaxOffice>
    <Status>${e.status}</Status>
  </Header>
  <Categories>
${t}
  </Categories>
  <Deductions>
${i}
  </Deductions>
  <Total>
    <TotalVolume>${e.totalVolume}</TotalVolume>
    <TotalTax>${e.totalTax}</TotalTax>
  </Total>
</TaxDeclaration>
`}function wa(e){const t=String(e);return/[,"\n]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function xa(e){const i=["酒類コード","区分名","アルコール度数","製造数量","前月繰越","当月調整","輸出控除","見本等控除","課税数量","税率(円/L)","税額(円)"].join(","),n=e.rows.map(o=>[o.taxCategory,o.taxCategoryName,o.alcoholDegree,o.productionVolume,o.previousBalance,o.currentAdjustment,o.exportDeduction,o.sampleDeduction,o.taxableVolume,o.taxRate,o.taxAmount].map(wa).join(",")),s=`,合計,,${e.rows.reduce((o,r)=>o+r.productionVolume,0)},,,${e.rows.reduce((o,r)=>o+r.exportDeduction,0)},${e.rows.reduce((o,r)=>o+r.sampleDeduction,0)},${e.totalVolume},,${e.totalTax}`;return"\uFEFF"+[i,...n,s].join(`
`)+`
`}function Da(e){const t=e.rows.map(s=>{const o=Math.max(0,s.productionVolume+s.previousBalance+s.currentAdjustment-s.exportDeduction-s.sampleDeduction),r=Math.round(o*s.taxRate);return{...s,taxableVolume:o,volume:o,taxAmount:r}}),i=t.reduce((s,o)=>s+o.taxableVolume,0),n=t.reduce((s,o)=>s+o.taxAmount,0);return{...e,rows:t,totalVolume:i,totalTax:n}}async function Ca(e){const{supabaseInsert:t}=await L(async()=>{const{supabaseInsert:i}=await Promise.resolve().then(()=>Le);return{supabaseInsert:i}},void 0);await t("tax_declarations",{target_year:e.targetYear,target_month:e.targetMonth,company_name:e.companyName,company_no:e.companyNo,company_address:e.companyAddress,company_representative:e.companyRepresentative,tax_office:e.taxOffice,total_taxable_volume:e.totalVolume,total_tax_amount:e.totalTax,status:e.status,xml_data:qt(e),submitted_at:e.submittedAt})}const _a=Array.from({length:10},(e,t)=>({id:`ss${t+1}`,saleDate:"2026-04-15",saleTime:`${9+t}:${String(t*7%60).padStart(2,"0")}`,productCode:`P${String(t%4+1).padStart(5,"0")}`,productName:["純米吟醸 720ml","本醸造 1.8L","梅酒 500ml","特別純米 300ml"][t%4],quantity:1+t%3,unitPrice:[2200,1800,980,680][t%4],amount:(1+t%3)*[2200,1800,980,680][t%4],paymentMethod:["cash","card","paypay","cash"][t%4]})),Na=[{id:"o1",orderNo:"ORD-2604001",orderDate:"2026-04-13",customerName:"鈴木 太郎",postalCode:"150-0001",address:"東京都渋谷区〇〇1-1",items:[{productName:"純米吟醸 720ml",quantity:2,amount:4400}],totalAmount:4400,status:"shipped",shippingDate:"2026-04-14"},{id:"o2",orderNo:"ORD-2604002",orderDate:"2026-04-14",customerName:"田中 花子",postalCode:"530-0001",address:"大阪府大阪市北区〇〇2-3",items:[{productName:"梅酒 500ml",quantity:3,amount:2940},{productName:"本醸造 1.8L",quantity:1,amount:1800}],totalAmount:4740,status:"processing",shippingDate:""},{id:"o3",orderNo:"ORD-2604003",orderDate:"2026-04-15",customerName:"佐藤 一郎",postalCode:"460-0001",address:"愛知県名古屋市中区〇〇3-5",items:[{productName:"特別純米 300ml ×6本セット",quantity:1,amount:3980}],totalAmount:3980,status:"new",shippingDate:""}];async function Me(e){return S(`data/api/latest/store-sales-${e}.json`,_a)}async function It(){return S("data/api/latest/store-orders.json",Na)}async function ue(e){const t=await Ae("email_campaigns",{subject:e.subject,body:e.body,template_id:e.templateId,audience_mode:e.audienceMode,audience_filter:e.audienceFilter,recipient_count:e.recipientCount,sent_count:e.status==="sent"?e.recipientCount:0,status:e.status,sent_at:e.status==="sent"?new Date().toISOString():null});return{id:t?.id??`local-email-${Date.now()}`,subject:t?.subject??e.subject,body:t?.body??e.body,templateId:t?.template_id??e.templateId,audienceMode:t?.audience_mode??e.audienceMode,audienceFilter:t?.audience_filter??e.audienceFilter,recipientCount:t?.recipient_count??e.recipientCount,status:t?.status??e.status,createdAt:t?.created_at??new Date().toISOString(),updatedAt:t?.updated_at??new Date().toISOString()}}async function Ot(e){throw new Error("VITE_RESEND_API_KEY is not configured")}async function Aa(e){const t={};return e&&(t.template_key=`eq.${e}`),(await x("print_layouts",t)).map(n=>({id:$(n,["id"],""),name:$(n,["name"],""),templateKey:$(n,["template_key"],""),positions:n.positions??{},isDefault:ye(n,["is_default"],!1),note:$(n,["note"],""),updatedAt:$(n,["updated_at"],"")}))}async function La(e){const{supabaseInsert:t}=await L(async()=>{const{supabaseInsert:s}=await Promise.resolve().then(()=>Le);return{supabaseInsert:s}},void 0),i={id:e.id,name:e.name,template_key:e.templateKey,positions:e.positions,is_default:e.isDefault??!1,note:e.note??"",updated_at:new Date().toISOString()},n=await t("print_layouts",i);return n?{id:$(n,["id"],e.id),name:$(n,["name"],e.name),templateKey:$(n,["template_key"],e.templateKey),positions:n.positions??e.positions,isDefault:ye(n,["is_default"],!1),note:$(n,["note"],""),updatedAt:$(n,["updated_at"],"")}:null}async function Pa(e){return new URL("/rest/v1/print_layouts","https://loarwnuyvfxiscjjsmiz.supabase.co").searchParams.set("id",`eq.${e}`),!1}const T=Object.freeze(Object.defineProperty({__proto__:null,INVOICE_TYPE_LABELS:De,JIKOMI_STATUS_LABELS:Ct,SEASONAL_TEMPLATES:Ee,TAX_DEDUCTION_LABELS:Ce,TAX_RATE_CATEGORIES:Rt,deletePrintLayout:Pa,fetchBillList:Et,fetchBillingSummary:Ie,fetchCustomerLedger:Re,fetchDeliveryNote:qe,fetchInvoices:he,fetchJikomiList:_t,fetchKenteiList:At,fetchMasterStats:kt,fetchMaterialList:Lt,fetchPayableList:jt,fetchPaymentStatus:$t,fetchPipelineMeta:St,fetchPrintLayouts:Aa,fetchPurchaseList:Pt,fetchRawMaterialStock:Tt,fetchSalesAnalytics:wt,fetchSalesReport:Dt,fetchSalesSummary:gt,fetchStoreOrders:It,fetchStoreSales:Me,fetchTankList:Nt,fetchTaxDeclaration:Oe,generateTaxCSV:xa,generateTaxXML:qt,recalculateTaxDeclaration:Da,saveEmailCampaign:ue,saveInvoice:xt,savePrintLayout:La,saveTaxDeclaration:Ca,sendEmailCampaign:Ot},Symbol.toStringTag,{value:"Module"}));function B(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const ja={open:"未締め",closed:"締め済"};function Ea(e,t){const i=e.customers.map(n=>`
      <tr>
        <td>
          <div class="table-title">${n.customerName}</div>
          <div class="table-sub mono">${n.customerCode}</div>
        </td>
        <td class="numeric">${n.closingDay}日</td>
        <td class="numeric">${B(n.salesAmount)}</td>
        <td class="numeric">${B(n.taxAmount)}</td>
        <td class="numeric">${B(n.prevBalance)}</td>
        <td class="numeric">${B(n.paymentAmount)}</td>
        <td class="numeric"><strong>${B(n.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${n.status==="closed"?"success":"warning"}">${ja[n.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="billing-print" data-code="${n.customerCode}" ${n.status==="closed"?"":"disabled"}>請求書</button>
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
            ${[10,15,20,25,31].map(n=>`<option value="${n}" ${e.closingDay===n?"selected":""}>${n}日締め</option>`).join("")}
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
        <p class="kpi-value">${B(e.totalBilling)}</p>
        <p class="kpi-sub">${e.targetYearMonth} / ${e.closingDay}日締め</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">得意先数</p>
        <p class="kpi-value">${e.customers.length} 社</p>
        <p class="kpi-sub">締め済 ${e.customers.filter(n=>n.status==="closed").length} 社</p>
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
          <tbody>${i}</tbody>
        </table>
      </div>
    </section>
  `}const Ta={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"},{title:"CSV/Excelインポート",description:"Excelで作成したマスタデータをアップロードして一括登録できます。",path:"/import"},{title:"印刷センター",description:"チェーンストア伝票・見積書・請求書をテンプレートから選んでカスタマイズ印刷。",path:"/print"},{title:"帳票デザイナー",description:"BP1701伝票の各フィールドをドラッグ＆ドロップで正確に配置。実物画像と重ねて位置合わせ。",path:"/form-designer"}]},Ra={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},more:{eyebrow:"その他トップ",title:"周辺業務メニュー",description:"税務、店舗、分析、設定などの補助機能をまとめて配置しています。"}};function Ge(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ae(e){const t=Ra[e],i=Ta[e].map(n=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${Ge(n.title)}</p>
            <p class="category-card-description">${Ge(n.description)}</p>
          </div>
          <div class="category-card-actions">
            <button class="button secondary" type="button" data-link="${n.path}">
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
      ${i}
    </section>
  `}function Mt(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function G(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function qa(e){return e.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.salesHistory.map(t=>`
        <tr>
          <td>${Mt(t.date)}</td>
          <td class="mono">${t.documentNo}</td>
          <td class="numeric">${G(t.amount)}</td>
        </tr>
      `).join("")}function Ia(e){return e.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':e.paymentHistory.map(t=>`
        <tr>
          <td>${Mt(t.date)}</td>
          <td>${t.method}</td>
          <td class="numeric">${G(t.amount)}</td>
        </tr>
      `).join("")}function Oa(e,t){return`
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
            <dd>${G(e.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${G(e.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${e.balanceAmount>0?"balance-warning":""}">${G(e.balanceAmount)}</dd>
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
            <tbody>${qa(e)}</tbody>
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
            <tbody>${Ia(e)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function se(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ne(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function K(e,t){for(const i of t){const n=e[i];if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"){const s=Number(n);if(Number.isFinite(s))return s}}return null}function Ma(e){const t=e?.productTotals;if(!t||t.length===0)return"―";const i=t.reduce((s,o)=>{const r=K(o,["amount","salesAmount"]),l=K(o,["marginRate","grossMarginRate"]);return r===null||r<=0||l===null?s:{weightedAmount:s.weightedAmount+r,weightedRate:s.weightedRate+r*l}},{weightedAmount:0,weightedRate:0});if(i.weightedAmount>0)return`${(i.weightedRate/i.weightedAmount).toFixed(1)}%`;const n=t.reduce((s,o)=>{const r=o,l=K(r,["amount","salesAmount"]),c=K(r,["grossProfit","grossAmount","margin"]),d=K(r,["costAmount","cost","costPrice"]);if(l===null||l<=0)return s;const u=c??(d!==null?l-d:null);return u===null?s:{sales:s.sales+l,gross:s.gross+u}},{sales:0,gross:0});return n.sales>0?`${(n.gross/n.sales*100).toFixed(1)}%`:"―"}function Fa(e){const n={top:20,right:20,bottom:30,left:50},s=760-n.left-n.right,o=260-n.top-n.bottom,r=Math.max(...e.map(u=>u.amount),1),l=s/e.length,c=e.map((u,p)=>{const y=u.amount/r*o,h=n.left+p*l+4,_=n.top+o-y,q=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(u.date));return`
        <g>
          <rect x="${h}" y="${_}" width="${Math.max(l-8,8)}" height="${y}" rx="4" fill="#0F5B8D" opacity="${.58+p/e.length*.34}" />
          ${p%5===0?`<text x="${h+6}" y="252" class="chart-axis">${q}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(u=>{const p=n.top+o-o*u,y=Math.round(r*u/1e3);return`
        <g>
          <line x1="${n.left}" y1="${p}" x2="${760-n.right}" y2="${p}" class="chart-grid" />
          <text x="6" y="${p+4}" class="chart-axis">${y.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${c}
    </svg>
  `}function Ja(e,t,i){const n={success:"正常",warning:"注意",error:"異常",running:"実行中"},s=e.salesRecords.slice(0,10).map(o=>`
            <tr>
              <td class="mono">${o.documentNo}</td>
              <td>${ne(o.date)}</td>
              <td>${o.customerName}</td>
              <td class="numeric">${se(o.amount)}</td>
            </tr>
          `).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status}">${n[t.status]}</span>
        <span class="meta-note">最終同期 ${ne(t.lastSyncAt)}</span>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${se(e.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${e.kpis.todayDelta>0?"+":""}${e.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月累計</p>
        <p class="kpi-value">${se(e.kpis.monthSales)}</p>
        <p class="kpi-sub">前年同月比 ${e.kpis.monthDelta>0?"+":""}${e.kpis.monthDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${e.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${se(e.kpis.unpaidAmount)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">月次粗利率</p>
        <p class="kpi-value">${Ma(i)}</p>
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
        ${Fa(e.dailySales)}
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
              <dd>${t.jobName}</dd>
            </div>
            <div>
              <dt>最終同期</dt>
              <dd>${ne(t.lastSyncAt)}</dd>
            </div>
            <div>
              <dt>更新時刻</dt>
              <dd>${ne(t.generatedAt)}</dd>
            </div>
          </dl>
        </div>
        <div class="sync-panel-bottom">
          <p class="sync-message">${t.message}</p>
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
          <tbody>${s}</tbody>
        </table>
      </div>
    </section>
  `}function za(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(e)):""}function V(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ba(e,t){const i=e.lines.length?e.lines.map((s,o)=>`
          <tr>
            <td class="numeric">${o+1}</td>
            <td class="mono">${s.productCode}</td>
            <td>${s.productName}</td>
            <td class="numeric">${s.quantity.toLocaleString("ja-JP")}</td>
            <td>${s.unit}</td>
            <td class="numeric">${V(s.unitPrice)}</td>
            <td class="numeric">${V(s.amount)}</td>
          </tr>
        `).join(""):'<tr><td colspan="7" class="empty-row">明細データがありません。</td></tr>',n=e.totalAmount-e.taxAmount;return`
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
            <tr><th>納品日</th><td>${za(e.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${V(e.totalAmount)}（税込）</td></tr>
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
          <tbody>${i}</tbody>
        </table>
      </div>

      <div class="delivery-footer">
        <div class="delivery-totals">
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${V(n)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${V(e.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${V(e.totalAmount)}</span></div>
        </div>
        ${e.note?`<p class="delivery-note-text">備考：${e.note}</p>`:""}
      </div>
    </article>
  `}function R(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Va(e){return R(e).replaceAll(`
`,"<br />")}function Ua(e){const i=[...Object.values(Ee),{id:"custom",season:"カスタム",subject:"",body:""}].map(s=>`
        <button
          class="template-card ${e.selectedTemplateId===s.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${s.id}"
        >
          <span class="template-card-kicker">${s.season}</span>
          <strong>${R(s.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),n=e.previewRecipients.length?e.previewRecipients.map(s=>`
            <li>
              <span>${R(s.name)}</span>
              <span class="table-sub">${R(s.email)} / ${R(s.area)}</span>
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
          ${n}
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
          ${i}
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
          <input id="email-subject" type="text" value="${R(e.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${R(e.body)}</textarea>
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
          <p class="panel-title">${R(e.subject||"件名未入力")}</p>
          <div class="preview-box">${e.body?Va(e.body):"本文未入力"}</div>
        </div>
        ${e.saveMessage?`<p class="meta-note">${R(e.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send" ${e.sending?"disabled":""}>
            ${e.sending?"送信中...":"送信する"}
          </button>
        </div>
      </article>
    </section>
  `}function j(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function oe(e,t){return t.length===0?"":`
    <section class="search-section">
      <p class="search-section-title">${e}</p>
      <div class="search-result-list">
        ${t.join("")}
      </div>
    </section>
  `}function Ha(e,t){const i=[oe("得意先",t.customers.map(s=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${j(s.name)}</strong>
            <span class="table-sub mono">${j(s.code)}</span>
          </button>
        `)),oe("商品",t.products.map(s=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/master"
          >
            <strong>${j(s.name)}</strong>
            <span class="table-sub mono">${j(s.code)}</span>
          </button>
        `)),oe("伝票",t.documents.map(s=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="/invoice"
          >
            <strong>${j(s.documentNo)}</strong>
            <span class="table-sub">${j(s.customerName)} / ${j(s.date)}</span>
          </button>
        `)),oe("ページ",t.pages.map(s=>`
          <button
            class="search-result-item"
            type="button"
            data-action="global-nav"
            data-path="${j(s.path)}"
          >
            <strong>${j(s.title)}</strong>
            <span class="table-sub mono">${j(s.path)}</span>
          </button>
        `))].filter(Boolean).join(""),n=e.trim()?'<p class="empty-note">該当する検索結果がありません。</p>':'<p class="empty-note">得意先・商品・伝票・ページを横断検索できます。</p>';return`
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
            value="${j(e)}"
            placeholder="得意先、商品、伝票、ページを検索"
            autocomplete="off"
          />
          <div class="modal-results global-search-results">
            ${i||n}
          </div>
        </div>
      </div>
    </div>
  `}function Q(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ft(e){const t=e.resultsHtml.trim()?e.resultsHtml:`<p class="empty-note">${Q(e.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${Q(e.title)}">
        <div class="modal-header">
          <h2>${Q(e.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${Q(e.placeholder)}"
            value="${Q(e.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${t}</div>
        </div>
      </div>
    </div>
  `}function ie(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ze(e){return e.trim().toLowerCase()}function Ya(e,t){const i=Ze(t),n=e.filter(o=>i?[o.code,o.name,o.name].map(Ze).some(r=>r.includes(i)):!0).slice(0,50),s=n.length?`
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
              ${n.map(o=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${ie(o.code)}"
                      data-name="${ie(o.name)}"
                    >
                      <td class="mono">${ie(o.code)}</td>
                      <td>${ie(o.name)}</td>
                      <td>${o.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Ft({title:"得意先検索",searchQuery:t,placeholder:"コード・名前で検索",resultsHtml:s,emptyMessage:"該当する得意先が見つかりません。"})}function Ka(e){return e.toISOString().slice(0,10)}function z(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function O(e,t){return e[t]?`<div class="field-error">${z(e[t])}</div>`:""}function U(e,t,i=""){return[i,e[t]?"has-error":""].filter(Boolean).join(" ")}function Qa(e,t,i,n){const s=Object.keys(De).map(c=>`<option value="${c}" ${e.invoiceType===c?"selected":""}>${De[c]}</option>`).join(""),o=e.lines.map((c,d)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${U(n,`lines.${d}.productCode`,"input-cell")}" type="text" data-line="${d}" data-field="productCode" value="${z(c.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${d}" aria-label="商品検索">🔍</button>
          </div>
          ${O(n,`lines.${d}.productCode`)}
        </td>
        <td>
          <input class="${U(n,`lines.${d}.productName`,"input-cell")}" type="text" data-line="${d}" data-field="productName" value="${z(c.productName)}" placeholder="商品名" />
          ${O(n,`lines.${d}.productName`)}
        </td>
        <td>
          <input class="${U(n,`lines.${d}.quantity`,"input-cell numeric")}" type="number" data-line="${d}" data-field="quantity" value="${c.quantity}" min="0" />
          ${O(n,`lines.${d}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${d}" data-field="unit" value="${c.unit}" placeholder="本" /></td>
        <td>
          <input class="${U(n,`lines.${d}.unitPrice`,"input-cell numeric")}" type="number" data-line="${d}" data-field="unitPrice" value="${c.unitPrice}" min="0" />
          ${O(n,`lines.${d}.unitPrice`)}
        </td>
        <td class="numeric">${c.amount>0?c.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${d}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${d}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),r=e.lines.reduce((c,d)=>c+d.amount,0),l=Math.floor(r*10/110);return`
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
          <select id="inv-type">${s}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${U(n,"invoiceDate")}" id="inv-date" type="date" value="${e.invoiceDate||Ka(new Date)}" />
          ${O(n,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${U(n,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${z(e.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${O(n,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${z(e.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${z(e.staffCode)}" />
        </label>
      </div>
      ${O(n,"lines")}
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
          <tbody id="invoice-lines">${o||'<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <div class="invoice-total-row">
        <div class="total-stack">
          <span class="total-label">小計</span>
          <span class="total-value">${(r-l).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${l.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${r.toLocaleString("ja-JP")} 円</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <label class="field">
        <span>備考</span>
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${z(e.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${i?"disabled":""}>
        ${i?"保存中…":"保存する"}
      </button>
    </div>
  `}function Wa(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function Xa(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ga(e,t){const i=e.length?e.map(n=>`
            <tr>
              <td class="mono">${n.documentNo}</td>
              <td>${Wa(n.date)}</td>
              <td>
                <div class="table-title">${n.customerName}</div>
                <div class="table-sub mono">${n.customerCode}</div>
              </td>
              <td class="numeric">${n.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${Xa(n.amount)}</td>
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
          <tbody>${i}</tbody>
        </table>
      </div>
      ${e.length===0?'<p class="empty-note">条件に一致する伝票はありません。</p>':""}
    </section>
  `}function Za(e){return new Date(e.getFullYear(),e.getMonth(),1)}function es(e,t){return new Date(e.getFullYear(),e.getMonth()+t,1)}function Jt(e,t){const i=new Date(e);return i.setDate(i.getDate()+t),i}function zt(e){const t=new Date(e),i=t.getDay();return t.setDate(t.getDate()-i),t.setHours(0,0,0,0),t}function et(e){const t=Jt(zt(e),6);return t.setHours(23,59,59,999),t}function tt(e){return new Date(`${e}T00:00:00`)}function at(e){return`${e.getMonth()+1}/${e.getDate()}`}function ts(e){return e.replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}function as(){const e=new Date,t=zt(es(Za(e),-3)),i=et(new Date(e.getFullYear(),e.getMonth()+4,0)),n=[];let s=new Date(t);for(;s<=i;){const o=et(s);n.push({start:new Date(s),end:o,label:`${at(s)} - ${at(o)}`}),s=Jt(s,7)}return n}function ss(e){const t=as(),i=`160px repeat(${t.length}, minmax(56px, 1fr))`,n=t.map(o=>`
        <div class="gantt-week">
          <span>${o.label}</span>
        </div>
      `).join(""),s=e.length?e.map(o=>{const r=tt(o.startDate),l=tt(o.expectedDoneDate),c=Math.max(0,t.findIndex(p=>p.end>=r)),d=Math.max(c,t.reduce((p,y,h)=>y.start<=l?h:p,c)),u=[`仕込番号: ${o.jikomiNo}`,`銘柄: ${o.productName}`,`期間: ${o.startDate} - ${o.expectedDoneDate}`,`タンク: ${o.tankNo}`,`備考: ${o.note||"なし"}`].join(`
`);return`
            <div class="gantt-row" style="grid-template-columns:${i}">
              <div class="gantt-label">
                <strong>${o.jikomiNo}</strong>
                <span class="table-sub">${o.productName}</span>
              </div>
              <div class="gantt-track" style="grid-column: 2 / span ${t.length}">
                <div
                  class="gantt-bar ${o.status}"
                  style="grid-column:${c+1} / ${d+2}"
                  title="${ts(u)}"
                >
                  ${o.jikomiNo} / ${o.productName}
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
        <div class="gantt-grid" style="grid-template-columns:${i}">
          <div class="gantt-corner">仕込</div>
          ${n}
        </div>
        ${s}
      </div>
    </section>
  `}function st(e,t){const i={planned:"neutral",active:"warning",done:"success"},n=e.map(l=>`
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
          <span class="status-pill ${i[l.status]}">${Ct[l.status]}</span>
        </td>
        <td>${l.note||"―"}</td>
      </tr>
    `).join(""),s=e.filter(l=>l.status==="active").length,o=e.filter(l=>l.status==="done").length,r=e.filter(l=>l.status==="planned").length;return`
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
        <p class="kpi-value">${s} 本</p>
        <p class="kpi-sub">アクティブ</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">計画中</p>
        <p class="kpi-value">${r} 本</p>
        <p class="kpi-sub">未着手</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">完了</p>
        <p class="kpi-value">${o} 本</p>
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
          <tbody>${n||'<tr><td colspan="10" class="empty-row">仕込データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ns(e){const t={pending:"未実施",submitted:"申請中",approved:"承認済"},i={pending:"neutral",submitted:"warning",approved:"success"},n=e.map(c=>`
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
          <span class="status-pill ${i[c.status]}">${t[c.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${c.id}">
            ${c.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),s=e.filter(c=>c.status==="approved").length,o=e.filter(c=>c.status==="submitted").length,r=e.filter(c=>c.status==="pending").length;return`
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
        <p class="kpi-value">${e.filter(c=>c.status==="approved").reduce((c,d)=>c+d.volume,0).toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">酒税対象</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">申請中</p>
        <p class="kpi-value">${o} 件</p>
        <p class="kpi-sub">税務署確認待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">未実施</p>
        <p class="kpi-value">${r} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>検定一覧</h2>
          <p class="panel-caption">承認済 ${s} 件 / 合計 ${e.length} 件</p>
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
          <tbody>${n||'<tr><td colspan="11" class="empty-row">検定データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function os(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function is(e,t){return`
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
        ${e?`<p class="field-error">${os(e)}</p>`:""}
        <div class="action-bar login-actions">
          <button class="button primary" type="button" data-action="auth-login" ${t?"disabled":""}>
            ${t?"送信中...":"ログイン"}
          </button>
        </div>
        <button class="text-link" type="button" data-action="auth-skip">デモモードで続ける</button>
      </div>
    </section>
  `}function ls(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="numeric">${t.closingDay}日</td>
          <td class="numeric">${t.paymentDay}日</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function cs(e){return e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td class="mono">${t.janCode}</td>
          <td>${t.name}</td>
          <td>${t.category}</td>
          <td><span class="status-pill ${t.isActive?"success":"neutral"}">${t.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function rs(e,t){return`
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
      <div class="table-wrap">
        ${t==="customers"?`
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
            <tbody>${ls(e.customers)}</tbody>
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
            <tbody>${cs(e.products)}</tbody>
          </table>
        `}
      </div>
    </section>
  `}function fe(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ds(e){const t=e.map(s=>{const r=(s.minimumStock>0?s.currentStock/s.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${s.code}</td>
          <td>${s.name}</td>
          <td class="numeric ${r?"text-danger":""}">
            ${s.currentStock.toLocaleString("ja-JP")} ${s.unit}
            ${r?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${s.minimumStock.toLocaleString("ja-JP")} ${s.unit}</td>
          <td class="numeric">${fe(s.unitCost)}</td>
          <td class="numeric">${fe(s.currentStock*s.unitCost)}</td>
          <td>${s.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${s.id}">調整</button>
          </td>
        </tr>
      `}).join(""),i=e.filter(s=>s.minimumStock>0&&s.currentStock/s.minimumStock<1.5).length,n=e.reduce((s,o)=>s+o.currentStock*o.unitCost,0);return`
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
        <p class="kpi-value">${fe(n)}</p>
        <p class="kpi-sub">${e.length} 品目</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">要補充</p>
        <p class="kpi-value ${i>0?"text-danger":""}">${i} 品目</p>
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
  `}function us(e){return e?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e)):"-"}function ge(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}const ps={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function ms(e){return`
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
          <tbody>${e.map(i=>`
        <tr>
          <td>
            <div class="table-title">${i.customerName}</div>
            <div class="table-sub mono">${i.customerCode}</div>
          </td>
          <td class="numeric">${ge(i.billedAmount)}</td>
          <td class="numeric">${ge(i.paymentAmount)}</td>
          <td class="numeric">${ge(i.balanceAmount)}</td>
          <td>${us(i.lastPaymentDate)}</td>
          <td><span class="status-pill ${i.status==="paid"?"success":i.status==="partial"?"warning":"danger"}">${ps[i.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function H(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function nt(e){return e.trim().toLowerCase()}function ys(e,t){const i=nt(t),n=e.filter(o=>i?[o.code,o.name,o.janCode].map(nt).some(r=>r.includes(i)):!0),s=n.length?`
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
              ${n.map(o=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${H(o.code)}"
                      data-name="${H(o.name)}"
                    >
                      <td class="mono">${H(o.code)}</td>
                      <td>${H(o.name)}</td>
                      <td class="mono">${H(o.janCode)}</td>
                      <td>${H(o.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Ft({title:"商品検索",searchQuery:t,placeholder:"コード・名前・JANで検索",resultsHtml:s,emptyMessage:"該当する商品が見つかりません。"})}function M(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function hs(e,t){const i={pending:"未確定",confirmed:"確定",paid:"支払済"},n={pending:"warning",confirmed:"neutral",paid:"success"},s={unpaid:"未払い",partial:"一部支払",paid:"支払済"},o={unpaid:"warning",partial:"neutral",paid:"success"},r=e.map(p=>`
      <tr>
        <td class="mono">${p.documentNo}</td>
        <td>${p.purchaseDate}</td>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td>${p.itemName}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${M(p.unitPrice)}</td>
        <td class="numeric"><strong>${M(p.amount)}</strong></td>
        <td>
          <span class="status-pill ${n[p.status]}">${i[p.status]}</span>
        </td>
      </tr>
    `).join(""),l=t.map(p=>`
      <tr>
        <td class="mono">${p.supplierCode}</td>
        <td>${p.supplierName}</td>
        <td class="numeric">${M(p.totalPurchase)}</td>
        <td class="numeric">${M(p.paidAmount)}</td>
        <td class="numeric"><strong>${M(p.balance)}</strong></td>
        <td>${p.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${o[p.status]}">${s[p.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${p.supplierCode}" ${p.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),c=e.reduce((p,y)=>p+y.amount,0),d=t.reduce((p,y)=>p+y.balance,0),u=t.filter(p=>p.status!=="paid").length;return`
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
        <p class="kpi-value">${M(c)}</p>
        <p class="kpi-sub">${e.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${M(d)}</p>
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
          <tbody>${r||'<tr><td colspan="9" class="empty-row">仕入データがありません。</td></tr>'}</tbody>
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
          <tbody>${l||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function W(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function vs(e,t){const i={holding:"保有中",due:"期日到来",cleared:"決済済"},n={holding:"neutral",due:"warning",cleared:"success"},s=e.map(u=>`
      <tr>
        <td class="mono">${u.billNo}</td>
        <td>${u.supplierName}</td>
        <td class="numeric">${W(u.amount)}</td>
        <td>${u.issueDate}</td>
        <td>${u.dueDate}</td>
        <td>
          <span class="status-pill ${n[u.status]}">${i[u.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${u.id}" ${u.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),o=t.map(u=>{const p=u.minimumStock>0&&u.currentStock<u.minimumStock*1.2;return`
        <tr>
          <td class="mono">${u.code}</td>
          <td>${u.name}</td>
          <td class="numeric ${p?"text-danger":""}">
            ${u.currentStock.toLocaleString("ja-JP")} ${u.unit}
            ${p?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${u.minimumStock.toLocaleString("ja-JP")} ${u.unit}</td>
          <td class="numeric">${W(u.unitCost)}</td>
          <td class="numeric">${W(u.currentStock*u.unitCost)}</td>
          <td>${u.lastPurchaseDate}</td>
        </tr>
      `}).join(""),r=e.filter(u=>u.status==="holding"),l=r.reduce((u,p)=>u+p.amount,0),c=t.reduce((u,p)=>u+p.currentStock*p.unitCost,0),d=t.filter(u=>u.minimumStock>0&&u.currentStock<u.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${W(l)}</p>
        <p class="kpi-sub">${r.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${W(c)}</p>
        <p class="kpi-sub">要補充 ${d} 品目</p>
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
          <tbody>${s||'<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>'}</tbody>
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
          <tbody>${o||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function bs(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e))}function D(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function _e(e){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(e)}"
      >
        コピー
      </button>
      <pre class="code-block">${D(e)}</pre>
    </div>
  `}function fs(e){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(e)}"
    >
      コピー
    </button>
  `}function le(e){return`
    <div class="setup-command-row">
      <code class="inline-code">${D(e)}</code>
      ${fs(e)}
    </div>
  `}function Y(e){return`
    <div class="setup-step" data-step="${e.step}">
      <h3>${D(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${D(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${e.instructions.map(t=>`<li>${D(t)}</li>`).join("")}
        </ol>
      </div>
      ${e.code?_e(e.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${e.success.map(t=>`<li>${D(t)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${e.errors.map(t=>`<li>${D(t)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function ce(e){return`
    <div class="setup-step setup-step-compact" data-step="${D(e.stepLabel)}">
      <h3>${D(e.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${D(e.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${e.body}
      </div>
    </div>
  `}function gs(e,t,i){const n={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${bs(e.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${e.status}">${n[e.status]}</span>
        </p>
        <p class="kpi-sub">${D(e.message)}</p>
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
      ${ce({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${le("git --version")}
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
      ${ce({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${le("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${ce({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${le("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${le("python get-pip.py")}
        `})}
      ${ce({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${Y({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${Y({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${Y({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${Y({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${Y({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${Y({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${_e(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${_e(`{
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
            <span class="config-value">${D(t)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${D(t)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${D("（未設定：Supabaseダッシュボードから取得してください）")}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${D(i)}"
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
  `}function $s(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ks(e){return e.replace("-","/")}function Ss(e){if(e.length===0)return'<div class="chart-empty">データなし</div>';const t=760,i=280,n={top:16,right:24,bottom:36,left:64},s=t-n.left-n.right,o=i-n.top-n.bottom,r=Math.max(...e.map(u=>u.amount),1),l=s/e.length,c=[0,.25,.5,.75,1].map(u=>{const p=n.top+o-o*u,y=`${Math.round(r*u/1e4).toLocaleString("ja-JP")}万円`;return`
        <g>
          <line x1="${n.left}" y1="${p}" x2="${t-n.right}" y2="${p}" class="chart-grid" />
          <text x="8" y="${p+4}" class="chart-axis">${y}</text>
        </g>
      `}).join(""),d=e.map((u,p)=>{const y=u.amount/r*o,h=Math.max(l-18,24),_=n.left+p*l+(l-h)/2,q=n.top+o-y;return`
        <g>
          <rect x="${_}" y="${q}" width="${h}" height="${y}" rx="6" class="analytics-bar" />
          <text x="${_+h/2}" y="${i-10}" class="chart-axis centered-axis">${ks(u.month)}</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${t} ${i}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${c}
      ${d}
    </svg>
  `}function ws(e){return e.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':e.map(t=>`
        <tr>
          <td class="mono">${t.code}</td>
          <td>${t.name}</td>
          <td class="numeric">${$s(t.amount)}</td>
          <td class="numeric">${t.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${t.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function xs(e,t){const i=t==="products"?"商品別集計":"得意先別集計",n=t==="products"?e.productTotals:e.customerTotals;return`
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
        ${Ss(e.monthlySales)}
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
            <tbody>${ws(n)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function X(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ds(e){const t=Math.max(...e.salesByProduct.flatMap(o=>o.values),1),i=e.salesByProduct.map(o=>{const r=o.values.map((l,c)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(l/t*120)}px" title="${e.months[c]}: ${X(l)}"></div>
            <span class="bar-label">${e.months[c].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${o.label}</p>
          <div class="bar-chart">${r}</div>
        </div>
      `}).join(""),n=e.costSimulation.map(o=>`
      <tr>
        <td class="mono">${o.productCode}</td>
        <td>${o.productName}</td>
        <td class="numeric">${X(o.costPrice)}</td>
        <td class="numeric">${X(o.sellPrice)}</td>
        <td class="numeric">${X(o.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${o.marginRate>=40?"success":"warning"}">${o.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),s=e.salesByCustomer.map(o=>{const r=o.values.reduce((l,c)=>l+c,0);return`
        <tr>
          <td>${o.label}</td>
          ${o.values.map(l=>`<td class="numeric">${(l/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${X(r)}</strong></td>
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
      <div class="chart-wrap">${i}</div>
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
              ${e.months.map(o=>`<th class="numeric">${o}</th>`).join("")}
              <th class="numeric">合計</th>
            </tr>
          </thead>
          <tbody>${s}</tbody>
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
          <tbody>${n}</tbody>
        </table>
      </div>
    </section>
  `}function Cs(e){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function _s(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function ot(e){return e.toISOString().slice(0,10)}function Ns(e,t,i){const n=e.length?e.map(s=>`
            <tr>
              <td class="mono">${s.documentNo}</td>
              <td>${Cs(s.date)}</td>
              <td>
                <div class="table-title">${s.customerName}</div>
                <div class="table-sub mono">${s.customerCode}</div>
              </td>
              <td class="numeric">${_s(s.amount)}</td>
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
          <input id="sales-start" type="date" value="${t||ot(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${i||ot(new Date)}" />
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
          <tbody>${n}</tbody>
        </table>
      </div>
    </section>
  `}function re(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function As(e,t,i,n){const s={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},o={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},r={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},l=e.map(p=>`
      <tr>
        <td>${p.saleTime}</td>
        <td class="mono">${p.productCode}</td>
        <td>${p.productName}</td>
        <td class="numeric">${p.quantity}</td>
        <td class="numeric">${re(p.unitPrice)}</td>
        <td class="numeric"><strong>${re(p.amount)}</strong></td>
        <td>${s[p.paymentMethod]}</td>
      </tr>
    `).join(""),c=t.map(p=>`
      <tr>
        <td class="mono">${p.orderNo}</td>
        <td>${p.orderDate}</td>
        <td>${p.customerName}</td>
        <td>${p.postalCode} ${p.address}</td>
        <td>${p.items.map(y=>`${y.productName} ×${y.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${re(p.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${r[p.status]}">${o[p.status]}</span>
        </td>
        <td>${p.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${p.id}">詳細</button>
        </td>
      </tr>
    `).join(""),d=e.reduce((p,y)=>p+y.amount,0),u=t.filter(p=>p.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${re(d)}</p>
        <p class="kpi-sub">${e.length} 件 / ${n}</p>
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
        <button class="tab-btn ${i==="pos"?"active":""}" data-store-tab="pos">直売所レジ</button>
        <button class="tab-btn ${i==="orders"?"active":""}" data-store-tab="orders">受注・宅配</button>
      </div>

      ${i==="pos"?`
        <div class="panel-header">
          <div>
            <h2>直売所販売履歴</h2>
          </div>
          <label class="field" style="display:flex;align-items:center;gap:8px">
            <span style="white-space:nowrap">販売日</span>
            <input id="store-date" type="date" value="${n}" style="width:160px" />
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
  `}const $e={customers:"得意先マスタ",products:"商品マスタ",suppliers:"仕入先マスタ",staff:"担当者マスタ"},Ls={customers:{required:["legacy_customer_code","name"],optional:["kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"]},products:{required:["legacy_product_code","name"],optional:["kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"]},suppliers:{required:["legacy_supplier_code","name"],optional:["kana_name","phone","postal_code","address1","closing_day","payment_day","email"]},staff:{required:["legacy_staff_code","name"],optional:["kana_name","department"]}};function Ps(e,t,i,n){const s=Ls[e],o=Object.keys($e).map(l=>`
      <button class="tab-button ${e===l?"active":""}" data-import-entity="${l}">
        ${$e[l]}
      </button>
    `).join(""),r=t?`
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
              ${t.columns.map(l=>`<th>${l}</th>`).join("")}
              <th>検証</th>
            </tr>
          </thead>
          <tbody>
            ${t.rows.slice(0,10).map((l,c)=>`
              <tr class="${l._valid?"":"has-error"}">
                <td>${c+1}</td>
                ${t.columns.map(d=>`<td>${String(l[d]??"")}</td>`).join("")}
                <td>${l._valid?'<span class="status-pill success">OK</span>':`<span class="status-pill warning">${l._error??"NG"}</span>`}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="action-bar">
        <button class="button secondary" data-action="import-cancel">キャンセル</button>
        <button class="button primary" data-action="import-execute"
          ${i||t.validRows===0?"disabled":""}>
          ${i?"取り込み中…":`${t.validRows}件をSupabaseに登録`}
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
      <div class="tab-group" style="flex-wrap: wrap;">${o}</div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>${$e[e]} のCSV形式</h2>
      </div>
      <p class="form-hint" style="margin-top:0;">必須列・任意列を以下の形式で。1行目は列名。UTF-8（BOM付き可）。</p>
      <div class="summary-list">
        <div>
          <dt>必須列</dt>
          <dd>${s.required.map(l=>`<code class="config-value">${l}</code>`).join(" / ")}</dd>
        </div>
        <div>
          <dt>任意列</dt>
          <dd>${s.optional.map(l=>`<code class="config-value">${l}</code>`).join(" / ")}</dd>
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

    ${r}

    ${n?`<section class="panel"><p class="sync-message">${n}</p></section>`:""}
  `}const g={header:"#2196F3",code:"#4CAF50",date:"#FF9800",detail:"#9C27B0",total:"#F44336"};function js(e,t,i){const n=[{id:"documentNo",label:"伝票番号",x:155,y:4,fontSize:9,value:e.documentNo,color:g.header},{id:"vendorName",label:"社名",x:4,y:12,fontSize:10,value:t.name,color:g.header},{id:"vendorAddress",label:"住所",x:4,y:17,fontSize:7,value:t.address1,color:g.header},{id:"customerName",label:"取引先名",x:4,y:20,fontSize:10,value:`${e.customerName} ${e.customerHonorific}`,color:g.header},{id:"chainStoreCode",label:"柱店CD",x:63,y:13,fontSize:9,value:e.chainStoreCode??"",color:g.code},{id:"categoryCode",label:"分類CD",x:87,y:13,fontSize:9,value:e.categoryCode??"",color:g.code},{id:"slipNumber",label:"伝票No.",x:117,y:13,fontSize:9,value:e.documentNo,color:g.code},{id:"vendorCode",label:"取引CD",x:151,y:13,fontSize:9,value:e.slipTypeCode??"",color:g.code},{id:"partnerCode",label:"取引先CD",x:94,y:20,fontSize:10,value:e.vendorCode??"",color:g.code},{id:"orderNo",label:"受注No.",x:143,y:20,fontSize:9,value:e.orderNo??"",color:g.code},{id:"currentDate",label:"当日日付",x:10,y:3.5,fontSize:8,value:e.documentDate.replace(/-/g,"/"),color:g.date},{id:"orderDate",label:"発注日",x:180,y:13,fontSize:7.5,value:(e.orderDate??"").replace(/-/g,"/"),color:g.date},{id:"deliveryDate",label:"納品日",x:204,y:13,fontSize:7.5,value:(e.deliveryDate??"").replace(/-/g,"/"),color:g.date}];e.lines.slice(0,6).forEach((r,l)=>{const c=33+l*8.5;n.push({id:`line${l}_name`,label:`明細${l+1} 品名`,x:5,y:c,fontSize:7.5,value:r.productName+(r.spec?` ${r.spec}`:""),color:g.detail},{id:`line${l}_code`,label:`明細${l+1} CD`,x:64,y:c,fontSize:7.5,value:r.productCode,color:g.detail},{id:`line${l}_qty`,label:`明細${l+1} 数量`,x:124,y:c,fontSize:8,value:r.quantity>0?String(r.quantity):"",color:g.detail},{id:`line${l}_price`,label:`明細${l+1} 原単価`,x:163,y:c,fontSize:8,value:r.unitPrice>0?r.unitPrice.toLocaleString("ja-JP"):"",color:g.detail},{id:`line${l}_amount`,label:`明細${l+1} 原価金額`,x:176,y:c,fontSize:8,value:r.amount>0?r.amount.toLocaleString("ja-JP"):"",color:g.detail},{id:`line${l}_retail`,label:`明細${l+1} 売単価`,x:193,y:c,fontSize:8,value:r.retailPrice?r.retailPrice.toLocaleString("ja-JP"):"",color:g.detail})});const s=e.lines.reduce((r,l)=>r+(l.amount||0),0),o=e.lines.reduce((r,l)=>r+l.quantity,0);return n.push({id:"totalQty",label:"合計数量",x:125,y:89,fontSize:9,value:String(o),color:g.total},{id:"costTotal",label:"原価金額合計",x:179,y:89,fontSize:10,value:s.toLocaleString("ja-JP"),color:g.total}),i&&n.forEach(r=>{const l=i[r.id];l&&(r.x=l.x,r.y=l.y)}),n}function Es(e,t,i,n,s){const r=js(e,t,n).map(c=>`
      <div class="fd-field ${s?"fd-draggable":""}"
           data-fd-id="${c.id}"
           style="left:${c.x}mm; top:${c.y}mm; font-size:${c.fontSize}pt; --fd-color:${c.color};"
           title="${c.label} (${c.x.toFixed(1)}, ${c.y.toFixed(1)})">
        ${s?`<span class="fd-badge">${c.label}</span>`:""}
        <span class="fd-value">${c.value}</span>
      </div>
    `).join(""),l=i.showReferenceOverlay&&i.overlayImageUrl?`background-image: url('${i.overlayImageUrl}'); background-size: 100% 100%;`:"";return`
    <section class="page-head no-print">
      <div>
        <p class="eyebrow">帳票デザイナー</p>
        <h1>BP1701 フォーム配置</h1>
      </div>
      <div class="meta-stack">
        <button class="button ${s?"primary":"secondary"}" data-action="fd-toggle-design">
          ${s?"🔧 配置モードON":"▶ プレビューモード"}
        </button>
        <button class="button primary" onclick="window.print()">🖨️ 印刷</button>
      </div>
    </section>

    ${s?`
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
        色: <span style="color:${g.header}">■ヘッダ</span>
        <span style="color:${g.code}">■コード</span>
        <span style="color:${g.date}">■日付</span>
        <span style="color:${g.detail}">■明細</span>
        <span style="color:${g.total}">■合計</span>
      </p>
    </section>
    `:""}

    <section class="panel fd-canvas-panel">
      <div class="fd-canvas-scaler" id="fd-scaler">
        <div class="fd-canvas" style="${l}">
          ${r}
        </div>
      </div>
    </section>

    ${s?`
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
        <label><input type="checkbox" data-print-opt="showReferenceOverlay" ${i.showReferenceOverlay?"checked":""} /> 参考画像表示</label>
        <label style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px;">濃さ</span>
          <input type="range" min="0" max="1" step="0.05" value="${i.overlayOpacity}" data-print-opt="overlayOpacity" style="width:140px;" />
        </label>
      </div>
    </section>
  `}function ke(e){const t={};return e.querySelectorAll("[data-fd-id]").forEach(i=>{const n=i.dataset.fdId??"",s=parseFloat(i.style.left)||0,o=parseFloat(i.style.top)||0;t[n]={x:s,y:o}}),t}const it={chain_store:"チェーンストア伝票",quotation:"見積書",invoice_monthly:"請求書（月次）"},Ts={pageSize:"A4",orientation:"portrait",fontSize:"medium",showSeal:!0,showRegistrationNo:!0,showBankInfo:!0,showRemarks:!0,showJanCode:!0,showUnit:!0,colorMode:"color",copies:1,showReferenceOverlay:!1,overlayOpacity:.4,overlayImageUrl:"reference/chainstore_ref.png",calibrationOffsetX:0,calibrationOffsetY:0},Rs={name:"金井酒造店",postalCode:"257-0014",address1:"神奈川県秦野市堀山下182",address2:"",tel:"0463-88-1511",fax:"0463-88-5885",email:"info@kaneishuzo.co.jp",registrationNo:"T1234567890123",bankName:"横浜銀行",bankBranch:"秦野支店",bankAccountType:"普通",bankAccountNo:"1234567",bankAccountHolder:"カ）カナイシュゾウテン",sealImageUrl:""};function k(e){return"¥"+e.toLocaleString("ja-JP")}function Z(e){const t=new Date(e);return`${t.getFullYear()}年${t.getMonth()+1}月${t.getDate()}日`}function Bt(e,t){const i=e.reduce((o,r)=>o+r.amount,0),n=Math.floor(i*t),s=i+n;return{subtotal:i,taxAmount:n,total:s}}const b={currentDateY:{x:10,y:3.5,size:8},currentDateM:{x:17,y:3.5,size:8},currentDateD:{x:24,y:3.5,size:8},documentNo:{x:155,y:4,size:9,bold:!0},settlementCheck:{x:217,y:4,size:9},vendorName:{x:4,y:12,size:10,bold:!0},vendorAddress:{x:4,y:16.5,size:6.5},chainStoreCode:{x:63,y:13,size:9},categoryCode:{x:87,y:13,size:9},slipNumber:{x:117,y:13,size:9},vendorCode:{x:151,y:13,size:9},orderDateY:{x:180,y:13,size:7.5},orderDateM:{x:186,y:13,size:7.5},orderDateD:{x:192,y:13,size:7.5},deliveryDateY:{x:204,y:13,size:7.5},deliveryDateM:{x:211,y:13,size:7.5},deliveryDateD:{x:218,y:13,size:7.5},customerName:{x:4,y:20,size:10,bold:!0},partnerCode:{x:94,y:20,size:10,bold:!0},orderNo:{x:143,y:20,size:9},detailStartY:33,detailRowH:8.5,detailCols:{productName:{x:5,w:58,align:"left",size:7.5},productCode:{x:64,w:25,align:"left",size:7.5},color:{x:92,w:6,align:"center",size:7},size:{x:99,w:15,align:"center",size:7},unit:{x:115,w:8,align:"center",size:7},quantity:{x:124,w:10,align:"right",size:8},correctedQty:{x:137,w:14,align:"right",size:8},discount:{x:153,w:9,align:"right",size:7.5},unitPrice:{x:163,w:12,align:"right",size:8},costAmount:{x:176,w:16,align:"right",size:8,bold:!0},retailPrice:{x:193,w:12,align:"right",size:8},note:{x:206,w:18,align:"right",size:8}},totalQty:{x:125,y:89,size:9,bold:!0},receivedTotal:{x:150,y:89,size:9},returnTotal:{x:165,y:89,size:9},correctedCostTotal:{x:179,y:89,size:10,bold:!0},correctedRetailTotal:{x:207,y:89,size:10,bold:!0}};function f(e,t){const i=e.align??"left",n=e.size??8;return`<div class="bp-fld" style="${["position:absolute",`left:${e.x}mm`,`top:${e.y}mm`,e.w?`width:${e.w}mm`:"",`text-align:${i}`,`font-size:${n}pt`,e.bold?"font-weight:700":"","line-height:1","white-space:nowrap","overflow:hidden"].filter(Boolean).join(";")}">${t}</div>`}function Se(e){if(!e)return{y:"",m:"",d:""};const t=new Date(e),i=t.getFullYear(),n=i-2018;return{y:n>0?String(n).padStart(2,"0"):String(i).slice(-2),m:String(t.getMonth()+1).padStart(2,"0"),d:String(t.getDate()).padStart(2,"0")}}function qs(e,t,i){const n=Se(e.documentDate),s=Se(e.orderDate??e.documentDate),o=Se(e.deliveryDate??e.documentDate),r=e.lines.slice(0,6).map((v,C)=>{const Xt=b.detailStartY+C*b.detailRowH,N=b.detailCols,Ve=[],A=(Ue,He)=>{He&&Ve.push(f({...Ue,y:Xt,x:Ue.x+0},He))};return A(N.productName,v.productName+(v.spec?` ${v.spec}`:"")),A(N.productCode,v.productCode),A(N.color,v.color??""),A(N.size,[v.size,v.caseQty?`×${v.caseQty}`:""].filter(Boolean).join(" ")),A(N.unit,v.unit),A(N.quantity,v.quantity>0?v.quantity.toLocaleString("ja-JP"):""),A(N.correctedQty,v.correctedQuantity?v.correctedQuantity.toLocaleString("ja-JP"):""),A(N.discount,v.discount?v.discount.toLocaleString("ja-JP"):""),A(N.unitPrice,v.unitPrice>0?v.unitPrice.toLocaleString("ja-JP"):""),A(N.costAmount,v.amount>0?v.amount.toLocaleString("ja-JP"):""),A(N.retailPrice,v.retailPrice?v.retailPrice.toLocaleString("ja-JP"):""),A(N.note,v.receivedAmount?v.receivedAmount.toLocaleString("ja-JP"):""),Ve.join("")}).join(""),l=e.lines.reduce((v,C)=>v+(C.amount||0),0),c=e.lines.reduce((v,C)=>v+(C.retailPrice||0)*(C.correctedQuantity??C.quantity),0),d=e.lines.reduce((v,C)=>v+(C.receivedAmount||0),0),u=e.lines.reduce((v,C)=>v+(C.returnAmount||0),0),p=e.lines.reduce((v,C)=>v+C.quantity,0),y=i.showReferenceOverlay?`background-image: url('${i.overlayImageUrl}'); background-size: 100% 100%; background-repeat: no-repeat; opacity: 1;`:"",h=i.calibrationOffsetX||0,_=i.calibrationOffsetY||0,q=`transform: translate(${h}mm, ${_}mm);`;return`
    <div class="print-page bp1701-overlay">
      <div class="bp-sheet" style="${y}">
        ${i.showReferenceOverlay?`<div class="bp-sheet-overlay-mask" style="opacity:${1-i.overlayOpacity};"></div>`:""}

        <!-- データフィールド (絶対座標配置、プリンタずれ調整あり) -->
        <div class="bp-data-layer" style="${q}">
        ${f(b.currentDateY,n.y)}
        ${f(b.currentDateM,n.m)}
        ${f(b.currentDateD,n.d)}
        ${f(b.documentNo,e.documentNo)}
        ${e.settlementPrint?f(b.settlementCheck,"✓"):""}

        ${f(b.vendorName,t.name)}
        ${f(b.vendorAddress,t.address1)}
        ${f(b.chainStoreCode,e.chainStoreCode??"")}
        ${f(b.categoryCode,e.categoryCode??"")}
        ${f(b.slipNumber,e.documentNo)}
        ${f(b.vendorCode,e.slipTypeCode??"")}

        ${f(b.customerName,`${e.customerName} ${e.customerHonorific}`)}
        ${f(b.orderDateY,s.y)}
        ${f(b.orderDateM,s.m)}
        ${f(b.orderDateD,s.d)}
        ${f(b.deliveryDateY,o.y)}
        ${f(b.deliveryDateM,o.m)}
        ${f(b.deliveryDateD,o.d)}
        ${f(b.orderNo,e.orderNo??"")}
        ${f(b.partnerCode,e.vendorCode??"")}

        ${r}

        ${f(b.totalQty,p.toLocaleString("ja-JP"))}
        ${f(b.receivedTotal,d.toLocaleString("ja-JP"))}
        ${f(b.returnTotal,u.toLocaleString("ja-JP"))}
        ${f(b.correctedCostTotal,l.toLocaleString("ja-JP"))}
        ${f(b.correctedRetailTotal,c.toLocaleString("ja-JP"))}
        </div>
      </div>
    </div>
  `}function Is(e,t,i){const{subtotal:n,taxAmount:s,total:o}=Bt(e.lines,e.taxRate),r=e.previousBalance??0,l=e.paymentAmount??0,c=r-l+o,d=e.lines.map(p=>`
      <tr>
        <td style="color:#636e72;font-size:9pt;">${p.note??""}</td>
        <td>${p.productName}${p.spec?` <span style="color:#636e72;font-size:9pt;">/ ${p.spec}</span>`:""}</td>
        <td class="numeric">${p.quantity.toLocaleString("ja-JP")}</td>
        ${i.showUnit?`<td>${p.unit}</td>`:""}
        <td class="numeric">${k(p.unitPrice)}</td>
        <td class="numeric">${k(p.amount)}</td>
      </tr>
    `).join(""),u=Array.from({length:Math.max(0,6-e.lines.length)}).map(()=>`
      <tr class="freee-empty">
        <td></td><td></td><td></td>${i.showUnit?"<td></td>":""}<td></td><td></td>
      </tr>
    `).join("");return`
    <div class="print-page invoice-freee ${i.fontSize}">
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
          ${i.showRegistrationNo?`<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${t.registrationNo}</span></p>`:""}
          ${i.showSeal?`<div class="freee-seal-wrap">${t.sealImageUrl?`<img src="${t.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />`:'<div class="freee-seal-placeholder">印</div>'}</div>`:""}
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
        <div><dt>請求日</dt><dd>${Z(e.documentDate)}</dd></div>
        ${e.dueDate?`<div><dt>お支払期限</dt><dd>${Z(e.dueDate)}</dd></div>`:""}
        <div><dt>請求書番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記の通り御請求申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">ご請求金額</div>
        <div>
          <span class="freee-total-value">${k(c)}</span>
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
            ${i.showUnit?"<th>単位</th>":""}
            <th class="numeric">単価</th>
            <th class="numeric">金額</th>
          </tr>
        </thead>
        <tbody>${d}${u}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${i.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${k(n)} / 消費税: ${k(s)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          ${r?`<tr><th>前回御請求額</th><td>${k(r)}</td></tr>`:""}
          ${l?`<tr><th>ご入金額</th><td>▲ ${k(l)}</td></tr>`:""}
          <tr><th>今回御請求 小計</th><td>${k(n)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${k(s)}</td></tr>
          <tr class="freee-sum-grand"><th>合計請求額</th><td>${k(c)}</td></tr>
        </table>
      </div>

      <!-- 振込先 -->
      ${i.showBankInfo?`
        <div class="freee-bank">
          <h3>お振込先</h3>
          <p><strong>${t.bankName}</strong> ${t.bankBranch}　${t.bankAccountType} ${t.bankAccountNo}</p>
          <p>口座名義: ${t.bankAccountHolder}</p>
          <p class="freee-bank-note">※ お振込手数料はお客様にてご負担くださいますようお願い申し上げます。</p>
        </div>`:""}

      <!-- 備考 -->
      ${i.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}
    </div>
  `}function Os(e,t,i){const{subtotal:n,taxAmount:s,total:o}=Bt(e.lines,e.taxRate),r=e.lines.map(c=>`
      <tr>
        <td>${c.productName}${c.spec?` <span style="color:#636e72;font-size:9pt;">/ ${c.spec}</span>`:""}</td>
        <td class="numeric">${c.quantity.toLocaleString("ja-JP")}</td>
        ${i.showUnit?`<td>${c.unit}</td>`:""}
        <td class="numeric">${k(c.unitPrice)}</td>
        <td class="numeric">${k(c.amount)}</td>
      </tr>
    `).join(""),l=Array.from({length:Math.max(0,5-e.lines.length)}).map(()=>`
      <tr class="freee-empty">
        <td></td><td></td>${i.showUnit?"<td></td>":""}<td></td><td></td>
      </tr>
    `).join("");return`
    <div class="print-page quotation-freee ${i.fontSize}">
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
          ${i.showRegistrationNo?`<p style="margin-top:4px;">登録番号: <span style="font-family:'Courier New',monospace;">${t.registrationNo}</span></p>`:""}
          ${i.showSeal?`<div class="freee-seal-wrap">${t.sealImageUrl?`<img src="${t.sealImageUrl}" style="width:50px;height:50px;object-fit:contain;" alt="印" />`:'<div class="freee-seal-placeholder">印</div>'}</div>`:""}
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
        <div><dt>見積日</dt><dd>${Z(e.documentDate)}</dd></div>
        ${e.expireDate?`<div><dt>有効期限</dt><dd>${Z(e.expireDate)}</dd></div>`:""}
        <div><dt>見積番号</dt><dd style="font-family:'Courier New',monospace;">${e.documentNo}</dd></div>
      </dl>

      <p>下記のとおり御見積申し上げます。</p>

      <!-- 合計強調 -->
      <div class="freee-total-highlight">
        <div class="freee-total-label">御見積金額</div>
        <div>
          <span class="freee-total-value">${k(o)}</span>
          <span class="freee-total-tax">（税込）</span>
        </div>
      </div>

      <!-- 明細 -->
      <table class="freee-table">
        <thead>
          <tr>
            <th>品目 / 内容</th>
            <th class="numeric">数量</th>
            ${i.showUnit?"<th>単位</th>":""}
            <th class="numeric">単価</th>
            <th class="numeric">金額</th>
          </tr>
        </thead>
        <tbody>${r}${l}</tbody>
      </table>

      <!-- 合計 -->
      <div class="freee-summary">
        <div>
          ${i.showRegistrationNo?`
            <div class="freee-tax-breakdown">
              <p>＜税率内訳＞</p>
              <p>${Math.round(e.taxRate*100)}%対象: ${k(n)} / 消費税: ${k(s)}</p>
            </div>`:""}
        </div>
        <table class="freee-summary-table">
          <tr><th>小計</th><td>${k(n)}</td></tr>
          <tr><th>消費税 (${Math.round(e.taxRate*100)}%)</th><td>${k(s)}</td></tr>
          <tr class="freee-sum-grand"><th>合計</th><td>${k(o)}</td></tr>
        </table>
      </div>

      <!-- 備考 -->
      ${i.showRemarks&&e.remarks?`
        <div class="freee-notes">
          <h3>備考</h3>
          <p>${e.remarks.replace(/\n/g,"<br />")}</p>
        </div>`:""}

      <p class="freee-footer">本見積書は ${e.expireDate?Z(e.expireDate)+" まで":"発行日から30日間"} 有効です。</p>
    </div>
  `}function Ms(e,t,i,n){let s="";switch(e){case"chain_store":s=qs(n,i,t);break;case"quotation":s=Os(n,i,t);break;case"invoice_monthly":s=Is(n,i,t);break}const o=Object.keys(it).map(c=>`<button class="tab-button ${e===c?"active":""}" data-print-template="${c}">${it[c]}</button>`).join(""),r=n.lines.map((c,d)=>`
      <tr>
        <td><input class="input-cell" type="text" data-print-line="${d}" data-print-lfield="productName" value="${c.productName}" style="width:100%;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${d}" data-print-lfield="quantity" value="${c.quantity}" style="width:60px;" /></td>
        <td><input class="input-cell numeric" type="number" data-print-line="${d}" data-print-lfield="unitPrice" value="${c.unitPrice}" style="width:80px;" /></td>
        <td class="numeric">${c.amount>0?c.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="print-remove-line" data-print-line="${d}">✕</button></td>
      </tr>`).join(""),l=[{key:"showSeal",label:"印影"},{key:"showRegistrationNo",label:"登録番号"},{key:"showBankInfo",label:"振込先"},{key:"showJanCode",label:"JAN"},{key:"showRemarks",label:"備考"}].map(c=>`<label style="font-size:12px;"><input type="checkbox" data-print-opt="${c.key}" ${t[c.key]?"checked":""} /> ${c.label}</label>`).join(" ");return`
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
      <div class="tab-group">${o}</div>
    </div>

    <div class="print-layout no-print">
      <!-- 左: 設定 -->
      <div class="print-settings">

        <div class="panel">
          <h3 class="panel-title" style="margin-bottom:12px;">書類情報</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <label class="field" style="flex:1 1 120px;">
              <span>書類番号</span>
              <input type="text" data-print-field="documentNo" value="${n.documentNo}" />
            </label>
            <label class="field" style="flex:1 1 120px;">
              <span>日付</span>
              <input type="date" data-print-field="documentDate" value="${n.documentDate}" />
            </label>
            <label class="field" style="flex:1 1 140px;">
              <span>得意先名</span>
              <input type="text" data-print-field="customerName" value="${n.customerName}" />
            </label>
            <label class="field" style="flex:1 1 60px;">
              <span>敬称</span>
              <select data-print-field="customerHonorific">
                <option value="御中" ${n.customerHonorific==="御中"?"selected":""}>御中</option>
                <option value="様" ${n.customerHonorific==="様"?"selected":""}>様</option>
              </select>
            </label>
            <label class="field" style="flex:1 1 100px;">
              <span>税率</span>
              <select data-print-field="taxRate">
                <option value="0.10" ${n.taxRate===.1?"selected":""}>10%</option>
                <option value="0.08" ${n.taxRate===.08?"selected":""}>8%</option>
              </select>
            </label>
            ${e==="invoice_monthly"?`
                <label class="field" style="flex:1 1 100px;">
                  <span>お支払期限</span>
                  <input type="date" data-print-field="dueDate" value="${n.dueDate??""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>前回請求額</span>
                  <input type="number" data-print-field="previousBalance" value="${n.previousBalance??0}" />
                </label>`:""}
            ${e==="chain_store"?`
                <label class="field" style="flex:1 1 100px;">
                  <span>柱店CD</span>
                  <input type="text" data-print-field="chainStoreCode" value="${n.chainStoreCode??""}" />
                </label>
                <label class="field" style="flex:1 1 100px;">
                  <span>伝票区分</span>
                  <input type="text" data-print-field="slipTypeCode" value="${n.slipTypeCode??""}" />
                </label>`:""}
          </div>
        </div>

        <div class="panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <h3 class="panel-title">明細 (${n.lines.length}行)</h3>
            <button class="button secondary" data-action="print-add-line" style="padding:6px 12px;font-size:12px;">＋行追加</button>
          </div>
          <div class="table-wrap">
            <table style="min-width:auto;">
              <thead><tr><th>品名</th><th class="numeric">数量</th><th class="numeric">単価</th><th class="numeric">金額</th><th></th></tr></thead>
              <tbody>${r||'<tr><td colspan="5" class="empty-row">行追加してください</td></tr>'}</tbody>
            </table>
          </div>
        </div>

        <details class="panel">
          <summary style="cursor:pointer;font-weight:700;font-size:14px;">⚙️ 表示オプション</summary>
          <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:12px;">
            ${l}
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
              ${s}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 印刷時はプレビューだけ表示 -->
    <div class="print-only">
      <div class="print-preview ${t.colorMode}">
        ${s}
      </div>
    </div>
  `}const Fs={customers:["legacy_customer_code","name"],products:["legacy_product_code","name"],suppliers:["legacy_supplier_code","name"],staff:["legacy_staff_code","name"]},Js={customers:["legacy_customer_code","name","kana_name","phone","postal_code","address1","address2","closing_day","payment_day","email"],products:["legacy_product_code","name","kana_name","jan_code","category_code","volume_ml","alcohol_degree","list_price","default_sale_price"],suppliers:["legacy_supplier_code","name","kana_name","phone","postal_code","address1","closing_day","payment_day","email"],staff:["legacy_staff_code","name","kana_name","department"]};function zs(e){e.charCodeAt(0)===65279&&(e=e.slice(1));const t=[];let i=[],n="",s=!1;for(let l=0;l<e.length;l++){const c=e[l];s?c==='"'?e[l+1]==='"'?(n+='"',l++):s=!1:n+=c:c==='"'?s=!0:c===","?(i.push(n),n=""):c===`
`||c==="\r"?(c==="\r"&&e[l+1]===`
`&&l++,i.push(n),i.some(d=>d!=="")&&t.push(i),i=[],n=""):n+=c}if((n!==""||i.length>0)&&(i.push(n),i.some(l=>l!=="")&&t.push(i)),t.length===0)return{columns:[],rows:[]};const o=t[0].map(l=>l.trim()),r=[];for(let l=1;l<t.length;l++){const c={};o.forEach((d,u)=>{c[d]=(t[l][u]??"").trim()}),r.push(c)}return{columns:o,rows:r}}function Bs(e,t,i){const n=Fs[e],s=n.filter(l=>!t.includes(l)),o=i.map(l=>{const c=[];s.length>0&&c.push(`必須列欠損: ${s.join(",")}`);for(const d of n)t.includes(d)&&!l[d]&&c.push(`${d}が空`);return{...l,_valid:c.length===0,_error:c[0]}}),r=o.filter(l=>l._valid).length;return{entity:e,columns:t,rows:o,totalRows:i.length,validRows:r,invalidRows:o.length-r}}function Vs(e){const i=Js[e],s={customers:["C0001","青葉商事","アオバショウジ","03-1234-5678","100-0001","東京都千代田区","","15","末","aoba@example.com"],products:["P00001","純米吟醸 720ml","ジュンマイギンジョウ","4901234567891","01","720","16","2200","1500"],suppliers:["S001","山田農場","ヤマダノウジョウ","03-9999-0000","150-0001","東京都渋谷区","末","25","yamada@farm.example.com"],staff:["S001","金井和雄","カナイカズオ","製造部"]}[e];return"\uFEFF"+i.join(",")+`
`+s.join(",")+`
`}async function Us(e,t){const{supabaseInsert:i}=await L(async()=>{const{supabaseInsert:l}=await Promise.resolve().then(()=>Le);return{supabaseInsert:l}},void 0);let n=0,s=0;const r={customers:"customers",products:"products",suppliers:"suppliers",staff:"staff"}[e];for(const l of t){if(!l._valid)continue;const{_valid:c,_error:d,...u}=l,p={...u};if(!p.id){const y=e==="customers"?"legacy_customer_code":e==="products"?"legacy_product_code":e==="suppliers"?"legacy_supplier_code":"legacy_staff_code";p.id=String(u[y]??`${e}-${Date.now()}-${n+s}`)}for(const y of["volume_ml","closing_day","payment_day","list_price","default_sale_price"])if(typeof p[y]=="string"&&p[y]!==""){const h=Number(p[y]);Number.isFinite(h)&&(p[y]=h)}try{await i(r,p)!==null?n++:s++}catch{s++}}return{inserted:n,failed:s}}function Hs(e){const t={empty:"空",in_use:"使用中",aging:"熟成中"},i={empty:"neutral",in_use:"warning",aging:"success"},n=e.map(d=>{const u=d.capacity>0?Math.round(d.currentVolume/d.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${d.tankNo}</strong></td>
          <td class="numeric">${d.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${d.currentVolume>0?d.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${u}%"></div>
            </div>
            <span class="progress-label">${u}%</span>
          </td>
          <td>${d.productName||"―"}</td>
          <td class="mono">${d.jikomiNo||"―"}</td>
          <td>
            <span class="status-pill ${i[d.status]}">${t[d.status]}</span>
          </td>
          <td>${d.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${d.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),s=e.filter(d=>d.status==="in_use").length,o=e.filter(d=>d.status==="aging").length,r=e.filter(d=>d.status==="empty").length,l=e.reduce((d,u)=>d+u.capacity,0),c=e.reduce((d,u)=>d+u.currentVolume,0);return`
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
        <p class="kpi-value">${s} 基</p>
        <p class="kpi-sub">熟成中 ${o} 基</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">空きタンク</p>
        <p class="kpi-value">${r} 基</p>
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
          <tbody>${n||'<tr><td colspan="9" class="empty-row">タンクデータがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function we(e){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(e)}function Ys(e,t,i){const n=e.rows.map((d,u)=>`
      <tr>
        <td class="mono">${d.taxCategory}</td>
        <td>${d.taxCategoryName}</td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" step="0.1" data-tax-row="${u}" data-tax-field="alcoholDegree" value="${d.alcoholDegree}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="productionVolume" value="${d.productionVolume}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="previousBalance" value="${d.previousBalance}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="exportDeduction" value="${d.exportDeduction}" />
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-tax-row="${u}" data-tax-field="sampleDeduction" value="${d.sampleDeduction}" />
        </td>
        <td class="numeric">${d.taxableVolume.toLocaleString("ja-JP")}</td>
        <td class="numeric">${d.taxRate}</td>
        <td class="numeric"><strong>${we(d.taxAmount)}</strong></td>
        <td>
          <button class="button-icon" data-action="tax-remove-category" data-tax-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),s=e.deductions.map((d,u)=>`
      <tr>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="type">
            ${Object.keys(Ce).map(p=>`<option value="${p}" ${p===d.type?"selected":""}>${Ce[p]}</option>`).join("")}
          </select>
        </td>
        <td>
          <select class="input-cell" data-ded-row="${u}" data-ded-field="categoryCode">
            ${Rt.map(p=>`<option value="${p.code}" ${p.code===d.categoryCode?"selected":""}>${p.code}:${p.name}</option>`).join("")}
          </select>
        </td>
        <td class="numeric">
          <input class="input-cell numeric" type="number" data-ded-row="${u}" data-ded-field="volume" value="${d.volume}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${u}" data-ded-field="reason" value="${d.reason}" />
        </td>
        <td>
          <input class="input-cell" type="text" data-ded-row="${u}" data-ded-field="documentNo" value="${d.documentNo??""}" placeholder="任意" />
        </td>
        <td>
          <button class="button-icon" data-action="tax-remove-deduction" data-ded-row="${u}" title="削除">✕</button>
        </td>
      </tr>
    `).join(""),o=Array.from({length:12},(d,u)=>u+1),r=e.rows.reduce((d,u)=>d+u.exportDeduction+u.sampleDeduction,0),l=e.rows.reduce((d,u)=>d+u.productionVolume,0),c=l>0?r/l*100:0;return`
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
            ${[2025,2026,2027].map(d=>`<option value="${d}" ${t===d?"selected":""}>${d}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${o.map(d=>`<option value="${d}" ${i===d?"selected":""}>${d}月</option>`).join("")}
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
        <p class="kpi-value">${we(e.totalTax)}</p>
        <p class="kpi-sub">${e.targetYear}年${e.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${e.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.rows.length} 区分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">控除数量</p>
        <p class="kpi-value">${r.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${e.deductions.length} 件</p>
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
          <tbody>${n||'<tr><td colspan="11" class="empty-row">「＋区分追加」で区分を追加してください。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="7">合計</th>
              <th class="numeric">${e.totalVolume.toLocaleString("ja-JP")}</th>
              <th></th>
              <th class="numeric">${we(e.totalTax)}</th>
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
          <tbody>${s||'<tr><td colspan="6" class="empty-row">「＋控除追加」で控除を追加してください。</td></tr>'}</tbody>
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
  `}function lt(e){const i=(e==null?"":e instanceof Date?e.toISOString():String(e)).replaceAll('"','""');return/[",\n\r]/.test(i)?`"${i}"`:i}function Ks(e,t,i){if(t.length===0&&(!i||i.length===0))return;const n=i&&i.length>0?i:Object.keys(t[0]??{}).map(d=>({key:d,label:d})),o=`\uFEFF${[n.map(d=>lt(d.label)).join(","),...t.map(d=>n.map(u=>lt(d[u.key])).join(","))].join(`\r
`)}`,r=new Blob([o],{type:"text/csv;charset=utf-8;"}),l=URL.createObjectURL(r),c=document.createElement("a");c.href=l,c.download=e,document.body.append(c),c.click(),c.remove(),window.setTimeout(()=>URL.revokeObjectURL(l),0)}const Qs=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/invoice-entry","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email","/import","/print","/form-designer"],de=[{name:"青葉商事",email:"aoba@example.jp",area:"関東",historySegment:"seasonal"},{name:"北斗酒販",email:"hokuto@example.jp",area:"北海道",historySegment:"premium"},{name:"中央フーズ",email:"chuo@example.jp",area:"関東",historySegment:"seasonal"},{name:"東海酒店",email:"tokai@example.jp",area:"中部",historySegment:"premium"},{name:"三和物産",email:"sanwa@example.jp",area:"関西",historySegment:"liqueur"},{name:"南星リカー",email:"nansei@example.jp",area:"九州",historySegment:"seasonal"},{name:"山川酒店",email:"yamakawa@example.jp",area:"関西",historySegment:"premium"},{name:"瑞穂商店",email:"mizuho@example.jp",area:"中部",historySegment:"seasonal"}],ct=[{path:"/sales",title:"売上一覧"},{path:"/payment",title:"入金状況"},{path:"/master",title:"マスタ"},{path:"/invoice",title:"伝票照会"},{path:"/ledger",title:"得意先台帳"},{path:"/analytics",title:"売上分析"},{path:"/invoice-entry",title:"伝票入力"},{path:"/delivery",title:"納品書"},{path:"/billing",title:"月次請求"},{path:"/report",title:"集計帳票"},{path:"/jikomi",title:"仕込管理"},{path:"/tanks",title:"タンク管理"},{path:"/kentei",title:"検定管理"},{path:"/materials",title:"資材管理"},{path:"/purchase",title:"仕入・買掛"},{path:"/raw-material",title:"手形・原料"},{path:"/tax",title:"酒税申告"},{path:"/store",title:"店舗・直売所"},{path:"/setup",title:"連動設定"},{path:"/import",title:"CSV/Excelインポート"},{path:"/print",title:"印刷センター"},{path:"/form-designer",title:"帳票デザイナー"}];function Vt(e){const t=Ee[e];return t?{subject:t.subject,body:t.body}:{subject:"",body:""}}function Fe(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function Ws(){const e=Vt("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:e.subject,body:e.body,saveMessage:null}}const be=new Date,Xs=be.toISOString().slice(0,7),Gs=be.getFullYear(),Zs=be.getMonth()+1,en=be.toISOString().slice(0,10),tn="C0011",F=Ws();function Ut(e){const t="/sake-system/".endsWith("/")?"/sake-system/".slice(0,-1):"/sake-system/",i=e.startsWith(t)?e.slice(t.length)||"/":e;return Qs.includes(i)?i:"/"}function Je(e){switch(e){case"/cat/sales":case"/invoice":case"/ledger":case"/invoice-entry":case"/delivery":case"/billing":case"/report":return"sales";case"/cat/brewery":case"/jikomi":case"/tanks":case"/kentei":case"/materials":return"brewery";case"/cat/purchase":case"/purchase":case"/raw-material":return"purchase";case"/cat/more":case"/master":case"/analytics":case"/tax":case"/store":case"/setup":return"more";case"/email":return"email";default:return"dashboard"}}const rt=Ut(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,invoiceRecords:[],customerLedger:null,salesAnalytics:null,invoiceForm:Fe(),invoiceSaving:!1,invoiceSavedDocNo:null,pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:Xs,salesReport:null,jikomiList:[],jikomiView:"list",tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:Gs,taxMonth:Zs,storeSales:[],storeOrders:[],storeTab:"pos",importEntity:"customers",importPreview:null,importing:!1,importResult:null,fdDesignMode:!0,fdSavedPositions:null,fdActiveFieldId:null,printTemplate:"chain_store",printOptions:{...Ts,overlayImageUrl:`${"/sake-system/".replace(/\/$/,"")}/reference/chainstore_ref.png`},printCompany:{...Rs},printData:{documentNo:"D"+new Date().toISOString().slice(0,10).replaceAll("-",""),documentDate:new Date().toISOString().slice(0,10),orderDate:new Date().toISOString().slice(0,10),deliveryDate:new Date(Date.now()+2*864e5).toISOString().slice(0,10),customerName:"株式会社〇〇商事",customerHonorific:"御中",customerPostalCode:"100-0001",customerAddress:"東京都千代田区〇〇1-2-3",customerCode:"C0001",chainStoreCode:"0123",categoryCode:"21",slipTypeCode:"11",orderNo:"PO-"+new Date().toISOString().slice(5,10).replaceAll("-",""),vendorCode:"V0001",departmentCode:"101",settlementPrint:!1,title:"",remarks:"",lines:[{productCode:"P00012",productName:"純米吟醸 金井の雫",spec:"720ml",quantity:12,unit:"本",unitPrice:1500,amount:18e3,retailPrice:2200,janCode:"4901234567891",caseQty:6},{productCode:"P00008",productName:"本醸造 辛口",spec:"1.8L",quantity:6,unit:"本",unitPrice:1800,amount:10800,retailPrice:2400,janCode:"4901234567908",caseQty:6},{productCode:"P00021",productName:"梅酒 熟成",spec:"500ml",quantity:12,unit:"本",unitPrice:1200,amount:14400,retailPrice:1800,janCode:"4901234567915",caseQty:12}],taxRate:.1,previousBalance:0,paymentAmount:0},storeSalesDate:en,route:rt,currentCategory:Je(rt),sidebarOpen:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:tn,masterTab:"customers",analyticsTab:"products",emailAudienceMode:F.mode,emailRegion:F.region,emailHistorySegment:F.historySegment,emailTemplateId:F.templateId,emailSubject:F.subject,emailBody:F.body,emailSaveMessage:F.saveMessage,emailSending:!1,globalSearchOpen:!1,globalQuery:"",authSkipped:!1,authSubmitting:!1,authError:null,user:null,loading:!0,actionLoading:!1,error:null};function dt(e){return e.slice(0,10)}function an(e){return{...e}}function ve(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function Ht(){a.invoiceForm=Fe(),a.invoiceSavedDocNo=null,a.invoiceErrors={},ve()}function Yt(e){const t={};return e.invoiceDate.trim()||(t.invoiceDate="伝票日付は必須です。"),e.customerCode.trim()||(t.customerCode="得意先コードは必須です。"),e.lines.length===0&&(t.lines="明細を1行以上入力してください。"),e.lines.forEach((i,n)=>{i.productCode.trim()||(t[`lines.${n}.productCode`]="商品コードは必須です。"),i.productName.trim()||(t[`lines.${n}.productName`]="商品名は必須です。"),i.quantity<=0&&(t[`lines.${n}.quantity`]="数量は1以上を入力してください。"),i.unitPrice<0&&(t[`lines.${n}.unitPrice`]="単価は0円以上で入力してください。")}),t}function sn(e){const t=a.invoiceForm.lines[e];t&&a.invoiceForm.lines.splice(e+1,0,an(t))}function nn(){const e=a.invoiceRecords[0],t=a.masterStats?.customers[0],i=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:e?.customerCode??t?.code??"",customerName:e?.customerName??t?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:i.map((n,s)=>{const o=s===0?1:2,r=1200*(s+1);return{productCode:n.code,productName:n.name,quantity:o,unitPrice:r,unit:"本",amount:o*r}}),note:e?`過去伝票 ${e.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function on(e){const t=a.masterStats?.customers.find(i=>i.code.toLowerCase()===e.trim().toLowerCase());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,!0):!1}function ln(e){const t=a.masterStats?.customers.find(i=>i.name===e.trim());return t?(a.invoiceForm.customerCode=t.code,a.invoiceForm.customerName=t.name,!0):!1}function Kt(e){if(E(e),a.invoiceErrors=Yt(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){m();return}a.invoiceSaving=!0,m(),xt(a.invoiceForm).then(t=>{a.invoiceSavedDocNo=t.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=Fe(),m()}).catch(()=>{a.invoiceSaving=!1,m()})}function Qt(e){const t=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,i=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...e.salesRecords].sort((n,s)=>new Date(s.date).getTime()-new Date(n.date).getTime()).filter(n=>{const s=new Date(n.date);return!(t&&s<t||i&&s>i)})}function Wt(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?de:de.filter(e=>e.area===a.emailRegion);case"history":return de.filter(e=>e.historySegment===a.emailHistorySegment);default:return de}}function cn(){const e=Wt();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:e.length,previewRecipients:e.slice(0,5),saveMessage:a.emailSaveMessage,sending:a.emailSending}}function xe(e){const t=Wt(),i=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:i,recipientCount:t.length,recipients:t.map(n=>n.email),status:e}}function ze(){return a.user,!1}function ee(){a.globalSearchOpen=!1,a.globalQuery=""}function rn(){const e=a.globalQuery.trim().toLowerCase();return e?{customers:a.masterStats?.customers.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],products:a.masterStats?.products.filter(t=>t.code.toLowerCase().includes(e)||t.name.toLowerCase().includes(e))??[],documents:a.invoiceRecords.filter(t=>t.documentNo.toLowerCase().includes(e)||t.customerName.toLowerCase().includes(e)||t.date.toLowerCase().includes(e)),pages:ct.filter(t=>t.path.toLowerCase().includes(e)||t.title.toLowerCase().includes(e))}:{customers:[],products:[],documents:[],pages:ct}}function dn(){let e=[],t,i="export.csv";switch(a.route){case"/sales":e=(a.salesSummary?Qt(a.salesSummary):[]).map(n=>({documentNo:n.documentNo,date:n.date,customerCode:n.customerCode,customerName:n.customerName,amount:n.amount})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"amount",label:"金額"}],i="sales.csv";break;case"/payment":e=[...a.paymentStatus?.records??[]].sort((n,s)=>s.balanceAmount-n.balanceAmount).map(n=>({...n})),t=[{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"billedAmount",label:"請求額"},{key:"paymentAmount",label:"入金額"},{key:"balanceAmount",label:"請求残"},{key:"lastPaymentDate",label:"最終入金日"},{key:"status",label:"状態"}],i="payment-status.csv";break;case"/invoice":e=a.invoiceRecords.map(n=>({...n})),t=[{key:"documentNo",label:"伝票番号"},{key:"date",label:"日付"},{key:"customerCode",label:"得意先コード"},{key:"customerName",label:"得意先名"},{key:"itemCount",label:"明細数"},{key:"amount",label:"金額"}],i="invoices.csv";break;case"/purchase":e=a.purchaseList.map(n=>({...n})),t=[{key:"documentNo",label:"伝票番号"},{key:"purchaseDate",label:"仕入日"},{key:"supplierCode",label:"仕入先コード"},{key:"supplierName",label:"仕入先名"},{key:"itemName",label:"品目"},{key:"quantity",label:"数量"},{key:"unitPrice",label:"単価"},{key:"amount",label:"金額"},{key:"status",label:"状態"}],i="purchase.csv";break;case"/jikomi":e=a.jikomiList.map(n=>({...n})),t=[{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"riceType",label:"原料米"},{key:"plannedKg",label:"計画量"},{key:"actualKg",label:"実績量"},{key:"startDate",label:"開始日"},{key:"expectedDoneDate",label:"完了予定日"},{key:"tankNo",label:"タンク"},{key:"status",label:"状態"},{key:"note",label:"備考"}],i="jikomi.csv";break;case"/tanks":e=a.tankList.map(n=>({...n})),t=[{key:"tankNo",label:"タンクNo."},{key:"capacity",label:"容量"},{key:"currentVolume",label:"現在量"},{key:"productName",label:"銘柄"},{key:"jikomiNo",label:"仕込番号"},{key:"status",label:"状態"},{key:"lastUpdated",label:"更新日"}],i="tanks.csv";break;case"/kentei":e=a.kenteiList.map(n=>({...n})),t=[{key:"kenteiNo",label:"検定番号"},{key:"jikomiNo",label:"仕込番号"},{key:"productName",label:"銘柄"},{key:"kenteiDate",label:"検定日"},{key:"alcoholDegree",label:"アルコール度数"},{key:"extractDegree",label:"エキス分"},{key:"sakaMeterValue",label:"酒度"},{key:"volume",label:"容量"},{key:"taxCategory",label:"酒類区分"},{key:"status",label:"状態"}],i="kentei.csv";break;case"/materials":e=a.materialList.map(n=>({...n})),t=[{key:"code",label:"コード"},{key:"name",label:"品名"},{key:"unit",label:"単位"},{key:"currentStock",label:"現在庫"},{key:"minimumStock",label:"最低在庫"},{key:"unitCost",label:"単価"},{key:"lastUpdated",label:"更新日"}],i="materials.csv";break;case"/master":a.masterTab==="customers"?(e=a.masterStats?.customers.map(n=>({...n}))??[],t=[{key:"code",label:"得意先コード"},{key:"name",label:"得意先名"},{key:"closingDay",label:"締日"},{key:"paymentDay",label:"入金日"},{key:"isActive",label:"有効"}],i="master-customers.csv"):(e=a.masterStats?.products.map(n=>({...n}))??[],t=[{key:"code",label:"商品コード"},{key:"janCode",label:"JAN"},{key:"name",label:"商品名"},{key:"category",label:"カテゴリ"},{key:"isActive",label:"有効"}],i="master-products.csv");break;default:return}Ks(i,e,t)}function ut(e){const t=`${"/sake-system/".replace(/\/$/,"")}${e==="/"?"/":e}`;history.pushState(null,"",t),a.route=e,a.currentCategory=Je(e),a.sidebarOpen=!1,ee(),Be(e)}async function Be(e){a.actionLoading=!0,m();try{switch(e){case"/delivery":a.deliveryNote||(a.deliveryNote=await qe(a.deliverySearchDocNo||"D240122"));break;case"/billing":a.billingSummary||(a.billingSummary=await Ie(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await Dt());break;case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await _t());break;case"/tanks":a.tankList.length===0&&(a.tankList=await Nt());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await At());break;case"/materials":a.materialList.length===0&&(a.materialList=await Lt());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([Pt(),jt()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([Et(),Tt()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await Oe(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([Me(a.storeSalesDate),It()]));break;default:break}}catch(t){console.warn("Route data load error",t)}finally{a.actionLoading=!1,m()}}function pt(){if(ze())return is(a.authError,a.authSubmitting);if(a.loading)return'<section class="panel"><p>データを読み込んでいます。</p></section>';if(a.error)return`
      <section class="panel error-card">
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${a.error}</p>
      </section>
    `;switch(a.route){case"/cat/sales":return ae("sales");case"/cat/brewery":return ae("brewery");case"/cat/purchase":return ae("purchase");case"/cat/more":return ae("more");case"/invoice-entry":return Qa(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/email":return Ua(cn());case"/delivery":return a.deliveryNote?Ba(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/billing":return a.billingSummary?Ea(a.billingSummary,a.billingYearMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/report":return a.salesReport?Ds(a.salesReport):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/jikomi":return a.jikomiView==="calendar"?`${st(a.jikomiList,a.jikomiView)}${ss(a.jikomiList)}`:st(a.jikomiList,a.jikomiView);case"/tanks":return Hs(a.tankList);case"/kentei":return ns(a.kenteiList);case"/materials":return ds(a.materialList);case"/purchase":return hs(a.purchaseList,a.payableList);case"/raw-material":return vs(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?Ys(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/store":return As(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?gs(a.pipelineMeta,te,Ne):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/import":return Ps(a.importEntity,a.importPreview,a.importing,a.importResult);case"/print":return Ms(a.printTemplate,a.printOptions,a.printCompany,a.printData);case"/form-designer":return Es(a.printData,a.printCompany,a.printOptions,a.fdSavedPositions,a.fdDesignMode)}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.customerLedger||!a.salesAnalytics)return"";switch(a.route){case"/sales":return Ns(Qt(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return ms([...a.paymentStatus.records].sort((e,t)=>t.balanceAmount-e.balanceAmount));case"/master":return rs(a.masterStats,a.masterTab);case"/invoice":return Ga(a.invoiceRecords,a.invoiceFilter);case"/ledger":return Oa(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return xs(a.salesAnalytics,a.analyticsTab);default:return Ja(a.salesSummary,a.pipelineMeta,a.salesAnalytics)}}function un(){if(ze())return`
      <div class="shell auth-shell">
        <main class="main auth-main">
          <div class="view">${pt()}</div>
        </main>
      </div>
    `;const e={dashboard:[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"}]}],sales:[{label:"販売管理",items:[{path:"/cat/sales",label:"販売管理トップ",kicker:"Category"},{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/report",label:"集計帳票",kicker:"Report"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"}]}],brewery:[{label:"蔵内管理",items:[{path:"/cat/brewery",label:"蔵内管理トップ",kicker:"Category"},{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"}]}],purchase:[{label:"仕入管理",items:[{path:"/cat/purchase",label:"仕入管理トップ",kicker:"Category"},{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]}],more:[{label:"その他",items:[{path:"/cat/more",label:"その他トップ",kicker:"Category"},{path:"/tax",label:"酒税申告",kicker:"Tax"},{path:"/store",label:"店舗・直売所",kicker:"Store"},{path:"/analytics",label:"売上分析",kicker:"Analytics"},{path:"/master",label:"マスタ",kicker:"Master"},{path:"/email",label:"メール配信",kicker:"Mail"},{path:"/setup",label:"連動設定",kicker:"Setup"}]}],email:[{label:"メール配信",items:[{path:"/email",label:"季節商品案内",kicker:"Mail"}]}]},t=[{category:"dashboard",path:"/",label:"ダッシュボード"},{category:"sales",path:"/cat/sales",label:"販売管理"},{category:"brewery",path:"/cat/brewery",label:"蔵内管理"},{category:"purchase",path:"/cat/purchase",label:"仕入管理"},{category:"more",path:"/cat/more",label:"その他"},{category:"email",path:"/email",label:"メール配信"}],i=e[a.currentCategory].map(l=>`
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
      `).join(""),n=t.map(l=>`
        <a
          href="${"/sake-system/".replace(/\/$/,"")}${l.path==="/"?"/":l.path}"
          class="category-link ${a.currentCategory===l.category?"active":""}"
          data-link="${l.path}"
        >
          ${l.label}
        </a>
      `).join(""),s=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?Ya(a.masterStats.customers,a.pickerQuery):ys(a.masterStats.products,a.pickerQuery):"",o=a.globalSearchOpen?Ha(a.globalQuery,rn()):"",r=a.user?`
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
          <div class="category-nav">${n}</div>
          <div class="subnav">${i}</div>
        </nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <button class="button secondary" type="button" data-action="global-search-open">検索 (Ctrl+K)</button>
          ${r}
        </header>
        <div class="view ${a.actionLoading?"is-busy":""}">${pt()}</div>
      </main>
      ${s}
      ${o}
    </div>
  `}async function pn(e){a.actionLoading=!0,m();try{a.invoiceRecords=await he(e)}finally{a.actionLoading=!1,m()}}async function mn(e){a.actionLoading=!0,m();try{a.customerLedger=await Re(e)}finally{a.actionLoading=!1,m()}}function E(e){a.invoiceForm={invoiceType:e.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:e.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:e.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:e.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:e.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((t,i)=>{const n=parseFloat(e.querySelector(`[data-line="${i}"][data-field="quantity"]`)?.value??"")||0,s=parseFloat(e.querySelector(`[data-line="${i}"][data-field="unitPrice"]`)?.value??"")||0;return{...t,productCode:e.querySelector(`[data-line="${i}"][data-field="productCode"]`)?.value??t.productCode,productName:e.querySelector(`[data-line="${i}"][data-field="productName"]`)?.value??t.productName,unit:e.querySelector(`[data-line="${i}"][data-field="unit"]`)?.value??t.unit,quantity:n,unitPrice:s,amount:n*s}}),note:e.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function J(e){const t=e.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=t,a.emailRegion=e.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=e.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=e.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=e.querySelector("#email-body")?.value??a.emailBody}function yn(e){e.querySelector("[data-action='global-search-open']")?.addEventListener("click",()=>{a.globalSearchOpen=!0,m()}),e.querySelectorAll("[data-action='global-search-close']").forEach(s=>{s.addEventListener("click",o=>{s.classList.contains("global-search")&&o.target instanceof HTMLElement&&!o.target.classList.contains("global-search")||(ee(),m())})}),e.querySelector("#global-search-input")?.addEventListener("input",s=>{a.globalQuery=s.target.value,m()}),e.querySelectorAll("[data-action='global-nav']").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.path;o&&(ee(),ut(o))})}),e.querySelector("[data-action='csv-export']")?.addEventListener("click",()=>{dn()}),e.querySelectorAll("[data-jikomi-tab]").forEach(s=>{s.addEventListener("click",()=>{a.jikomiView=s.dataset.jikomiTab,m()})}),e.querySelector("[data-action='auth-login']")?.addEventListener("click",()=>{const s=e.querySelector("#auth-email")?.value.trim()??"",o=e.querySelector("#auth-password")?.value??"";a.authSubmitting=!0,a.authError=null,m(),ta(s,o).then(r=>{a.user=r,a.authSkipped=!1,a.authSubmitting=!1,a.authError=null,m()}).catch(async r=>{try{const l=await aa(s,o);a.user=l,a.authSkipped=!1,a.authError=null}catch{a.authError=r instanceof Error?r.message:"ログインに失敗しました。"}finally{a.authSubmitting=!1,m()}})}),e.querySelector("[data-action='auth-skip']")?.addEventListener("click",()=>{a.authSkipped=!0,a.authError=null,m()}),e.querySelector("[data-action='auth-logout']")?.addEventListener("click",()=>{sa().finally(()=>{location.reload()})}),e.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,m()}),e.querySelectorAll("[data-action='sidebar-close']").forEach(s=>{s.addEventListener("click",()=>{a.sidebarOpen=!1,m()})}),e.querySelectorAll("[data-link]").forEach(s=>{s.addEventListener("click",o=>{o.preventDefault(),ut(s.dataset.link)})}),e.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const s=e.querySelector("#sales-start")?.value??"",o=e.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:s,endDate:o},m()}),e.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const s={documentNo:e.querySelector("#invoice-document-no")?.value??"",startDate:e.querySelector("#invoice-start")?.value??"",endDate:e.querySelector("#invoice-end")?.value??"",customerCode:e.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=s,pn(s)}),e.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const s=e.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=s.trim().toUpperCase(),mn(a.ledgerCustomerCode)}),e.querySelectorAll("[data-tab]").forEach(s=>{s.addEventListener("click",()=>{a.masterTab=s.dataset.tab,m()})}),e.querySelectorAll("[data-analytics-tab]").forEach(s=>{s.addEventListener("click",()=>{a.analyticsTab=s.dataset.analyticsTab,m()})}),e.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{E(e),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},m()}),e.querySelectorAll("[data-action='remove-line']").forEach(s=>{s.addEventListener("click",()=>{E(e);const o=parseInt(s.dataset.line??"0",10);a.invoiceForm.lines.splice(o,1),a.invoiceErrors=Yt(a.invoiceForm),m()})}),e.querySelectorAll("[data-action='duplicate-line']").forEach(s=>{s.addEventListener("click",()=>{E(e),sn(parseInt(s.dataset.line??"0",10)),a.invoiceErrors={},m()})}),e.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{nn(),m()}),e.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{E(e),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,m()}),e.querySelectorAll("[data-action='open-product-picker']").forEach(s=>{s.addEventListener("click",()=>{E(e);const o=parseInt(s.dataset.line??"0",10),r=a.invoiceForm.lines[o];a.pickerMode="product",a.pickerTargetLine=o,a.pickerQuery=r?r.productCode||r.productName:"",m()})}),e.querySelectorAll("[data-action='modal-close']").forEach(s=>{s.addEventListener("click",o=>{s.classList.contains("modal-backdrop")&&o.target instanceof HTMLElement&&!o.target.classList.contains("modal-backdrop")||(ve(),m())})}),e.querySelectorAll("[data-action='picker-select']").forEach(s=>{const o=()=>{const r=s.dataset.code??"",l=s.dataset.name??"";if(a.pickerMode==="customer")a.invoiceForm.customerCode=r,a.invoiceForm.customerName=l,delete a.invoiceErrors.customerCode;else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const c=a.invoiceForm.lines[a.pickerTargetLine];c&&(c.productCode=r,c.productName=l,c.amount=c.quantity*c.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`])}ve(),m()};s.addEventListener("click",o),s.addEventListener("keydown",r=>{r.key==="Enter"&&o()})}),e.querySelector("#modal-search")?.addEventListener("input",s=>{a.pickerQuery=s.target.value,m()}),e.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{Ht(),m()}),e.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Kt(e)}),e.querySelector("#inv-customer-code")?.addEventListener("blur",()=>{E(e),on(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,m())}),e.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{E(e),ln(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,m())}),e.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(s=>{s.addEventListener("input",()=>{E(e),a.invoiceSavedDocNo=null})}),e.querySelector("#inv-type")?.addEventListener("change",()=>{E(e),a.invoiceSavedDocNo=null}),e.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const s=e.querySelector("#delivery-docno")?.value??"";a.deliverySearchDocNo=s.trim(),a.deliveryNote=null,a.actionLoading=!0,m(),qe(a.deliverySearchDocNo||"D240122").then(o=>{a.deliveryNote=o,a.actionLoading=!1,m()})}),e.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const s=e.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=s,a.billingSummary=null,a.actionLoading=!0,m(),Ie(s).then(o=>{a.billingSummary=o,a.actionLoading=!1,m()})}),e.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const s=parseInt(e.querySelector("#tax-year")?.value??String(a.taxYear),10),o=parseInt(e.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=s,a.taxMonth=o,a.taxDeclaration=null,a.actionLoading=!0,m(),Oe(s,o).then(r=>{a.taxDeclaration=r,a.actionLoading=!1,m()})}),e.querySelector("[data-action='tax-export-xml']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxXML:s}=await L(async()=>{const{generateTaxXML:d}=await Promise.resolve().then(()=>T);return{generateTaxXML:d}},void 0),o=s(a.taxDeclaration),r=new Blob([o],{type:"application/xml;charset=utf-8"}),l=URL.createObjectURL(r),c=document.createElement("a");c.href=l,c.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.xml`,c.click(),URL.revokeObjectURL(l)}),e.querySelector("[data-action='tax-export-csv']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{generateTaxCSV:s}=await L(async()=>{const{generateTaxCSV:d}=await Promise.resolve().then(()=>T);return{generateTaxCSV:d}},void 0),o=s(a.taxDeclaration),r=new Blob([o],{type:"text/csv;charset=utf-8"}),l=URL.createObjectURL(r),c=document.createElement("a");c.href=l,c.download=`tax-${a.taxYear}-${String(a.taxMonth).padStart(2,"0")}.csv`,c.click(),URL.revokeObjectURL(l)}),e.querySelector("[data-action='tax-save-draft']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{saveTaxDeclaration:s}=await L(async()=>{const{saveTaxDeclaration:o}=await Promise.resolve().then(()=>T);return{saveTaxDeclaration:o}},void 0);try{await s(a.taxDeclaration),alert("下書き保存しました（Supabase tax_declarationsに保存）")}catch(o){alert("保存に失敗: "+(o instanceof Error?o.message:String(o)))}}),e.querySelectorAll("[data-tax-row][data-tax-field]").forEach(s=>{s.addEventListener("change",async()=>{if(!a.taxDeclaration)return;const o=Number(s.dataset.taxRow),r=s.dataset.taxField,l=s.type==="number"?Number(s.value)||0:s.value,c=[...a.taxDeclaration.rows];c[o]={...c[o],[r]:l};const{recalculateTaxDeclaration:d}=await L(async()=>{const{recalculateTaxDeclaration:u}=await Promise.resolve().then(()=>T);return{recalculateTaxDeclaration:u}},void 0);a.taxDeclaration=d({...a.taxDeclaration,rows:c}),m()})}),e.querySelectorAll("[data-ded-row][data-ded-field]").forEach(s=>{s.addEventListener("change",()=>{if(!a.taxDeclaration)return;const o=Number(s.dataset.dedRow),r=s.dataset.dedField,l=s.type==="number"?Number(s.value)||0:s.value,c=[...a.taxDeclaration.deductions];c[o]={...c[o],[r]:l},a.taxDeclaration={...a.taxDeclaration,deductions:c},m()})}),e.querySelectorAll("input[data-tax-field]:not([data-tax-row])").forEach(s=>{s.addEventListener("change",()=>{if(!a.taxDeclaration)return;const o=s.dataset.taxField;a.taxDeclaration={...a.taxDeclaration,[o]:s.value}})}),e.querySelector("[data-action='tax-add-category']")?.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const{recalculateTaxDeclaration:s,TAX_RATE_CATEGORIES:o}=await L(async()=>{const{recalculateTaxDeclaration:c,TAX_RATE_CATEGORIES:d}=await Promise.resolve().then(()=>T);return{recalculateTaxDeclaration:c,TAX_RATE_CATEGORIES:d}},void 0),r=o[0],l={taxCategory:r.code,taxCategoryName:r.name,alcoholDegree:15,productionVolume:0,previousBalance:0,currentAdjustment:0,exportDeduction:0,sampleDeduction:0,taxableVolume:0,volume:0,taxRate:r.taxRatePerLiter,taxAmount:0};a.taxDeclaration=s({...a.taxDeclaration,rows:[...a.taxDeclaration.rows,l]}),m()}),e.querySelectorAll("[data-action='tax-remove-category']").forEach(s=>{s.addEventListener("click",async()=>{if(!a.taxDeclaration)return;const o=Number(s.dataset.taxRow),{recalculateTaxDeclaration:r}=await L(async()=>{const{recalculateTaxDeclaration:c}=await Promise.resolve().then(()=>T);return{recalculateTaxDeclaration:c}},void 0),l=a.taxDeclaration.rows.filter((c,d)=>d!==o);a.taxDeclaration=r({...a.taxDeclaration,rows:l}),m()})}),e.querySelector("[data-action='tax-add-deduction']")?.addEventListener("click",()=>{if(!a.taxDeclaration)return;const s={type:"export",categoryCode:"01",volume:0,reason:"",documentNo:""};a.taxDeclaration={...a.taxDeclaration,deductions:[...a.taxDeclaration.deductions,s]},m()}),e.querySelectorAll("[data-action='tax-remove-deduction']").forEach(s=>{s.addEventListener("click",()=>{if(!a.taxDeclaration)return;const o=Number(s.dataset.dedRow),r=a.taxDeclaration.deductions.filter((l,c)=>c!==o);a.taxDeclaration={...a.taxDeclaration,deductions:r},m()})}),e.querySelectorAll("[data-store-tab]").forEach(s=>{s.addEventListener("click",()=>{a.storeTab=s.dataset.storeTab,m()})}),e.querySelectorAll("[data-import-entity]").forEach(s=>{s.addEventListener("click",()=>{a.importEntity=s.dataset.importEntity,a.importPreview=null,a.importResult=null,m()})}),e.querySelector("[data-action='download-template']")?.addEventListener("click",()=>{const s=Vs(a.importEntity),o=new Blob([s],{type:"text/csv;charset=utf-8"}),r=URL.createObjectURL(o),l=document.createElement("a");l.href=r,l.download=`template_${a.importEntity}.csv`,l.click(),URL.revokeObjectURL(r)}),e.querySelector("[data-action='import-parse']")?.addEventListener("click",()=>{const o=e.querySelector("#import-file")?.files?.[0];if(!o){alert("CSVファイルを選択してください");return}const r=new FileReader;r.onload=()=>{const l=String(r.result??""),{columns:c,rows:d}=zs(l);a.importPreview=Bs(a.importEntity,c,d),a.importResult=null,m()},r.readAsText(o,"utf-8")}),e.querySelector("[data-action='import-cancel']")?.addEventListener("click",()=>{a.importPreview=null,a.importResult=null,m()}),e.querySelectorAll("[data-print-template]").forEach(s=>{s.addEventListener("click",()=>{a.printTemplate=s.dataset.printTemplate,m()})}),e.querySelectorAll("[data-print-field]").forEach(s=>{s.addEventListener("change",()=>{const o=s.dataset.printField;let r=s.value;(o==="taxRate"||o==="previousBalance"||o==="paymentAmount")&&(r=Number(s.value)||0),a.printData={...a.printData,[o]:r},m()})}),e.querySelectorAll("[data-print-opt]").forEach(s=>{const o=()=>{const r=s.dataset.printOpt;let l;s.type==="checkbox"?l=s.checked:r==="copies"?l=Number(s.value)||1:r==="overlayOpacity"||r==="calibrationOffsetX"||r==="calibrationOffsetY"?l=Number(s.value)||0:l=s.value,a.printOptions={...a.printOptions,[r]:l},m()};s.addEventListener("change",o),s.type==="range"&&s.addEventListener("input",o)}),e.querySelectorAll("[data-print-line][data-print-lfield]").forEach(s=>{s.addEventListener("change",()=>{const o=Number(s.dataset.printLine),r=s.dataset.printLfield,l=[...a.printData.lines];let c=s.value;(r==="quantity"||r==="unitPrice")&&(c=Number(s.value)||0),l[o]={...l[o],[r]:c},l[o].amount=(Number(l[o].quantity)||0)*(Number(l[o].unitPrice)||0),a.printData={...a.printData,lines:l},m()})}),e.querySelector("[data-action='print-add-line']")?.addEventListener("click",()=>{a.printData={...a.printData,lines:[...a.printData.lines,{productCode:"",productName:"",spec:"",quantity:0,unit:"本",unitPrice:0,amount:0}]},m()}),e.querySelectorAll("[data-action='print-remove-line']").forEach(s=>{s.addEventListener("click",()=>{const o=Number(s.dataset.printLine);a.printData={...a.printData,lines:a.printData.lines.filter((r,l)=>l!==o)},m()})}),e.querySelector("[data-action='print-save-settings']")?.addEventListener("click",()=>{try{localStorage.setItem("sake_print_options",JSON.stringify(a.printOptions)),localStorage.setItem("sake_print_company",JSON.stringify(a.printCompany)),alert("印刷設定を保存しました（次回以降も使えます）")}catch(s){alert("保存失敗: "+(s instanceof Error?s.message:String(s)))}}),e.querySelector("[data-action='print-open-company']")?.addEventListener("click",()=>{const s=a.printCompany,o=prompt("会社名",s.name);if(o===null)return;const r=prompt("郵便番号",s.postalCode)??s.postalCode,l=prompt("住所",s.address1)??s.address1,c=prompt("TEL",s.tel)??s.tel,d=prompt("FAX",s.fax)??s.fax,u=prompt("適格請求書登録番号 (T+13桁)",s.registrationNo)??s.registrationNo,p=prompt("取引銀行名",s.bankName)??s.bankName,y=prompt("支店名",s.bankBranch)??s.bankBranch,h=prompt("口座番号",s.bankAccountNo)??s.bankAccountNo,_=prompt("口座名義",s.bankAccountHolder)??s.bankAccountHolder;a.printCompany={...s,name:o,postalCode:r,address1:l,tel:c,fax:d,registrationNo:u,bankName:p,bankBranch:y,bankAccountNo:h,bankAccountHolder:_},m()}),e.querySelector("[data-action='fd-toggle-design']")?.addEventListener("click",()=>{a.fdDesignMode=!a.fdDesignMode,m()}),e.querySelector("[data-action='fd-save-cloud']")?.addEventListener("click",async()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const r=(e.querySelector("#fd-layout-name")?.value??"").trim()||"デフォルト",l=ke(s),{savePrintLayout:c}=await L(async()=>{const{savePrintLayout:u}=await Promise.resolve().then(()=>T);return{savePrintLayout:u}},void 0),d={id:`bp1701_${r.replaceAll(/[^a-zA-Z0-9_-]/g,"_")}_${Date.now()}`,name:r,templateKey:"chain_store",positions:l};try{await c(d)?(alert(`☁️ クラウド保存成功: ${r}`),a.fdSavedPositions=l,localStorage.setItem("sake_fd_positions",JSON.stringify(l)),m()):(alert("保存に失敗しました。ローカルには保存されました。"),localStorage.setItem("sake_fd_positions",JSON.stringify(l)))}catch(u){alert("保存エラー: "+(u instanceof Error?u.message:""))}}),e.querySelector("[data-action='fd-save-local']")?.addEventListener("click",()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const o=ke(s);a.fdSavedPositions=o;try{localStorage.setItem("sake_fd_positions",JSON.stringify(o)),alert(`📁 このPCに保存: ${Object.keys(o).length}件`)}catch(r){alert("保存失敗: "+(r instanceof Error?r.message:""))}}),e.querySelector("[data-action='fd-export-json']")?.addEventListener("click",()=>{const s=e.querySelector(".fd-canvas");if(!s)return;const r={templateKey:"chain_store",positions:ke(s),exportedAt:new Date().toISOString()},l=new Blob([JSON.stringify(r,null,2)],{type:"application/json"}),c=URL.createObjectURL(l),d=document.createElement("a");d.href=c,d.download=`bp1701_layout_${new Date().toISOString().slice(0,10)}.json`,d.click(),URL.revokeObjectURL(c)}),e.querySelector("[data-action='fd-import-json']")?.addEventListener("click",()=>{e.querySelector("#fd-import-file")?.click()}),e.querySelector("#fd-import-file")?.addEventListener("change",async s=>{const o=s.target.files?.[0];if(o)try{const r=await o.text(),c=JSON.parse(r).positions;if(!c)throw new Error("positions field not found");a.fdSavedPositions=c,localStorage.setItem("sake_fd_positions",JSON.stringify(c)),alert(`📥 インポート成功: ${Object.keys(c).length}件`),m()}catch(r){alert("インポート失敗: "+(r instanceof Error?r.message:""))}});const t=e.querySelector("#fd-saved-layouts");t&&a.route==="/form-designer"&&a.fdDesignMode&&(async()=>{const{fetchPrintLayouts:s}=await L(async()=>{const{fetchPrintLayouts:r}=await Promise.resolve().then(()=>T);return{fetchPrintLayouts:r}},void 0),o=await s("chain_store");o.length===0?t.innerHTML="☁️ クラウドに保存されたレイアウトはありません":(t.innerHTML=`☁️ クラウド保存済み (${o.length}件):<br/>`+o.map(r=>`<button class="button-sm secondary" data-action="fd-load-layout" data-layout-id="${r.id}" style="margin:4px 4px 0 0;">${r.name}</button>
                 <button class="button-sm secondary" data-action="fd-delete-layout" data-layout-id="${r.id}" title="削除" style="margin:4px 8px 0 0;color:var(--danger);">✕</button>`).join(""),t.querySelectorAll("[data-action='fd-load-layout']").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.layoutId,c=o.find(d=>d.id===l);c&&(a.fdSavedPositions=c.positions,localStorage.setItem("sake_fd_positions",JSON.stringify(c.positions)),alert(`読込完了: ${c.name}`),m())})}),t.querySelectorAll("[data-action='fd-delete-layout']").forEach(r=>{r.addEventListener("click",async()=>{const l=r.dataset.layoutId;if(!l||!confirm("このレイアウトを削除しますか？"))return;const{deletePrintLayout:c}=await L(async()=>{const{deletePrintLayout:u}=await Promise.resolve().then(()=>T);return{deletePrintLayout:u}},void 0);await c(l)?(alert("削除しました"),m()):alert("削除失敗")})}))})(),e.querySelector("[data-action='fd-reset-positions']")?.addEventListener("click",()=>{confirm("フィールド位置を初期値に戻しますか？")&&(a.fdSavedPositions=null,localStorage.removeItem("sake_fd_positions"),m())});const i=e.querySelector("#fd-sel-x"),n=e.querySelector("#fd-sel-y");[i,n].forEach(s=>{s?.addEventListener("change",()=>{if(!a.fdActiveFieldId)return;const o=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);o&&(i&&(o.style.left=i.value+"mm"),n&&(o.style.top=n.value+"mm"))})}),e.querySelector("[data-action='import-execute']")?.addEventListener("click",async()=>{if(a.importPreview){a.importing=!0,m();try{const s=a.importPreview.rows.filter(r=>r._valid),o=await Us(a.importEntity,s);a.importResult=`取り込み完了: ${o.inserted}件成功 / ${o.failed}件失敗`,a.importPreview=null}catch(s){a.importResult=`エラー: ${s instanceof Error?s.message:String(s)}`}finally{a.importing=!1,m()}}}),e.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const s=e.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=s,a.storeSales=[],a.actionLoading=!0,m(),Me(s).then(o=>{a.storeSales=o,a.actionLoading=!1,m()})}),e.querySelectorAll("[data-action='copy-config']").forEach(s=>{s.addEventListener("click",async()=>{const o=s.dataset.configValue??"";if(o)try{await navigator.clipboard.writeText(o),s.textContent="コピー済み",window.setTimeout(()=>{s.textContent="コピー"},1600)}catch(r){console.warn("Clipboard copy failed",r)}})}),e.querySelector("[data-action='download-relay-config']")?.addEventListener("click",()=>{const o=JSON.stringify({supabase_url:te,supabase_anon_key:"（Supabaseダッシュボードから取得して貼り付け）",z_drive_path:"Z:\\",sync_modules:["sk","sh","k5","h5"],interval_minutes:5,use_odbc:!1,odbc_dsn:"MagicSake",log_level:"INFO"},null,2),r=new Blob([o],{type:"application/json;charset=utf-8"}),l=URL.createObjectURL(r),c=document.createElement("a");c.href=l,c.download="relay_config.json",c.click(),URL.revokeObjectURL(l)}),e.querySelectorAll("[data-action='copy-code']").forEach(s=>{s.addEventListener("click",async()=>{const o=s.dataset.code??"";if(o)try{await navigator.clipboard.writeText(decodeURIComponent(o)),s.textContent="コピー済み",window.setTimeout(()=>{s.textContent="コピー"},1600)}catch(r){console.warn("Clipboard code copy failed",r)}})}),e.querySelectorAll("input[name='email-audience-mode']").forEach(s=>{s.addEventListener("change",()=>{J(e),a.emailSaveMessage=null,m()})}),e.querySelectorAll("#email-region, #email-history-segment").forEach(s=>{s.addEventListener("change",()=>{J(e),a.emailSaveMessage=null,m()})}),e.querySelector("#email-subject")?.addEventListener("input",()=>{J(e),a.emailSaveMessage=null}),e.querySelector("#email-body")?.addEventListener("input",()=>{J(e),a.emailSaveMessage=null}),e.querySelectorAll("[data-action='template-select']").forEach(s=>{s.addEventListener("click",()=>{a.emailTemplateId=s.dataset.templateId??"custom";const o=Vt(a.emailTemplateId);a.emailSubject=o.subject,a.emailBody=o.body,a.emailSaveMessage=null,m()})}),e.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{J(e);const s=`

商品詳細はこちら: https://example.jp/products/seasonal`;a.emailBody.includes("https://example.jp/products/seasonal")||(a.emailBody=`${a.emailBody.trimEnd()}${s}`),a.emailSaveMessage=null,m()}),e.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{J(e),a.actionLoading=!0,m(),ue(xe("draft")).then(s=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(s.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,m()})}),e.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{J(e),a.actionLoading=!0,a.emailSending=!0,m();const s=xe("sent");Ot().then(async o=>{await ue({...s,recipientCount:o.sent}),a.emailSaveMessage=`${o.sent.toLocaleString("ja-JP")} 件送信しました。`,a.actionLoading=!1,a.emailSending=!1,m(),window.alert(`${o.sent}件送信完了`)}).catch(async()=>{await ue(xe("draft")),a.emailSaveMessage="APIキー未設定のため下書きを保存しました。",a.actionLoading=!1,a.emailSending=!1,m(),window.alert("APIキー未設定のため下書き保存しました")})})}function m(){const e=document.querySelector("#app");e&&(e.innerHTML=un(),yn(e),a.pickerMode&&e.querySelector("#modal-search")?.focus(),a.globalSearchOpen&&e.querySelector("#global-search-input")?.focus(),ze()&&e.querySelector("#auth-email")?.focus(),requestAnimationFrame(()=>{for(const t of["fd-scaler","print-scaler"]){const i=e.querySelector(`#${t}`),n=i?.querySelector(".fd-canvas, .print-preview"),s=n?.querySelector(".print-page")??n;if(!i||!s)continue;const o=i.parentElement?.clientWidth??0,r=s.offsetWidth;if(o>0&&r>0&&r>o-24){const l=(o-24)/r;i.style.transform=`scale(${l})`,i.style.transformOrigin="top left",i.style.height=`${(s.offsetHeight+48)*l}px`}else i.style.transform="",i.style.height=""}}))}async function hn(){a.loading=!0,m();try{const[e,t,i,n,s,o,r]=await Promise.all([gt(),$t(),kt(),St(),he(a.invoiceFilter),Re(a.ledgerCustomerCode),wt()]);if(a.salesSummary=e,a.paymentStatus=t,a.masterStats=i,a.pipelineMeta=n,a.invoiceRecords=s,a.customerLedger=o,a.salesAnalytics=r,!a.salesFilter.startDate||!a.salesFilter.endDate){const c=[...e.salesRecords].sort((p,y)=>new Date(y.date).getTime()-new Date(p.date).getTime())[0]?.date??new Date().toISOString(),d=new Date(c),u=new Date(d);u.setDate(d.getDate()-30),a.salesFilter={startDate:dt(u.toISOString()),endDate:dt(d.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await he(a.invoiceFilter)),a.error=null}catch(e){a.error=e instanceof Error?e.message:"データの取得に失敗しました。"}finally{a.loading=!1,m(),Be(a.route)}}window.addEventListener("popstate",()=>{a.route=Ut(location.pathname),a.currentCategory=Je(a.route),a.sidebarOpen=!1,ee(),Be(a.route)});window.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault(),a.globalSearchOpen=!0,m();return}if(e.key==="Escape"){if(a.globalSearchOpen){ee(),m();return}if(a.pickerMode){ve(),m();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(Ht(),m());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="s"){e.preventDefault();const t=document.querySelector("#app");t&&Kt(t)}});a.user=je()?na():null;try{const e=localStorage.getItem("sake_print_options");e&&(a.printOptions={...a.printOptions,...JSON.parse(e)});const t=localStorage.getItem("sake_print_company");t&&(a.printCompany={...a.printCompany,...JSON.parse(t)});const i=localStorage.getItem("sake_fd_positions");i&&(a.fdSavedPositions=JSON.parse(i))}catch{}(function(){let t=null,i=0,n=0,s=0,o=0,r=1;document.addEventListener("mousedown",l=>{const c=l.target.closest(".fd-draggable");if(!c||!a.fdDesignMode)return;l.preventDefault();const d=c.closest(".fd-canvas");if(!d)return;const u=d.getBoundingClientRect();if(u.width===0)return;r=228.6/u.width,t=c,i=l.clientX,n=l.clientY,s=parseFloat(c.style.left)||0,o=parseFloat(c.style.top)||0,document.querySelectorAll(".fd-active").forEach(_=>_.classList.remove("fd-active")),c.classList.add("fd-active","fd-dragging"),a.fdActiveFieldId=c.dataset.fdId??null;const p=document.querySelector("#fd-selected-info");p&&(p.textContent=`選択中: ${c.title}`);const y=document.querySelector("#fd-sel-x"),h=document.querySelector("#fd-sel-y");y&&(y.value=String(s)),h&&(h.value=String(o))}),document.addEventListener("mousemove",l=>{if(!t)return;const c=(l.clientX-i)*r,d=(l.clientY-n)*r,u=Math.round((s+c)*2)/2,p=Math.round((o+d)*2)/2;t.style.left=u+"mm",t.style.top=p+"mm";const y=document.querySelector("#fd-sel-x"),h=document.querySelector("#fd-sel-y");y&&(y.value=String(u)),h&&(h.value=String(p))}),document.addEventListener("mouseup",()=>{t&&(t.classList.remove("fd-dragging"),t=null)}),document.addEventListener("keydown",l=>{if(!a.fdDesignMode||!a.fdActiveFieldId||l.key!=="ArrowLeft"&&l.key!=="ArrowRight"&&l.key!=="ArrowUp"&&l.key!=="ArrowDown"||l.target.tagName==="INPUT"||l.target.tagName==="TEXTAREA")return;const c=document.querySelector(`[data-fd-id="${a.fdActiveFieldId}"]`);if(!c)return;l.preventDefault();const d=.5;let u=parseFloat(c.style.left)||0,p=parseFloat(c.style.top)||0;l.key==="ArrowLeft"?u-=d:l.key==="ArrowRight"?u+=d:l.key==="ArrowUp"?p-=d:l.key==="ArrowDown"&&(p+=d),c.style.left=u+"mm",c.style.top=p+"mm";const y=document.querySelector("#fd-sel-x"),h=document.querySelector("#fd-sel-y");y&&(y.value=String(u)),h&&(h.value=String(p))})})();hn();
