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

/**
 * Check if user is subscribed to Epic notification
 * @param {*} interaction
 * @param {string} jsonPathToRead
 * @returns true if found, false otherwise
 */
function isSubscribed(interaction, jsonPathToRead) {
    let jsonData = require(jsonPathToRead);
    let isFound = false;
    for (let keys in jsonData) {
        if (keys === interaction.user.username && jsonData[keys]['isSubscribed'] === true) {
            isFound = true;
        }
    }
    return isFound;
}

/**
 * Construct the JSON variable to write in file in jsonPathToRead
 * @param {*} interaction
 * @param {string} jsonPathToRead
 * @param {string} jsonPathToWrite
 * @param {boolean} toSubscribe Is user wants to subscribe (true) or unsubscribe (false)
 */
function epicConstructJSON(interaction, jsonPathToRead, jsonPathToWrite, toSubscribe) {
    let jsonData = require(jsonPathToRead);
    jsonData[interaction.user.username] = {
        isSubscribed: toSubscribe,
        userInfo: interaction.user.id,
    };

    let json = JSON.stringify(jsonData);
    fs.writeFile(jsonPathToWrite, json, 'utf8', function (err) {
        if (err) throw err;
        console.log(
            `${toSubscribe ? 'Registration' : 'Deletion'} to Epic notifications for ${
                interaction.user.username
            } is complete`
        );
    });
}

module.exports = { generateRandomForArray, isSubscribed, epicConstructJSON };
