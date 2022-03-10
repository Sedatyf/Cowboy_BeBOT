const { Message } = require('discord.js');
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
 * Save a sutom score for a specific user
 * @param {string} jsonPath json's filepath
 * @param {Message} message client's message
 * @param {Number} sutomNumber the daily sutom number
 * @param {Number} score user score
 */
function sutomBuildJson(jsonPath, message, sutomNumber, score) {
    const jsonData = require(`../${jsonPath}`);
    if (!(message.author.username in jsonData['users'])) {
        jsonData['users'][message.author.username] = {
            userInfo: message.author.id,
            sutomScore: {},
        };

        const createUserJson = JSON.stringify(jsonData);
        writeFile(jsonPath, createUserJson);
    }

    if (typeof score !== 'number' || score < 1) {
        message.reply("T'essayes de m'arnaquer ? è_é");
        return;
    }

    jsonData['users'][message.author.username]['sutomScore'][sutomNumber] = score;
    const json = JSON.stringify(jsonData);
    writeFile(jsonPath, json);
}

/**
 * Get the json value for the current sutom
 * @param {string} jsonPath full filepath for json file
 * @returns {number} the current sutom value
 */
function getCurrentSutom(jsonPath) {
    const sutomJson = readFile(jsonPath);
    return sutomJson.currentSutom;
}

module.exports = {
    generateRandomForArray,
    getRandomIntInclusive,
    generateTodayDate,
    writeFile,
    readFile,
    sutomBuildJson,
    getCurrentSutom,
};
