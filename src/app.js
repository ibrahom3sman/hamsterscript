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
const {checkTask} = require('./routes/aplyTasks');

if(process.argv.includes("tap")) {
    console.log(process.argv)
    tapRouter()
}
if(process.argv.includes("tasks")) {
    checkTask()
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
    await claimKeys();
  }
  waitfirit()
}
if (process.argv.includes("claimkeys"))
{
  console.log[process.argv];
  claimKeys()
}

module.exports = app;
// exports.API = API