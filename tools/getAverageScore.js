// eslint-disable-next-line no-unused-vars
const { Interaction } = require('discord.js');
const dailyJson = require('../data/dailyScore.json');
const jsonTools = require('./jsonTools');

/**
 * Get the average score of the user using the command or
 * get the average score of the user mentionned in the command
 * @param {Interaction} interaction user interaction
 * @param {string} gameName game's name in choices
 * @returns {string} message to reply
 */
function getAverageScoreFromMessage(interaction, gameName) {
    const user = jsonTools.verifyUserExistsJson(interaction);
    // Guard clause
    if (!(user in dailyJson.users)) {
        return `Je n'ai pas trouvé la personne ${interaction.options.getString('user')}`;
    }

    const scoreName = gameName + 'Score';
    const scores = dailyJson['users'][user][scoreName];

    let sum = 0;
    for (const score in scores) {
        sum += scores[score];
    }

    let average = sum / Object.keys(scores).length;
    average = Math.round((average + Number.EPSILON) * 100) / 100;
    const titledGameName =
        gameName.charAt(0).toUpperCase() + gameName.substring(1, gameName.length);
    return `La moyenne à ${titledGameName} pour **${user}**, avec **${
        Object.keys(scores).length
    }** participations, est de **${average}**`;
}

/**
 * Get the average score of the user using the command or
 * get the average score of the user mentionned in the command
 * @param {string} userName the username
 * @param {string} gameName game's name in choices
 */
function getAverageScoreFromUsername(userName, gameName) {
    const scoreName = gameName + 'Score';
    const scores = dailyJson['users'][userName][scoreName];

    let sum = 0;
    for (const score in scores) {
        sum += scores[score];
    }

    let average = sum / Object.keys(scores).length;
    average = Math.round((average + Number.EPSILON) * 100) / 100;
    return [average, Object.keys(scores).length];
}

module.exports = { getAverageScoreFromMessage, getAverageScoreFromUsername };
