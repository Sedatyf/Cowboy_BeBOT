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
 * @returns {string} Returns a string with today date
 */
function generateTodayDate() {
    const date = new Date();
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

/**
 * Get today date and add 1 day to it
 * @returns {string} Returns d+1 with yyyy-mm-dd format
 */
function add1DayToTodayDate() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);

    const dd = ('0' + targetDate.getDate()).slice(-2);
    const mm = ('0' + (targetDate.getMonth() + 1)).slice(-2); // 0 is January, so we must add 1
    const yyyy = targetDate.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
}

/**
 * Write data in file with fs
 * @param {string} filepath
 * @param {string} data
 */
function writeFile(filepath, data) {
    fs.writeFile(filepath, data, 'utf-8', err => {
        if (err) throw err;
    });
}

/**
 * Read the given file and returns a string or a JSON object
 * @param {string} filepath
 * @returns {(JSON|string)} if it's a JSON, returns a JSON object, else a string
 */
function readFile(filepath) {
    const buffer = fs.readFileSync(filepath);
    const fileContent = buffer.toString();

    if (filepath.endsWith('.json')) {
        return JSON.parse(fileContent);
    } else {
        return fileContent;
    }
}

/**
 * Get the json value for the current sutom
 * @param {string} jsonPath full filepath for json file
 * @returns {number} the current sutom value
 */
function getCurrentSutom(jsonPath) {
    const sutomJson = readFile(jsonPath);
    return sutomJson.currentNumber.currentSutom;
}

function title(stringToTitle) {
    return stringToTitle.charAt(0).toUpperCase() + stringToTitle.substring(1, stringToTitle.length);
}

module.exports = {
    generateRandomForArray,
    getRandomIntInclusive,
    generateTodayDate,
    add1DayToTodayDate,
    writeFile,
    readFile,
    getCurrentSutom,
    title,
};
