const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rrpodium')
        .setDescription('Affichez les médailles et les moyennes de scores sur Ragdoll Runners'),
    async execute(interaction) {
        const scoresJson = require('../data/ragdollScore.json');
        const dict = {
            '10m': [],
            '30m': [],
            '60m': [],
            '100m': [],
            longJump: [],
            tripleJump: [],
            '60Herdles': [],
            '110Herdles': [],
        };

        const podium = {};

        for (const [user, events] of Object.entries(scoresJson['users'])) {
            podium[user] = { gold: 0, silver: 0, bronze: 0 };
            for (const [event, score] of Object.entries(events)) {
                if (score === 0) continue;
                dict[event].push([user, score]);
            }
        }

        for (const event in dict) {
            switch (event) {
                case '10m':
                case '30m':
                case '60m':
                case '100m':
                case '60Herdles':
                case '110Herdles':
                    dict[event].sort(function (a, b) {
                        return a[1] - b[1];
                    });
                    break;
                case 'tripleJump':
                case 'longJump':
                    dict[event].sort(function (a, b) {
                        return b[1] - a[1];
                    });
                    break;
            }

            for (let i = 0; i < dict[event].length; i++) {
                if (i === 0) {
                    podium[dict[event][0][0]]['gold'] += 1;
                    continue;
                }
                if (i === 1) {
                    podium[dict[event][1][0]]['silver'] += 1;
                    continue;
                }
                if (i === 2) {
                    podium[dict[event][2][0]]['bronze'] += 1;
                    continue;
                }
            }
        }

        let message = 'Voici les médailles des joueurs sur Ragdoll Runners:\r\n';
        for (const user in podium) {
            message += `\r\n**${user} :**\r\n:first_place: ${podium[user]['gold']} :second_place: ${podium[user]['silver']} :third_place: ${podium[user]['bronze']}\r\n`;
        }

        await interaction.reply(message);
    },
};
