(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(i){if(i.ep)return;i.ep=!0;const c=n(i);fetch(i.href,c)}})();const Jt="https://loarwnuyvfxiscjjsmiz.supabase.co",Ot="";async function St(t,e){return null}async function g(t,e={}){return[]}const Ct={spring:{id:"spring",season:"春",subject:"新酒のご案内",body:`いつもお世話になっております。

今年の新酒が揃いました。軽やかな香りとみずみずしい味わいを、この時期だけの限定商品としてご案内いたします。

ご注文やご相談がございましたら、本メールへのご返信にてお知らせください。

今後ともよろしくお願いいたします。`},summer:{id:"summer",season:"夏",subject:"夏の冷酒・リキュールのご案内",body:`いつもお世話になっております。

夏向けの冷酒とリキュールのご案内です。売り場で動きやすい商品を中心に、季節提案向けのラインアップをまとめました。

ご希望の商品がございましたら、必要本数とあわせてご連絡ください。`},autumn:{id:"autumn",season:"秋",subject:"ひやおろしのご案内",body:`いつもお世話になっております。

秋の定番商品「ひやおろし」のご案内です。熟成によるまろやかさと、季節感のある売り場演出に適した商品をご用意しました。

導入をご検討の際は、お気軽にお問い合わせください。`},winter:{id:"winter",season:"冬",subject:"しぼりたて・にごり酒のご案内",body:`いつもお世話になっております。

冬季限定のしぼりたて・にごり酒のご案内です。年末年始商戦に合わせて、動きの早い商品を中心にご提案いたします。

ご注文締切や納品希望日がございましたら、あわせてお知らせください。`}},W={generatedAt:"2026-04-15T09:15:00+09:00",kpis:{todaySales:1248e3,todayDelta:8.2,monthSales:18245e3,monthDelta:5.6,unpaidCount:7,unpaidAmount:264e4},dailySales:Array.from({length:30},(t,e)=>{const n=new Date("2026-03-17T00:00:00+09:00");return n.setDate(n.getDate()+e),{date:n.toISOString(),amount:42e4+e*73123%62e4}}),salesRecords:Array.from({length:20},(t,e)=>{const n=new Date("2026-04-15T00:00:00+09:00");return n.setDate(n.getDate()-e),{id:`sale-${e+1}`,documentNo:`D${String(240100+e).padStart(6,"0")}`,date:n.toISOString(),customerCode:`C${String(e+11).padStart(4,"0")}`,customerName:["青葉商事","北斗酒販","中央フーズ","東海酒店"][e%4],amount:68e3+e%6*24500}})},Bt={generatedAt:"2026-04-15T09:15:00+09:00",records:[{id:"pay-1",customerCode:"C0011",customerName:"青葉商事",billedAmount:54e4,paymentAmount:0,balanceAmount:54e4,lastPaymentDate:null,status:"unpaid"},{id:"pay-2",customerCode:"C0012",customerName:"北斗酒販",billedAmount:72e4,paymentAmount:3e5,balanceAmount:42e4,lastPaymentDate:"2026-04-11T14:30:00+09:00",status:"partial"},{id:"pay-3",customerCode:"C0013",customerName:"中央フーズ",billedAmount:68e4,paymentAmount:68e4,balanceAmount:0,lastPaymentDate:"2026-04-14T10:00:00+09:00",status:"paid"},{id:"pay-4",customerCode:"C0014",customerName:"東海酒店",billedAmount:41e4,paymentAmount:18e4,balanceAmount:23e4,lastPaymentDate:"2026-04-10T09:10:00+09:00",status:"partial"}]},S={generatedAt:"2026-04-15T09:15:00+09:00",summary:{customerCount:164,activeCustomerCount:152,productCount:486,activeProductCount:461},customers:Array.from({length:12},(t,e)=>({id:`customer-${e+1}`,code:`C${String(e+1).padStart(4,"0")}`,name:["青葉商事","北斗酒販","中央フーズ","東海酒店","三和物産","南星リカー"][e%6],closingDay:[15,20,25,31][e%4],paymentDay:[5,10,15,20][e%4],isActive:e%5!==0})),products:Array.from({length:12},(t,e)=>({id:`product-${e+1}`,code:`P${String(e+1).padStart(5,"0")}`,janCode:`4901234567${String(e).padStart(3,"0")}`,name:["純米吟醸 720ml","本醸造 1.8L","特別純米 300ml","梅酒 500ml"][e%4],category:["清酒","焼酎","リキュール"][e%3],isActive:e%6!==0}))},Ht={generatedAt:"2026-04-15T09:15:00+09:00",lastSyncAt:"2026-04-15T09:12:21+09:00",status:"success",jobName:"daily-sync",message:"同期完了。売上・入金・マスタを最新化しました。"},wt=W.salesRecords.map((t,e)=>({...t,itemCount:e%4+1})),Kt={C0011:{customerCode:"C0011",customerName:"青葉商事",balanceAmount:54e4,salesTotal:114e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-1",date:"2026-04-15T00:00:00+09:00",documentNo:"D240100",amount:42e4},{id:"ledger-sale-2",date:"2026-04-08T00:00:00+09:00",documentNo:"D240087",amount:39e4},{id:"ledger-sale-3",date:"2026-03-28T00:00:00+09:00",documentNo:"D240059",amount:33e4}],paymentHistory:[{id:"ledger-payment-1",date:"2026-04-10T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-2",date:"2026-03-31T00:00:00+09:00",amount:3e5,method:"振込"}]},C0012:{customerCode:"C0012",customerName:"北斗酒販",balanceAmount:42e4,salesTotal:102e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-4",date:"2026-04-14T00:00:00+09:00",documentNo:"D240101",amount:36e4},{id:"ledger-sale-5",date:"2026-04-05T00:00:00+09:00",documentNo:"D240082",amount:32e4},{id:"ledger-sale-6",date:"2026-03-25T00:00:00+09:00",documentNo:"D240054",amount:34e4}],paymentHistory:[{id:"ledger-payment-3",date:"2026-04-11T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-4",date:"2026-03-30T00:00:00+09:00",amount:3e5,method:"現金"}]}},Q={productTotals:[{code:"P00001",name:"純米吟醸 720ml",amount:584e4,quantity:820,documents:148},{code:"P00002",name:"本醸造 1.8L",amount:498e4,quantity:610,documents:131},{code:"P00003",name:"特別純米 300ml",amount:356e4,quantity:1240,documents:112},{code:"P00004",name:"梅酒 500ml",amount:287e4,quantity:540,documents:89}],customerTotals:[{code:"C0011",name:"青葉商事",amount:462e4,quantity:320,documents:54},{code:"C0012",name:"北斗酒販",amount:438e4,quantity:294,documents:49},{code:"C0013",name:"中央フーズ",amount:391e4,quantity:276,documents:45},{code:"C0014",name:"東海酒店",amount:324e4,quantity:221,documents:37}]};function v(t){if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="string"){const e=Number(t);return Number.isFinite(e)?e:0}return 0}function Ut(t){switch((t??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function Yt(t){return typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"?["true","1","active","enabled","yes","y"].includes(t.toLowerCase()):!1}function $(t,e,n=""){for(const s of e){const i=t[s];if(typeof i=="string"&&i.length>0)return i}return n}function ot(t,e,n=0){for(const s of e)if(s in t)return v(t[s]);return n}function rt(t,e,n=!0){for(const s of e)if(s in t)return Yt(t[s]);return n}function Dt(t,e,n){for(const s of e){const i=t[s];if(typeof i!="string"||i.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(i))return new Date(`${i}T00:00:00Z`).toISOString();const c=new Date(i);if(!Number.isNaN(c.getTime()))return c.toISOString()}return n}function Nt(t){return t.slice(0,7)}function nt(t,e){return{id:String(t.id??`invoice-${e+1}`),documentNo:t.document_no??t.legacy_document_no??`D${String(240100+e).padStart(6,"0")}`,date:Dt(t,["sales_date","document_date"],new Date().toISOString()),customerCode:t.customer_code??t.legacy_customer_code??`C${String(e+1).padStart(4,"0")}`,customerName:t.customer_name??t.customer_code??t.legacy_customer_code??"不明",itemCount:0,amount:v(t.total_amount??t.billed_amount)}}function dt(t,e){const n=e.startDate?new Date(`${e.startDate}T00:00:00`):null,s=e.endDate?new Date(`${e.endDate}T23:59:59`):null,i=e.documentNo.trim().toLowerCase(),c=e.customerCode.trim().toLowerCase();return t.filter(l=>{const p=new Date(l.date);return!(n&&p<n||s&&p>s||i&&!l.documentNo.toLowerCase().includes(i)||c&&!l.customerCode.toLowerCase().includes(c))}).sort((l,p)=>new Date(p.date).getTime()-new Date(l.date).getTime())}function ut(t){const e=t.trim().toUpperCase(),n=Kt[e];if(n)return n;const s=W.salesRecords.find(i=>i.customerCode.toUpperCase()===e);return{customerCode:e||"未指定",customerName:s?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}function Vt(){const t=new Map,e=new Map,n=new Map;return wt.forEach((s,i)=>{const c=Nt(s.date);t.set(c,(t.get(c)??0)+s.amount);const l=e.get(s.customerCode)??{code:s.customerCode,name:s.customerName,amount:0,quantity:0,documents:0};l.amount+=s.amount,l.quantity+=s.itemCount,l.documents+=1,e.set(s.customerCode,l);const p=`P${String(i%4+1).padStart(5,"0")}`,r=Q.productTotals[i%Q.productTotals.length],o=n.get(p)??{code:p,name:r?.name??`商品${i+1}`,amount:0,quantity:0,documents:0};o.amount+=s.amount,o.quantity+=s.itemCount*12,o.documents+=1,n.set(p,o)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(t.entries()).sort(([s],[i])=>s.localeCompare(i)).map(([s,i])=>({month:s,amount:i})),productTotals:Array.from(n.values()).sort((s,i)=>i.amount-s.amount),customerTotals:Array.from(e.values()).sort((s,i)=>i.amount-s.amount)}}async function y(t,e){try{const n=await fetch(`/sake-system/${t}`,{headers:{Accept:"application/json"}});if(!n.ok)throw new Error(`HTTP ${n.status}`);return await n.json()}catch(n){return console.warn(`Failed to fetch ${t}, using fallback data`,n),e}}async function Wt(){const t=await g("daily_sales_fact",{});if(t.length>0){const e=await g("customer_payment_status",{}),s=new Date().toISOString().slice(0,10),i=s.slice(0,7),c=[...t].sort((o,d)=>o.sales_date.localeCompare(d.sales_date)).slice(-30).map(o=>({date:new Date(`${o.sales_date}T00:00:00Z`).toISOString(),amount:v(o.sales_amount)})),l=t.reduce((o,d)=>d.sales_date===s?o+v(d.sales_amount):o,0),p=t.reduce((o,d)=>d.sales_date.startsWith(i)?o+v(d.sales_amount):o,0),r=e.filter(o=>v(o.balance_amount)>0);return{generatedAt:new Date().toISOString(),kpis:{todaySales:l,todayDelta:0,monthSales:p,monthDelta:0,unpaidCount:r.length,unpaidAmount:r.reduce((o,d)=>o+v(d.balance_amount),0)},dailySales:c,salesRecords:W.salesRecords}}return y("data/api/latest/sales-summary.json",W)}async function Qt(){const t=await g("customer_payment_status",{});return t.length>0?{generatedAt:new Date().toISOString(),records:t.map((e,n)=>{const s=e.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${s}-${n+1}`,customerCode:s,customerName:s,billedAmount:v(e.billed_amount),paymentAmount:v(e.paid_amount),balanceAmount:v(e.balance_amount),lastPaymentDate:null,status:Ut(e.payment_status)}})}:y("data/api/latest/payment-status.json",Bt)}async function zt(){const[t,e]=await Promise.all([g(),g()]);if(t.length>0||e.length>0){const n=t.length?t.map((i,c)=>({id:$(i,["id","customer_id","code"],`customer-${c+1}`),code:$(i,["code","customer_code","legacy_customer_code"],`C${String(c+1).padStart(4,"0")}`),name:$(i,["name","customer_name","display_name"],`Customer ${c+1}`),closingDay:ot(i,["closing_day","close_day"],31),paymentDay:ot(i,["payment_day","due_day"],15),isActive:rt(i,["is_active","active","enabled"],!0)})):S.customers,s=e.length?e.map((i,c)=>({id:$(i,["id","product_id","code"],`product-${c+1}`),code:$(i,["code","product_code"],`P${String(c+1).padStart(5,"0")}`),janCode:$(i,["jan_code","jan","barcode"],""),name:$(i,["name","product_name","display_name"],`Product ${c+1}`),category:$(i,["category","category_name"],"未分類"),isActive:rt(i,["is_active","active","enabled"],!0)})):S.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:t.length||S.summary.customerCount,activeCustomerCount:t.length?n.filter(i=>i.isActive).length:S.summary.activeCustomerCount,productCount:e.length||S.summary.productCount,activeProductCount:e.length?s.filter(i=>i.isActive).length:S.summary.activeProductCount},customers:n,products:s}}return y("data/api/latest/master-stats.json",S)}function Gt(){return y("data/api/latest/pipeline-meta.json",Ht)}async function at(t){const[e,n]=await Promise.all([g("sales_document_headers",{}),g("sales_document_lines",{})]);if(e.length>0){const s=new Map;n.forEach(c=>{const l=String(c.header_id??c.document_header_id??c.document_no??c.id??"");l&&s.set(l,(s.get(l)??0)+1)});const i=e.map((c,l)=>{const p=nt(c,l),r=String(c.id??c.document_no??c.legacy_document_no??"");return{...p,itemCount:s.get(r)??p.itemCount}});return dt(i,t)}return dt(wt,t)}async function At(t){const e=t.trim().toUpperCase();if(!e)return ut("");const[n,s,i]=await Promise.all([g("sales_document_headers",{}),g("customer_payments",{}),g("customer_payment_status",{})]);if(n.length>0||s.length>0){const c=n.map((r,o)=>{const d=nt(r,o);return{id:d.id,date:d.date,documentNo:d.documentNo,amount:d.amount}}),l=s.map((r,o)=>({id:String(r.id??`payment-${o+1}`),date:Dt(r,["payment_date","received_date"],new Date().toISOString()),amount:v(r.payment_amount??r.amount),method:r.payment_method??r.method??"入金"})),p=i.find(r=>(r.legacy_customer_code??"").toUpperCase()===e);return{customerCode:e,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??e,balanceAmount:v(p?.balance_amount),salesTotal:c.reduce((r,o)=>r+o.amount,0),paymentTotal:l.reduce((r,o)=>r+o.amount,0),salesHistory:c,paymentHistory:l}}return ut(e)}async function Zt(){const[t,e,n]=await Promise.all([g("daily_sales_fact",{}),g("sales_document_headers",{}),g("sales_document_lines",{})]);if(t.length>0){const s=new Map;t.forEach(l=>{const p=Nt(l.sales_date);s.set(p,(s.get(p)??0)+v(l.sales_amount))});const i=new Map;e.forEach((l,p)=>{const r=nt(l,p),o=i.get(r.customerCode)??{code:r.customerCode,name:r.customerName,amount:0,quantity:0,documents:0};o.amount+=r.amount,o.documents+=1,i.set(r.customerCode,o)});const c=new Map;return n.forEach((l,p)=>{const r=l.product_code??l.legacy_product_code??`P${String(p+1).padStart(5,"0")}`,o=c.get(r)??{code:r,name:l.product_name??r,amount:0,quantity:0,documents:0};o.amount+=v(l.line_amount??l.amount),o.quantity+=v(l.quantity),o.documents+=1,c.set(r,o)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(s.entries()).sort(([l],[p])=>l.localeCompare(p)).map(([l,p])=>({month:l,amount:p})).slice(-12),productTotals:c.size>0?Array.from(c.values()).sort((l,p)=>p.amount-l.amount):Q.productTotals,customerTotals:i.size>0?Array.from(i.values()).sort((l,p)=>p.amount-l.amount):Q.customerTotals}}return Vt()}const pt={sales:"売上",return:"返品",export_return:"輸出戻入"};async function Xt(t){const e=t.lines.reduce((i,c)=>i+c.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await St("sales_document_headers",{legacy_customer_code:t.customerCode,sales_date:t.invoiceDate,document_type:t.invoiceType,staff_code:t.staffCode}))?.id??`local-${n}`,documentNo:n,totalAmount:e,status:"confirmed",createdAt:new Date().toISOString()}}const mt={documentNo:"D240122",invoiceDate:"2026-04-14",customerCode:"C0011",customerName:"青葉商事 株式会社",customerAddress:"〒123-4567 東京都千代田区〇〇 1-2-3",lines:[{productCode:"P00012",productName:"純米吟醸 720ml",quantity:6,unitPrice:12e3,unit:"本",amount:72e3},{productCode:"P00008",productName:"本醸造 1.8L",quantity:4,unitPrice:8500,unit:"本",amount:34e3},{productCode:"P00021",productName:"梅酒 500ml",quantity:12,unitPrice:5800,unit:"本",amount:69600}],totalAmount:175600,taxAmount:15960,note:""};async function Lt(t){const e=await g("sales_document_headers",{});if(e.length>0){const n=e[0],s=v(n.total_amount);return{documentNo:t,invoiceDate:$(n,["sales_date","document_date"],""),customerCode:$(n,["legacy_customer_code","customer_code"],""),customerName:$(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:s,taxAmount:Math.floor(s*10/110),note:""}}return{...mt,documentNo:t||mt.documentNo}}const te={targetYearMonth:"2026-04",closingDay:15,totalBilling:482e4,customers:[{customerCode:"C0011",customerName:"青葉商事",closingDay:15,salesAmount:54e4,taxAmount:54e3,prevBalance:28e4,paymentAmount:28e4,billingAmount:594e3,status:"open"},{customerCode:"C0012",customerName:"北斗酒販",closingDay:15,salesAmount:72e4,taxAmount:72e3,prevBalance:14e4,paymentAmount:14e4,billingAmount:792e3,status:"closed"},{customerCode:"C0013",customerName:"中央フーズ",closingDay:15,salesAmount:38e4,taxAmount:38e3,prevBalance:0,paymentAmount:0,billingAmount:418e3,status:"open"},{customerCode:"C0014",customerName:"東海酒店",closingDay:15,salesAmount:61e4,taxAmount:61e3,prevBalance:23e4,paymentAmount:15e4,billingAmount:751e3,status:"open"}]};async function Pt(t){return y(`data/api/latest/billing-${t}.json`,{...te,targetYearMonth:t})}const ee=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],ae={generatedAt:new Date().toISOString(),months:ee,salesByProduct:[{label:"純米吟醸 720ml",values:[380,410,520,480,390,320,450,480,510,420,380,350].map(t=>t*1e4)},{label:"本醸造 1.8L",values:[290,310,380,340,280,250,320,360,390,310,280,260].map(t=>t*1e4)},{label:"梅酒 500ml",values:[210,240,310,290,230,180,260,300,320,250,200,190].map(t=>t*1e4)}],salesByCustomer:[{label:"青葉商事",values:[480,510,620,590,480,390,540,580,610,510,460,430].map(t=>t*1e4)},{label:"北斗酒販",values:[390,420,520,490,400,330,460,500,530,430,380,360].map(t=>t*1e4)}],costSimulation:[{productCode:"P00012",productName:"純米吟醸 720ml",costPrice:7200,sellPrice:12e3,margin:4800,marginRate:40},{productCode:"P00008",productName:"本醸造 1.8L",costPrice:4800,sellPrice:8500,margin:3700,marginRate:43.5},{productCode:"P00021",productName:"梅酒 500ml",costPrice:3200,sellPrice:5800,margin:2600,marginRate:44.8}]};async function se(){return y("data/api/latest/sales-report.json",ae)}const ne={planned:"計画中",active:"仕込中",done:"完了"},ie=[{id:"j1",jikomiNo:"J2026-01",productName:"純米吟醸",riceType:"山田錦",plannedKg:400,actualKg:400,startDate:"2026-01-10",expectedDoneDate:"2026-02-20",status:"done",tankNo:"T01",note:""},{id:"j2",jikomiNo:"J2026-02",productName:"本醸造",riceType:"日本晴",plannedKg:600,actualKg:600,startDate:"2026-02-01",expectedDoneDate:"2026-03-15",status:"done",tankNo:"T02",note:""},{id:"j3",jikomiNo:"J2026-03",productName:"特別純米",riceType:"五百万石",plannedKg:500,actualKg:480,startDate:"2026-03-05",expectedDoneDate:"2026-04-20",status:"active",tankNo:"T03",note:"経過良好"},{id:"j4",jikomiNo:"J2026-04",productName:"純米大吟醸",riceType:"山田錦",plannedKg:300,actualKg:0,startDate:"2026-04-15",expectedDoneDate:"2026-06-01",status:"planned",tankNo:"T04",note:""}];async function ce(){return y("data/api/latest/jikomi.json",ie)}const le=[{id:"t1",tankNo:"T01",capacity:3e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-01"},{id:"t2",tankNo:"T02",capacity:4e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-20"},{id:"t3",tankNo:"T03",capacity:3500,currentVolume:2800,productName:"特別純米",jikomiNo:"J2026-03",status:"in_use",lastUpdated:"2026-04-10"},{id:"t4",tankNo:"T04",capacity:2e3,currentVolume:0,productName:"純米大吟醸",jikomiNo:"J2026-04",status:"in_use",lastUpdated:"2026-04-15"},{id:"t5",tankNo:"T05",capacity:5e3,currentVolume:3200,productName:"本醸造（貯蔵）",jikomiNo:"J2026-02",status:"aging",lastUpdated:"2026-03-20"}];async function oe(){return y("data/api/latest/tanks.json",le)}const re=[{id:"k1",kenteiNo:"K2026-001",jikomiNo:"J2026-01",productName:"純米吟醸",kenteiDate:"2026-02-25",alcoholDegree:16.2,extractDegree:3.8,sakaMeterValue:2.5,volume:2850,taxCategory:"清酒",status:"approved"},{id:"k2",kenteiNo:"K2026-002",jikomiNo:"J2026-02",productName:"本醸造",kenteiDate:"2026-03-18",alcoholDegree:15.5,extractDegree:4.1,sakaMeterValue:1.8,volume:3600,taxCategory:"清酒",status:"submitted"},{id:"k3",kenteiNo:"K2026-003",jikomiNo:"J2026-03",productName:"特別純米",kenteiDate:"2026-04-18",alcoholDegree:0,extractDegree:0,sakaMeterValue:0,volume:0,taxCategory:"清酒",status:"pending"}];async function de(){return y("data/api/latest/kentei.json",re)}const ue=[{id:"m1",code:"M001",name:"720ml瓶",unit:"本",currentStock:2400,minimumStock:500,unitCost:85,lastUpdated:"2026-04-10"},{id:"m2",code:"M002",name:"1.8L瓶",unit:"本",currentStock:1800,minimumStock:300,unitCost:140,lastUpdated:"2026-04-10"},{id:"m3",code:"M003",name:"300ml瓶",unit:"本",currentStock:3600,minimumStock:600,unitCost:55,lastUpdated:"2026-04-08"},{id:"m4",code:"M004",name:"キャップ（金）",unit:"個",currentStock:8e3,minimumStock:1e3,unitCost:12,lastUpdated:"2026-04-05"},{id:"m5",code:"M005",name:"ラベル（純米吟醸）",unit:"枚",currentStock:1200,minimumStock:300,unitCost:28,lastUpdated:"2026-04-01"},{id:"m6",code:"M006",name:"化粧箱（720ml）",unit:"個",currentStock:180,minimumStock:100,unitCost:320,lastUpdated:"2026-04-01"}];async function pe(){return y("data/api/latest/materials.json",ue)}const me=[{id:"p1",documentNo:"K240050",purchaseDate:"2026-04-05",supplierCode:"S001",supplierName:"山田農場",itemName:"山田錦（精米65%）",quantity:500,unitPrice:480,amount:24e4,status:"confirmed"},{id:"p2",documentNo:"K240051",purchaseDate:"2026-04-06",supplierCode:"S002",supplierName:"日本瓶工業",itemName:"720ml瓶",quantity:1200,unitPrice:85,amount:102e3,status:"confirmed"},{id:"p3",documentNo:"K240052",purchaseDate:"2026-04-10",supplierCode:"S003",supplierName:"山本麹店",itemName:"米麹",quantity:80,unitPrice:1200,amount:96e3,status:"pending"},{id:"p4",documentNo:"K240053",purchaseDate:"2026-04-12",supplierCode:"S001",supplierName:"山田農場",itemName:"五百万石（精米60%）",quantity:300,unitPrice:420,amount:126e3,status:"pending"}],he=[{supplierCode:"S001",supplierName:"山田農場",totalPurchase:366e3,paidAmount:24e4,balance:126e3,nextPaymentDate:"2026-04-30",status:"partial"},{supplierCode:"S002",supplierName:"日本瓶工業",totalPurchase:102e3,paidAmount:102e3,balance:0,nextPaymentDate:"",status:"paid"},{supplierCode:"S003",supplierName:"山本麹店",totalPurchase:96e3,paidAmount:0,balance:96e3,nextPaymentDate:"2026-04-30",status:"unpaid"}],ye=[{id:"b1",billNo:"H240001",supplierName:"山田農場",amount:24e4,issueDate:"2026-03-31",dueDate:"2026-04-30",status:"holding"},{id:"b2",billNo:"H240002",supplierName:"大阪資材",amount:185e3,issueDate:"2026-03-31",dueDate:"2026-05-31",status:"holding"},{id:"b3",billNo:"H230045",supplierName:"中部農業",amount:32e4,issueDate:"2026-02-28",dueDate:"2026-03-31",status:"cleared"}],ve=[{code:"R001",name:"山田錦（精米65%）",unit:"kg",currentStock:380,minimumStock:100,lastPurchaseDate:"2026-04-05",unitCost:480},{code:"R002",name:"五百万石（精米60%）",unit:"kg",currentStock:290,minimumStock:100,lastPurchaseDate:"2026-04-12",unitCost:420},{code:"R003",name:"米麹",unit:"kg",currentStock:62,minimumStock:20,lastPurchaseDate:"2026-04-10",unitCost:1200},{code:"R004",name:"醸造用アルコール",unit:"L",currentStock:240,minimumStock:50,lastPurchaseDate:"2026-03-20",unitCost:180},{code:"R005",name:"清酒用酵母",unit:"g",currentStock:500,minimumStock:100,lastPurchaseDate:"2026-02-15",unitCost:3200}];async function be(){return y("data/api/latest/purchases.json",me)}async function ge(){return y("data/api/latest/payables.json",he)}async function $e(){return y("data/api/latest/bills.json",ye)}async function fe(){return y("data/api/latest/raw-stock.json",ve)}const ke={targetYear:2026,targetMonth:3,companyName:"金井酒造店",companyNo:"1234567890123",rows:[{taxCategory:"01",taxCategoryName:"清酒（普通酒）",alcoholDegree:15.5,volume:3600,taxRate:88,taxAmount:316800},{taxCategory:"02",taxCategoryName:"清酒（純米酒）",alcoholDegree:16.2,volume:2850,taxRate:88,taxAmount:250800},{taxCategory:"03",taxCategoryName:"清酒（吟醸酒）",alcoholDegree:16.5,volume:1200,taxRate:88,taxAmount:105600}],totalVolume:7650,totalTax:673200,status:"draft"};async function jt(t,e){return y(`data/api/latest/tax-${t}-${String(e).padStart(2,"0")}.json`,{...ke,targetYear:t,targetMonth:e})}const Se=Array.from({length:10},(t,e)=>({id:`ss${e+1}`,saleDate:"2026-04-15",saleTime:`${9+e}:${String(e*7%60).padStart(2,"0")}`,productCode:`P${String(e%4+1).padStart(5,"0")}`,productName:["純米吟醸 720ml","本醸造 1.8L","梅酒 500ml","特別純米 300ml"][e%4],quantity:1+e%3,unitPrice:[2200,1800,980,680][e%4],amount:(1+e%3)*[2200,1800,980,680][e%4],paymentMethod:["cash","card","paypay","cash"][e%4]})),Ce=[{id:"o1",orderNo:"ORD-2604001",orderDate:"2026-04-13",customerName:"鈴木 太郎",postalCode:"150-0001",address:"東京都渋谷区〇〇1-1",items:[{productName:"純米吟醸 720ml",quantity:2,amount:4400}],totalAmount:4400,status:"shipped",shippingDate:"2026-04-14"},{id:"o2",orderNo:"ORD-2604002",orderDate:"2026-04-14",customerName:"田中 花子",postalCode:"530-0001",address:"大阪府大阪市北区〇〇2-3",items:[{productName:"梅酒 500ml",quantity:3,amount:2940},{productName:"本醸造 1.8L",quantity:1,amount:1800}],totalAmount:4740,status:"processing",shippingDate:""},{id:"o3",orderNo:"ORD-2604003",orderDate:"2026-04-15",customerName:"佐藤 一郎",postalCode:"460-0001",address:"愛知県名古屋市中区〇〇3-5",items:[{productName:"特別純米 300ml ×6本セット",quantity:1,amount:3980}],totalAmount:3980,status:"new",shippingDate:""}];async function _t(t){return y(`data/api/latest/store-sales-${t}.json`,Se)}async function we(){return y("data/api/latest/store-orders.json",Ce)}async function ht(t){const e=await St("email_campaigns",{subject:t.subject,body:t.body,template_id:t.templateId,audience_mode:t.audienceMode,audience_filter:t.audienceFilter,recipient_count:t.recipientCount,status:t.status});return{id:e?.id??`local-email-${Date.now()}`,subject:e?.subject??t.subject,body:e?.body??t.body,templateId:e?.template_id??t.templateId,audienceMode:e?.audience_mode??t.audienceMode,audienceFilter:e?.audience_filter??t.audienceFilter,recipientCount:e?.recipient_count??t.recipientCount,status:e?.status??t.status,createdAt:e?.created_at??new Date().toISOString(),updatedAt:e?.updated_at??new Date().toISOString()}}function P(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}const De={open:"未締め",closed:"締め済"};function Ne(t,e){const n=t.customers.map(s=>`
      <tr>
        <td>
          <div class="table-title">${s.customerName}</div>
          <div class="table-sub mono">${s.customerCode}</div>
        </td>
        <td class="numeric">${s.closingDay}日</td>
        <td class="numeric">${P(s.salesAmount)}</td>
        <td class="numeric">${P(s.taxAmount)}</td>
        <td class="numeric">${P(s.prevBalance)}</td>
        <td class="numeric">${P(s.paymentAmount)}</td>
        <td class="numeric"><strong>${P(s.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${s.status==="closed"?"success":"warning"}">${De[s.status]}</span>
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
        <p class="kpi-value">${P(t.totalBilling)}</p>
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
  `}const Ae={sales:[{title:"伝票入力",description:"受注内容をそのまま売上伝票へ登録し、即時に業務へ反映します。",path:"/invoice-entry"},{title:"納品書",description:"伝票番号から納品書を確認し、出荷時の内容をすばやく照会します。",path:"/delivery"},{title:"月次請求",description:"請求締め処理と請求先別の請求残高を月単位でまとめて確認します。",path:"/billing"},{title:"集計帳票",description:"売上推移や主要指標を帳票形式で出力し、会議用資料にも転用できます。",path:"/report"},{title:"伝票照会",description:"期間や伝票番号で売上伝票を検索し、個別の内容を追跡します。",path:"/invoice"},{title:"得意先台帳",description:"得意先別の売上履歴と入金履歴を確認し、未収管理につなげます。",path:"/ledger"}],brewery:[{title:"仕込管理",description:"仕込番号ごとの進捗と原料投入状況を時系列で把握します。",path:"/jikomi"},{title:"タンク管理",description:"タンクごとの使用状況と充填率を一覧で確認できます。",path:"/tanks"},{title:"検定管理",description:"検定予定と実績をまとめて確認し、出荷判定に備えます。",path:"/kentei"},{title:"資材管理",description:"瓶・ラベル・箱などの在庫と発注状況を一画面で確認します。",path:"/materials"}],purchase:[{title:"仕入・買掛",description:"仕入伝票と買掛残高を照合し、支払予定を見通せます。",path:"/purchase"},{title:"手形・原料",description:"原料在庫と手形情報を同時に確認し、仕入計画を調整します。",path:"/raw-material"}],more:[{title:"酒税申告",description:"対象月の酒税見込と必要な集計値を確認して申告準備を進めます。",path:"/tax"},{title:"店舗POS",description:"直売所の売上と受注を確認し、当日の販売状況を把握します。",path:"/store"},{title:"売上分析",description:"商品別・得意先別の売上分析から傾向を把握し、販促に活用します。",path:"/analytics"},{title:"マスタ",description:"得意先や商品マスタの登録状況を確認し、運用の整合性を保ちます。",path:"/master"},{title:"メール配信",description:"季節商品の案内メールを下書き保存し、顧客向け配信の準備を行います。",path:"/email"},{title:"連動設定",description:"WEB連動PC の設定手順と接続情報を確認して同期環境を整えます。",path:"/setup"}]},Le={sales:{eyebrow:"販売管理トップ",title:"販売系メニュー",description:"受注から請求、照会まで販売業務の主要機能をカテゴリ単位でまとめています。"},brewery:{eyebrow:"蔵内管理トップ",title:"蔵内オペレーション",description:"仕込、タンク、検定、資材の現場業務をまとめてたどれる構成です。"},purchase:{eyebrow:"仕入管理トップ",title:"仕入・原料管理",description:"買掛管理と原料管理を起点に、仕入関連の画面へ短く遷移できます。"},more:{eyebrow:"その他トップ",title:"周辺業務メニュー",description:"税務、店舗、分析、設定などの補助機能をまとめて配置しています。"}};function yt(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function J(t){const e=Le[t],n=Ae[t].map(s=>`
        <article class="panel category-card">
          <div class="category-card-body">
            <p class="category-card-title">${yt(s.title)}</p>
            <p class="category-card-description">${yt(s.description)}</p>
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
  `}function xt(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function E(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Pe(t){return t.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':t.salesHistory.map(e=>`
        <tr>
          <td>${xt(e.date)}</td>
          <td class="mono">${e.documentNo}</td>
          <td class="numeric">${E(e.amount)}</td>
        </tr>
      `).join("")}function je(t){return t.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':t.paymentHistory.map(e=>`
        <tr>
          <td>${xt(e.date)}</td>
          <td>${e.method}</td>
          <td class="numeric">${E(e.amount)}</td>
        </tr>
      `).join("")}function _e(t,e){return`
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
            <dd>${E(t.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${E(t.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${t.balanceAmount>0?"balance-warning":""}">${E(t.balanceAmount)}</dd>
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
            <tbody>${Pe(t)}</tbody>
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
            <tbody>${je(t)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function O(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function B(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t))}function M(t,e){for(const n of e){const s=t[n];if(typeof s=="number"&&Number.isFinite(s))return s;if(typeof s=="string"){const i=Number(s);if(Number.isFinite(i))return i}}return null}function xe(t){const e=t?.productTotals;if(!e||e.length===0)return"―";const n=e.reduce((i,c)=>{const l=M(c,["amount","salesAmount"]),p=M(c,["marginRate","grossMarginRate"]);return l===null||l<=0||p===null?i:{weightedAmount:i.weightedAmount+l,weightedRate:i.weightedRate+l*p}},{weightedAmount:0,weightedRate:0});if(n.weightedAmount>0)return`${(n.weightedRate/n.weightedAmount).toFixed(1)}%`;const s=e.reduce((i,c)=>{const l=c,p=M(l,["amount","salesAmount"]),r=M(l,["grossProfit","grossAmount","margin"]),o=M(l,["costAmount","cost","costPrice"]);if(p===null||p<=0)return i;const d=r??(o!==null?p-o:null);return d===null?i:{sales:i.sales+p,gross:i.gross+d}},{sales:0,gross:0});return s.sales>0?`${(s.gross/s.sales*100).toFixed(1)}%`:"―"}function Te(t){const s={top:20,right:20,bottom:30,left:50},i=760-s.left-s.right,c=260-s.top-s.bottom,l=Math.max(...t.map(d=>d.amount),1),p=i/t.length,r=t.map((d,u)=>{const h=d.amount/l*c,L=s.left+u*p+4,I=s.top+c-h,Z=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(d.date));return`
        <g>
          <rect x="${L}" y="${I}" width="${Math.max(p-8,8)}" height="${h}" rx="4" fill="#0F5B8D" opacity="${.58+u/t.length*.34}" />
          ${u%5===0?`<text x="${L+6}" y="252" class="chart-axis">${Z}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(d=>{const u=s.top+c-c*d,h=Math.round(l*d/1e3);return`
        <g>
          <line x1="${s.left}" y1="${u}" x2="${760-s.right}" y2="${u}" class="chart-grid" />
          <text x="6" y="${u+4}" class="chart-axis">${h.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${r}
    </svg>
  `}function Me(t,e,n){const s={success:"正常",warning:"注意",error:"異常",running:"実行中"},i=t.salesRecords.slice(0,10).map(c=>`
            <tr>
              <td class="mono">${c.documentNo}</td>
              <td>${B(c.date)}</td>
              <td>${c.customerName}</td>
              <td class="numeric">${O(c.amount)}</td>
            </tr>
          `).join("");return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${e.status}">${s[e.status]}</span>
        <span class="meta-note">最終同期 ${B(e.lastSyncAt)}</span>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${O(t.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${t.kpis.todayDelta>0?"+":""}${t.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月累計</p>
        <p class="kpi-value">${O(t.kpis.monthSales)}</p>
        <p class="kpi-sub">前年同月比 ${t.kpis.monthDelta>0?"+":""}${t.kpis.monthDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${t.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${O(t.kpis.unpaidAmount)}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">月次粗利率</p>
        <p class="kpi-value">${xe(n)}</p>
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
        ${Te(t.dailySales)}
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
              <dd>${B(e.lastSyncAt)}</dd>
            </div>
            <div>
              <dt>更新時刻</dt>
              <dd>${B(e.generatedAt)}</dd>
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
          <tbody>${i}</tbody>
        </table>
      </div>
    </section>
  `}function Fe(t){return t?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(t)):""}function j(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function qe(t,e){const n=t.lines.length?t.lines.map((i,c)=>`
          <tr>
            <td class="numeric">${c+1}</td>
            <td class="mono">${i.productCode}</td>
            <td>${i.productName}</td>
            <td class="numeric">${i.quantity.toLocaleString("ja-JP")}</td>
            <td>${i.unit}</td>
            <td class="numeric">${j(i.unitPrice)}</td>
            <td class="numeric">${j(i.amount)}</td>
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
            <tr><th>納品日</th><td>${Fe(t.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${j(t.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${j(s)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${j(t.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${j(t.totalAmount)}</span></div>
        </div>
        ${t.note?`<p class="delivery-note-text">備考：${t.note}</p>`:""}
      </div>
    </article>
  `}function k(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Re(t){return k(t).replaceAll(`
`,"<br />")}function Ee(t){const n=[...Object.values(Ct),{id:"custom",season:"カスタム",subject:"",body:""}].map(i=>`
        <button
          class="template-card ${t.selectedTemplateId===i.id?"active":""}"
          type="button"
          data-action="template-select"
          data-template-id="${i.id}"
        >
          <span class="template-card-kicker">${i.season}</span>
          <strong>${k(i.subject||"空テンプレート")}</strong>
        </button>
      `).join(""),s=t.previewRecipients.length?t.previewRecipients.map(i=>`
            <li>
              <span>${k(i.name)}</span>
              <span class="table-sub">${k(i.email)} / ${k(i.area)}</span>
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
          <input id="email-subject" type="text" value="${k(t.subject)}" />
        </div>
        <div class="field">
          <span>本文</span>
          <textarea id="email-body" rows="12">${k(t.body)}</textarea>
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
          <p class="panel-title">${k(t.subject||"件名未入力")}</p>
          <div class="preview-box">${t.body?Re(t.body):"本文未入力"}</div>
        </div>
        ${t.saveMessage?`<p class="meta-note">${k(t.saveMessage)}</p>`:""}
        <div class="action-bar">
          <button class="button secondary" type="button" data-action="email-save">下書き保存</button>
          <button class="button primary" type="button" data-action="email-send">送信</button>
        </div>
      </article>
    </section>
  `}function F(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Tt(t){const e=t.resultsHtml.trim()?t.resultsHtml:`<p class="empty-note">${F(t.emptyMessage??"該当データがありません。")}</p>`;return`
    <div class="modal-backdrop" data-action="modal-close">
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${F(t.title)}">
        <div class="modal-header">
          <h2>${F(t.title)}</h2>
          <button class="modal-close" type="button" aria-label="閉じる" data-action="modal-close">×</button>
        </div>
        <div class="modal-body">
          <input
            id="modal-search"
            type="search"
            placeholder="${F(t.placeholder)}"
            value="${F(t.searchQuery)}"
            autocomplete="off"
          />
          <div class="modal-results">${e}</div>
        </div>
      </div>
    </div>
  `}function H(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function vt(t){return t.trim().toLowerCase()}function Ie(t,e){const n=vt(e),s=t.filter(c=>n?[c.code,c.name,c.name].map(vt).some(l=>l.includes(n)):!0).slice(0,50),i=s.length?`
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
              ${s.map(c=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${H(c.code)}"
                      data-name="${H(c.name)}"
                    >
                      <td class="mono">${H(c.code)}</td>
                      <td>${H(c.name)}</td>
                      <td>${c.closingDay}日</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Tt({title:"得意先検索",searchQuery:e,placeholder:"コード・名前で検索",resultsHtml:i,emptyMessage:"該当する得意先が見つかりません。"})}function Je(t){return t.toISOString().slice(0,10)}function A(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function C(t,e){return t[e]?`<div class="field-error">${A(t[e])}</div>`:""}function _(t,e,n=""){return[n,t[e]?"has-error":""].filter(Boolean).join(" ")}function Oe(t,e,n,s){const i=Object.keys(pt).map(r=>`<option value="${r}" ${t.invoiceType===r?"selected":""}>${pt[r]}</option>`).join(""),c=t.lines.map((r,o)=>`
      <tr>
        <td>
          <div class="input-group">
            <input class="${_(s,`lines.${o}.productCode`,"input-cell")}" type="text" data-line="${o}" data-field="productCode" value="${A(r.productCode)}" placeholder="P00001" />
            <button class="picker-btn" type="button" data-action="open-product-picker" data-line="${o}" aria-label="商品検索">🔍</button>
          </div>
          ${C(s,`lines.${o}.productCode`)}
        </td>
        <td>
          <input class="${_(s,`lines.${o}.productName`,"input-cell")}" type="text" data-line="${o}" data-field="productName" value="${A(r.productName)}" placeholder="商品名" />
          ${C(s,`lines.${o}.productName`)}
        </td>
        <td>
          <input class="${_(s,`lines.${o}.quantity`,"input-cell numeric")}" type="number" data-line="${o}" data-field="quantity" value="${r.quantity}" min="0" />
          ${C(s,`lines.${o}.quantity`)}
        </td>
        <td><input class="input-cell" type="text" data-line="${o}" data-field="unit" value="${r.unit}" placeholder="本" /></td>
        <td>
          <input class="${_(s,`lines.${o}.unitPrice`,"input-cell numeric")}" type="number" data-line="${o}" data-field="unitPrice" value="${r.unitPrice}" min="0" />
          ${C(s,`lines.${o}.unitPrice`)}
        </td>
        <td class="numeric">${r.amount>0?r.amount.toLocaleString("ja-JP"):"―"}</td>
        <td>
          <div class="line-actions">
            <button class="button secondary" type="button" data-action="duplicate-line" data-line="${o}">コピー</button>
            <button class="button-icon" type="button" data-action="remove-line" data-line="${o}" title="削除">✕</button>
          </div>
        </td>
      </tr>
    `).join(""),l=t.lines.reduce((r,o)=>r+o.amount,0),p=Math.floor(l*10/110);return`
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
          <select id="inv-type">${i}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input class="${_(s,"invoiceDate")}" id="inv-date" type="date" value="${t.invoiceDate||Je(new Date)}" />
          ${C(s,"invoiceDate")}
        </label>
        <label class="field">
          <span>得意先コード</span>
          <div class="input-group">
            <input
              class="${_(s,"customerCode")}"
              id="inv-customer-code"
              data-autofill="customer"
              type="text"
              placeholder="C0011"
              value="${A(t.customerCode)}"
            />
            <button class="picker-btn" type="button" data-action="open-customer-picker" aria-label="得意先検索">🔍</button>
          </div>
          <div class="form-hint">得意先コードを入力すると名前が自動補完されます</div>
          ${C(s,"customerCode")}
        </label>
        <label class="field">
          <span>得意先名</span>
          <input
            id="inv-customer-name"
            data-autofill="customer-name"
            type="text"
            placeholder="青葉商事"
            value="${A(t.customerName)}"
          />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${A(t.staffCode)}" />
        </label>
      </div>
      ${C(s,"lines")}
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
          <tbody id="invoice-lines">${c||'<tr><td colspan="7" class="empty-row">「行追加」で明細を入力してください。</td></tr>'}</tbody>
        </table>
      </div>
      <div class="invoice-total-row">
        <div class="total-stack">
          <span class="total-label">小計</span>
          <span class="total-value">${(l-p).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${p.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${l.toLocaleString("ja-JP")} 円</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <label class="field">
        <span>備考</span>
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${A(t.note)}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <span class="shortcut-hint">Ctrl+S で保存 / Esc でクリア</span>
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}function Be(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function He(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Ke(t,e){const n=t.length?t.map(s=>`
            <tr>
              <td class="mono">${s.documentNo}</td>
              <td>${Be(s.date)}</td>
              <td>
                <div class="table-title">${s.customerName}</div>
                <div class="table-sub mono">${s.customerCode}</div>
              </td>
              <td class="numeric">${s.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${He(s.amount)}</td>
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
  `}function Ue(t){const e={planned:"neutral",active:"warning",done:"success"},n=t.map(l=>`
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
          <span class="status-pill ${e[l.status]}">${ne[l.status]}</span>
        </td>
        <td>${l.note||"―"}</td>
      </tr>
    `).join(""),s=t.filter(l=>l.status==="active").length,i=t.filter(l=>l.status==="done").length,c=t.filter(l=>l.status==="planned").length;return`
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
      <div class="panel-header">
        <h2>仕込一覧</h2>
        <p class="panel-caption">${t.length} 件</p>
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
  `}function Ye(t){const e={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},s=t.map(r=>`
      <tr>
        <td class="mono">${r.kenteiNo}</td>
        <td class="mono">${r.jikomiNo}</td>
        <td>${r.productName}</td>
        <td>${r.kenteiDate}</td>
        <td class="numeric">${r.alcoholDegree>0?r.alcoholDegree.toFixed(1)+"度":"―"}</td>
        <td class="numeric">${r.extractDegree>0?r.extractDegree.toFixed(1):"―"}</td>
        <td class="numeric">${r.sakaMeterValue!==0?r.sakaMeterValue.toFixed(1):"―"}</td>
        <td class="numeric">${r.volume>0?r.volume.toLocaleString("ja-JP")+" L":"―"}</td>
        <td>${r.taxCategory}</td>
        <td>
          <span class="status-pill ${n[r.status]}">${e[r.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${r.id}">
            ${r.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),i=t.filter(r=>r.status==="approved").length,c=t.filter(r=>r.status==="submitted").length,l=t.filter(r=>r.status==="pending").length;return`
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
        <p class="kpi-value">${t.filter(r=>r.status==="approved").reduce((r,o)=>r+o.volume,0).toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">酒税対象</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">申請中</p>
        <p class="kpi-value">${c} 件</p>
        <p class="kpi-sub">税務署確認待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">未実施</p>
        <p class="kpi-value">${l} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>検定一覧</h2>
        <p class="panel-caption">承認済 ${i} 件 / 合計 ${t.length} 件</p>
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
  `}function Ve(t){return t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td>${e.name}</td>
          <td class="numeric">${e.closingDay}日</td>
          <td class="numeric">${e.paymentDay}日</td>
          <td><span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function We(t){return t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td class="mono">${e.janCode}</td>
          <td>${e.name}</td>
          <td>${e.category}</td>
          <td><span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function Qe(t,e){return`
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
        <div class="tab-group">
          <button class="tab-button ${e==="customers"?"active":""}" data-tab="customers">得意先一覧</button>
          <button class="tab-button ${e==="products"?"active":""}" data-tab="products">商品一覧</button>
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
            <tbody>${Ve(t.customers)}</tbody>
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
            <tbody>${We(t.products)}</tbody>
          </table>
        `}
      </div>
    </section>
  `}function X(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ze(t){const e=t.map(i=>{const l=(i.minimumStock>0?i.currentStock/i.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${i.code}</td>
          <td>${i.name}</td>
          <td class="numeric ${l?"text-danger":""}">
            ${i.currentStock.toLocaleString("ja-JP")} ${i.unit}
            ${l?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${i.minimumStock.toLocaleString("ja-JP")} ${i.unit}</td>
          <td class="numeric">${X(i.unitCost)}</td>
          <td class="numeric">${X(i.currentStock*i.unitCost)}</td>
          <td>${i.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${i.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=t.filter(i=>i.minimumStock>0&&i.currentStock/i.minimumStock<1.5).length,s=t.reduce((i,c)=>i+c.currentStock*c.unitCost,0);return`
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
        <p class="kpi-value">${X(s)}</p>
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
  `}function Ge(t){return t?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t)):"-"}function tt(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}const Ze={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function Xe(t){return`
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
          <td class="numeric">${tt(n.billedAmount)}</td>
          <td class="numeric">${tt(n.paymentAmount)}</td>
          <td class="numeric">${tt(n.balanceAmount)}</td>
          <td>${Ge(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${Ze[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function x(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function bt(t){return t.trim().toLowerCase()}function ta(t,e){const n=bt(e),s=t.filter(c=>n?[c.code,c.name,c.janCode].map(bt).some(l=>l.includes(n)):!0),i=s.length?`
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
              ${s.map(c=>`
                    <tr
                      tabindex="0"
                      class="picker-row"
                      data-action="picker-select"
                      data-code="${x(c.code)}"
                      data-name="${x(c.name)}"
                    >
                      <td class="mono">${x(c.code)}</td>
                      <td>${x(c.name)}</td>
                      <td class="mono">${x(c.janCode)}</td>
                      <td>${x(c.category)}</td>
                    </tr>
                  `).join("")}
            </tbody>
          </table>
        </div>
      `:"";return Tt({title:"商品検索",searchQuery:e,placeholder:"コード・名前・JANで検索",resultsHtml:i,emptyMessage:"該当する商品が見つかりません。"})}function w(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ea(t,e){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},s={pending:"warning",confirmed:"neutral",paid:"success"},i={unpaid:"未払い",partial:"一部支払",paid:"支払済"},c={unpaid:"warning",partial:"neutral",paid:"success"},l=t.map(u=>`
      <tr>
        <td class="mono">${u.documentNo}</td>
        <td>${u.purchaseDate}</td>
        <td class="mono">${u.supplierCode}</td>
        <td>${u.supplierName}</td>
        <td>${u.itemName}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${w(u.unitPrice)}</td>
        <td class="numeric"><strong>${w(u.amount)}</strong></td>
        <td>
          <span class="status-pill ${s[u.status]}">${n[u.status]}</span>
        </td>
      </tr>
    `).join(""),p=e.map(u=>`
      <tr>
        <td class="mono">${u.supplierCode}</td>
        <td>${u.supplierName}</td>
        <td class="numeric">${w(u.totalPurchase)}</td>
        <td class="numeric">${w(u.paidAmount)}</td>
        <td class="numeric"><strong>${w(u.balance)}</strong></td>
        <td>${u.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${c[u.status]}">${i[u.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${u.supplierCode}" ${u.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),r=t.reduce((u,h)=>u+h.amount,0),o=e.reduce((u,h)=>u+h.balance,0),d=e.filter(u=>u.status!=="paid").length;return`
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
        <p class="kpi-value">${w(r)}</p>
        <p class="kpi-sub">${t.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${w(o)}</p>
        <p class="kpi-sub">未払い ${d} 社</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>仕入伝票一覧</h2>
        <p class="panel-caption">${t.length} 件</p>
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
          <tbody>${l||'<tr><td colspan="9" class="empty-row">仕入データがありません。</td></tr>'}</tbody>
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
          <tbody>${p||'<tr><td colspan="8" class="empty-row">買掛データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function q(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function aa(t,e){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},s={holding:"neutral",due:"warning",cleared:"success"},i=t.map(d=>`
      <tr>
        <td class="mono">${d.billNo}</td>
        <td>${d.supplierName}</td>
        <td class="numeric">${q(d.amount)}</td>
        <td>${d.issueDate}</td>
        <td>${d.dueDate}</td>
        <td>
          <span class="status-pill ${s[d.status]}">${n[d.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${d.id}" ${d.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),c=e.map(d=>{const u=d.minimumStock>0&&d.currentStock<d.minimumStock*1.2;return`
        <tr>
          <td class="mono">${d.code}</td>
          <td>${d.name}</td>
          <td class="numeric ${u?"text-danger":""}">
            ${d.currentStock.toLocaleString("ja-JP")} ${d.unit}
            ${u?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${d.minimumStock.toLocaleString("ja-JP")} ${d.unit}</td>
          <td class="numeric">${q(d.unitCost)}</td>
          <td class="numeric">${q(d.currentStock*d.unitCost)}</td>
          <td>${d.lastPurchaseDate}</td>
        </tr>
      `}).join(""),l=t.filter(d=>d.status==="holding"),p=l.reduce((d,u)=>d+u.amount,0),r=e.reduce((d,u)=>d+u.currentStock*u.unitCost,0),o=e.filter(d=>d.minimumStock>0&&d.currentStock<d.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${q(p)}</p>
        <p class="kpi-sub">${l.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${q(r)}</p>
        <p class="kpi-sub">要補充 ${o} 品目</p>
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
          <tbody>${i||'<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>'}</tbody>
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
          <tbody>${c||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function sa(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t))}function b(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function st(t){return`
    <div class="code-block-wrap">
      <button
        class="button secondary code-copy-button"
        type="button"
        data-action="copy-code"
        data-code="${encodeURIComponent(t)}"
      >
        コピー
      </button>
      <pre class="code-block">${b(t)}</pre>
    </div>
  `}function na(t){return`
    <button
      class="button secondary copy-btn"
      type="button"
      data-action="copy-code"
      data-code="${encodeURIComponent(t)}"
    >
      コピー
    </button>
  `}function K(t){return`
    <div class="setup-command-row">
      <code class="inline-code">${b(t)}</code>
      ${na(t)}
    </div>
  `}function T(t){return`
    <div class="setup-step" data-step="${t.step}">
      <h3>${b(t.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${b(t.purpose)}</p>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">手順</p>
        <ol class="setup-list">
          ${t.instructions.map(e=>`<li>${b(e)}</li>`).join("")}
        </ol>
      </div>
      ${t.code?st(t.code):""}
      <div class="setup-step-section">
        <p class="panel-title">成功の確認方法</p>
        <ul class="setup-list">
          ${t.success.map(e=>`<li>${b(e)}</li>`).join("")}
        </ul>
      </div>
      <div class="setup-step-section">
        <p class="panel-title">よくあるエラー</p>
        <ul class="setup-list">
          ${t.errors.map(e=>`<li>${b(e)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `}function U(t){return`
    <div class="setup-step setup-step-compact" data-step="${b(t.stepLabel)}">
      <h3>${b(t.title)}</h3>
      <div class="setup-step-section">
        <p class="panel-title">目的</p>
        <p>${b(t.purpose)}</p>
      </div>
      <div class="setup-step-section">
        ${t.body}
      </div>
    </div>
  `}function ia(t,e,n){const s={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">連動設定</p>
        <h1>WEB連動PC セットアップ</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">最終同期日時</p>
        <p class="kpi-value">${sa(t.lastSyncAt)}</p>
        <p class="kpi-sub">pipeline.lastSyncAt</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">同期状態</p>
        <p class="kpi-value">
          <span class="status-pill ${t.status}">${s[t.status]}</span>
        </p>
        <p class="kpi-sub">${b(t.message)}</p>
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
      ${U({stepLabel:"準備1",title:"Git（ソースコード取得に使用）",purpose:"GitHubからファイルをダウンロードするためのツール",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトを開いて「git --version」と入力します。</p>
          ${K("git --version")}
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
      ${U({stepLabel:"準備2",title:"Python（同期スクリプトの実行環境）",purpose:"リレースクリプトを動かす",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「python --version」と入力します。</p>
          ${K("python --version")}
          <ul class="setup-list">
            <li>「Python 3.10」以上ならOKです。</li>
            <li>エラーまたは 3.9 以下なら未インストールまたは旧版です。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <p>このまま下の Step1 の手順に進んでください。</p>
        `})}
      ${U({stepLabel:"準備3",title:"pip（Pythonのパッケージ管理ツール）",purpose:"requests, pyodbc などのライブラリを入れる",body:`
          <p class="panel-title">確認方法</p>
          <p>コマンドプロンプトで「pip --version」と入力します。</p>
          ${K("pip --version")}
          <ul class="setup-list">
            <li>バージョン番号が表示されればOKです。</li>
            <li>エラーが出る場合はPythonインストール時にpipが含まれていません。</li>
          </ul>
          <p class="panel-title">未インストールの場合</p>
          <ol class="setup-list">
            <li><a href="https://bootstrap.pypa.io/get-pip.py" target="_blank" rel="noreferrer">https://bootstrap.pypa.io/get-pip.py</a> を右クリックして「名前を付けて保存」</li>
            <li>コマンドプロンプトで「python get-pip.py」を実行</li>
          </ol>
          ${K("python get-pip.py")}
        `})}
      ${U({stepLabel:"準備4",title:"テキストエディタ（設定ファイル編集用）",purpose:"relay_config.json を編集するため",body:`
          <p>メモ帳でも可能ですが、<a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a> が見やすくおすすめです。</p>
          <p>メモ帳を使う場合は文字コードを UTF-8 にしてください。</p>
        `})}
      ${T({step:1,title:"Python 3.12 をインストール",purpose:"Pythonというプログラミング言語をインストールします。自動同期の動作に必要です。",instructions:["ブラウザで https://www.python.org/downloads/ を開きます。","大きな黄色ボタン『Download Python 3.12.x』をクリックします。","ダウンロードしたインストーラーを実行します。","最初の画面で『Add Python to PATH』に必ずチェックを入れます。","『Install Now』をクリックして完了まで待ちます。"],success:["Windows のコマンドプロンプトを開いて python --version と入力します。","Python 3.12.1 のようなバージョン番号が表示されれば成功です。"],errors:["『python が見つかりません』と出る場合は PATH のチェック漏れです。Python を再インストールしてください。","会社PCでインストール制限がある場合は管理者権限で実行するか、社内管理者へ依頼してください。"]})}
      ${T({step:2,title:"GitHub から relay ファイルを取得",purpose:"自動同期に必要なスクリプト一式を Windows PC に配置します。",instructions:["作業用フォルダとして C:\\\\sake-relay\\\\ のような書き込み可能な場所を決めます。","コマンドプロンプトを開き、下のコマンドを1行ずつ実行します。","Gitを入れたくない場合は、上の準備1の方法Bでダウンロードしたフォルダを使ってください。","ダウンロード完了後、relay フォルダに移動できていることを確認します。"],code:`git clone https://github.com/yuuuuuuuuki01/sake-system.git
cd sake-system\\relay`,success:["エクスプローラーで sake-system\\\\relay フォルダが見える状態になっていれば成功です。","cd を実行したあと、コマンドプロンプトの行頭が relay フォルダを指していれば問題ありません。"],errors:["git コマンドが使えない場合は Git for Windows が未導入です。先に Git をインストールしてください。","アクセス拒否が出る場合は C:\\\\Program Files 配下ではなく C:\\\\sake-relay\\\\ などに配置してください。"]})}
      ${T({step:3,title:"必要な部品をインストール",purpose:"relay スクリプトが使うライブラリをまとめて準備します。",instructions:["Step2 で開いた relay フォルダのまま、下のコマンドを実行します。","数分かかることがあるので、完了表示が出るまで待ちます。"],code:"pip install -r requirements.txt",success:["Successfully installed が表示されれば成功です。","赤いエラーがなくコマンド入力待ちに戻れば次へ進めます。"],errors:["pip が見つからない場合は Python のインストール失敗が原因です。Step1 をやり直してください。","SSL やネットワーク関連のエラーは社内プロキシの影響があるため、ネットワーク管理者へ確認してください。"]})}
      ${T({step:4,title:"relay_config.json を設定",purpose:"どのサーバーのどのデータを、どこへ送るかを設定します。",instructions:["relay フォルダ内の relay_config.json をメモ帳または VS Code で開きます。","下の設定表を見ながら、Supabase URL、Anon Key、Z ドライブ、ODBC 設定を入力します。","酒仙i サーバーに ODBC ドライバが入っていない場合は use_odbc を false にします。","編集後はファイルを上書き保存します。"],success:["relay_config.json を開き直して、入力した内容が消えていなければ保存成功です。","Supabase URL と Anon Key が空欄でないことを確認してください。"],errors:["JSON のカンマやダブルクォートが欠けると起動エラーになります。編集後に余計な文字が入っていないか確認してください。","Z: ドライブが見つからない場合は、酒仙i サーバー共有が接続されているか確認してください。"]})}
      ${T({step:5,title:"タスクスケジューラへ登録",purpose:"Windows が5分ごとに自動で relay を実行するようにします。",instructions:["エクスプローラーで relay フォルダを開きます。","setup_scheduler.bat を右クリックし、『管理者として実行』を選びます。","Windows の確認ダイアログが出たら『はい』を押します。","タスクスケジューラを開き、SakeRelay という名前のタスクが追加されたか確認します。"],success:["タスクスケジューラ ライブラリに SakeRelay が表示されれば成功です。","トリガーが 5 分おきになっていれば自動実行設定は完了です。"],errors:["タスクが作成されない場合はバッチを管理者権限で実行しているか確認してください。","セキュリティソフトでブロックされる場合は社内管理者へ許可依頼が必要です。"]})}
      ${T({step:6,title:"手動実行で動作確認",purpose:"本番前に 1 回だけ手動で起動し、エラーなく同期できるか確認します。",instructions:["relay フォルダで下のコマンドを実行します。","処理完了後、relay_log.txt を開いて最後の行を確認します。","Web UI 側の最終同期日時が更新されるかも確認します。"],code:"python relay_agent.py",success:["relay_log.txt に成功メッセージが追加され、エラー終了していなければ成功です。","この画面の『最終同期日時』が新しい時刻に変われば連動できています。"],errors:["relay_log.txt が作られない場合は、フォルダの書き込み権限を確認してください。","Supabase 接続エラーの場合は URL と Anon Key の貼り間違いを見直してください。"]})}
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
          ${st(`{
  "use_odbc": true,
  "odbc_dsn": "MagicSake"
}`)}
        </div>
        <div>
          <h3>ODBCなし</h3>
          ${st(`{
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

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>接続情報</h2>
        </div>
      </div>
      <div class="relay-config-list">
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase URL</p>
            <span class="config-value">${b(e)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${b(e)}"
          >
            コピー
          </button>
        </div>
        <div class="relay-config-row">
          <div>
            <p class="panel-title">Supabase Anon Key</p>
            <span class="config-value">${b(n)}</span>
          </div>
          <button
            class="button secondary"
            type="button"
            data-action="copy-config"
            data-config-value="${b(n)}"
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
  `}function ca(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function la(t){return t.replace("-","/")}function oa(t){if(t.length===0)return'<div class="chart-empty">データなし</div>';const e=760,n=280,s={top:16,right:24,bottom:36,left:64},i=e-s.left-s.right,c=n-s.top-s.bottom,l=Math.max(...t.map(d=>d.amount),1),p=i/t.length,r=[0,.25,.5,.75,1].map(d=>{const u=s.top+c-c*d,h=`${Math.round(l*d/1e4).toLocaleString("ja-JP")}万円`;return`
        <g>
          <line x1="${s.left}" y1="${u}" x2="${e-s.right}" y2="${u}" class="chart-grid" />
          <text x="8" y="${u+4}" class="chart-axis">${h}</text>
        </g>
      `}).join(""),o=t.map((d,u)=>{const h=d.amount/l*c,L=Math.max(p-18,24),I=s.left+u*p+(p-L)/2,Z=s.top+c-h;return`
        <g>
          <rect x="${I}" y="${Z}" width="${L}" height="${h}" rx="6" class="analytics-bar" />
          <text x="${I+L/2}" y="${n-10}" class="chart-axis centered-axis">${la(d.month)}</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${e} ${n}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${r}
      ${o}
    </svg>
  `}function ra(t){return t.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td>${e.name}</td>
          <td class="numeric">${ca(e.amount)}</td>
          <td class="numeric">${e.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${e.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function da(t,e){const n=e==="products"?"商品別集計":"得意先別集計",s=e==="products"?t.productTotals:t.customerTotals;return`
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
        ${oa(t.monthlySales)}
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
            <tbody>${ra(s)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function R(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ua(t){const e=Math.max(...t.salesByProduct.flatMap(c=>c.values),1),n=t.salesByProduct.map(c=>{const l=c.values.map((p,r)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(p/e*120)}px" title="${t.months[r]}: ${R(p)}"></div>
            <span class="bar-label">${t.months[r].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${c.label}</p>
          <div class="bar-chart">${l}</div>
        </div>
      `}).join(""),s=t.costSimulation.map(c=>`
      <tr>
        <td class="mono">${c.productCode}</td>
        <td>${c.productName}</td>
        <td class="numeric">${R(c.costPrice)}</td>
        <td class="numeric">${R(c.sellPrice)}</td>
        <td class="numeric">${R(c.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${c.marginRate>=40?"success":"warning"}">${c.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),i=t.salesByCustomer.map(c=>{const l=c.values.reduce((p,r)=>p+r,0);return`
        <tr>
          <td>${c.label}</td>
          ${c.values.map(p=>`<td class="numeric">${(p/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${R(l)}</strong></td>
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
              ${t.months.map(c=>`<th class="numeric">${c}</th>`).join("")}
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
  `}function pa(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function ma(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function gt(t){return t.toISOString().slice(0,10)}function ha(t,e,n){const s=t.length?t.map(i=>`
            <tr>
              <td class="mono">${i.documentNo}</td>
              <td>${pa(i.date)}</td>
              <td>
                <div class="table-title">${i.customerName}</div>
                <div class="table-sub mono">${i.customerCode}</div>
              </td>
              <td class="numeric">${ma(i.amount)}</td>
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
          <input id="sales-start" type="date" value="${e||gt(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||gt(new Date)}" />
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
  `}function Y(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ya(t,e,n,s){const i={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},c={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},l={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},p=t.map(u=>`
      <tr>
        <td>${u.saleTime}</td>
        <td class="mono">${u.productCode}</td>
        <td>${u.productName}</td>
        <td class="numeric">${u.quantity}</td>
        <td class="numeric">${Y(u.unitPrice)}</td>
        <td class="numeric"><strong>${Y(u.amount)}</strong></td>
        <td>${i[u.paymentMethod]}</td>
      </tr>
    `).join(""),r=e.map(u=>`
      <tr>
        <td class="mono">${u.orderNo}</td>
        <td>${u.orderDate}</td>
        <td>${u.customerName}</td>
        <td>${u.postalCode} ${u.address}</td>
        <td>${u.items.map(h=>`${h.productName} ×${h.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${Y(u.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${l[u.status]}">${c[u.status]}</span>
        </td>
        <td>${u.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${u.id}">詳細</button>
        </td>
      </tr>
    `).join(""),o=t.reduce((u,h)=>u+h.amount,0),d=e.filter(u=>u.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${Y(o)}</p>
        <p class="kpi-sub">${t.length} 件 / ${s}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規受注</p>
        <p class="kpi-value">${d} 件</p>
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
            <tbody>${r||'<tr><td colspan="9" class="empty-row">受注データがありません。</td></tr>'}</tbody>
          </table>
        </div>
        `}
    </section>
  `}function va(t){const e={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},s=t.map(o=>{const d=o.capacity>0?Math.round(o.currentVolume/o.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${o.tankNo}</strong></td>
          <td class="numeric">${o.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${o.currentVolume>0?o.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${d}%"></div>
            </div>
            <span class="progress-label">${d}%</span>
          </td>
          <td>${o.productName||"―"}</td>
          <td class="mono">${o.jikomiNo||"―"}</td>
          <td>
            <span class="status-pill ${n[o.status]}">${e[o.status]}</span>
          </td>
          <td>${o.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${o.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),i=t.filter(o=>o.status==="in_use").length,c=t.filter(o=>o.status==="aging").length,l=t.filter(o=>o.status==="empty").length,p=t.reduce((o,d)=>o+d.capacity,0),r=t.reduce((o,d)=>o+d.currentVolume,0);return`
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
        <p class="kpi-sub">使用率 ${p>0?Math.round(r/p*100):0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${i} 基</p>
        <p class="kpi-sub">熟成中 ${c} 基</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">空きタンク</p>
        <p class="kpi-value">${l} 基</p>
        <p class="kpi-sub">使用可能</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>タンク一覧</h2>
        <p class="panel-caption">${t.length} 基</p>
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
  `}function et(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ba(t,e,n){const s=t.rows.map(c=>`
      <tr>
        <td class="mono">${c.taxCategory}</td>
        <td>${c.taxCategoryName}</td>
        <td class="numeric">${c.alcoholDegree.toFixed(1)}度</td>
        <td class="numeric">${c.volume.toLocaleString("ja-JP")} L</td>
        <td class="numeric">${c.taxRate.toLocaleString("ja-JP")} 円/L</td>
        <td class="numeric"><strong>${et(c.taxAmount)}</strong></td>
      </tr>
    `).join(""),i=Array.from({length:12},(c,l)=>l+1);return`
    <section class="page-head">
      <div>
        <p class="eyebrow">税務管理</p>
        <h1>酒税申告書</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${t.status==="submitted"?"success":"warning"}">
          ${t.status==="submitted"?"申告済":"下書き"}
        </span>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-grid">
        <label class="field">
          <span>対象年</span>
          <select id="tax-year">
            ${[2025,2026].map(c=>`<option value="${c}" ${e===c?"selected":""}>${c}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${i.map(c=>`<option value="${c}" ${n===c?"selected":""}>${c}月</option>`).join("")}
          </select>
        </label>
        <div class="filter-actions">
          <button class="button secondary" data-action="tax-load">集計</button>
        </div>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">酒税総額</p>
        <p class="kpi-value">${et(t.totalTax)}</p>
        <p class="kpi-sub">${t.targetYear}年${t.targetMonth}月分</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">課税数量</p>
        <p class="kpi-value">${t.totalVolume.toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">${t.rows.length} 区分</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>酒税申告書明細</h2>
          <p class="panel-caption">${t.companyName} / 製造者番号 ${t.companyNo}</p>
        </div>
        <button class="button secondary" data-action="tax-print" onclick="window.print()">印刷</button>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>酒類コード</th>
              <th>酒類区分</th>
              <th class="numeric">アルコール度数</th>
              <th class="numeric">数量（L）</th>
              <th class="numeric">税率</th>
              <th class="numeric">酒税額</th>
            </tr>
          </thead>
          <tbody>${s||'<tr><td colspan="6" class="empty-row">申告データがありません。</td></tr>'}</tbody>
          <tfoot>
            <tr>
              <th colspan="3">合計</th>
              <th class="numeric">${t.totalVolume.toLocaleString("ja-JP")} L</th>
              <th></th>
              <th class="numeric">${et(t.totalTax)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="action-bar">
        <button class="button secondary" data-action="tax-save-draft">下書き保存</button>
        <button class="button primary" data-action="tax-submit" ${t.status==="submitted"?"disabled":""}>
          ${t.status==="submitted"?"申告済":"申告する"}
        </button>
      </div>
    </section>
  `}const ga=["/","/cat/sales","/cat/brewery","/cat/purchase","/cat/more","/sales","/payment","/master","/invoice","/ledger","/analytics","/invoice-entry","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store","/setup","/email"],V=[{name:"青葉商事",email:"aoba@example.jp",area:"関東",historySegment:"seasonal"},{name:"北斗酒販",email:"hokuto@example.jp",area:"北海道",historySegment:"premium"},{name:"中央フーズ",email:"chuo@example.jp",area:"関東",historySegment:"seasonal"},{name:"東海酒店",email:"tokai@example.jp",area:"中部",historySegment:"premium"},{name:"三和物産",email:"sanwa@example.jp",area:"関西",historySegment:"liqueur"},{name:"南星リカー",email:"nansei@example.jp",area:"九州",historySegment:"seasonal"},{name:"山川酒店",email:"yamakawa@example.jp",area:"関西",historySegment:"premium"},{name:"瑞穂商店",email:"mizuho@example.jp",area:"中部",historySegment:"seasonal"}];function Mt(t){const e=Ct[t];return e?{subject:e.subject,body:e.body}:{subject:"",body:""}}function it(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}function $a(){const t=Mt("spring");return{mode:"all",region:"all",historySegment:"seasonal",templateId:"spring",subject:t.subject,body:t.body,saveMessage:null}}const G=new Date,fa=G.toISOString().slice(0,7),ka=G.getFullYear(),Sa=G.getMonth()+1,Ca=G.toISOString().slice(0,10),wa="C0011",D=$a();function Ft(t){const e="/sake-system/".endsWith("/")?"/sake-system/".slice(0,-1):"/sake-system/",n=t.startsWith(e)?t.slice(e.length)||"/":t;return ga.includes(n)?n:"/"}function ct(t){switch(t){case"/cat/sales":case"/invoice":case"/ledger":case"/invoice-entry":case"/delivery":case"/billing":case"/report":return"sales";case"/cat/brewery":case"/jikomi":case"/tanks":case"/kentei":case"/materials":return"brewery";case"/cat/purchase":case"/purchase":case"/raw-material":return"purchase";case"/cat/more":case"/master":case"/analytics":case"/tax":case"/store":case"/setup":return"more";case"/email":return"email";default:return"dashboard"}}const $t=Ft(location.pathname),a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,invoiceRecords:[],customerLedger:null,salesAnalytics:null,invoiceForm:it(),invoiceSaving:!1,invoiceSavedDocNo:null,pickerMode:null,pickerQuery:"",pickerTargetLine:null,invoiceErrors:{},deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:fa,salesReport:null,jikomiList:[],tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:ka,taxMonth:Sa,storeSales:[],storeOrders:[],storeTab:"pos",storeSalesDate:Ca,route:$t,currentCategory:ct($t),sidebarOpen:!1,salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:wa,masterTab:"customers",analyticsTab:"products",emailAudienceMode:D.mode,emailRegion:D.region,emailHistorySegment:D.historySegment,emailTemplateId:D.templateId,emailSubject:D.subject,emailBody:D.body,emailSaveMessage:D.saveMessage,loading:!0,actionLoading:!1,error:null};function ft(t){return t.slice(0,10)}function Da(t){return{...t}}function z(){a.pickerMode=null,a.pickerQuery="",a.pickerTargetLine=null}function qt(){a.invoiceForm=it(),a.invoiceSavedDocNo=null,a.invoiceErrors={},z()}function Rt(t){const e={};return t.invoiceDate.trim()||(e.invoiceDate="伝票日付は必須です。"),t.customerCode.trim()||(e.customerCode="得意先コードは必須です。"),t.lines.length===0&&(e.lines="明細を1行以上入力してください。"),t.lines.forEach((n,s)=>{n.productCode.trim()||(e[`lines.${s}.productCode`]="商品コードは必須です。"),n.productName.trim()||(e[`lines.${s}.productName`]="商品名は必須です。"),n.quantity<=0&&(e[`lines.${s}.quantity`]="数量は1以上を入力してください。"),n.unitPrice<0&&(e[`lines.${s}.unitPrice`]="単価は0円以上で入力してください。")}),e}function Na(t){const e=a.invoiceForm.lines[t];e&&a.invoiceForm.lines.splice(t+1,0,Da(e))}function Aa(){const t=a.invoiceRecords[0],e=a.masterStats?.customers[0],n=a.masterStats?.products.slice(0,2)??[];a.invoiceForm={invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:t?.customerCode??e?.code??"",customerName:t?.customerName??e?.name??"",staffCode:a.invoiceForm.staffCode||"S001",lines:n.map((s,i)=>{const c=i===0?1:2,l=1200*(i+1);return{productCode:s.code,productName:s.name,quantity:c,unitPrice:l,unit:"本",amount:c*l}}),note:t?`過去伝票 ${t.documentNo} をもとに複製`:"直近のサンプル伝票をもとに複製"},a.invoiceSavedDocNo=null,a.invoiceErrors={}}function La(t){const e=a.masterStats?.customers.find(n=>n.code.toLowerCase()===t.trim().toLowerCase());return e?(a.invoiceForm.customerCode=e.code,a.invoiceForm.customerName=e.name,!0):!1}function Pa(t){const e=a.masterStats?.customers.find(n=>n.name===t.trim());return e?(a.invoiceForm.customerCode=e.code,a.invoiceForm.customerName=e.name,!0):!1}function Et(t){if(f(t),a.invoiceErrors=Rt(a.invoiceForm),Object.keys(a.invoiceErrors).length>0){m();return}a.invoiceSaving=!0,m(),Xt(a.invoiceForm).then(e=>{a.invoiceSavedDocNo=e.documentNo,a.invoiceSaving=!1,a.invoiceErrors={},a.invoiceForm=it(),m()}).catch(()=>{a.invoiceSaving=!1,m()})}function ja(t){const e=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...t.salesRecords].sort((s,i)=>new Date(i.date).getTime()-new Date(s.date).getTime()).filter(s=>{const i=new Date(s.date);return!(e&&i<e||n&&i>n)})}function It(){switch(a.emailAudienceMode){case"area":return a.emailRegion==="all"?V:V.filter(t=>t.area===a.emailRegion);case"history":return V.filter(t=>t.historySegment===a.emailHistorySegment);default:return V}}function _a(){const t=It();return{audienceMode:a.emailAudienceMode,region:a.emailRegion,historySegment:a.emailHistorySegment,selectedTemplateId:a.emailTemplateId,subject:a.emailSubject,body:a.emailBody,recipientCount:t.length,previewRecipients:t.slice(0,5),saveMessage:a.emailSaveMessage}}function kt(t){const e=It(),n=a.emailAudienceMode==="area"?a.emailRegion:a.emailAudienceMode==="history"?a.emailHistorySegment:"all";return{subject:a.emailSubject.trim(),body:a.emailBody.trim(),templateId:a.emailTemplateId,audienceMode:a.emailAudienceMode,audienceFilter:n,recipientCount:e.length,status:t}}function xa(t){const e=`${"/sake-system/".replace(/\/$/,"")}${t==="/"?"/":t}`;history.pushState(null,"",e),a.route=t,a.currentCategory=ct(t),a.sidebarOpen=!1,lt(t)}async function lt(t){a.actionLoading=!0,m();try{switch(t){case"/delivery":a.deliveryNote||(a.deliveryNote=await Lt(a.deliverySearchDocNo||"D240122"));break;case"/billing":a.billingSummary||(a.billingSummary=await Pt(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await se());break;case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await ce());break;case"/tanks":a.tankList.length===0&&(a.tankList=await oe());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await de());break;case"/materials":a.materialList.length===0&&(a.materialList=await pe());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([be(),ge()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([$e(),fe()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await jt(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([_t(a.storeSalesDate),we()]));break;default:break}}catch(e){console.warn("Route data load error",e)}finally{a.actionLoading=!1,m()}}function Ta(){if(a.loading)return'<section class="panel"><p>データを読み込んでいます。</p></section>';if(a.error)return`
      <section class="panel error-card">
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${a.error}</p>
      </section>
    `;switch(a.route){case"/cat/sales":return J("sales");case"/cat/brewery":return J("brewery");case"/cat/purchase":return J("purchase");case"/cat/more":return J("more");case"/invoice-entry":return Oe(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving,a.invoiceErrors);case"/email":return Ee(_a());case"/delivery":return a.deliveryNote?qe(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/billing":return a.billingSummary?Ne(a.billingSummary,a.billingYearMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/report":return a.salesReport?ua(a.salesReport):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/jikomi":return Ue(a.jikomiList);case"/tanks":return va(a.tankList);case"/kentei":return Ye(a.kenteiList);case"/materials":return ze(a.materialList);case"/purchase":return ea(a.purchaseList,a.payableList);case"/raw-material":return aa(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?ba(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/store":return ya(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate);case"/setup":return a.pipelineMeta?ia(a.pipelineMeta,Jt,Ot):'<section class="panel"><p>データを読み込んでいます…</p></section>'}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.customerLedger||!a.salesAnalytics)return"";switch(a.route){case"/sales":return ha(ja(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return Xe([...a.paymentStatus.records].sort((t,e)=>e.balanceAmount-t.balanceAmount));case"/master":return Qe(a.masterStats,a.masterTab);case"/invoice":return Ke(a.invoiceRecords,a.invoiceFilter);case"/ledger":return _e(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return da(a.salesAnalytics,a.analyticsTab);default:return Me(a.salesSummary,a.pipelineMeta,a.salesAnalytics)}}function Ma(){const t={dashboard:[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"}]}],sales:[{label:"販売管理",items:[{path:"/cat/sales",label:"販売管理トップ",kicker:"Category"},{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/report",label:"集計帳票",kicker:"Report"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"}]}],brewery:[{label:"蔵内管理",items:[{path:"/cat/brewery",label:"蔵内管理トップ",kicker:"Category"},{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"}]}],purchase:[{label:"仕入管理",items:[{path:"/cat/purchase",label:"仕入管理トップ",kicker:"Category"},{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]}],more:[{label:"その他",items:[{path:"/cat/more",label:"その他トップ",kicker:"Category"},{path:"/tax",label:"酒税申告",kicker:"Tax"},{path:"/store",label:"店舗・直売所",kicker:"Store"},{path:"/analytics",label:"売上分析",kicker:"Analytics"},{path:"/master",label:"マスタ",kicker:"Master"},{path:"/email",label:"メール配信",kicker:"Mail"},{path:"/setup",label:"連動設定",kicker:"Setup"}]}],email:[{label:"メール配信",items:[{path:"/email",label:"季節商品案内",kicker:"Mail"}]}]},e=[{category:"dashboard",path:"/",label:"ダッシュボード"},{category:"sales",path:"/cat/sales",label:"販売管理"},{category:"brewery",path:"/cat/brewery",label:"蔵内管理"},{category:"purchase",path:"/cat/purchase",label:"仕入管理"},{category:"more",path:"/cat/more",label:"その他"},{category:"email",path:"/email",label:"メール配信"}],n=t[a.currentCategory].map(c=>`
        <div class="nav-group">
          <p class="nav-group-label">${c.label}</p>
          ${c.items.map(l=>`
                <a
                  href="${"/sake-system/".replace(/\/$/,"")}${l.path==="/"?"/":l.path}"
                  class="nav-link ${a.route===l.path?"active":""}"
                  data-link="${l.path}"
                >
                  <div>
                    <div class="nav-kicker">${l.kicker}</div>
                    <div class="nav-label">${l.label}</div>
                  </div>
                </a>
              `).join("")}
        </div>
      `).join(""),s=e.map(c=>`
        <a
          href="${"/sake-system/".replace(/\/$/,"")}${c.path==="/"?"/":c.path}"
          class="category-link ${a.currentCategory===c.category?"active":""}"
          data-link="${c.path}"
        >
          ${c.label}
        </a>
      `).join(""),i=a.pickerMode&&a.masterStats?a.pickerMode==="customer"?Ie(a.masterStats.customers,a.pickerQuery):ta(a.masterStats.products,a.pickerQuery):"";return`
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
        <div class="view ${a.actionLoading?"is-busy":""}">${Ta()}</div>
      </main>
      ${i}
    </div>
  `}async function Fa(t){a.actionLoading=!0,m();try{a.invoiceRecords=await at(t)}finally{a.actionLoading=!1,m()}}async function qa(t){a.actionLoading=!0,m();try{a.customerLedger=await At(t)}finally{a.actionLoading=!1,m()}}function f(t){a.invoiceForm={invoiceType:t.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:t.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:t.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:t.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:t.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((e,n)=>{const s=parseFloat(t.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,i=parseFloat(t.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...e,productCode:t.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??e.productCode,productName:t.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??e.productName,unit:t.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??e.unit,quantity:s,unitPrice:i,amount:s*i}}),note:t.querySelector("#inv-note")?.value??a.invoiceForm.note},a.invoiceForm.customerCode=a.invoiceForm.customerCode.trim().toUpperCase(),a.invoiceForm.customerName=a.invoiceForm.customerName.trim()}function N(t){const e=t.querySelector("input[name='email-audience-mode']:checked")?.value??a.emailAudienceMode;a.emailAudienceMode=e,a.emailRegion=t.querySelector("#email-region")?.value??a.emailRegion,a.emailHistorySegment=t.querySelector("#email-history-segment")?.value??a.emailHistorySegment,a.emailSubject=t.querySelector("#email-subject")?.value??a.emailSubject,a.emailBody=t.querySelector("#email-body")?.value??a.emailBody}function Ra(t){t.querySelector("[data-action='sidebar-open']")?.addEventListener("click",()=>{a.sidebarOpen=!0,m()}),t.querySelectorAll("[data-action='sidebar-close']").forEach(e=>{e.addEventListener("click",()=>{a.sidebarOpen=!1,m()})}),t.querySelectorAll("[data-link]").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),xa(e.dataset.link)})}),t.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const e=t.querySelector("#sales-start")?.value??"",n=t.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:e,endDate:n},m()}),t.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const e={documentNo:t.querySelector("#invoice-document-no")?.value??"",startDate:t.querySelector("#invoice-start")?.value??"",endDate:t.querySelector("#invoice-end")?.value??"",customerCode:t.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=e,Fa(e)}),t.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const e=t.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=e.trim().toUpperCase(),qa(a.ledgerCustomerCode)}),t.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{a.masterTab=e.dataset.tab,m()})}),t.querySelectorAll("[data-analytics-tab]").forEach(e=>{e.addEventListener("click",()=>{a.analyticsTab=e.dataset.analyticsTab,m()})}),t.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{f(t),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),a.invoiceErrors={},m()}),t.querySelectorAll("[data-action='remove-line']").forEach(e=>{e.addEventListener("click",()=>{f(t);const n=parseInt(e.dataset.line??"0",10);a.invoiceForm.lines.splice(n,1),a.invoiceErrors=Rt(a.invoiceForm),m()})}),t.querySelectorAll("[data-action='duplicate-line']").forEach(e=>{e.addEventListener("click",()=>{f(t),Na(parseInt(e.dataset.line??"0",10)),a.invoiceErrors={},m()})}),t.querySelector("[data-action='copy-past-invoice']")?.addEventListener("click",()=>{Aa(),m()}),t.querySelector("[data-action='open-customer-picker']")?.addEventListener("click",()=>{f(t),a.pickerMode="customer",a.pickerTargetLine=null,a.pickerQuery=a.invoiceForm.customerCode||a.invoiceForm.customerName,m()}),t.querySelectorAll("[data-action='open-product-picker']").forEach(e=>{e.addEventListener("click",()=>{f(t);const n=parseInt(e.dataset.line??"0",10),s=a.invoiceForm.lines[n];a.pickerMode="product",a.pickerTargetLine=n,a.pickerQuery=s?s.productCode||s.productName:"",m()})}),t.querySelectorAll("[data-action='modal-close']").forEach(e=>{e.addEventListener("click",n=>{e.classList.contains("modal-backdrop")&&n.target instanceof HTMLElement&&!n.target.classList.contains("modal-backdrop")||(z(),m())})}),t.querySelectorAll("[data-action='picker-select']").forEach(e=>{const n=()=>{const s=e.dataset.code??"",i=e.dataset.name??"";if(a.pickerMode==="customer")a.invoiceForm.customerCode=s,a.invoiceForm.customerName=i,delete a.invoiceErrors.customerCode;else if(a.pickerMode==="product"&&a.pickerTargetLine!==null){const c=a.invoiceForm.lines[a.pickerTargetLine];c&&(c.productCode=s,c.productName=i,c.amount=c.quantity*c.unitPrice,delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productCode`],delete a.invoiceErrors[`lines.${a.pickerTargetLine}.productName`])}z(),m()};e.addEventListener("click",n),e.addEventListener("keydown",s=>{s.key==="Enter"&&n()})}),t.querySelector("#modal-search")?.addEventListener("input",e=>{a.pickerQuery=e.target.value,m()}),t.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{qt(),m()}),t.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{Et(t)}),t.querySelector("#inv-customer-code")?.addEventListener("blur",()=>{f(t),La(a.invoiceForm.customerCode)&&(delete a.invoiceErrors.customerCode,m())}),t.querySelector("#inv-customer-name")?.addEventListener("blur",()=>{f(t),Pa(a.invoiceForm.customerName)&&(delete a.invoiceErrors.customerCode,m())}),t.querySelectorAll("#inv-date, #inv-customer-code, #inv-customer-name, #inv-staff, #inv-note, [data-field], #inv-type").forEach(e=>{e.addEventListener("input",()=>{f(t),a.invoiceSavedDocNo=null})}),t.querySelector("#inv-type")?.addEventListener("change",()=>{f(t),a.invoiceSavedDocNo=null}),t.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const e=t.querySelector("#delivery-docno")?.value??"";a.deliverySearchDocNo=e.trim(),a.deliveryNote=null,a.actionLoading=!0,m(),Lt(a.deliverySearchDocNo||"D240122").then(n=>{a.deliveryNote=n,a.actionLoading=!1,m()})}),t.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const e=t.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=e,a.billingSummary=null,a.actionLoading=!0,m(),Pt(e).then(n=>{a.billingSummary=n,a.actionLoading=!1,m()})}),t.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const e=parseInt(t.querySelector("#tax-year")?.value??String(a.taxYear),10),n=parseInt(t.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=e,a.taxMonth=n,a.taxDeclaration=null,a.actionLoading=!0,m(),jt(e,n).then(s=>{a.taxDeclaration=s,a.actionLoading=!1,m()})}),t.querySelectorAll("[data-store-tab]").forEach(e=>{e.addEventListener("click",()=>{a.storeTab=e.dataset.storeTab,m()})}),t.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const e=t.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=e,a.storeSales=[],a.actionLoading=!0,m(),_t(e).then(n=>{a.storeSales=n,a.actionLoading=!1,m()})}),t.querySelectorAll("[data-action='copy-config']").forEach(e=>{e.addEventListener("click",async()=>{const n=e.dataset.configValue??"";if(n)try{await navigator.clipboard.writeText(n),e.textContent="コピー済み",window.setTimeout(()=>{e.textContent="コピー"},1600)}catch(s){console.warn("Clipboard copy failed",s)}})}),t.querySelectorAll("[data-action='copy-code']").forEach(e=>{e.addEventListener("click",async()=>{const n=e.dataset.code??"";if(n)try{await navigator.clipboard.writeText(decodeURIComponent(n)),e.textContent="コピー済み",window.setTimeout(()=>{e.textContent="コピー"},1600)}catch(s){console.warn("Clipboard code copy failed",s)}})}),t.querySelectorAll("input[name='email-audience-mode']").forEach(e=>{e.addEventListener("change",()=>{N(t),a.emailSaveMessage=null,m()})}),t.querySelectorAll("#email-region, #email-history-segment").forEach(e=>{e.addEventListener("change",()=>{N(t),a.emailSaveMessage=null,m()})}),t.querySelector("#email-subject")?.addEventListener("input",()=>{N(t),a.emailSaveMessage=null}),t.querySelector("#email-body")?.addEventListener("input",()=>{N(t),a.emailSaveMessage=null}),t.querySelectorAll("[data-action='template-select']").forEach(e=>{e.addEventListener("click",()=>{a.emailTemplateId=e.dataset.templateId??"custom";const n=Mt(a.emailTemplateId);a.emailSubject=n.subject,a.emailBody=n.body,a.emailSaveMessage=null,m()})}),t.querySelector("[data-action='email-insert-link']")?.addEventListener("click",()=>{N(t);const e=`

商品詳細はこちら: https://example.jp/products/seasonal`;a.emailBody.includes("https://example.jp/products/seasonal")||(a.emailBody=`${a.emailBody.trimEnd()}${e}`),a.emailSaveMessage=null,m()}),t.querySelector("[data-action='email-save']")?.addEventListener("click",()=>{N(t),a.actionLoading=!0,m(),ht(kt("draft")).then(e=>{a.emailSaveMessage=`下書きを保存しました。${new Intl.DateTimeFormat("ja-JP",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(e.updatedAt??new Date().toISOString()))}`,a.actionLoading=!1,m()})}),t.querySelector("[data-action='email-send']")?.addEventListener("click",()=>{N(t),a.actionLoading=!0,m(),ht(kt("draft")).then(e=>{a.emailSaveMessage=`送信処理用の下書きを保存しました。${e.recipientCount.toLocaleString("ja-JP")} 件`,a.actionLoading=!1,m(),window.confirm("送信しました（下書き保存）")})})}function m(){const t=document.querySelector("#app");t&&(t.innerHTML=Ma(),Ra(t),a.pickerMode&&t.querySelector("#modal-search")?.focus())}async function Ea(){a.loading=!0,m();try{const[t,e,n,s,i,c,l]=await Promise.all([Wt(),Qt(),zt(),Gt(),at(a.invoiceFilter),At(a.ledgerCustomerCode),Zt()]);if(a.salesSummary=t,a.paymentStatus=e,a.masterStats=n,a.pipelineMeta=s,a.invoiceRecords=i,a.customerLedger=c,a.salesAnalytics=l,!a.salesFilter.startDate||!a.salesFilter.endDate){const r=[...t.salesRecords].sort((u,h)=>new Date(h.date).getTime()-new Date(u.date).getTime())[0]?.date??new Date().toISOString(),o=new Date(r),d=new Date(o);d.setDate(o.getDate()-30),a.salesFilter={startDate:ft(d.toISOString()),endDate:ft(o.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await at(a.invoiceFilter)),a.error=null}catch(t){a.error=t instanceof Error?t.message:"データの取得に失敗しました。"}finally{a.loading=!1,m(),lt(a.route)}}window.addEventListener("popstate",()=>{a.route=Ft(location.pathname),a.currentCategory=ct(a.route),a.sidebarOpen=!1,lt(a.route)});window.addEventListener("keydown",t=>{if(t.key==="Escape"){if(a.pickerMode){z(),m();return}a.route==="/invoice-entry"&&!a.invoiceSaving&&(qt(),m());return}if(a.route==="/invoice-entry"&&!a.invoiceSaving&&(t.ctrlKey||t.metaKey)&&t.key.toLowerCase()==="s"){t.preventDefault();const e=document.querySelector("#app");e&&Et(e)}});Ea();
