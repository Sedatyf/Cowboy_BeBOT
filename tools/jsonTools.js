/* eslint-disable no-unused-vars */
const { Message } = require('discord.js');
const { Interaction } = require('discord.js');
/* eslint-disable no-unused-vars */
const utils = require('./utils');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Save a daily game score for a specific user
 * @param {string} jsonPath json's filepath
 * @param {Message} message client's message
 * @param {string} gameScore the game score name as registered in dailyScore.json
 * @param {string} loldleType the type of loldle. Is null by default
 * @param {Number} gameNumber the daily game's number
 * @param {Number} score user score
 */
function dailyBuildJson(jsonPath, message, gameScore, gameNumber, score, loldleType = 'null') {
    const jsonData = require(`../${jsonPath}`);
    const currentUser = message.author.username.toLowerCase();
    if (!(currentUser in jsonData['users'])) {
        jsonData['users'][currentUser] = {
            userInfo: message.author.id,
            sutomScore: {},
            framedScore: {},
            moviedleScore: {},
            posterdleScore: {},
        };

        const createUserJson = JSON.stringify(jsonData);
        utils.writeFile(jsonPath, createUserJson);
    }

    if (gameScore === 'loldleScore') {
        jsonData['users'][currentUser]['loldleScore'][loldleType][gameNumber] = score;
    } else {
        jsonData['users'][currentUser][gameScore][gameNumber] = score;
    }

    const json = JSON.stringify(jsonData);
    utils.writeFile(jsonPath, json);
}

/**
 * Add a score into dailyScore.json without any discord interaction required
 * @param {string} jsonPath path of the dailyScore.json file
 * @param {string} currentUser the user you want to add score
 * @param {string} gameName the name of the game you want to add score
 * @param {string} gameNumber the number (iteration) of the game you want to add score
 * @param {string} score the score value
 */
function apiBuildJson(jsonPath, currentUser, gameName, gameNumber, score) {
    const jsonData = require(`../${jsonPath}`);
    gameName = gameName.toLowerCase() + 'Score';
    jsonData['users'][currentUser][gameName][gameNumber] = parseInt(score);
    const json = JSON.stringify(jsonData);
    utils.writeFile(jsonPath, json);
}

/**
 * Change the current value tracker for Sutom and Framed
 * @param {string} jsonPath path of the dailyScore.json file
 * @param {string} gameName the name of the game you want to update the tracker
 * @param {string} currentToSet the value of the tracker
 */
function apiChangeCurrent(jsonPath, gameName, currentToSet) {
    const jsonData = require(`../${jsonPath}`);
    gameName = 'current' + utils.title(gameName);
    jsonData['currentNumber'][gameName] = parseInt(currentToSet);
    const json = JSON.stringify(jsonData);
    utils.writeFile(jsonPath, json);
}

/**
 * Save a time/distance score for a specific user
 * @param {string} jsonPath json's filepath
 * @param {Interaction} interaction user interaction
 * @param {string} eventName the event's name as shown in ragdollScore.json
 * @param {Number} score time/distance of the user
 */
async function ragdollBuildJson(jsonPath, interaction, eventName, score) {
    const jsonData = require(`../${jsonPath}`);
    const currentUser = verifyUserExistsJson(interaction);

    if (!(currentUser in jsonData['users'])) {
        jsonData['users'][currentUser] = {
            '10m': 0,
            '30m': 0,
            '60m': 0,
            '100m': 0,
            tripleJump: 0,
            longJump: 0,
            '60Herdles': 0,
            '110Herdles': 0,
        };

        const createUserJson = JSON.stringify(jsonData);
        utils.writeFile(jsonPath, createUserJson);
    }

    const conditions = [',', 's', 'm'];
    if (conditions.some(el => score.includes(el))) {
        score = score.replace(',', '.');
        score = score.replace('s', '');
        score = score.replace('m', '');
    }

    const currentScore = parseFloat(score);
    const registeredScore = jsonData['users'][currentUser][eventName];

    switch (eventName) {
        case '10m':
        case '30m':
        case '60m':
        case '100m':
        case '60Herdles':
        case '110Herdles':
            if (currentScore < registeredScore || registeredScore === 0) {
                jsonData['users'][currentUser][eventName] = currentScore;
                const json = JSON.stringify(jsonData);
                await delay(200); // mandatory delay otherwise we'll have error in JSON
                utils.writeFile(jsonPath, json);
            }
            break;
        case 'tripleJump':
        case 'longJump':
            if (currentScore > registeredScore || registeredScore === 0) {
                jsonData['users'][currentUser][eventName] = currentScore;
                const json = JSON.stringify(jsonData);
                await delay(200); // mandatory delay otherwise we'll have error in JSON
                utils.writeFile(jsonPath, json);
            }
            break;
    }
}

/**
 * @param {Interaction} interaction
 * @returns {string} user name in lowercase or ''
 */
function verifyUserExistsJson(interaction) {
    let user = '';

    if (interaction.options.getString('user') !== null) {
        user = interaction.options.getString('user').toLowerCase();
    } else {
        user = interaction.user.username.toLowerCase();
    }

    return user;
}

/**
 * Allow to get score from a user on a specific game and specific day
 * @param {string} jsonPath the path to the dailyScore json
 * @param {string} gameName the game name (ie Sutom)
 * @param {string} user the user name as stored in the dailyScore.json
 * @param {string} gameNumber the number corresponding to the game day
 * @returns a number which is score from user on specific day and game
 */
function getScoreFromUserSpecificDay(jsonPath, gameName, user, gameNumber) {
    const jsonData = require(`../${jsonPath}`);
    return jsonData['users'][user][gameName + 'Score'][gameNumber];
}

/**
 * Get score from a specific user
 * @param {string} jsonPath path of the dailyScore.json file
 * @param {string} gameName the name of the game you want to get score
 * @param {string} user the name of the user you want to get score
 * @returns {string} the score value registered in dailyScore.json
 */
function getScoreFromUser(jsonPath, gameName, user) {
    const jsonData = require(`../${jsonPath}`);
    return jsonData['users'][user][gameName + 'Score'];
}

module.exports = {
    dailyBuildJson,
    apiBuildJson,
    apiChangeCurrent,
    ragdollBuildJson,
    verifyUserExistsJson,
    getScoreFromUserSpecificDay,
    getScoreFromUser,
};
