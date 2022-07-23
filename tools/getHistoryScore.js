// eslint-disable-next-line no-unused-vars
const { Interaction } = require('discord.js');
const dailyScoreJson = require('../data/dailyScore.json');
const jsonTools = require('./jsonTools');
let keyValue = [];

/**
 * Get Sutom's history for the last 5 days from user who used the command
 * or the precised one with options
 * @param {Interaction} interaction
 * @param {string} gameName game's name in choices
 * @param {string} entries the number of entries you want to display (default 5)
 * @returns {string} returns a message with history or an error
 */
function getHistoryGame(interaction, gameName, entries = '5') {
    const user = jsonTools.verifyUserExistsJson(interaction);
    // Guard Clause
    if (!(user in dailyScoreJson.users)) {
        return `Je n'ai pas trouvé la personne ${interaction.options.getString('user')}`;
    }

    const intEntries = parseInt(entries);
    const scoreName = gameName + 'Score';
    const scores = dailyScoreJson['users'][user][scoreName];

    for (const score in scores) {
        keyValue.push([score, scores[score]]);
    }

    keyValue = keyValue.slice(Math.max(keyValue.length - intEntries, 0));
    let message = '';
    for (let i = 0; i < keyValue.length; i++) {
        message += `**${keyValue[i][0]}** : ${keyValue[i][1]}\r\n`;
    }

    const titledGameName =
        gameName.charAt(0).toUpperCase() + gameName.substring(1, gameName.length);
    return `Voici les ${intEntries} derniers scores ${titledGameName} enregistrés pour **${user}**\r\n${message}`;
}

module.exports = { getHistoryGame };
