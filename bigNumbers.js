const equalStrLength = (a, b) => {
    //returns array with given two strings with equal length
    //shorter string gets 0 in the beginning to match length of longer
    const length = a.length >= b.length ? a.length : b.length; //length of longer string
    return [a.padStart(length, "0"), b.padStart(length, "0")];
};

const sumNumbersAsStrings = (a, b) => {
    // sum numbers as strings (handle "big numbers", bigger than safe integer in js)
    //adding two positive integer numbers in strings, returning sum as a string
    [a, b] = equalStrLength(a, b); //getsame numbers with leading 0 for shorter one
    let sumString = "";
    let carryOver = 0;

    for (let i = a.length - 1; i >= 0; i--) {
        const currSum = parseInt(a[i]) + parseInt(b[i]) + carryOver; //add a + b + carryOver from previous iteration
        sumString = (currSum % 10) + sumString; //concatenate current digit in front of sum prom previous iterations
        carryOver = Math.floor(currSum / 10);
    }

    return sumString;
};

const sumNumArray = arr => arr.reduce((a, b) => sumNumbersAsStrings(a, b));

const multiplyNumbersAsStrings = (a, b) => {
    // multiply numbers as strings (handle "big numbers", bigger than safe integer in js)
    //multiplies two positive integer numbers in strings, returning result as a string
    if (a * b < Number.MAX_SAFE_INTEGER) {
        // if result of multiplication is safe integer - we just return the result as a string
        return a * b + "";
    }

    //if result of multiplication is bigger than safe string we multiply a by every digit of b (b[i])
    //when we got result of this multiplication we add (b.length - 1 - i) zeroes '0' at the end
    //and we sum with result from previous iteration
    let result = "0";

    for (let i = 0; i < b.length; i++) {
        let stringRes = "";
        let multiplicationRes = parseInt(a) * parseInt(b[i]);
        if (multiplicationRes < Number.MAX_SAFE_INTEGER) {
            //if result of multiplication is safe integer we don't have to multiply "manually"
            // console.log(`Safe: ${a}*${b[i]}`)
            stringRes = multiplicationRes;
        } else {
            //if result is bigger than safe we use the funkction itself but multiplying b[i] * a
            // console.log(`Unsafe: ${a}*${b[i]}`);
            stringRes = multiplyNumbersAsStrings(b[i], a);
        }
        //add '0' at the and and convert stringRes to string
        stringRes += "0".repeat(b.length - i - 1);
        //add result of iteration to result
        result = sumNumbersAsStrings(result, stringRes);
    }
    return result;
};

const cutAndMultiply = (a, b) => {
    // a is multiple digit number
    // b is one-digit number
    // twelve-digit number * one-digit number is always safe integer
    const digits = 10;
    for (let i = 0; i <= Math.floor(a.length / digits); i++) {}
};

const cutParts = (x, digits) => {
    const parts = [];
    // for(let i=0; i<= Math.floor(a.length /digits); i++){
    //     // parts.push(x.slice());
    //     let part = x.slice(x.le)
    // }
    while (x.length > 0) {
        parts.push(x.slice(-digits));
        x = x.slice(0, -digits);
    }
    return parts;
};

const reverse = arr => arr.map(Array.prototype.pop, [...arr]); //reverse array

const splitDigits = numStr =>
    numStr
        .split("")
        .map((el, ind, arr) => Number(el) * Math.pow(10, arr.length - ind - 1));

const splitDigitsExp = numStr =>
    numStr.split("").map((el, ind, arr) => ({
        number: Number(el),
        exp10: arr.length - ind - 1
    }));

const multiply = (numStr1, numStr2) => {
    const aArray = splitDigits(numStr1);
    const bArray = splitDigits(numStr2);
    console.log(aArray, bArray);
    return aArray.map(a => bArray.map(b => a * b));
};

const multiplyExp = (numStr1, numStr2) => {
    const aArray = splitDigitsExp(numStr1);
    const bArray = splitDigitsExp(numStr2);
    return aArray.map(a =>
        bArray.map(b => ({
            number: a.number * b.number,
            exp10: a.exp10 + b.exp10
        }))
    );
};

const reverseNumStrToNumArr = numStr => reverse(numStr.split("").map(Number));
// const multiplyArrays = (aArr, bArr) => {

// }

const multiplyArr = (numStr1, numStr2) => {
    const aArray = reverseNumStrToNumArr(numStr1);
    const bArray = reverseNumStrToNumArr(numStr2);
    let result = new Array(aArray.length + bArray.length).fill(0);

    aArray.forEach((a, aInd) =>
        bArray.forEach((b, bInd) => {
            // debugger;
            temp = result[aInd + bInd] + a * b;
            // result[aInd + bInd] += (a * b) % 10;
            result[aInd + bInd] = temp % 10;
            result[aInd + bInd + 1] += Math.floor(temp / 10);
        })
    );
    result = reverse(result);
    result = result.slice(result.findIndex(x => x > 0)).join("");
    // console.log(result);
    return result;
};

module.exports = {
    reverseNumStrToNumArr,
    multiplyArr,
    splitDigits,
    splitDigitsExp,
    sumNumArray,
    cutParts,
    reverse,
    equal: equalStrLength,
    sum: sumNumbersAsStrings,
    multiply,
    multiplyExp
};
