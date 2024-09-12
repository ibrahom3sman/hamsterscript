const minMinutes = 5;
const maxMinutes = 10;

function myFunction() {
    console.log("الدالة شغالة!");
}

function delay() {
    // احسب مدة عشوائية بين 15 و 30 دقيقة
    const waitTime = Math.floor(Math.random() * (maxMinutes - minMinutes + 1) + minMinutes) * 60000; // تحويل الدقائق إلى ميلي ثانية

    console.log(`Redeem next code key after : ${waitTime / 60000} `);

    // شغل الدالة بعد المدة العشوائية
   return new Promise(resolve => setTimeout(resolve, waitTime));
}


async function fetcAplyPromo(code) {
  try {
   const fetchSetPromo = await fetch("https://api.hamsterkombatgame.io/clicker/apply-promo", {
      method: "POST",
      headers : {
        "content-type" : "application/json",
        "authorization" : "Bearer 1726079242936cDYdXfWUqXP6U8xnUjhlHopnPlBmxhpyYHQZPIRrFr3cEQzDL3V5EMzWWe8lcvR66656139471"
      },
       body: JSON.stringify({  "promoCode": code})

    })
    if(!fetchSetPromo.ok) {
  throw new Error("fetch filed: " + fetchSetPromo.status)
}
console.log("done")
  }
  catch(err){
    console.log(err.message)
  }
}

// const codes =[
//   'FLUF-W3R-116R-WW6T-2DK',
//   'FLUF-Z46-AAQY-WE68-WYL',
//   'FLUF-W3E-EPME-WE6B-AX6',
//   'FLUF-W3A-LEMT-W64Z-MMZ',
//   'FLUF-Z4W-FSQR-WA6B-86Y',
//   'FLUF-X3F-W6M9-WAA7-PZ9',
//   'FLUF-Y43-V3CA-WNAV-2PF',
//   'FLUF-X3Z-1PH2-WA9Z-5AT',
//   'TILE-Y37-4FY9-WPA2-A1H',
//   'TILE-Y4V-8LG6-W68W-Q6E',
//   'TILE-Y43-8QMD-W48M-J39',
//   'TILE-Y3B-JY83-WPA1-SHW',
//   'TRIM-Y3K-JPLK-WT9R-VG4',
//   'TRIM-X44-XM73-WY7V-F6D',
//   'TRIM-X3P-5ZWE-WGA1-ET7',
//   'TRIM-Z3G-PEWH-WN8R-FTH',
//   'STONE-W4L-9ZS3-WG9J-2X7',
//   'STONE-W34-AE6Z-WC8M-L8C',
//   'STONE-Z4T-H2KE-W8AH-32F',
//   'STONE-Z4T-LBKZ-WN94-GYR',
//   'TWERK-Y35-VQ3M-WT8B-68J',
//   'TWERK-Y3S-6SK9-WAB1-5Z8',       
//   'TWERK-X4S-85R2-WYCQ-5HW',        
//   'TWERK-Y4S-B7Z7-WYD6-5RG',         
//   'POLY-Y4H-LMXY-WCDK-AQ9',              
//   'POLY-Z4J-SEG3-WED9-YNS',              
//   'POLY-Y4W-VY89-WEBR-HMB',              
//   'POLY-Z3W-3Q88-WJCL-WX5',
//   'MERGE-X3W-8JLQ-WTJV-36P',
//   'MERGE-Y3J-JVAA-WNHG-T1N',
//   'MERGE-W3R-GN2N-WTHL-TTQ',
//   'MERGE-X4B-X7FR-WCN9-67Z',
//   'ZOO-Y3K-YSZR-W8LD-X1M',
//   'ZOO-W4Q-17LG-WPMP-H55',
//   'ZOO-Y3K-3N4S-W8K3-ZNX',
//   'ZOO-W3Z-15R8-W8LE-XGB',
//   'CUBE-X4Z-LAMT-WWLN-FG3',
//   'CUBE-Y34-YMJT-W4KY-PW7',
//   'CUBE-W4T-X9R6-W8NA-QFP',
//   'CUBE-W4Y-YG7E-WYN3-HM1'
// ]



const fs = require('fs');
const path = require('path');

// تحديد مسار ملف JSON الذي يحتوي على الأكواد
const filePath = './codes.json';

// قراءة الأكواد من ملف JSON وتحويلها إلى مصفوفة
function loadCodes() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading codes from JSON file:', err);
        return [];
    }
}

// حفظ الأكواد المحدثة في ملف JSON بعد الحذف
function saveCodes(codes) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(codes, null, 2), 'utf8');
    } catch (err) {
        console.error('Error saving codes to JSON file:', err);
    }
}

async function sendReq() {
    let codes = loadCodes(); // تحميل الأكواد من ملف JSON

    for (let index = 0; index < codes.length;) {
        await fetcAplyPromo(codes[index]);

        // حذف الكود من المصفوفة والملف بعد استخدامه
        codes.splice(index, 1);
        saveCodes(codes); // حفظ المصفوفة المحدثة في ملف JSON

        console.log('hi');
        await delay();
    }
}
//const codesareay = codes.split(",")
//async function senRequest() {
//  codes.map((code) => {
//    fetcAplyPromo(code)
//  })
////codesareay.map((f) => {
//  s(f)
//})
exports.claimKeys = sendReq