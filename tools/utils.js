const fs = require('fs');

/**
 * @param  {Array} arr
 * @returns {Number} A random number based on the Array's length
 */
function generateRandomForArray(arr) {
    let rand = Math.random();
    rand *= arr.length;
    return Math.floor(rand);
}

/**
 * Get a random number with both min and max included
 * @param {Number} min the minimum value
 * @param {Number} max the maximum value
 * @returns {Number} A random Number
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // max & min both included
}

/**
 * Get the date for the actual day (yyyy-mm-dd)
 * @returns {string} Retuns a string with today date
 */
function generateTodayDate() {
    const date = new Date();
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

/**
 * Write data in file with fs
 * @param {string} filepath
 * @param {string} data
 */
function writeFile(filepath, data) {
    fs.writeFile(filepath, data, err => {
        if (err) throw err;
    });
}

module.exports = {
    generateRandomForArray,
    getRandomIntInclusive,
    generateTodayDate,
    writeFile,
};
