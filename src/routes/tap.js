const {API} = require('../models/const')
const data = {
    availableTaps : 1500,
    count: 1000,
    timestamp: Date.now(),
}
const tokens = require('../models/const').tokens
function post_tap(token) {
    return fetch(`${API}/clicker/tap` ,
    {
        method : "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization' : token
        //"Bearer 1724867343692XoPnf4CMN1iET1JgiRGRejSIvYdBGuSj6cXRJyOKFH9t1CNA2dudG8E6uophNehn1605088023"    //'Bearer 17196526743934V9EISuu7M5kUjtVRFVZI4EqLThBaTNdwO5KaPA1kB1C9yv3aAXGXS0L9Z4XLGdv6656139471'
        },
        body : JSON.stringify(data)

    })
}
async function start() {
      tokens.map(async(t) => {
        try{
          let response = await post_tap(tokens[1]);
          let res = await response.json();
          console.log(`Requst succsefull ur balance now: ${res.clickerUser.balanceCoins}`)
        }
       catch(err){
         console.log(err.message);
         
       }
      })
      setTimeout(() => {
      exe()
    }, 1000)
        /*let response = await tokens.map((t) => {
          console.log(t)
          return post_tap(t)
        }) ;
        const res = await response.json();*/
}
// start()

function exe(){
  
   start();
  
}


module.exports = {
    start: exe
}