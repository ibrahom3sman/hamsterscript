

// require('dotenv/config');



// app.use(express.json())



// const tapRouter = require('./routes/tap').start;
// const upgradesRouter = require('./routes/upgrade').upgrades;q
// const gnKeys = require('./routes/gnerateKeysCodes').createCodes;
// const {claimKeys} = require('./routes/aplypromos');

// if(process.argv[2] =='tap') {
//     console.log(process.argv)
//     tapRouter()
// }
// if (process.argv[2] == 'upgrade')
// {
//   console.log[process.argv];
//   upgradesRouter()
// }

// if (process.argv[2] == 'gnkeys')
// {
//   console.log[process.argv]
// async function h(){
//     await gnKeys()
// claimKeys()
//   }
//   h()
// }
// if (process.argv[2] == 'claimkeys')
// {
//   console.log[process.argv];
//   claimKeys()
// }

// module.exports = app;
// exports.API = API
s = 0

  async function a () {
    while(true) {
      try {
        const res =  await fetch("https://api.hamsterkombatgame.io/interlude/withdraw/reset", {

      method: "post",

   headers: {
     "authorization": "Bearer 1726907556926oQHpAQYp9usA64Xg8hPY4wKdx5d55EVlNd0h7Q2fAP9NxZsC4QBnZeBgxF7Ow5GV669378453",
     "content-type": "application/json"
   }
   ,
   body: JSON.stringify({})
 })
 console.log(await res.json())
 const ra = await fetch("https://api.hamsterkombatgame.io/interlude/withdraw/set-wallet-as-default", {
   method:"post",
   headers: {
       "authorization": "Bearer 1726907556926oQHpAQYp9usA64Xg8hPY4wKdx5d55EVlNd0h7Q2fAP9NxZsC4QBnZeBgxF7Ow5GV669378453",
     "content-type": "application/json"
   },
   body: JSON.stringify(
     {"id":"TonWallet","walletAddress":"UQDldjmq-yCq4W63C3rvDixnzczgZf0gHcF34HPCciFJPhNr"}
     )
 })
 console.log(await ra.json(), "set my wallete")
      }
      catch(e)
    {
      console.log(e)
    }
  }
 
 
  
}
a()