/**
 * PROMPT:
 * 
 * One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher.
 * In a shift cipher the meanings of the letters are shifted by some set amount.
 * 
 * A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places.
 * Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.
 * 
 * Write a function which takes a ROT13 encoded string as input and returns a decoded string.
 * 
 * All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
 */

/**
 * rot13 is the final function that should handle the job.
 * Note that "rangeStart" is the ascii character code for "A", and "rangeEnd" is the ascii character code for "Z".
 */
const rot13 = createDecoder({
    rangeStart: 65,
    rangeEnd: 90,
    shiftValue: 13
});

/**
 * Returns a cipher decoder with the given values
 * @param {Object} $0
 * @param {number} $0.rangeStart represents the beginning of the acceptable range of character codes for the cipher
 * @param {number} $0.rangeEnd represents the end of the acceptable range of character codes for the cipher
 * @param {number} $0.shiftValue represents the value each letter should be shifted by
 * 
 * @returns {function} 
 */
function createDecoder({ rangeStart, rangeEnd, shiftValue }) {
    return str => {
        return str.split("")
            .map(char => convertChar(char, rangeStart, rangeEnd, shiftValue))
            .join("");
    };
}

// Convert the char based on the given values
function convertChar(char, rangeStart, rangeEnd, shiftValue) {
    // Check if char is non-alphabetical
    if (!isLetter(char)) return char;

    // Convert the char to its corresponding number code
    const charCode = char.charCodeAt();
    let newCharCode = charCode - shiftValue;

    // If newCharCode is out of range, transform it so it lies within the acceptable range
    if (newCharCode < rangeStart) {
        const difference = rangeStart - newCharCode;
        newCharCode = rangeEnd - difference + 1;
    }

    const newChar = String.fromCharCode(newCharCode);
    return newChar;
}

// Check if the given character is a letter or not
function isLetter(char) {
    return /[A-Z]/.test(char);
}