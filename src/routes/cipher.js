const { post } = require("request")
const {tokens} = require('../models/const')


async function fetchCipher() {
  try {
    const response = await  fetch(
        "https://promo.winuxdroid.com/combo")
        if (!response.ok) {
          console.log(await response.json())
          throw new Error(`Flied to fetch cipher: ${response.status}`)
        }
     const res = await response.json();
     console.log(res["Hamster Kombat Combo"]["word"])
     return await res["Hamster Kombat Combo"]["word"];
  }
  catch(err) {
    console.log(err.message);
    return null;
  }
    
}

async function postCipherCode(token,cipher) {
  try {
    const data = {
     cipher
    }
    
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
     const res = await response.json();
     return await res;
  }
  catch(err) {
    console.log(err.message);
    return null;
  }
    
}

async function postCipherForToken(token,cipher) {
    const isPosted =  await postCipherCode(token,cipher)
    if(isPosted) {
      console.log("post cipher succesfuly for token: " + token);
    }
      
}

async function postCipherForAllTokens() {
 const cipher = await fetchCipher();
  const promesis = tokens.map(async(token) => {
   postCipherForToken(token, cipher)
    
  })
  await Promise.all(promesis);
}


postCipherForAllTokens()