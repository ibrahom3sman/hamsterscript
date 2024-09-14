const { post } = require("request")
const {tokens} = require('../models/const')
if(process.argv[3] == 'undefind')
{
    console.log(process.argv)
    console.log("hi")

    process.exit()
}
const data = {
    cipher: process.argv[3]
}
console.log(process.argv)
async function fetchConfig(token) {
  try {
    const response = await  fetch(
        "https://api.hamsterkombatgame.io/clicker/config",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token    //'Bearer 17196526743934V9EISuu7M5kUjtVRFVZI4EqLThBaTNdwO5KaPA1kB1C9yv3aAXGXS0L9Z4XLGdv6656139471'
                },
            
        })
        if (!response.ok) {
          console.log(await response.json())
          throw new Error(`Flied to fetch cipher: ${response.status}`)
        }
     const res = await response.json();
     //console.log(res.dailyCipher.cipher)
     return await res.dailyCipher.cipher;
  }
  catch(err) {
    console.log(err.message);
    return null;
  }
    
}
async function decodeCipher(token) {
  let  encodeCipher = await fetchConfig(token);
  encodeCipher = encodeCipher.slice(0,-1)
  const decodeCipher = atob(encodeCipher)
 console.log(encodeCipher,decodeCipher)
}
async function postCipherCode(token) {
  try {
    const response = await  fetch(
        "https://api.hamsterkombatgame.io/clicker/claim-daily-cipher",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : token    //'Bearer 17196526743934V9EISuu7M5kUjtVRFVZI4EqLThBaTNdwO5KaPA1kB1C9yv3aAXGXS0L9Z4XLGdv6656139471'
                },
            body:JSON.stringify(data)
        })
        if (!response.ok) {
          console.log(await response.json())
          throw new Error(`Flied to fetch cipher: ${response.status}`)
        }
     const res = await res.json();
     return await res;
  }
  catch(err) {
    console.log(err.message);
    return null;
  }
    
}

async function postCipherForToken(token) {
    const isPosted =  await postCipherCode(token)
    if(isPosted) {
      console.log("post cipher succesfuly for token: " + token);
    }
      
}

async function postCipherForAllTokens() {
  const promesis = tokens.map(async(token) => {
   // postCipherForToken(token)
    await decodeCipher(token)
  })
  await Promise.all(promesis);
}


postCipherForAllTokens()