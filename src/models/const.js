require('dotenv/config');

const API = "https://api.hamsterkombatgame.io"
const tokens = ["Bearer 1726079242936cDYdXfWUqXP6U8xnUjhlHopnPlBmxhpyYHQZPIRrFr3cEQzDL3V5EMzWWe8lcvR66656139471","Bearer 1725385117639fuOkkHl2ouwDbGn1BKob44jYWX2LNsnBHzAHyhabkV7y9iSTsFAmVnFvgQGoyzrp1605088023","Bearer 1725303737297UjlshLPTPPwDwdcQUCrYp55AnK3PnzqFQUAYwI43Nr58bAjmKav9xKekcC6IsBk21537696848", "Bearer 1725433898921U90HU4BcqCpimQ3rw65k2Z3IIGo614jiJTDnGJW4rfeCjde8uzy5qE8b9sO33Aqp7448504201", "Bearer 1725431280822RQPMj5EJI8uMxpuCZCHCKgaEXDcXg0HvdbPOxo1bVzUCslJNfhvDnrckcqQpDRqW7207695273"]
const promos = [{
   "promoId": "112887b0-a8af-4eb2-ac63-d82df78283d9",
    "times" : 8
},
{
  "promoId": "e68b39d2-4880-4a31-b3aa-0393e7df10c7",
  "times" : 4
},
{
  "promoId": "ef319a80-949a-492e-8ee0-424fb5fc20a6",
  "times":4
},

{
  "promoId":"04ebd6de-69b7-43d1-9c4b-04a6ca3305af",
  "times": 4
},
{
  "promoId":"61308365-9d16-4040-8bb0-2f4a4c69074c",
  "times": 4
},
{
  "promoId":"2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71",
  "times": 4
},
{
  "appToken" : "8d1cc2ad-e097-4b86-90ef-7a27e19fb833",
   "promoId" : "dc128d28-c45b-411c-98ff-ac7726fbaea4",
  "times" : 4
},
{
  "promoId": "b2436c89-e0aa-4aed-8046-9b0515e1c46b",
  "times":4
},
{
  "promoId": "bc72d3b9-8e91-4884-9c33-f72482f0db37",
  "times":4
},
{
  "appToken": "d1690a07-3780-4068-810f-9b5bbf2931b2",
  "promoId": "b4170868-cef0-424f-8eb9-be0622e8e8e3",
  "times":4
},
];
exports.API = API;
exports.tokens = tokens;
exports.promos = promos
