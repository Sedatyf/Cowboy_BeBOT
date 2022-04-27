const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rrscores')
        .setDescription('Affichez les meilleurs scores sur Ragdoll Runners')
        .addStringOption(option1 =>
            option1
                .setName('game_name')
                .setDescription("Le nom de l'épreuuve")
                .setRequired(true)
                .addChoice('10m', '10m')
                .addChoice('30m', '30m')
                .addChoice('60m', '60m')
                .addChoice('100m', '100m')
                .addChoice('Triple Saut', 'tripleJump')
                .addChoice('Saut en longueur', 'longJump')
                .addChoice('60m haies', '60Herdles')
                .addChoice('110m haies', '110Herdles')
        ),
    async execute(interaction) {
        const gameName = interaction.options.getString('game_name');
        const scoresJson = require('../data/ragdollScore.json');
        const keyValue = [];

        for (const [user, events] of Object.entries(scoresJson['users'])) {
            for (const [event, score] of Object.entries(events)) {
                if (score === 0) continue;
                if (gameName === event) keyValue.push([user, score]);
            }
        }
        switch (gameName) {
            case '10m':
            case '30m':
            case '60m':
            case '100m':
            case '60Herdles':
            case '110Herdles':
                keyValue.sort(function (a, b) {
                    return a[1] - b[1];
                });
                break;
            case 'tripleJump':
            case 'longJump':
                keyValue.sort(function (a, b) {
                    return b[1] - a[1];
                });
                break;
        }

        let message = '';
        for (let i = 0; i < keyValue.length; i++) {
            if (i === 0) message += `:first_place: **${keyValue[i][0]}** : ${keyValue[i][1]}\r\n`;
            if (i === 1) message += `:second_place: **${keyValue[i][0]}** : ${keyValue[i][1]}\r\n`;
            if (i === 2) message += `:third_place: **${keyValue[i][0]}** : ${keyValue[i][1]}\r\n`;
            if (i > 2) message += `${i + 1}ème **${keyValue[i][0]}** : ${keyValue[i][1]}\r\n`;
        }
        await interaction.reply(
            `Voici les scores que j'ai enregistrés pour l'épreuve du ${gameName}`
        );
        await interaction.channel.send(message);
    },
};
