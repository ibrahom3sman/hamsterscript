
const { API } = require('../models/const');
const tokens = ["Bearer 1726079242936cDYdXfWUqXP6U8xnUjhlHopnPlBmxhpyYHQZPIRrFr3cEQzDL3V5EMzWWe8lcvR66656139471","Bearer 1725385117639fuOkkHl2ouwDbGn1BKob44jYWX2LNsnBHzAHyhabkV7y9iSTsFAmVnFvgQGoyzrp1605088023","Bearer 1725303737297UjlshLPTPPwDwdcQUCrYp55AnK3PnzqFQUAYwI43Nr58bAjmKav9xKekcC6IsBk21537696848", "Bearer 1725433898921U90HU4BcqCpimQ3rw65k2Z3IIGo614jiJTDnGJW4rfeCjde8uzy5qE8b9sO33Aqp7448504201", "Bearer 1725431280822RQPMj5EJI8uMxpuCZCHCKgaEXDcXg0HvdbPOxo1bVzUCslJNfhvDnrckcqQpDRqW7207695273","Bearer 1726350069826coGDojCtou9HaKO3ezxBwQZBpSc1ymMXoMDYewcMEjAeP7v5ooNA80hKfOgts0rK669378453"]

async function post_upgrade(token, card = "support_team") {
    const data = {
        "upgradeId": card,
        "timestamp": Date.now()
    };
    try {
        const response = await fetch(`${API}/clicker/buy-upgrade/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
          console.log(await response.json())
            throw new Error(`Failed to post upgrade: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in post_upgrade:", error);
        return null;
    }
}

async function get_upgrades(token) {
    try {
        const response = await fetch(`${API}/clicker/upgrades-for-buy`, {
            method: "POST",
            headers: {
                'Authorization': token,
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch upgrades: ${response.status}`);
        }
        const res = await response.json();
        return res.upgradesForBuy;
    } catch (error) {
        console.error("Error in get_upgrades:", error);
        return null;
    }
}

async function get_balance(token) {
    try {
        const response = await fetch(`${API}/clicker/sync`, {
            method: "POST",
            headers: {
                'Authorization': token
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch balance: ${response.status}`);
        }
        const res = await response.json();
        return res.clickerUser.balanceCoins;
    } catch (error) {
        console.error("Error in get_balance:", error);
        return null;
    }
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function auto_upgrade_for_token(token) {
    while (true) {
        let balance = await get_balance(token);
        if (balance === null) continue;

        let upgrades = await get_upgrades(token);
        if (upgrades === null) continue;
       
        for (let upgrade of upgrades) {
           let balance = await get_balance(token);
            if (upgrade.price <= balance && upgrade.isAvailable && !upgrade.isExpired && upgrade.profitPerHourDelta > 1000 && upgrade.price <= 10000000 && upgrade.cooldownSeconds == 0) {
  console.log(balance, upgrade.price)
                const result = await post_upgrade(token, upgrade.id);
                if (result !== null) {
                    console.log(`Purchased upgrade: ${upgrade.id} for token: ${token}`);
                     balance = await get_balance(token);
                     await delay(2000)
                }
            }
            else {
                //console.log(upgrade.price >= 1000000, upgrade.price)
                }
        }
    }
}

async function auto_upgrade_all_tokens() {
    const promises = tokens.map(token => auto_upgrade_for_token(token));
    await Promise.all(promises);  // تشغيل جميع الدوال بشكل متوازي
}

module.exports = {
    upgrades: auto_upgrade_all_tokens,
    auto_upgrade_for_token,
    post_upgrade,
    get_upgrades,
    get_balance
};