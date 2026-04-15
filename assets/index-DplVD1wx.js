(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))s(c);new MutationObserver(c=>{for(const o of c)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(c){const o={};return c.integrity&&(o.integrity=c.integrity),c.referrerPolicy&&(o.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?o.credentials="include":c.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(c){if(c.ep)return;c.ep=!0;const o=n(c);fetch(c.href,o)}})();async function it(t,e){return null}async function b(t,e={}){return[]}const j={generatedAt:"2026-04-15T09:15:00+09:00",kpis:{todaySales:1248e3,todayDelta:8.2,monthSales:18245e3,monthDelta:5.6,unpaidCount:7,unpaidAmount:264e4},dailySales:Array.from({length:30},(t,e)=>{const n=new Date("2026-03-17T00:00:00+09:00");return n.setDate(n.getDate()+e),{date:n.toISOString(),amount:42e4+e*73123%62e4}}),salesRecords:Array.from({length:20},(t,e)=>{const n=new Date("2026-04-15T00:00:00+09:00");return n.setDate(n.getDate()-e),{id:`sale-${e+1}`,documentNo:`D${String(240100+e).padStart(6,"0")}`,date:n.toISOString(),customerCode:`C${String(e+11).padStart(4,"0")}`,customerName:["青葉商事","北斗酒販","中央フーズ","東海酒店"][e%4],amount:68e3+e%6*24500}})},lt={generatedAt:"2026-04-15T09:15:00+09:00",records:[{id:"pay-1",customerCode:"C0011",customerName:"青葉商事",billedAmount:54e4,paymentAmount:0,balanceAmount:54e4,lastPaymentDate:null,status:"unpaid"},{id:"pay-2",customerCode:"C0012",customerName:"北斗酒販",billedAmount:72e4,paymentAmount:3e5,balanceAmount:42e4,lastPaymentDate:"2026-04-11T14:30:00+09:00",status:"partial"},{id:"pay-3",customerCode:"C0013",customerName:"中央フーズ",billedAmount:68e4,paymentAmount:68e4,balanceAmount:0,lastPaymentDate:"2026-04-14T10:00:00+09:00",status:"paid"},{id:"pay-4",customerCode:"C0014",customerName:"東海酒店",billedAmount:41e4,paymentAmount:18e4,balanceAmount:23e4,lastPaymentDate:"2026-04-10T09:10:00+09:00",status:"partial"}]},$={generatedAt:"2026-04-15T09:15:00+09:00",summary:{customerCount:164,activeCustomerCount:152,productCount:486,activeProductCount:461},customers:Array.from({length:12},(t,e)=>({id:`customer-${e+1}`,code:`C${String(e+1).padStart(4,"0")}`,name:["青葉商事","北斗酒販","中央フーズ","東海酒店","三和物産","南星リカー"][e%6],closingDay:[15,20,25,31][e%4],paymentDay:[5,10,15,20][e%4],isActive:e%5!==0})),products:Array.from({length:12},(t,e)=>({id:`product-${e+1}`,code:`P${String(e+1).padStart(5,"0")}`,janCode:`4901234567${String(e).padStart(3,"0")}`,name:["純米吟醸 720ml","本醸造 1.8L","特別純米 300ml","梅酒 500ml"][e%4],category:["清酒","焼酎","リキュール"][e%3],isActive:e%6!==0}))},rt={generatedAt:"2026-04-15T09:15:00+09:00",lastSyncAt:"2026-04-15T09:12:21+09:00",status:"success",jobName:"daily-sync",message:"同期完了。売上・入金・マスタを最新化しました。"},Z=j.salesRecords.map((t,e)=>({...t,itemCount:e%4+1})),dt={C0011:{customerCode:"C0011",customerName:"青葉商事",balanceAmount:54e4,salesTotal:114e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-1",date:"2026-04-15T00:00:00+09:00",documentNo:"D240100",amount:42e4},{id:"ledger-sale-2",date:"2026-04-08T00:00:00+09:00",documentNo:"D240087",amount:39e4},{id:"ledger-sale-3",date:"2026-03-28T00:00:00+09:00",documentNo:"D240059",amount:33e4}],paymentHistory:[{id:"ledger-payment-1",date:"2026-04-10T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-2",date:"2026-03-31T00:00:00+09:00",amount:3e5,method:"振込"}]},C0012:{customerCode:"C0012",customerName:"北斗酒販",balanceAmount:42e4,salesTotal:102e4,paymentTotal:6e5,salesHistory:[{id:"ledger-sale-4",date:"2026-04-14T00:00:00+09:00",documentNo:"D240101",amount:36e4},{id:"ledger-sale-5",date:"2026-04-05T00:00:00+09:00",documentNo:"D240082",amount:32e4},{id:"ledger-sale-6",date:"2026-03-25T00:00:00+09:00",documentNo:"D240054",amount:34e4}],paymentHistory:[{id:"ledger-payment-3",date:"2026-04-11T00:00:00+09:00",amount:3e5,method:"振込"},{id:"ledger-payment-4",date:"2026-03-30T00:00:00+09:00",amount:3e5,method:"現金"}]}},x={productTotals:[{code:"P00001",name:"純米吟醸 720ml",amount:584e4,quantity:820,documents:148},{code:"P00002",name:"本醸造 1.8L",amount:498e4,quantity:610,documents:131},{code:"P00003",name:"特別純米 300ml",amount:356e4,quantity:1240,documents:112},{code:"P00004",name:"梅酒 500ml",amount:287e4,quantity:540,documents:89}],customerTotals:[{code:"C0011",name:"青葉商事",amount:462e4,quantity:320,documents:54},{code:"C0012",name:"北斗酒販",amount:438e4,quantity:294,documents:49},{code:"C0013",name:"中央フーズ",amount:391e4,quantity:276,documents:45},{code:"C0014",name:"東海酒店",amount:324e4,quantity:221,documents:37}]};function v(t){if(typeof t=="number"&&Number.isFinite(t))return t;if(typeof t=="string"){const e=Number(t);return Number.isFinite(e)?e:0}return 0}function ut(t){switch((t??"").toLowerCase()){case"paid":case"complete":case"completed":return"paid";case"partial":case"partially_paid":case"partially paid":return"partial";default:return"unpaid"}}function pt(t){return typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"?["true","1","active","enabled","yes","y"].includes(t.toLowerCase()):!1}function g(t,e,n=""){for(const s of e){const c=t[s];if(typeof c=="string"&&c.length>0)return c}return n}function B(t,e,n=0){for(const s of e)if(s in t)return v(t[s]);return n}function K(t,e,n=!0){for(const s of e)if(s in t)return pt(t[s]);return n}function Q(t,e,n){for(const s of e){const c=t[s];if(typeof c!="string"||c.length===0)continue;if(/^\d{4}-\d{2}-\d{2}$/.test(c))return new Date(`${c}T00:00:00Z`).toISOString();const o=new Date(c);if(!Number.isNaN(o.getTime()))return o.toISOString()}return n}function X(t){return t.slice(0,7)}function E(t,e){return{id:String(t.id??`invoice-${e+1}`),documentNo:t.document_no??t.legacy_document_no??`D${String(240100+e).padStart(6,"0")}`,date:Q(t,["sales_date","document_date"],new Date().toISOString()),customerCode:t.customer_code??t.legacy_customer_code??`C${String(e+1).padStart(4,"0")}`,customerName:t.customer_name??t.customer_code??t.legacy_customer_code??"不明",itemCount:0,amount:v(t.total_amount??t.billed_amount)}}function V(t,e){const n=e.startDate?new Date(`${e.startDate}T00:00:00`):null,s=e.endDate?new Date(`${e.endDate}T23:59:59`):null,c=e.documentNo.trim().toLowerCase(),o=e.customerCode.trim().toLowerCase();return t.filter(i=>{const p=new Date(i.date);return!(n&&p<n||s&&p>s||c&&!i.documentNo.toLowerCase().includes(c)||o&&!i.customerCode.toLowerCase().includes(o))}).sort((i,p)=>new Date(p.date).getTime()-new Date(i.date).getTime())}function H(t){const e=t.trim().toUpperCase(),n=dt[e];if(n)return n;const s=j.salesRecords.find(c=>c.customerCode.toUpperCase()===e);return{customerCode:e||"未指定",customerName:s?.customerName??"該当得意先なし",balanceAmount:0,salesTotal:0,paymentTotal:0,salesHistory:[],paymentHistory:[]}}function mt(){const t=new Map,e=new Map,n=new Map;return Z.forEach((s,c)=>{const o=X(s.date);t.set(o,(t.get(o)??0)+s.amount);const i=e.get(s.customerCode)??{code:s.customerCode,name:s.customerName,amount:0,quantity:0,documents:0};i.amount+=s.amount,i.quantity+=s.itemCount,i.documents+=1,e.set(s.customerCode,i);const p=`P${String(c%4+1).padStart(5,"0")}`,l=x.productTotals[c%x.productTotals.length],d=n.get(p)??{code:p,name:l?.name??`商品${c+1}`,amount:0,quantity:0,documents:0};d.amount+=s.amount,d.quantity+=s.itemCount*12,d.documents+=1,n.set(p,d)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(t.entries()).sort(([s],[c])=>s.localeCompare(c)).map(([s,c])=>({month:s,amount:c})),productTotals:Array.from(n.values()).sort((s,c)=>c.amount-s.amount),customerTotals:Array.from(e.values()).sort((s,c)=>c.amount-s.amount)}}async function y(t,e){try{const n=await fetch(`/sake-system/${t}`,{headers:{Accept:"application/json"}});if(!n.ok)throw new Error(`HTTP ${n.status}`);return await n.json()}catch(n){return console.warn(`Failed to fetch ${t}, using fallback data`,n),e}}async function ht(){const t=await b("daily_sales_fact",{});if(t.length>0){const e=await b("customer_payment_status",{}),s=new Date().toISOString().slice(0,10),c=s.slice(0,7),o=[...t].sort((d,r)=>d.sales_date.localeCompare(r.sales_date)).slice(-30).map(d=>({date:new Date(`${d.sales_date}T00:00:00Z`).toISOString(),amount:v(d.sales_amount)})),i=t.reduce((d,r)=>r.sales_date===s?d+v(r.sales_amount):d,0),p=t.reduce((d,r)=>r.sales_date.startsWith(c)?d+v(r.sales_amount):d,0),l=e.filter(d=>v(d.balance_amount)>0);return{generatedAt:new Date().toISOString(),kpis:{todaySales:i,todayDelta:0,monthSales:p,monthDelta:0,unpaidCount:l.length,unpaidAmount:l.reduce((d,r)=>d+v(r.balance_amount),0)},dailySales:o,salesRecords:j.salesRecords}}return y("data/api/latest/sales-summary.json",j)}async function yt(){const t=await b("customer_payment_status",{});return t.length>0?{generatedAt:new Date().toISOString(),records:t.map((e,n)=>{const s=e.legacy_customer_code??`UNKNOWN-${n+1}`;return{id:`payment-${s}-${n+1}`,customerCode:s,customerName:s,billedAmount:v(e.billed_amount),paymentAmount:v(e.paid_amount),balanceAmount:v(e.balance_amount),lastPaymentDate:null,status:ut(e.payment_status)}})}:y("data/api/latest/payment-status.json",lt)}async function vt(){const[t,e]=await Promise.all([b(),b()]);if(t.length>0||e.length>0){const n=t.length?t.map((c,o)=>({id:g(c,["id","customer_id","code"],`customer-${o+1}`),code:g(c,["code","customer_code","legacy_customer_code"],`C${String(o+1).padStart(4,"0")}`),name:g(c,["name","customer_name","display_name"],`Customer ${o+1}`),closingDay:B(c,["closing_day","close_day"],31),paymentDay:B(c,["payment_day","due_day"],15),isActive:K(c,["is_active","active","enabled"],!0)})):$.customers,s=e.length?e.map((c,o)=>({id:g(c,["id","product_id","code"],`product-${o+1}`),code:g(c,["code","product_code"],`P${String(o+1).padStart(5,"0")}`),janCode:g(c,["jan_code","jan","barcode"],""),name:g(c,["name","product_name","display_name"],`Product ${o+1}`),category:g(c,["category","category_name"],"未分類"),isActive:K(c,["is_active","active","enabled"],!0)})):$.products;return{generatedAt:new Date().toISOString(),summary:{customerCount:t.length||$.summary.customerCount,activeCustomerCount:t.length?n.filter(c=>c.isActive).length:$.summary.activeCustomerCount,productCount:e.length||$.summary.productCount,activeProductCount:e.length?s.filter(c=>c.isActive).length:$.summary.activeProductCount},customers:n,products:s}}return y("data/api/latest/master-stats.json",$)}function bt(){return y("data/api/latest/pipeline-meta.json",rt)}async function I(t){const[e,n]=await Promise.all([b("sales_document_headers",{}),b("sales_document_lines",{})]);if(e.length>0){const s=new Map;n.forEach(o=>{const i=String(o.header_id??o.document_header_id??o.document_no??o.id??"");i&&s.set(i,(s.get(i)??0)+1)});const c=e.map((o,i)=>{const p=E(o,i),l=String(o.id??o.document_no??o.legacy_document_no??"");return{...p,itemCount:s.get(l)??p.itemCount}});return V(c,t)}return V(Z,t)}async function tt(t){const e=t.trim().toUpperCase();if(!e)return H("");const[n,s,c]=await Promise.all([b("sales_document_headers",{}),b("customer_payments",{}),b("customer_payment_status",{})]);if(n.length>0||s.length>0){const o=n.map((l,d)=>{const r=E(l,d);return{id:r.id,date:r.date,documentNo:r.documentNo,amount:r.amount}}),i=s.map((l,d)=>({id:String(l.id??`payment-${d+1}`),date:Q(l,["payment_date","received_date"],new Date().toISOString()),amount:v(l.payment_amount??l.amount),method:l.payment_method??l.method??"入金"})),p=c.find(l=>(l.legacy_customer_code??"").toUpperCase()===e);return{customerCode:e,customerName:n[0]?.customer_name??n[0]?.customer_code??n[0]?.legacy_customer_code??e,balanceAmount:v(p?.balance_amount),salesTotal:o.reduce((l,d)=>l+d.amount,0),paymentTotal:i.reduce((l,d)=>l+d.amount,0),salesHistory:o,paymentHistory:i}}return H(e)}async function gt(){const[t,e,n]=await Promise.all([b("daily_sales_fact",{}),b("sales_document_headers",{}),b("sales_document_lines",{})]);if(t.length>0){const s=new Map;t.forEach(i=>{const p=X(i.sales_date);s.set(p,(s.get(p)??0)+v(i.sales_amount))});const c=new Map;e.forEach((i,p)=>{const l=E(i,p),d=c.get(l.customerCode)??{code:l.customerCode,name:l.customerName,amount:0,quantity:0,documents:0};d.amount+=l.amount,d.documents+=1,c.set(l.customerCode,d)});const o=new Map;return n.forEach((i,p)=>{const l=i.product_code??i.legacy_product_code??`P${String(p+1).padStart(5,"0")}`,d=o.get(l)??{code:l,name:i.product_name??l,amount:0,quantity:0,documents:0};d.amount+=v(i.line_amount??i.amount),d.quantity+=v(i.quantity),d.documents+=1,o.set(l,d)}),{generatedAt:new Date().toISOString(),monthlySales:Array.from(s.entries()).sort(([i],[p])=>i.localeCompare(p)).map(([i,p])=>({month:i,amount:p})).slice(-12),productTotals:o.size>0?Array.from(o.values()).sort((i,p)=>p.amount-i.amount):x.productTotals,customerTotals:c.size>0?Array.from(c.values()).sort((i,p)=>p.amount-i.amount):x.customerTotals}}return mt()}const U={sales:"売上",return:"返品",export_return:"輸出戻入"};async function $t(t){const e=t.lines.reduce((c,o)=>c+o.amount,0),n=`D${Date.now().toString().slice(-6)}`;return{id:(await it("sales_document_headers",{legacy_customer_code:t.customerCode,sales_date:t.invoiceDate,document_type:t.invoiceType,staff_code:t.staffCode}))?.id??`local-${n}`,documentNo:n,totalAmount:e,status:"confirmed",createdAt:new Date().toISOString()}}const W={documentNo:"D240122",invoiceDate:"2026-04-14",customerCode:"C0011",customerName:"青葉商事 株式会社",customerAddress:"〒123-4567 東京都千代田区〇〇 1-2-3",lines:[{productCode:"P00012",productName:"純米吟醸 720ml",quantity:6,unitPrice:12e3,unit:"本",amount:72e3},{productCode:"P00008",productName:"本醸造 1.8L",quantity:4,unitPrice:8500,unit:"本",amount:34e3},{productCode:"P00021",productName:"梅酒 500ml",quantity:12,unitPrice:5800,unit:"本",amount:69600}],totalAmount:175600,taxAmount:15960,note:""};async function et(t){const e=await b("sales_document_headers",{});if(e.length>0){const n=e[0],s=v(n.total_amount);return{documentNo:t,invoiceDate:g(n,["sales_date","document_date"],""),customerCode:g(n,["legacy_customer_code","customer_code"],""),customerName:g(n,["customer_name","legacy_customer_code"],""),customerAddress:"",lines:[],totalAmount:s,taxAmount:Math.floor(s*10/110),note:""}}return{...W,documentNo:t||W.documentNo}}const ft={targetYearMonth:"2026-04",closingDay:15,totalBilling:482e4,customers:[{customerCode:"C0011",customerName:"青葉商事",closingDay:15,salesAmount:54e4,taxAmount:54e3,prevBalance:28e4,paymentAmount:28e4,billingAmount:594e3,status:"open"},{customerCode:"C0012",customerName:"北斗酒販",closingDay:15,salesAmount:72e4,taxAmount:72e3,prevBalance:14e4,paymentAmount:14e4,billingAmount:792e3,status:"closed"},{customerCode:"C0013",customerName:"中央フーズ",closingDay:15,salesAmount:38e4,taxAmount:38e3,prevBalance:0,paymentAmount:0,billingAmount:418e3,status:"open"},{customerCode:"C0014",customerName:"東海酒店",closingDay:15,salesAmount:61e4,taxAmount:61e3,prevBalance:23e4,paymentAmount:15e4,billingAmount:751e3,status:"open"}]};async function at(t){return y(`data/api/latest/billing-${t}.json`,{...ft,targetYearMonth:t})}const kt=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],St={generatedAt:new Date().toISOString(),months:kt,salesByProduct:[{label:"純米吟醸 720ml",values:[380,410,520,480,390,320,450,480,510,420,380,350].map(t=>t*1e4)},{label:"本醸造 1.8L",values:[290,310,380,340,280,250,320,360,390,310,280,260].map(t=>t*1e4)},{label:"梅酒 500ml",values:[210,240,310,290,230,180,260,300,320,250,200,190].map(t=>t*1e4)}],salesByCustomer:[{label:"青葉商事",values:[480,510,620,590,480,390,540,580,610,510,460,430].map(t=>t*1e4)},{label:"北斗酒販",values:[390,420,520,490,400,330,460,500,530,430,380,360].map(t=>t*1e4)}],costSimulation:[{productCode:"P00012",productName:"純米吟醸 720ml",costPrice:7200,sellPrice:12e3,margin:4800,marginRate:40},{productCode:"P00008",productName:"本醸造 1.8L",costPrice:4800,sellPrice:8500,margin:3700,marginRate:43.5},{productCode:"P00021",productName:"梅酒 500ml",costPrice:3200,sellPrice:5800,margin:2600,marginRate:44.8}]};async function Dt(){return y("data/api/latest/sales-report.json",St)}const Ct={planned:"計画中",active:"仕込中",done:"完了"},wt=[{id:"j1",jikomiNo:"J2026-01",productName:"純米吟醸",riceType:"山田錦",plannedKg:400,actualKg:400,startDate:"2026-01-10",expectedDoneDate:"2026-02-20",status:"done",tankNo:"T01",note:""},{id:"j2",jikomiNo:"J2026-02",productName:"本醸造",riceType:"日本晴",plannedKg:600,actualKg:600,startDate:"2026-02-01",expectedDoneDate:"2026-03-15",status:"done",tankNo:"T02",note:""},{id:"j3",jikomiNo:"J2026-03",productName:"特別純米",riceType:"五百万石",plannedKg:500,actualKg:480,startDate:"2026-03-05",expectedDoneDate:"2026-04-20",status:"active",tankNo:"T03",note:"経過良好"},{id:"j4",jikomiNo:"J2026-04",productName:"純米大吟醸",riceType:"山田錦",plannedKg:300,actualKg:0,startDate:"2026-04-15",expectedDoneDate:"2026-06-01",status:"planned",tankNo:"T04",note:""}];async function Nt(){return y("data/api/latest/jikomi.json",wt)}const Pt=[{id:"t1",tankNo:"T01",capacity:3e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-01"},{id:"t2",tankNo:"T02",capacity:4e3,currentVolume:0,productName:"",jikomiNo:"",status:"empty",lastUpdated:"2026-03-20"},{id:"t3",tankNo:"T03",capacity:3500,currentVolume:2800,productName:"特別純米",jikomiNo:"J2026-03",status:"in_use",lastUpdated:"2026-04-10"},{id:"t4",tankNo:"T04",capacity:2e3,currentVolume:0,productName:"純米大吟醸",jikomiNo:"J2026-04",status:"in_use",lastUpdated:"2026-04-15"},{id:"t5",tankNo:"T05",capacity:5e3,currentVolume:3200,productName:"本醸造（貯蔵）",jikomiNo:"J2026-02",status:"aging",lastUpdated:"2026-03-20"}];async function Lt(){return y("data/api/latest/tanks.json",Pt)}const jt=[{id:"k1",kenteiNo:"K2026-001",jikomiNo:"J2026-01",productName:"純米吟醸",kenteiDate:"2026-02-25",alcoholDegree:16.2,extractDegree:3.8,sakaMeterValue:2.5,volume:2850,taxCategory:"清酒",status:"approved"},{id:"k2",kenteiNo:"K2026-002",jikomiNo:"J2026-02",productName:"本醸造",kenteiDate:"2026-03-18",alcoholDegree:15.5,extractDegree:4.1,sakaMeterValue:1.8,volume:3600,taxCategory:"清酒",status:"submitted"},{id:"k3",kenteiNo:"K2026-003",jikomiNo:"J2026-03",productName:"特別純米",kenteiDate:"2026-04-18",alcoholDegree:0,extractDegree:0,sakaMeterValue:0,volume:0,taxCategory:"清酒",status:"pending"}];async function xt(){return y("data/api/latest/kentei.json",jt)}const At=[{id:"m1",code:"M001",name:"720ml瓶",unit:"本",currentStock:2400,minimumStock:500,unitCost:85,lastUpdated:"2026-04-10"},{id:"m2",code:"M002",name:"1.8L瓶",unit:"本",currentStock:1800,minimumStock:300,unitCost:140,lastUpdated:"2026-04-10"},{id:"m3",code:"M003",name:"300ml瓶",unit:"本",currentStock:3600,minimumStock:600,unitCost:55,lastUpdated:"2026-04-08"},{id:"m4",code:"M004",name:"キャップ（金）",unit:"個",currentStock:8e3,minimumStock:1e3,unitCost:12,lastUpdated:"2026-04-05"},{id:"m5",code:"M005",name:"ラベル（純米吟醸）",unit:"枚",currentStock:1200,minimumStock:300,unitCost:28,lastUpdated:"2026-04-01"},{id:"m6",code:"M006",name:"化粧箱（720ml）",unit:"個",currentStock:180,minimumStock:100,unitCost:320,lastUpdated:"2026-04-01"}];async function _t(){return y("data/api/latest/materials.json",At)}const Tt=[{id:"p1",documentNo:"K240050",purchaseDate:"2026-04-05",supplierCode:"S001",supplierName:"山田農場",itemName:"山田錦（精米65%）",quantity:500,unitPrice:480,amount:24e4,status:"confirmed"},{id:"p2",documentNo:"K240051",purchaseDate:"2026-04-06",supplierCode:"S002",supplierName:"日本瓶工業",itemName:"720ml瓶",quantity:1200,unitPrice:85,amount:102e3,status:"confirmed"},{id:"p3",documentNo:"K240052",purchaseDate:"2026-04-10",supplierCode:"S003",supplierName:"山本麹店",itemName:"米麹",quantity:80,unitPrice:1200,amount:96e3,status:"pending"},{id:"p4",documentNo:"K240053",purchaseDate:"2026-04-12",supplierCode:"S001",supplierName:"山田農場",itemName:"五百万石（精米60%）",quantity:300,unitPrice:420,amount:126e3,status:"pending"}],Ft=[{supplierCode:"S001",supplierName:"山田農場",totalPurchase:366e3,paidAmount:24e4,balance:126e3,nextPaymentDate:"2026-04-30",status:"partial"},{supplierCode:"S002",supplierName:"日本瓶工業",totalPurchase:102e3,paidAmount:102e3,balance:0,nextPaymentDate:"",status:"paid"},{supplierCode:"S003",supplierName:"山本麹店",totalPurchase:96e3,paidAmount:0,balance:96e3,nextPaymentDate:"2026-04-30",status:"unpaid"}],Jt=[{id:"b1",billNo:"H240001",supplierName:"山田農場",amount:24e4,issueDate:"2026-03-31",dueDate:"2026-04-30",status:"holding"},{id:"b2",billNo:"H240002",supplierName:"大阪資材",amount:185e3,issueDate:"2026-03-31",dueDate:"2026-05-31",status:"holding"},{id:"b3",billNo:"H230045",supplierName:"中部農業",amount:32e4,issueDate:"2026-02-28",dueDate:"2026-03-31",status:"cleared"}],Mt=[{code:"R001",name:"山田錦（精米65%）",unit:"kg",currentStock:380,minimumStock:100,lastPurchaseDate:"2026-04-05",unitCost:480},{code:"R002",name:"五百万石（精米60%）",unit:"kg",currentStock:290,minimumStock:100,lastPurchaseDate:"2026-04-12",unitCost:420},{code:"R003",name:"米麹",unit:"kg",currentStock:62,minimumStock:20,lastPurchaseDate:"2026-04-10",unitCost:1200},{code:"R004",name:"醸造用アルコール",unit:"L",currentStock:240,minimumStock:50,lastPurchaseDate:"2026-03-20",unitCost:180},{code:"R005",name:"清酒用酵母",unit:"g",currentStock:500,minimumStock:100,lastPurchaseDate:"2026-02-15",unitCost:3200}];async function Rt(){return y("data/api/latest/purchases.json",Tt)}async function qt(){return y("data/api/latest/payables.json",Ft)}async function It(){return y("data/api/latest/bills.json",Jt)}async function Ot(){return y("data/api/latest/raw-stock.json",Mt)}const Et={targetYear:2026,targetMonth:3,companyName:"金井酒造店",companyNo:"1234567890123",rows:[{taxCategory:"01",taxCategoryName:"清酒（普通酒）",alcoholDegree:15.5,volume:3600,taxRate:88,taxAmount:316800},{taxCategory:"02",taxCategoryName:"清酒（純米酒）",alcoholDegree:16.2,volume:2850,taxRate:88,taxAmount:250800},{taxCategory:"03",taxCategoryName:"清酒（吟醸酒）",alcoholDegree:16.5,volume:1200,taxRate:88,taxAmount:105600}],totalVolume:7650,totalTax:673200,status:"draft"};async function st(t,e){return y(`data/api/latest/tax-${t}-${String(e).padStart(2,"0")}.json`,{...Et,targetYear:t,targetMonth:e})}const Yt=Array.from({length:10},(t,e)=>({id:`ss${e+1}`,saleDate:"2026-04-15",saleTime:`${9+e}:${String(e*7%60).padStart(2,"0")}`,productCode:`P${String(e%4+1).padStart(5,"0")}`,productName:["純米吟醸 720ml","本醸造 1.8L","梅酒 500ml","特別純米 300ml"][e%4],quantity:1+e%3,unitPrice:[2200,1800,980,680][e%4],amount:(1+e%3)*[2200,1800,980,680][e%4],paymentMethod:["cash","card","paypay","cash"][e%4]})),Bt=[{id:"o1",orderNo:"ORD-2604001",orderDate:"2026-04-13",customerName:"鈴木 太郎",postalCode:"150-0001",address:"東京都渋谷区〇〇1-1",items:[{productName:"純米吟醸 720ml",quantity:2,amount:4400}],totalAmount:4400,status:"shipped",shippingDate:"2026-04-14"},{id:"o2",orderNo:"ORD-2604002",orderDate:"2026-04-14",customerName:"田中 花子",postalCode:"530-0001",address:"大阪府大阪市北区〇〇2-3",items:[{productName:"梅酒 500ml",quantity:3,amount:2940},{productName:"本醸造 1.8L",quantity:1,amount:1800}],totalAmount:4740,status:"processing",shippingDate:""},{id:"o3",orderNo:"ORD-2604003",orderDate:"2026-04-15",customerName:"佐藤 一郎",postalCode:"460-0001",address:"愛知県名古屋市中区〇〇3-5",items:[{productName:"特別純米 300ml ×6本セット",quantity:1,amount:3980}],totalAmount:3980,status:"new",shippingDate:""}];async function nt(t){return y(`data/api/latest/store-sales-${t}.json`,Yt)}async function Kt(){return y("data/api/latest/store-orders.json",Bt)}function S(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}const Vt={open:"未締め",closed:"締め済"};function Ht(t,e){const n=t.customers.map(s=>`
      <tr>
        <td>
          <div class="table-title">${s.customerName}</div>
          <div class="table-sub mono">${s.customerCode}</div>
        </td>
        <td class="numeric">${s.closingDay}日</td>
        <td class="numeric">${S(s.salesAmount)}</td>
        <td class="numeric">${S(s.taxAmount)}</td>
        <td class="numeric">${S(s.prevBalance)}</td>
        <td class="numeric">${S(s.paymentAmount)}</td>
        <td class="numeric"><strong>${S(s.billingAmount)}</strong></td>
        <td>
          <span class="status-pill ${s.status==="closed"?"success":"warning"}">${Vt[s.status]}</span>
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
        <p class="kpi-value">${S(t.totalBilling)}</p>
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
  `}function ct(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function N(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Ut(t){return t.salesHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':t.salesHistory.map(e=>`
        <tr>
          <td>${ct(e.date)}</td>
          <td class="mono">${e.documentNo}</td>
          <td class="numeric">${N(e.amount)}</td>
        </tr>
      `).join("")}function Wt(t){return t.paymentHistory.length===0?'<tr><td colspan="3" class="empty-row">データなし</td></tr>':t.paymentHistory.map(e=>`
        <tr>
          <td>${ct(e.date)}</td>
          <td>${e.method}</td>
          <td class="numeric">${N(e.amount)}</td>
        </tr>
      `).join("")}function zt(t,e){return`
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
            <dd>${N(t.salesTotal)}</dd>
          </div>
          <div>
            <dt>入金累計</dt>
            <dd>${N(t.paymentTotal)}</dd>
          </div>
          <div>
            <dt>残高</dt>
            <dd class="${t.balanceAmount>0?"balance-warning":""}">${N(t.balanceAmount)}</dd>
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
            <tbody>${Ut(t)}</tbody>
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
            <tbody>${Wt(t)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function T(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function F(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).format(new Date(t))}function Gt(t){const s={top:20,right:20,bottom:30,left:50},c=760-s.left-s.right,o=260-s.top-s.bottom,i=Math.max(...t.map(r=>r.amount),1),p=c/t.length,l=t.map((r,u)=>{const h=r.amount/i*o,k=s.left+u*p+4,P=s.top+o-h,_=new Intl.DateTimeFormat("ja-JP",{month:"numeric",day:"numeric"}).format(new Date(r.date));return`
        <g>
          <rect x="${k}" y="${P}" width="${Math.max(p-8,8)}" height="${h}" rx="4" fill="#0F5B8D" opacity="${.58+u/t.length*.34}" />
          ${u%5===0?`<text x="${k+6}" y="252" class="chart-axis">${_}</text>`:""}
        </g>
      `}).join("");return`
    <svg viewBox="0 0 760 260" class="sales-chart" role="img" aria-label="直近30日の日次売上">
      ${[0,.25,.5,.75,1].map(r=>{const u=s.top+o-o*r,h=Math.round(i*r/1e3);return`
        <g>
          <line x1="${s.left}" y1="${u}" x2="${760-s.right}" y2="${u}" class="chart-grid" />
          <text x="6" y="${u+4}" class="chart-axis">${h.toLocaleString("ja-JP")}千円</text>
        </g>
      `}).join("")}
      ${l}
    </svg>
  `}function Zt(t,e){const n={success:"正常",warning:"注意",error:"異常",running:"実行中"};return`
    <section class="page-head">
      <div>
        <p class="eyebrow">ダッシュボード</p>
        <h1>売上・入金サマリー</h1>
      </div>
      <div class="meta-stack">
        <span class="status-pill ${e.status}">${n[e.status]}</span>
        <span class="meta-note">最終同期 ${F(e.lastSyncAt)}</span>
      </div>
    </section>

    <section class="kpi-grid">
      <article class="panel kpi-card">
        <p class="panel-title">当日売上</p>
        <p class="kpi-value">${T(t.kpis.todaySales)}</p>
        <p class="kpi-sub">前日比 ${t.kpis.todayDelta>0?"+":""}${t.kpis.todayDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">当月累計</p>
        <p class="kpi-value">${T(t.kpis.monthSales)}</p>
        <p class="kpi-sub">前年同月比 ${t.kpis.monthDelta>0?"+":""}${t.kpis.monthDelta.toFixed(1)}%</p>
      </article>
      <article class="panel kpi-card kpi-alert">
        <p class="panel-title">未入金件数</p>
        <p class="kpi-value">${t.kpis.unpaidCount.toLocaleString("ja-JP")} 件</p>
        <p class="kpi-sub">残高 ${T(t.kpis.unpaidAmount)}</p>
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
        ${Gt(t.dailySales)}
      </article>

      <aside class="panel sync-panel">
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
            <dd>${F(e.lastSyncAt)}</dd>
          </div>
          <div>
            <dt>更新時刻</dt>
            <dd>${F(e.generatedAt)}</dd>
          </div>
        </dl>
        <p class="sync-message">${e.message}</p>
      </aside>
    </section>
  `}function Qt(t){return t?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"long",day:"numeric"}).format(new Date(t)):""}function D(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Xt(t,e){const n=t.lines.length?t.lines.map((c,o)=>`
          <tr>
            <td class="numeric">${o+1}</td>
            <td class="mono">${c.productCode}</td>
            <td>${c.productName}</td>
            <td class="numeric">${c.quantity.toLocaleString("ja-JP")}</td>
            <td>${c.unit}</td>
            <td class="numeric">${D(c.unitPrice)}</td>
            <td class="numeric">${D(c.amount)}</td>
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
            <tr><th>納品日</th><td>${Qt(t.invoiceDate)}</td></tr>
            <tr><th>合計金額</th><td class="numeric">${D(t.totalAmount)}（税込）</td></tr>
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
          <div class="total-stack"><span class="total-label">小計</span><span class="total-value">${D(s)}</span></div>
          <div class="total-stack"><span class="total-label">消費税（10%）</span><span class="total-value">${D(t.taxAmount)}</span></div>
          <div class="total-stack total-grand"><span class="total-label">合計（税込）</span><span class="total-value">${D(t.totalAmount)}</span></div>
        </div>
        ${t.note?`<p class="delivery-note-text">備考：${t.note}</p>`:""}
      </div>
    </article>
  `}function te(t){return t.toISOString().slice(0,10)}function ee(t,e,n){const s=Object.keys(U).map(p=>`<option value="${p}" ${t.invoiceType===p?"selected":""}>${U[p]}</option>`).join(""),c=t.lines.map((p,l)=>`
      <tr>
        <td><input class="input-cell" type="text" data-line="${l}" data-field="productCode" value="${p.productCode}" placeholder="P00001" /></td>
        <td><input class="input-cell" type="text" data-line="${l}" data-field="productName" value="${p.productName}" placeholder="商品名" /></td>
        <td><input class="input-cell numeric" type="number" data-line="${l}" data-field="quantity" value="${p.quantity}" min="0" /></td>
        <td><input class="input-cell" type="text" data-line="${l}" data-field="unit" value="${p.unit}" placeholder="本" /></td>
        <td><input class="input-cell numeric" type="number" data-line="${l}" data-field="unitPrice" value="${p.unitPrice}" min="0" /></td>
        <td class="numeric">${p.amount>0?p.amount.toLocaleString("ja-JP"):"―"}</td>
        <td><button class="button-icon" data-action="remove-line" data-line="${l}" title="削除">✕</button></td>
      </tr>
    `).join(""),o=t.lines.reduce((p,l)=>p+l.amount,0),i=Math.floor(o*10/110);return`
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
      </div>
      <div class="filter-grid filter-grid--wide">
        <label class="field">
          <span>伝票種別</span>
          <select id="inv-type">${s}</select>
        </label>
        <label class="field">
          <span>伝票日付</span>
          <input id="inv-date" type="date" value="${t.invoiceDate||te(new Date)}" />
        </label>
        <label class="field">
          <span>得意先コード</span>
          <input id="inv-customer-code" type="text" placeholder="C0011" value="${t.customerCode}" />
        </label>
        <label class="field">
          <span>得意先名</span>
          <input id="inv-customer-name" type="text" placeholder="青葉商事" value="${t.customerName}" />
        </label>
        <label class="field">
          <span>担当者コード</span>
          <input id="inv-staff" type="text" placeholder="S001" value="${t.staffCode}" />
        </label>
      </div>
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
          <span class="total-value">${(o-i).toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack">
          <span class="total-label">消費税（10%）</span>
          <span class="total-value">${i.toLocaleString("ja-JP")} 円</span>
        </div>
        <div class="total-stack total-grand">
          <span class="total-label">合計</span>
          <span class="total-value">${o.toLocaleString("ja-JP")} 円</span>
        </div>
      </div>
    </section>

    <section class="panel">
      <label class="field">
        <span>備考</span>
        <textarea id="inv-note" rows="2" placeholder="備考・特記事項">${t.note}</textarea>
      </label>
    </section>

    <div class="action-bar">
      <button class="button secondary" data-action="invoice-clear">クリア</button>
      <button class="button primary" data-action="invoice-save" ${n?"disabled":""}>
        ${n?"保存中…":"保存する"}
      </button>
    </div>
  `}function ae(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function se(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ne(t,e){const n=t.length?t.map(s=>`
            <tr>
              <td class="mono">${s.documentNo}</td>
              <td>${ae(s.date)}</td>
              <td>
                <div class="table-title">${s.customerName}</div>
                <div class="table-sub mono">${s.customerCode}</div>
              </td>
              <td class="numeric">${s.itemCount.toLocaleString("ja-JP")}</td>
              <td class="numeric">${se(s.amount)}</td>
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
  `}function ce(t){const e={planned:"neutral",active:"warning",done:"success"},n=t.map(i=>`
      <tr>
        <td class="mono">${i.jikomiNo}</td>
        <td>${i.productName}</td>
        <td>${i.riceType}</td>
        <td class="numeric">${i.plannedKg.toLocaleString("ja-JP")} kg</td>
        <td class="numeric">${i.actualKg>0?i.actualKg.toLocaleString("ja-JP")+" kg":"―"}</td>
        <td>${i.startDate}</td>
        <td>${i.expectedDoneDate}</td>
        <td class="mono">${i.tankNo}</td>
        <td>
          <span class="status-pill ${e[i.status]}">${Ct[i.status]}</span>
        </td>
        <td>${i.note||"―"}</td>
      </tr>
    `).join(""),s=t.filter(i=>i.status==="active").length,c=t.filter(i=>i.status==="done").length,o=t.filter(i=>i.status==="planned").length;return`
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
        <p class="kpi-value">${o} 本</p>
        <p class="kpi-sub">未着手</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">完了</p>
        <p class="kpi-value">${c} 本</p>
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
  `}function oe(t){const e={pending:"未実施",submitted:"申請中",approved:"承認済"},n={pending:"neutral",submitted:"warning",approved:"success"},s=t.map(l=>`
      <tr>
        <td class="mono">${l.kenteiNo}</td>
        <td class="mono">${l.jikomiNo}</td>
        <td>${l.productName}</td>
        <td>${l.kenteiDate}</td>
        <td class="numeric">${l.alcoholDegree>0?l.alcoholDegree.toFixed(1)+"度":"―"}</td>
        <td class="numeric">${l.extractDegree>0?l.extractDegree.toFixed(1):"―"}</td>
        <td class="numeric">${l.sakaMeterValue!==0?l.sakaMeterValue.toFixed(1):"―"}</td>
        <td class="numeric">${l.volume>0?l.volume.toLocaleString("ja-JP")+" L":"―"}</td>
        <td>${l.taxCategory}</td>
        <td>
          <span class="status-pill ${n[l.status]}">${e[l.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="kentei-edit" data-id="${l.id}">
            ${l.status==="pending"?"入力":"詳細"}
          </button>
        </td>
      </tr>
    `).join(""),c=t.filter(l=>l.status==="approved").length,o=t.filter(l=>l.status==="submitted").length,i=t.filter(l=>l.status==="pending").length;return`
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
        <p class="kpi-value">${t.filter(l=>l.status==="approved").reduce((l,d)=>l+d.volume,0).toLocaleString("ja-JP")} L</p>
        <p class="kpi-sub">酒税対象</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">申請中</p>
        <p class="kpi-value">${o} 件</p>
        <p class="kpi-sub">税務署確認待ち</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">未実施</p>
        <p class="kpi-value">${i} 件</p>
        <p class="kpi-sub">要対応</p>
      </article>
    </section>

    <section class="panel">
      <div class="panel-header">
        <h2>検定一覧</h2>
        <p class="panel-caption">承認済 ${c} 件 / 合計 ${t.length} 件</p>
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
  `}function ie(t){return t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td>${e.name}</td>
          <td class="numeric">${e.closingDay}日</td>
          <td class="numeric">${e.paymentDay}日</td>
          <td><span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function le(t){return t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td class="mono">${e.janCode}</td>
          <td>${e.name}</td>
          <td>${e.category}</td>
          <td><span class="status-pill ${e.isActive?"success":"neutral"}">${e.isActive?"有効":"停止"}</span></td>
        </tr>
      `).join("")}function re(t,e){return`
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
            <tbody>${ie(t.customers)}</tbody>
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
            <tbody>${le(t.products)}</tbody>
          </table>
        `}
      </div>
    </section>
  `}function J(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function de(t){const e=t.map(c=>{const i=(c.minimumStock>0?c.currentStock/c.minimumStock:1/0)<1.5;return`
        <tr>
          <td class="mono">${c.code}</td>
          <td>${c.name}</td>
          <td class="numeric ${i?"text-danger":""}">
            ${c.currentStock.toLocaleString("ja-JP")} ${c.unit}
            ${i?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${c.minimumStock.toLocaleString("ja-JP")} ${c.unit}</td>
          <td class="numeric">${J(c.unitCost)}</td>
          <td class="numeric">${J(c.currentStock*c.unitCost)}</td>
          <td>${c.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="material-adjust" data-id="${c.id}">調整</button>
          </td>
        </tr>
      `}).join(""),n=t.filter(c=>c.minimumStock>0&&c.currentStock/c.minimumStock<1.5).length,s=t.reduce((c,o)=>c+o.currentStock*o.unitCost,0);return`
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
        <p class="kpi-value">${J(s)}</p>
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
  `}function ue(t){return t?new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t)):"-"}function M(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}const pe={unpaid:"未入金",partial:"一部入金",paid:"入金済"};function me(t){return`
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
          <td class="numeric">${M(n.billedAmount)}</td>
          <td class="numeric">${M(n.paymentAmount)}</td>
          <td class="numeric">${M(n.balanceAmount)}</td>
          <td>${ue(n.lastPaymentDate)}</td>
          <td><span class="status-pill ${n.status==="paid"?"success":n.status==="partial"?"warning":"danger"}">${pe[n.status]}</span></td>
        </tr>
      `).join("")}</tbody>
        </table>
      </div>
    </section>
  `}function f(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function he(t,e){const n={pending:"未確定",confirmed:"確定",paid:"支払済"},s={pending:"warning",confirmed:"neutral",paid:"success"},c={unpaid:"未払い",partial:"一部支払",paid:"支払済"},o={unpaid:"warning",partial:"neutral",paid:"success"},i=t.map(u=>`
      <tr>
        <td class="mono">${u.documentNo}</td>
        <td>${u.purchaseDate}</td>
        <td class="mono">${u.supplierCode}</td>
        <td>${u.supplierName}</td>
        <td>${u.itemName}</td>
        <td class="numeric">${u.quantity.toLocaleString("ja-JP")}</td>
        <td class="numeric">${f(u.unitPrice)}</td>
        <td class="numeric"><strong>${f(u.amount)}</strong></td>
        <td>
          <span class="status-pill ${s[u.status]}">${n[u.status]}</span>
        </td>
      </tr>
    `).join(""),p=e.map(u=>`
      <tr>
        <td class="mono">${u.supplierCode}</td>
        <td>${u.supplierName}</td>
        <td class="numeric">${f(u.totalPurchase)}</td>
        <td class="numeric">${f(u.paidAmount)}</td>
        <td class="numeric"><strong>${f(u.balance)}</strong></td>
        <td>${u.nextPaymentDate||"―"}</td>
        <td>
          <span class="status-pill ${o[u.status]}">${c[u.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="payable-pay" data-code="${u.supplierCode}" ${u.status==="paid"?"disabled":""}>支払処理</button>
        </td>
      </tr>
    `).join(""),l=t.reduce((u,h)=>u+h.amount,0),d=e.reduce((u,h)=>u+h.balance,0),r=e.filter(u=>u.status!=="paid").length;return`
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
        <p class="kpi-value">${f(l)}</p>
        <p class="kpi-sub">${t.length} 伝票</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">買掛残高</p>
        <p class="kpi-value">${f(d)}</p>
        <p class="kpi-sub">未払い ${r} 社</p>
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
          <tbody>${i||'<tr><td colspan="9" class="empty-row">仕入データがありません。</td></tr>'}</tbody>
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
  `}function C(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ye(t,e){const n={holding:"保有中",due:"期日到来",cleared:"決済済"},s={holding:"neutral",due:"warning",cleared:"success"},c=t.map(r=>`
      <tr>
        <td class="mono">${r.billNo}</td>
        <td>${r.supplierName}</td>
        <td class="numeric">${C(r.amount)}</td>
        <td>${r.issueDate}</td>
        <td>${r.dueDate}</td>
        <td>
          <span class="status-pill ${s[r.status]}">${n[r.status]}</span>
        </td>
        <td>
          <button class="button-sm secondary" data-action="bill-detail" data-id="${r.id}" ${r.status==="cleared"?"disabled":""}>詳細</button>
        </td>
      </tr>
    `).join(""),o=e.map(r=>{const u=r.minimumStock>0&&r.currentStock<r.minimumStock*1.2;return`
        <tr>
          <td class="mono">${r.code}</td>
          <td>${r.name}</td>
          <td class="numeric ${u?"text-danger":""}">
            ${r.currentStock.toLocaleString("ja-JP")} ${r.unit}
            ${u?'<span class="status-pill warning" style="margin-left:4px">要補充</span>':""}
          </td>
          <td class="numeric">${r.minimumStock.toLocaleString("ja-JP")} ${r.unit}</td>
          <td class="numeric">${C(r.unitCost)}</td>
          <td class="numeric">${C(r.currentStock*r.unitCost)}</td>
          <td>${r.lastPurchaseDate}</td>
        </tr>
      `}).join(""),i=t.filter(r=>r.status==="holding"),p=i.reduce((r,u)=>r+u.amount,0),l=e.reduce((r,u)=>r+u.currentStock*u.unitCost,0),d=e.filter(r=>r.minimumStock>0&&r.currentStock<r.minimumStock*1.2).length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">仕入管理</p>
        <h1>手形管理・原料在庫</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">手形保有総額</p>
        <p class="kpi-value">${C(p)}</p>
        <p class="kpi-sub">${i.length} 枚保有中</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">原料在庫評価額</p>
        <p class="kpi-value">${C(l)}</p>
        <p class="kpi-sub">要補充 ${d} 品目</p>
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
          <tbody>${c||'<tr><td colspan="7" class="empty-row">手形データがありません。</td></tr>'}</tbody>
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
          <tbody>${o||'<tr><td colspan="7" class="empty-row">原料データがありません。</td></tr>'}</tbody>
        </table>
      </div>
    </section>
  `}function ve(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function be(t){return t.replace("-","/")}function ge(t){if(t.length===0)return'<div class="chart-empty">データなし</div>';const e=760,n=280,s={top:16,right:24,bottom:36,left:64},c=e-s.left-s.right,o=n-s.top-s.bottom,i=Math.max(...t.map(r=>r.amount),1),p=c/t.length,l=[0,.25,.5,.75,1].map(r=>{const u=s.top+o-o*r,h=`${Math.round(i*r/1e4).toLocaleString("ja-JP")}万円`;return`
        <g>
          <line x1="${s.left}" y1="${u}" x2="${e-s.right}" y2="${u}" class="chart-grid" />
          <text x="8" y="${u+4}" class="chart-axis">${h}</text>
        </g>
      `}).join(""),d=t.map((r,u)=>{const h=r.amount/i*o,k=Math.max(p-18,24),P=s.left+u*p+(p-k)/2,_=s.top+o-h;return`
        <g>
          <rect x="${P}" y="${_}" width="${k}" height="${h}" rx="6" class="analytics-bar" />
          <text x="${P+k/2}" y="${n-10}" class="chart-axis centered-axis">${be(r.month)}</text>
        </g>
      `}).join("");return`
    <svg viewBox="0 0 ${e} ${n}" class="sales-chart" role="img" aria-label="月別売上分析">
      ${l}
      ${d}
    </svg>
  `}function $e(t){return t.length===0?'<tr><td colspan="5" class="empty-row">データなし</td></tr>':t.map(e=>`
        <tr>
          <td class="mono">${e.code}</td>
          <td>${e.name}</td>
          <td class="numeric">${ve(e.amount)}</td>
          <td class="numeric">${e.quantity.toLocaleString("ja-JP")}</td>
          <td class="numeric">${e.documents.toLocaleString("ja-JP")}</td>
        </tr>
      `).join("")}function fe(t,e){const n=e==="products"?"商品別集計":"得意先別集計",s=e==="products"?t.productTotals:t.customerTotals;return`
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
        ${ge(t.monthlySales)}
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
            <tbody>${$e(s)}</tbody>
          </table>
        </div>
      </article>
    </section>
  `}function w(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function ke(t){const e=Math.max(...t.salesByProduct.flatMap(o=>o.values),1),n=t.salesByProduct.map(o=>{const i=o.values.map((p,l)=>`
          <div class="bar-col">
            <div class="bar" style="height:${Math.round(p/e*120)}px" title="${t.months[l]}: ${w(p)}"></div>
            <span class="bar-label">${t.months[l].replace("月","")}</span>
          </div>
        `).join("");return`
        <div class="chart-series">
          <p class="chart-series-label">${o.label}</p>
          <div class="bar-chart">${i}</div>
        </div>
      `}).join(""),s=t.costSimulation.map(o=>`
      <tr>
        <td class="mono">${o.productCode}</td>
        <td>${o.productName}</td>
        <td class="numeric">${w(o.costPrice)}</td>
        <td class="numeric">${w(o.sellPrice)}</td>
        <td class="numeric">${w(o.margin)}</td>
        <td class="numeric">
          <span class="status-pill ${o.marginRate>=40?"success":"warning"}">${o.marginRate.toFixed(1)}%</span>
        </td>
      </tr>
    `).join(""),c=t.salesByCustomer.map(o=>{const i=o.values.reduce((p,l)=>p+l,0);return`
        <tr>
          <td>${o.label}</td>
          ${o.values.map(p=>`<td class="numeric">${(p/1e4).toFixed(0)}万</td>`).join("")}
          <td class="numeric"><strong>${w(i)}</strong></td>
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
              ${t.months.map(o=>`<th class="numeric">${o}</th>`).join("")}
              <th class="numeric">合計</th>
            </tr>
          </thead>
          <tbody>${c}</tbody>
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
  `}function Se(t){return new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(t))}function De(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function z(t){return t.toISOString().slice(0,10)}function Ce(t,e,n){const s=t.length?t.map(c=>`
            <tr>
              <td class="mono">${c.documentNo}</td>
              <td>${Se(c.date)}</td>
              <td>
                <div class="table-title">${c.customerName}</div>
                <div class="table-sub mono">${c.customerCode}</div>
              </td>
              <td class="numeric">${De(c.amount)}</td>
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
          <input id="sales-start" type="date" value="${e||z(new Date(Date.now()-1e3*60*60*24*30))}" />
        </label>
        <label class="field">
          <span>終了日</span>
          <input id="sales-end" type="date" value="${n||z(new Date)}" />
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
  `}function L(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function we(t,e,n,s){const c={cash:"現金",card:"カード",paypay:"PayPay",other:"その他"},o={new:"新規",processing:"処理中",shipped:"発送済",delivered:"配達済"},i={new:"warning",processing:"neutral",shipped:"success",delivered:"success"},p=t.map(u=>`
      <tr>
        <td>${u.saleTime}</td>
        <td class="mono">${u.productCode}</td>
        <td>${u.productName}</td>
        <td class="numeric">${u.quantity}</td>
        <td class="numeric">${L(u.unitPrice)}</td>
        <td class="numeric"><strong>${L(u.amount)}</strong></td>
        <td>${c[u.paymentMethod]}</td>
      </tr>
    `).join(""),l=e.map(u=>`
      <tr>
        <td class="mono">${u.orderNo}</td>
        <td>${u.orderDate}</td>
        <td>${u.customerName}</td>
        <td>${u.postalCode} ${u.address}</td>
        <td>${u.items.map(h=>`${h.productName} ×${h.quantity}`).join("<br>")}</td>
        <td class="numeric"><strong>${L(u.totalAmount)}</strong></td>
        <td>
          <span class="status-pill ${i[u.status]}">${o[u.status]}</span>
        </td>
        <td>${u.shippingDate||"―"}</td>
        <td>
          <button class="button-sm secondary" data-action="order-detail" data-id="${u.id}">詳細</button>
        </td>
      </tr>
    `).join(""),d=t.reduce((u,h)=>u+h.amount,0),r=e.filter(u=>u.status==="new").length;return`
    <section class="page-head">
      <div>
        <p class="eyebrow">店舗・直売所</p>
        <h1>店舗管理</h1>
      </div>
    </section>

    <section class="kpi-grid compact">
      <article class="panel kpi-card">
        <p class="panel-title">本日売上</p>
        <p class="kpi-value">${L(d)}</p>
        <p class="kpi-sub">${t.length} 件 / ${s}</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">新規受注</p>
        <p class="kpi-value">${r} 件</p>
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
            <tbody>${l||'<tr><td colspan="9" class="empty-row">受注データがありません。</td></tr>'}</tbody>
          </table>
        </div>
        `}
    </section>
  `}function Ne(t){const e={empty:"空",in_use:"使用中",aging:"熟成中"},n={empty:"neutral",in_use:"warning",aging:"success"},s=t.map(d=>{const r=d.capacity>0?Math.round(d.currentVolume/d.capacity*100):0;return`
        <tr>
          <td class="mono"><strong>${d.tankNo}</strong></td>
          <td class="numeric">${d.capacity.toLocaleString("ja-JP")} L</td>
          <td class="numeric">${d.currentVolume>0?d.currentVolume.toLocaleString("ja-JP")+" L":"―"}</td>
          <td>
            <div class="progress-wrap">
              <div class="progress-bar" style="width:${r}%"></div>
            </div>
            <span class="progress-label">${r}%</span>
          </td>
          <td>${d.productName||"―"}</td>
          <td class="mono">${d.jikomiNo||"―"}</td>
          <td>
            <span class="status-pill ${n[d.status]}">${e[d.status]}</span>
          </td>
          <td>${d.lastUpdated}</td>
          <td>
            <button class="button-sm secondary" data-action="tank-detail" data-id="${d.id}">詳細</button>
          </td>
        </tr>
      `}).join(""),c=t.filter(d=>d.status==="in_use").length,o=t.filter(d=>d.status==="aging").length,i=t.filter(d=>d.status==="empty").length,p=t.reduce((d,r)=>d+r.capacity,0),l=t.reduce((d,r)=>d+r.currentVolume,0);return`
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
        <p class="kpi-sub">使用率 ${p>0?Math.round(l/p*100):0}%</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">使用中</p>
        <p class="kpi-value">${c} 基</p>
        <p class="kpi-sub">熟成中 ${o} 基</p>
      </article>
      <article class="panel kpi-card">
        <p class="panel-title">空きタンク</p>
        <p class="kpi-value">${i} 基</p>
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
  `}function R(t){return new Intl.NumberFormat("ja-JP",{style:"currency",currency:"JPY",maximumFractionDigits:0}).format(t)}function Pe(t,e,n){const s=t.rows.map(o=>`
      <tr>
        <td class="mono">${o.taxCategory}</td>
        <td>${o.taxCategoryName}</td>
        <td class="numeric">${o.alcoholDegree.toFixed(1)}度</td>
        <td class="numeric">${o.volume.toLocaleString("ja-JP")} L</td>
        <td class="numeric">${o.taxRate.toLocaleString("ja-JP")} 円/L</td>
        <td class="numeric"><strong>${R(o.taxAmount)}</strong></td>
      </tr>
    `).join(""),c=Array.from({length:12},(o,i)=>i+1);return`
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
            ${[2025,2026].map(o=>`<option value="${o}" ${e===o?"selected":""}>${o}年</option>`).join("")}
          </select>
        </label>
        <label class="field">
          <span>対象月</span>
          <select id="tax-month">
            ${c.map(o=>`<option value="${o}" ${n===o?"selected":""}>${o}月</option>`).join("")}
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
        <p class="kpi-value">${R(t.totalTax)}</p>
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
              <th class="numeric">${R(t.totalTax)}</th>
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
  `}const Le=["/","/sales","/payment","/master","/invoice","/ledger","/analytics","/invoice-entry","/delivery","/billing","/report","/jikomi","/tanks","/kentei","/materials","/purchase","/raw-material","/tax","/store"];function O(){return{invoiceType:"sales",invoiceDate:new Date().toISOString().slice(0,10),customerCode:"",customerName:"",staffCode:"",lines:[],note:""}}const A=new Date,je=A.toISOString().slice(0,7),xe=A.getFullYear(),Ae=A.getMonth()+1,_e=A.toISOString().slice(0,10),Te="C0011",a={salesSummary:null,paymentStatus:null,masterStats:null,pipelineMeta:null,invoiceRecords:[],customerLedger:null,salesAnalytics:null,invoiceForm:O(),invoiceSaving:!1,invoiceSavedDocNo:null,deliveryNote:null,deliverySearchDocNo:"",billingSummary:null,billingYearMonth:je,salesReport:null,jikomiList:[],tankList:[],kenteiList:[],materialList:[],purchaseList:[],payableList:[],billList:[],rawStockList:[],taxDeclaration:null,taxYear:xe,taxMonth:Ae,storeSales:[],storeOrders:[],storeTab:"pos",storeSalesDate:_e,route:ot(location.pathname),salesFilter:{startDate:"",endDate:""},invoiceFilter:{documentNo:"",startDate:"",endDate:"",customerCode:""},ledgerCustomerCode:Te,masterTab:"customers",analyticsTab:"products",loading:!0,actionLoading:!1,error:null};function ot(t){const e="/sake-system/".endsWith("/")?"/sake-system/".slice(0,-1):"/sake-system/",n=t.startsWith(e)?t.slice(e.length)||"/":t;return Le.includes(n)?n:"/"}function G(t){return t.slice(0,10)}function Fe(t){const e=a.salesFilter.startDate?new Date(a.salesFilter.startDate):null,n=a.salesFilter.endDate?new Date(`${a.salesFilter.endDate}T23:59:59`):null;return[...t.salesRecords].sort((s,c)=>new Date(c.date).getTime()-new Date(s.date).getTime()).filter(s=>{const c=new Date(s.date);return!(e&&c<e||n&&c>n)})}function Je(t){const e=`${"/sake-system/".replace(/\/$/,"")}${t==="/"?"/":t}`;history.pushState(null,"",e),a.route=t,Y(t)}async function Y(t){a.actionLoading=!0,m();try{switch(t){case"/delivery":a.deliveryNote||(a.deliveryNote=await et(a.deliverySearchDocNo||"D240122"));break;case"/billing":a.billingSummary||(a.billingSummary=await at(a.billingYearMonth));break;case"/report":a.salesReport||(a.salesReport=await Dt());break;case"/jikomi":a.jikomiList.length===0&&(a.jikomiList=await Nt());break;case"/tanks":a.tankList.length===0&&(a.tankList=await Lt());break;case"/kentei":a.kenteiList.length===0&&(a.kenteiList=await xt());break;case"/materials":a.materialList.length===0&&(a.materialList=await _t());break;case"/purchase":(a.purchaseList.length===0||a.payableList.length===0)&&([a.purchaseList,a.payableList]=await Promise.all([Rt(),qt()]));break;case"/raw-material":(a.billList.length===0||a.rawStockList.length===0)&&([a.billList,a.rawStockList]=await Promise.all([It(),Ot()]));break;case"/tax":a.taxDeclaration||(a.taxDeclaration=await st(a.taxYear,a.taxMonth));break;case"/store":(a.storeSales.length===0||a.storeOrders.length===0)&&([a.storeSales,a.storeOrders]=await Promise.all([nt(a.storeSalesDate),Kt()]));break;default:break}}catch(e){console.warn("Route data load error",e)}finally{a.actionLoading=!1,m()}}function Me(){if(a.loading)return'<section class="panel"><p>データを読み込んでいます。</p></section>';if(a.error)return`
      <section class="panel error-card">
        <p class="eyebrow">読込失敗</p>
        <h1>画面の初期化に失敗しました</h1>
        <p>${a.error}</p>
      </section>
    `;switch(a.route){case"/invoice-entry":return ee(a.invoiceForm,a.invoiceSavedDocNo,a.invoiceSaving);case"/delivery":return a.deliveryNote?Xt(a.deliveryNote,a.deliverySearchDocNo):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/billing":return a.billingSummary?Ht(a.billingSummary,a.billingYearMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/report":return a.salesReport?ke(a.salesReport):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/jikomi":return ce(a.jikomiList);case"/tanks":return Ne(a.tankList);case"/kentei":return oe(a.kenteiList);case"/materials":return de(a.materialList);case"/purchase":return he(a.purchaseList,a.payableList);case"/raw-material":return ye(a.billList,a.rawStockList);case"/tax":return a.taxDeclaration?Pe(a.taxDeclaration,a.taxYear,a.taxMonth):'<section class="panel"><p>データを読み込んでいます…</p></section>';case"/store":return we(a.storeSales,a.storeOrders,a.storeTab,a.storeSalesDate)}if(!a.salesSummary||!a.paymentStatus||!a.masterStats||!a.pipelineMeta||!a.customerLedger||!a.salesAnalytics)return"";switch(a.route){case"/sales":return Ce(Fe(a.salesSummary),a.salesFilter.startDate,a.salesFilter.endDate);case"/payment":return me([...a.paymentStatus.records].sort((t,e)=>e.balanceAmount-t.balanceAmount));case"/master":return re(a.masterStats,a.masterTab);case"/invoice":return ne(a.invoiceRecords,a.invoiceFilter);case"/ledger":return zt(a.customerLedger,a.ledgerCustomerCode);case"/analytics":return fe(a.salesAnalytics,a.analyticsTab);default:return Zt(a.salesSummary,a.pipelineMeta)}}function Re(){return`
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <span class="brand-mark">syusen-cloud</span>
          <h1>業務Web UI</h1>
          <p>酒仙i 次世代版</p>
        </div>
        <nav class="nav" aria-label="主要ナビゲーション">
          ${[{label:"概要",items:[{path:"/",label:"ダッシュボード",kicker:"Home"},{path:"/sales",label:"売上一覧",kicker:"Sales"},{path:"/payment",label:"入金状況",kicker:"Payment"},{path:"/master",label:"マスタ",kicker:"Master"},{path:"/invoice",label:"伝票照会",kicker:"Invoice"},{path:"/ledger",label:"得意先台帳",kicker:"Ledger"},{path:"/analytics",label:"売上分析",kicker:"Analytics"}]},{label:"販売管理",items:[{path:"/invoice-entry",label:"伝票入力",kicker:"Entry"},{path:"/delivery",label:"納品書",kicker:"Delivery"},{path:"/billing",label:"月次請求",kicker:"Billing"},{path:"/report",label:"集計帳票",kicker:"Report"}]},{label:"蔵内管理",items:[{path:"/jikomi",label:"仕込管理",kicker:"Jikomi"},{path:"/tanks",label:"タンク管理",kicker:"Tank"},{path:"/kentei",label:"検定管理",kicker:"Kentei"},{path:"/materials",label:"資材管理",kicker:"Material"}]},{label:"仕入管理",items:[{path:"/purchase",label:"仕入・買掛",kicker:"Purchase"},{path:"/raw-material",label:"手形・原料",kicker:"RawMat"}]},{label:"その他",items:[{path:"/tax",label:"酒税申告",kicker:"Tax"},{path:"/store",label:"店舗・直売所",kicker:"Store"}]}].map(n=>`
      <div class="nav-group">
        <p class="nav-group-label">${n.label}</p>
        ${n.items.map(s=>`
          <a href="${"/sake-system/".replace(/\/$/,"")}${s.path==="/"?"/":s.path}"
             class="nav-link ${a.route===s.path?"active":""}"
             data-link="${s.path}">
            <div>
              <div class="nav-kicker">${s.kicker}</div>
              <div class="nav-label">${s.label}</div>
            </div>
          </a>
        `).join("")}
      </div>
    `).join("")}
        </nav>
      </aside>
      <main class="main">
        <div class="view ${a.actionLoading?"is-busy":""}">${Me()}</div>
      </main>
    </div>
  `}async function qe(t){a.actionLoading=!0,m();try{a.invoiceRecords=await I(t)}finally{a.actionLoading=!1,m()}}async function Ie(t){a.actionLoading=!0,m();try{a.customerLedger=await tt(t)}finally{a.actionLoading=!1,m()}}function q(t){a.invoiceForm={invoiceType:t.querySelector("#inv-type")?.value??a.invoiceForm.invoiceType,invoiceDate:t.querySelector("#inv-date")?.value??a.invoiceForm.invoiceDate,customerCode:t.querySelector("#inv-customer-code")?.value??a.invoiceForm.customerCode,customerName:t.querySelector("#inv-customer-name")?.value??a.invoiceForm.customerName,staffCode:t.querySelector("#inv-staff")?.value??a.invoiceForm.staffCode,lines:a.invoiceForm.lines.map((e,n)=>{const s=parseFloat(t.querySelector(`[data-line="${n}"][data-field="quantity"]`)?.value??"")||0,c=parseFloat(t.querySelector(`[data-line="${n}"][data-field="unitPrice"]`)?.value??"")||0;return{...e,productCode:t.querySelector(`[data-line="${n}"][data-field="productCode"]`)?.value??e.productCode,productName:t.querySelector(`[data-line="${n}"][data-field="productName"]`)?.value??e.productName,unit:t.querySelector(`[data-line="${n}"][data-field="unit"]`)?.value??e.unit,quantity:s,unitPrice:c,amount:s*c}}),note:t.querySelector("#inv-note")?.value??a.invoiceForm.note}}function Oe(t){t.querySelectorAll("[data-link]").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),Je(e.dataset.link)})}),t.querySelector("[data-action='sales-filter']")?.addEventListener("click",()=>{const e=t.querySelector("#sales-start")?.value??"",n=t.querySelector("#sales-end")?.value??"";a.salesFilter={startDate:e,endDate:n},m()}),t.querySelector("[data-action='invoice-filter']")?.addEventListener("click",()=>{const e={documentNo:t.querySelector("#invoice-document-no")?.value??"",startDate:t.querySelector("#invoice-start")?.value??"",endDate:t.querySelector("#invoice-end")?.value??"",customerCode:t.querySelector("#invoice-customer-code")?.value??""};a.invoiceFilter=e,qe(e)}),t.querySelector("[data-action='ledger-search']")?.addEventListener("click",()=>{const e=t.querySelector("#ledger-customer-code")?.value??"";a.ledgerCustomerCode=e.trim().toUpperCase(),Ie(a.ledgerCustomerCode)}),t.querySelectorAll("[data-tab]").forEach(e=>{e.addEventListener("click",()=>{a.masterTab=e.dataset.tab,m()})}),t.querySelectorAll("[data-analytics-tab]").forEach(e=>{e.addEventListener("click",()=>{a.analyticsTab=e.dataset.analyticsTab,m()})}),t.querySelector("[data-action='add-line']")?.addEventListener("click",()=>{q(t),a.invoiceForm.lines.push({productCode:"",productName:"",quantity:0,unitPrice:0,unit:"本",amount:0}),m()}),t.querySelectorAll("[data-action='remove-line']").forEach(e=>{e.addEventListener("click",()=>{q(t);const n=parseInt(e.dataset.line??"0",10);a.invoiceForm.lines.splice(n,1),m()})}),t.querySelector("[data-action='invoice-clear']")?.addEventListener("click",()=>{a.invoiceForm=O(),a.invoiceSavedDocNo=null,m()}),t.querySelector("[data-action='invoice-save']")?.addEventListener("click",()=>{q(t),a.invoiceSaving=!0,m(),$t(a.invoiceForm).then(e=>{a.invoiceSavedDocNo=e.documentNo,a.invoiceSaving=!1,a.invoiceForm=O(),m()})}),t.querySelector("[data-action='delivery-search']")?.addEventListener("click",()=>{const e=t.querySelector("#delivery-docno")?.value??"";a.deliverySearchDocNo=e.trim(),a.deliveryNote=null,a.actionLoading=!0,m(),et(a.deliverySearchDocNo||"D240122").then(n=>{a.deliveryNote=n,a.actionLoading=!1,m()})}),t.querySelector("[data-action='billing-load']")?.addEventListener("click",()=>{const e=t.querySelector("#billing-month")?.value??a.billingYearMonth;a.billingYearMonth=e,a.billingSummary=null,a.actionLoading=!0,m(),at(e).then(n=>{a.billingSummary=n,a.actionLoading=!1,m()})}),t.querySelector("[data-action='tax-load']")?.addEventListener("click",()=>{const e=parseInt(t.querySelector("#tax-year")?.value??String(a.taxYear),10),n=parseInt(t.querySelector("#tax-month")?.value??String(a.taxMonth),10);a.taxYear=e,a.taxMonth=n,a.taxDeclaration=null,a.actionLoading=!0,m(),st(e,n).then(s=>{a.taxDeclaration=s,a.actionLoading=!1,m()})}),t.querySelectorAll("[data-store-tab]").forEach(e=>{e.addEventListener("click",()=>{a.storeTab=e.dataset.storeTab,m()})}),t.querySelector("[data-action='store-load']")?.addEventListener("click",()=>{const e=t.querySelector("#store-date")?.value??a.storeSalesDate;a.storeSalesDate=e,a.storeSales=[],a.actionLoading=!0,m(),nt(e).then(n=>{a.storeSales=n,a.actionLoading=!1,m()})})}function m(){const t=document.querySelector("#app");t&&(t.innerHTML=Re(),Oe(t))}async function Ee(){a.loading=!0,m();try{const[t,e,n,s,c,o,i]=await Promise.all([ht(),yt(),vt(),bt(),I(a.invoiceFilter),tt(a.ledgerCustomerCode),gt()]);if(a.salesSummary=t,a.paymentStatus=e,a.masterStats=n,a.pipelineMeta=s,a.invoiceRecords=c,a.customerLedger=o,a.salesAnalytics=i,!a.salesFilter.startDate||!a.salesFilter.endDate){const l=[...t.salesRecords].sort((u,h)=>new Date(h.date).getTime()-new Date(u.date).getTime())[0]?.date??new Date().toISOString(),d=new Date(l),r=new Date(d);r.setDate(d.getDate()-30),a.salesFilter={startDate:G(r.toISOString()),endDate:G(d.toISOString())}}(!a.invoiceFilter.startDate||!a.invoiceFilter.endDate)&&(a.invoiceFilter={...a.invoiceFilter,startDate:a.salesFilter.startDate,endDate:a.salesFilter.endDate},a.invoiceRecords=await I(a.invoiceFilter)),a.error=null}catch(t){a.error=t instanceof Error?t.message:"データの取得に失敗しました。"}finally{a.loading=!1,m(),Y(a.route)}}window.addEventListener("popstate",()=>{a.route=ot(location.pathname),Y(a.route)});Ee();
