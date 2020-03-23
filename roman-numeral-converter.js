/**
 * PROMPT:
 * Convert the given number into a roman numeral.
 * 
 * All roman numerals answers should be provided in upper-case.
 */

function convertToRoman(num) {
    // Establish a dictionary to convert numbers to their string equivalents
    const dict = {
        1: "I",
        5: "V",
        10: "X",
        50: "L",
        100: "C",
        500: "D",
        1000: "M",
    };
    const factors = [1000, 100, 10, 1];
    
    let ret = "";

    for (const factor of factors) {
        const {sym, remainder} = convertForFactor(num, factor, dict);
        ret += sym;
        num = remainder;
    }

    return ret;
}

/**
 * @param {number} num the number to convert
 * @param {number} factor the factor to convert the number for (i.e. 1, 10, 100, 1000)
 * @param {Object} dict provides a mapping where the keys are numbers, and the values are the Roman numeral string equivalent
 * 
 * @returns {Object} an object with two properties: "sym" for the string Roman numeral symbol, and "remainder" for the remainder.
 * 
 * @example
 * convertForFactor(62, 10, dict);
 * 
 * Return value for the function above:
 * {
 *  sym: "LX",
 *  remainder: 2
 * }
 */
function convertForFactor(num, factor, dict) {
    return {
        sym: getRomanNumeral(num, factor, dict),
        remainder: getRemainder(num, factor)
    };
}

function getRomanNumeral(num, factor, dict) {
    const indicatorVal = getQuotient(num, factor);

    const lowFactor = factor;
    const midFactor = factor * 5;
    const highFactor = factor * 10;

    const lowSymbol = dict[lowFactor];
    const midSymbol = dict[midFactor];
    const highSymbol = dict[highFactor];

    if (indicatorVal === 0) {
        return "";
    } else if (1 <= indicatorVal && indicatorVal <= 3) {
        return lowSymbol.repeat(indicatorVal);
    } else if (indicatorVal === 4) {
        return lowSymbol + midSymbol;
    } else if (indicatorVal === 5) {
        return midSymbol;
    } else if (6 <= indicatorVal && indicatorVal <= 8) {
        const repeatVal = indicatorVal - 5;
        return midSymbol + lowSymbol.repeat(repeatVal);
    } else if (indicatorVal === 9) {
        return lowSymbol + highSymbol;
    }
}

function getQuotient(dividend, divisor) {
    return Math.floor(dividend/divisor);
}

function getRemainder(dividend, divisor) {
    return dividend % divisor;
}