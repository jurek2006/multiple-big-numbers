const reverse = arr => arr.map(Array.prototype.pop, [...arr]); //reverse array

exports.multiply = (numStr1, numStr2) => {
    // splits both numbers from strings to arrays and reverse them
    // for example '12345' converts to array: [5,4,3,2,1] where index is power of ten
    // so '12345' equals 1*10^5 + 2*10^4 + 3*10^3 etc. (which is 1e5 + 2e4 + 3e3 etc.)
    // for multiplying we prepare resultReversed array (filled with 0's) which length equals sum of lenths of numStr1 and numStr2
    // (if first number is n digits long and second is m digits long the result of its multiplication is always shorter than n+m digits )
    // when multiplying we multiply every digit from first number (a) by every digit from last number (b) (from reversed arrays aArray and bArray)
    // where aInd is index of digit in the first number reversed (aArray) and bInd is index of digit in the second number reversed (bArray)
    // for each multiplication we increase the value of resultReversedArray[aInd + bInd] (because e.g. 3e3 * 2e4 === (3*2)e(3+4))
    // if the value is bigger than 10 we leave only rest from the division
    // and increase value of resultReversedArray[aInd + bInd +1] by floor from the value
    // resultReversed works the same way as converted numbers to arrays above (index is power of ten)
    // so we just need to reverse array and join to get result of multiplication

    // if given numStr1 or numsStr2 contains chars different than digits - return undefined
    const onlyDigitsRegex = /^\d+$/;
    if (!onlyDigitsRegex.test(numStr1) || !onlyDigitsRegex.test(numStr2)) {
        return;
    }

    const aArray = reverse(numStr1.split("").map(Number));
    const bArray = reverse(numStr2.split("").map(Number));
    let resultReversed = new Array(aArray.length + bArray.length).fill(0);

    aArray.forEach((a, aInd) =>
        bArray.forEach((b, bInd) => {
            temp = resultReversed[aInd + bInd] + a * b;
            resultReversed[aInd + bInd] = temp % 10;
            resultReversed[aInd + bInd + 1] += Math.floor(temp / 10);
        })
    );
    let result = reverse(resultReversed); //reverse result array to proper order
    return result.slice(result.findIndex(x => x > 0)).join(""); //cut leading 0 from string by finding first digit bigger than 0 and join to make string
};
