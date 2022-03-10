const fs = require('fs');

/**
 * @param  {Array} arr
 * @returns A random number based on the Array's length
 */
function generateRandomForArray(arr) {
    let rand = Math.random();
    rand *= arr.length;
    return Math.floor(rand);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // max & min both included
}

function generateTodayDate() {
    const date = new Date();
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

/**
 * Construct the JSON variable to write in file in jsonPathToRead
 * @param {*} interaction
 * @param {string} jsonPathToRead
 * @param {string} jsonPathToWrite
 * @param {boolean} toSubscribe Is user wants to subscribe (true) or unsubscribe (false)
 */
function epicConstructJSON(interaction, jsonPathToRead, jsonPathToWrite, toSubscribe) {
    const jsonData = require(jsonPathToRead);
    jsonData[interaction.user.username] = {
        isSubscribed: toSubscribe,
        userInfo: interaction.user.id,
    };

    const json = JSON.stringify(jsonData);
    fs.writeFile(jsonPathToWrite, json, 'utf8', function (err) {
        if (err) throw err;
        console.log(
            `${toSubscribe ? 'Registration' : 'Deletion'} to Epic notifications for ${
                interaction.user.username
            } is complete`
        );
    });
}

function writeFile(filepath, data) {
    fs.writeFile(filepath, data, err => {
        if (err) throw err;
    });
}

module.exports = {
    generateRandomForArray,
    getRandomIntInclusive,
    epicConstructJSON,
    generateTodayDate,
    writeFile,
};
