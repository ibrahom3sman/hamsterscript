const minMinutes = 0;
const maxMinutes = 5;
const tokens = require("../models/const").tokens;


function delay() {
    // احسب مدة عشوائية بين 15 و 30 دقيقة
    const waitTime = Math.floor(Math.random() * (maxMinutes - minMinutes + 1) + minMinutes) * 60000; // تحويل الدقائق إلى ميلي ثانية

    console.log(`Redeem next code key after : ${waitTime / 60000} `);

    // شغل الدالة بعد المدة العشوائية
   return new Promise(resolve => setTimeout(resolve, waitTime));
}


async function fetcAplyPromo(code, token) {
  try {
   const fetchSetPromo = await fetch("https://api.hamsterkombatgame.io/clicker/apply-promo", {
      method: "POST",
      headers : {
        "content-type" : "application/json",
        "authorization" : token
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

    // التحقق من أن عدد الأكواد كافٍ لكل حساب
    if (codes.length < 44 * tokens.length) {
        console.log('no enoph codes for your acounts');
        return;
    }

    // تقسيم الأكواد إلى مجموعات (44 كود لكل حساب)
    let batches = [];
    for (let i = 0; i < tokens.length; i++) {
        batches.push(codes.slice(i * 48, (i + 1) * 48));
    }
    
    console.log("Batches: " + batches)

    // إرسال الأكواد لكل حساب بالتوازي
    await Promise.all(tokens.map(async (token, index) => {
        let batch = batches[index]; // دفعة الأكواد الخاصة بهذا الحساب
        for (let code of batch) {
            await fetcAplyPromo(code, token); // إرسال كل كود مع التوكن
            console.log(`Code: ${code} sent for token: ${token}`);
            await delay(); // الانتظار بعد إرسال كل كود
        }
    }));

    // حفظ الأكواد المتبقية بعد الإرسال
    saveCodes(codes.slice(tokens.length * 44)); // حذف الأكواد المرسلة
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