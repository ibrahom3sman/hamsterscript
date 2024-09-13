const  express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const cors = require('cors')

require('dotenv/config');

app.use(cors({
    origin: '*'
}))

app.use(express.json())



const tapRouter = require('./routes/tap').start;
const upgradesRouter = require('./routes/upgrade').upgrades;
const gnKeys = require('./routes/gnerateKeysCodes').createCodes;
const {claimKeys} = require('./routes/aplypromos');

if(process.argv[2] =='tap') {
    console.log(process.argv)
    tapRouter()
}
if (process.argv[2] == 'upgrade')
{
  console.log[process.argv];
  upgradesRouter()
}

if (process.argv.includes("gnkeys"))
{
  console.log[process.argv];
  async function waitfirit() {
    console.log("runing")
    await gnKeys();
    claimkeys();
  }
  waitfirit()
}
if (process.argv[2] == 'claimkeys')
{
  console.log[process.argv];
  claimKeys()
}

module.exports = app;
// exports.API = API