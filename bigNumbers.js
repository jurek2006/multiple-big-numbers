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
            console.log(`Unsafe: ${a}*${b[i]}`);
            stringRes = multiplyNumbersAsStrings(b[i], a);
        }
        //add '0' at the and and convert stringRes to string
        stringRes += "0".repeat(b.length - i - 1);
        //add result of iteration to result
        result = sumNumbersAsStrings(result, stringRes);
    }
    return result;
};

module.exports = {
    equal: equalStrLength,
    sum: sumNumbersAsStrings,
    multiply: multiplyNumbersAsStrings
};
