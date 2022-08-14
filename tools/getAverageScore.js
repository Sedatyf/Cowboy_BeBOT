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
    if (gameName === 'loldle') {
        const loldleCategory = interaction.options.getString('loldle_category');
        if (!loldleCategory) {
            return 'Si tu veux la moyenne pour Loldle, tu dois en plus préciser la catégorie de jeu (ability, partial, etc.)';
        }
    }

    const scoreName = gameName + 'Score';
    let scores = dailyJson['users'][user][scoreName];
    if (gameName === 'loldle') {
        const loldleCategory = interaction.options.getString('loldle_category');
        scores = dailyJson['users'][user][scoreName][loldleCategory];
    }

    let sum = 0;
    for (const score in scores) {
        sum += scores[score];
    }

    let average = sum / Object.keys(scores).length;
    average = Math.round((average + Number.EPSILON) * 100) / 100;
    const titledGameName =
        gameName.charAt(0).toUpperCase() + gameName.substring(1, gameName.length);

    if (gameName === 'loldle') {
        return `La moyenne à ${titledGameName} dans la catégorie ${interaction.options.getString(
            'loldle_category'
        )} pour **${user}**, avec **${
            Object.keys(scores).length
        }** participations, est de **${average}**`;
    }

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
function getAverageScoreFromUsername(userName, gameName, loldleCategory = null) {
    const scoreName = gameName + 'Score';

    let scores = dailyJson['users'][userName][scoreName];
    if (gameName === 'loldle') {
        scores = dailyJson['users'][userName][scoreName][loldleCategory];
    }

    let sum = 0;
    for (const score in scores) {
        sum += scores[score];
    }

    let average = sum / Object.keys(scores).length;
    average = Math.round((average + Number.EPSILON) * 100) / 100;
    return [average, Object.keys(scores).length];
}

module.exports = { getAverageScoreFromMessage, getAverageScoreFromUsername };
