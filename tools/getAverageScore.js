const { Interaction } = require('discord.js');
const dailyJson = require('../data/dailyScore.json');

/**
 * Get the average sutom of the user using the command or
 * get the average sutom of the user mentionned in the command
 * @param {Interaction} interaction user interaction
 * @returns {string} message to reply
 */
function getAverageSutom(interaction) {
    let user = '';

    if (interaction.options.getString('user') !== null) {
        user = interaction.options.getString('user').toLowerCase();
    } else {
        user = interaction.user.username.toLowerCase();
    }

    // Guard clause
    if (!(user in dailyJson.users)) {
        return `Je n'ai pas trouvé la personne ${interaction.options.getString('user')}`;
    }

    let sum = 0;
    for (const sutomScore in dailyJson['users'][user]['sutomScore']) {
        sum += dailyJson['users'][user]['sutomScore'][sutomScore];
    }

    let average = sum / Object.keys(dailyJson['users'][user]['sutomScore']).length;
    average = Math.round((average + Number.EPSILON) * 100) / 100;
    return `La moyenne au Sutom pour **${user}** est de **${average}**`;
}

/**
 * Get the average framed of the user using the command or
 * get the average framed of the user mentionned in the command
 * @param {Interaction} interaction user interaction
 * @returns {string} message to reply
 */
function getAverageFramed(interaction) {
    let user = '';

    if (interaction.options.getString('user') !== null) {
        user = interaction.options.getString('user').toLowerCase();
    } else {
        user = interaction.user.username.toLowerCase();
    }

    // Guard clause
    if (!(user in dailyJson.users)) {
        return `Je n'ai pas trouvé la personne ${interaction.options.getString('user')}`;
    }

    let sum = 0;
    for (const framedScore in dailyJson['users'][user]['framedScore']) {
        sum += dailyJson['users'][user]['framedScore'][framedScore];
    }

    let average = sum / Object.keys(dailyJson['users'][user]['framedScore']).length;
    average = Math.round((average + Number.EPSILON) * 100) / 100;
    return `La moyenne à Framed pour **${user}** est de **${average}**`;
}

module.exports = { getAverageSutom, getAverageFramed };
