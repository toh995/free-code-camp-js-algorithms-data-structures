/**
 * Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), 
 * payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
 * 
 * cid is a 2D array listing available currency.
 * 
 * The checkCashRegister() function should always return an object with a status key and a change key.
 * 
 * Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or
 * if you cannot return the exact change.
 * 
 * Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if
 * it is equal to the change due.
 * 
 * Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order,
 * as the value of the change key.
 * 
 * Currency             Unit   Amount
 * Penny	            $0.01  (PENNY)
 * Nickel	            $0.05  (NICKEL)
 * Dime	                $0.1   (DIME)
 * Quarter	            $0.25  (QUARTER)
 * Dollar	            $1     (DOLLAR)
 * Five Dollars	        $5     (FIVE)
 * Ten Dollars	        $10    (TEN)
 * Twenty Dollars	    $20    (TWENTY)
 * One-hundred Dollars	$100   (ONE HUNDRED)
 * 
 * See below for an example of a cash-in-drawer array:
 * [
 *  ["PENNY", 1.01],
 *  ["NICKEL", 2.05],
 *  ["DIME", 3.1],
 *  ["QUARTER", 4.25],
 *  ["ONE", 90],
 *  ["FIVE", 55],
 *  ["TEN", 20],
 *  ["TWENTY", 60],
 *  ["ONE HUNDRED", 100]
 * ]
 */

function checkCashRegister(price, cash, cid) {
    // Establish a dictionary to convert each coin name to its associated unit value
    const dict = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.10,
        "QUARTER": 0.25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "ONE HUNDRED": 100.00
    };

    // Define ret object, which will be returned at the end of this function
    const ret = {
        status: undefined,
        change: []
    };

    let changeDue = cash - price;
    let totalDrawerAmount = cid.reduce((sum, coin) => {
        const coinValue = coin[1];
        return moneyRound(sum + coinValue);
    }, 0);

    // Return in Closed status, if appropriate
    if (changeDue === totalDrawerAmount) {
        return {
            status: "CLOSED",
            change: cid.slice()
        };
    }

    // Sort cid from high to low
    const cidSorted = sortCidHighToLow(cid, dict);

    // Loop through each coin
    for (const coin of cidSorted) {
        const amountToGive = calculateAmountToGive(coin, changeDue, dict);
        const coinName = coin[0];

        if (amountToGive) {
            ret.change.push([coinName, amountToGive]);
            changeDue = moneyRound(changeDue - amountToGive);
        }

        // Break the loop if we have no more change due
        if (changeDue === 0) {
            break;
        }
    }

    // After looping through coins, specify which status we need to return
    // If we still have leftover change due, we have insufficient funds
    if (changeDue > 0) {
        ret.status = "INSUFFICIENT_FUNDS";
        ret.change = [];
    } else {
        ret.status = "OPEN";
    }

    return ret;
}

function sortCidHighToLow(cid, dict) {
    return cid
        .slice()
        .sort((coin1, coin2) => {
            const nameCoin1 = coin1[0];
            const nameCoin2 = coin2[0];

            const valueCoin1 = dict[nameCoin1];
            const valueCoin2 = dict[nameCoin2];

            return moneyRound(valueCoin2 - valueCoin1);
        });
}

function calculateAmountToGive(coin, changeDue, dict) {
    const [coinName, drawerAmount] = coin;
    const coinValue = dict[coinName];

    // numCoinsDrawer tells us how many of the current coin exist within the drawer
    const numCoinsDrawer = getQuotient(drawerAmount, coinValue);

    // coinCapacity tells us the max amount of the current coin we can give
    const coinCapacity = getQuotient(changeDue, coinValue);

    // numCoinsToGive tells us how many coins we should give the customer
    const numCoinsToGive = Math.min(numCoinsDrawer, coinCapacity);

    const amountToGive = numCoinsToGive * coinValue;
    return moneyRound(amountToGive);
}

// Round the given number to two decimal places
function moneyRound(num) {
    return Math.round(num * 100) / 100;
}

function getQuotient(dividend, divisor) {
    return Math.floor(dividend / divisor);
}