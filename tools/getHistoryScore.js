// eslint-disable-next-line no-unused-vars
const { Interaction } = require('discord.js');
const dailyScoreJson = require('../data/dailyScore.json');
const utils = require('./utils');
let keyValue = [];

/**
 * Get Sutom's history for the last 5 days from user who used the command
 * or the precised one with options
 * @param {Interaction} interaction
 * @returns {string} returns a message with history or an error
 */
function historySutom(interaction) {
    const user = utils.verifyUserExistsJson(interaction);
    // Guard Clause
    if (!(user in dailyScoreJson.users)) {
        return `Je n'ai pas trouvé la personne ${interaction.options.getString('user')}`;
    }

    const sutomScores = dailyScoreJson['users'][user]['sutomScore'];

    for (const sutomScore in sutomScores) {
        keyValue.push([sutomScore, sutomScores[sutomScore]]);
    }

    keyValue = keyValue.slice(Math.max(keyValue.length - 5, 0));
    let message = '';
    for (let i = 0; i < keyValue.length; i++) {
        message += `**${keyValue[i][0]}** : ${keyValue[i][1]}\r\n`;
    }

    return `Voici les 5 derniers scores Sutom enregistrés pour **${user}**\r\n${message}`;
}

/**
 * Get Framed's history for the last 5 days from user who used the command
 * or the precised one with options
 * @param {Interaction} interaction
 * @returns {string} returns a message with history or an error
 */
function historyFramed(interaction) {
    const user = utils.verifyUserExistsJson(interaction);
    // Guard Clause
    if (!(user in dailyScoreJson.users)) {
        return `Je n'ai pas trouvé la personne ${interaction.options.getString('user')}`;
    }

    const framedScores = dailyScoreJson['users'][user]['framedScore'];

    for (const framedScore in framedScores) {
        keyValue.push([framedScore, framedScores[framedScore]]);
    }

    keyValue = keyValue.slice(Math.max(keyValue.length - 5, 0));
    let message = '';
    for (let i = 0; i < keyValue.length; i++) {
        message += `**${keyValue[i][0]}** : ${keyValue[i][1]}\r\n`;
    }

    return `Voici les 5 derniers scores Framed enregistrés pour **${user}**\r\n${message}`;
}

/**
 * Get Moviedle's history for the last 5 days from user who used the command
 * or the precised one with options
 * @param {Interaction} interaction
 * @returns {string} returns a message with history or an error
 */
function historyMoviedle(interaction) {
    const user = utils.verifyUserExistsJson(interaction);
    // Guard Clause
    if (!(user in dailyScoreJson.users)) {
        return `Je n'ai pas trouvé la personne ${interaction.options.getString('user')}`;
    }

    const moviedleScores = dailyScoreJson['users'][user]['moviedleScore'];

    for (const moviedleScore in moviedleScores) {
        keyValue.push([moviedleScore, moviedleScores[moviedleScore]]);
    }

    keyValue = keyValue.slice(Math.max(keyValue.length - 5, 0));
    let message = '';
    for (let i = 0; i < keyValue.length; i++) {
        message += `**${keyValue[i][0]}** : ${keyValue[i][1]}\r\n`;
    }

    return `Voici les 5 derniers scores Moviedle enregistrés pour **${user}**\r\n${message}`;
}

module.exports = { historySutom, historyFramed, historyMoviedle };
