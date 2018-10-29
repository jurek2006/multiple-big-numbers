const { equal, sum, multiply } = require("../bigNumbers");
const compareResutsChars = (a, b) => {
    [a, b] = equal(a, b);
    if (a === b) {
        return true;
    }

    let differences = "";
    a.split("").forEach((char, index) => {
        console.log(`Porównaj ${char} z ${b[index]}`);
        if (char === b[index]) {
            differences += "x";
        } else {
            differences += char;
            console.log("Błąd!");
        }
    });
    return differences;
};

module.exports = { compareResutsChars };
