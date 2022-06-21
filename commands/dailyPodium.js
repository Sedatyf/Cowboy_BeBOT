const { SlashCommandBuilder } = require('@discordjs/builders');
const getAverage = require('../tools/getAverageScore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dailypodium')
        .setDescription('Affichez les moyennes de scores de tous les joueurs des jeux type daily')
        .addStringOption(option1 =>
            option1
                .setName('game_name')
                .setDescription('Le nom du jeu')
                .setRequired(true)
                .addChoice('Sutom', 'sutom')
                .addChoice('Framed', 'framed')
                .addChoice('Moviedle', 'moviedle')
                .addChoice('Posterdle', 'posterdle')
        ),
    async execute(interaction) {
        const scoresJson = require('../data/dailyScore.json');
        const gameName = interaction.options.getString('game_name') + 'Score';
        const dict = {
            [gameName]: [],
        };

        for (const [user, events] of Object.entries(scoresJson['users'])) {
            for (const [eventName, scores] of Object.entries(events)) {
                if (eventName === 'userInfo' || eventName !== gameName) continue;
                if (Object.keys(scores).length === 0) continue;
                const average = getAverage.getAverageScoreFromUsername(
                    user,
                    eventName.replace('Score', '')
                );
                dict[eventName].push([user, average]);
            }
        }

        for (const event in dict) {
            dict[event].sort(function (a, b) {
                return a[1][0] - b[1][0];
            });
        }

        let message = `Voici les moyennes de scores de tous les joueurs sur **${gameName.replace(
            'Score',
            ''
        )}**:\r\n`;
        for (const [position, data] of Object.entries(dict[gameName])) {
            const user = data[0];
            const average = data[1][0];
            const length = data[1][1];

            message += `\r\n${user} : **${average}** de moyenne avec **${length}** participations`;
        }

        await interaction.reply(message);
    },
};
