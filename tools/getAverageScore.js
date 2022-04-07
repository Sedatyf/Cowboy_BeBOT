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

    const sutomScores = dailyJson['users'][user]['sutomScore'];

    let sum = 0;
    for (const sutomScore in sutomScores) {
        sum += sutomScores[sutomScore];
    }

    let average = sum / Object.keys(sutomScores).length;
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

    const framedScores = dailyJson['users'][user]['framedScore'];

    let sum = 0;
    for (const framedScore in framedScores) {
        sum += framedScores[framedScore];
    }

    let average = sum / Object.keys(framedScores).length;
    average = Math.round((average + Number.EPSILON) * 100) / 100;
    return `La moyenne à Framed pour **${user}** est de **${average}**`;
}

/**
 * Get the average moviedle of the user using the command or
 * get the average moviedle of the user mentionned in the command
 * @param {Interaction} interaction user interaction
 * @returns {string} message to reply
 */
function getAverageMoviedle(interaction) {
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

    const moviedleScores = dailyJson['users'][user]['moviedleScore'];

    let sum = 0;
    for (const moviedleScore in moviedleScores) {
        sum += moviedleScores[moviedleScore];
    }

    let average = sum / Object.keys(moviedleScores).length;
    average = Math.round((average + Number.EPSILON) * 100) / 100;
    return `La moyenne à Moviedle pour **${user}** est de **${average}**`;
}

module.exports = { getAverageSutom, getAverageFramed, getAverageMoviedle };
