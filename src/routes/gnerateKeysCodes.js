const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const {promos} = require('../models/const')
// توليد UUID جديد



async function registerEvent(promoId,token) {
  try {
    const gencode = uuidv4();
  //  console.log(gencode)
  const response = await fetch("https://api.gamepromo.io/promo/register-event", {
    method : "POST",
    headers : {
      authorization : "Bearer "+token,
      'content-type' : 'application/json'
    },
    body : JSON.stringify({
    "promoId": promoId,
    "eventId": gencode,
     "eventOrigin": "undefined"
    })

  })
  if (!response.ok) {
  console.log(await response.json())
    throw new Error(`Filed to fetch : ${response.status}`)
  }
  const res = await response.json();
  if(res.hasCode == false) {
    return false;
  }
  console.log(res.hasCode)
  return true;
  }
  catch(err) {
    console.log(err.message)
    return null;
  }
}


async function createCode(promoId,token) {
  
 try {
   const resp = await fetch("https://api.gamepromo.io/promo/create-code", {
     method :"POST",
     headers: {
       'authorization': 'Bearer '+token,
       'content-type': 'application/json'
     },
     body: JSON.stringify(
       {
  "promoId": promoId
}
       )
     
   })
   if (!resp.ok) {
     throw new Error('Filed to fetch :' + resp.status)
   } 
  const res = await resp.json()
  console.log(res);
  return await res
 }
 catch(err) {
   console.log(err.message);
   return null;
 }
   
}
async function loginClient(promoId,times) {
  try {
    const tokens = [];
    for(let i = 0 ; i < times ; i++)
    {
      await delay(5000)
      const clientId = generateClientId();
      const response = await fetch("https://api.gamepromo.io/promo/login-client", {
          method : "POST",
          headers: {
            "content-type": "application/json"
          }, 
        body:JSON.stringify({
          "appToken": promoId,
          "clientId": clientId ,
          "clientOrigin": "deviceid"
        })
      })
      if(!response.ok) {
        console.log(promoId)
        console.log(await response.json())
        throw new Error(`Filed to fetch login client: ${response.status}`)
      }
      const res = await response.json();
    
     tokens.push(res.clientToken)
     
    }
    return await tokens; 
  }
  catch(err){
    console.log(err.message);
    return null;
  }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function createCodes() {
  return new Promise(async (res,rej) => {
    let j = 9;
    const promosCodes = []; // مصفوفة لتخزين الأكواد التي يتم توليدها
    for(let s = 0 ; s <= 5 ; s++)
    {
    while (j < promos.length) {
        const p = promos[j];
        let token = await loginClient(p.appToken ? p.appToken : p.promoId, p.times);
        console.log(token);
        if (token) {
            let codesCount = 0;
            while (codesCount < p.times) {
                await delay(5000);
                const hasCode = await registerEvent(p.promoId, token[codesCount]);
                if (hasCode) {
                    const code = await createCode(p.promoId, token[codesCount]);
                    if (code) {
                     //   console.log("code " + code.promoCode);
                        promosCodes.push(code.promoCode); // حفظ الكود في المصفوفة

                        // حفظ الكود في الملف مباشرة بعد توليده
                        saveCodeToFile(code.promoCode, 'codes.json');
                        codesCount++
                    }
                }
            }
            j++;
        }
    }
    }

  })
    
    
}

function saveCodeToFile(code, filePath) {
    try {
        // قراءة محتوى الملف الحالي إذا كان موجودًا
        let existingCodes = [];
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            existingCodes = JSON.parse(data);
        }

        // إضافة الكود الجديد إلى المصفوفة
        existingCodes.push(code);

        // حفظ المصفوفة المحدثة مرة أخرى في الملف
        fs.writeFileSync(filePath, JSON.stringify(existingCodes, null, 2), 'utf8');
        console.log(`Code ${code} saved to ${filePath}`);
    } catch (err) {
        console.error('Error saving code to file:', err);
    }
}
function generateClientId() {
    // الجزء الأول: الطابع الزمني في ميلي ثانية
    const timestamp = Date.now();

    // الجزء الثاني: رقم عشوائي كبير
    const randomPart = Math.floor(Math.random() * 1e18); // توليد رقم عشوائي كبير

    // دمج الجزأين معاً
    return `${timestamp}-${randomPart}`;
}

// دالة التأخير التي توقف التنفيذ لفترة معينة




//createCodes()
const clientId = generateClientId();
console.log(clientId);
exports.createCodes = createCodes