const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const getAverage = require('../tools/getAverageScore');
const utils = require('../tools/utils');

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
                .addChoice('Loldle', 'loldle')
        )
        .addStringOption(option2 =>
            option2
                .setName('loldle_category')
                .setDescription('Le nom de la catégorie Loldle')
                .addChoice("Ability's Icon", 'ability')
                .addChoice('Classic mode', 'classic')
                .addChoice('Partial splash', 'splash')
                .addChoice('Quote', 'quote')
                .setRequired(false)
        ),
    async execute(interaction) {
        const scoresJson = require('../data/dailyScore.json');
        const gameName = interaction.options.getString('game_name') + 'Score';

        if (gameName === 'loldleScore' && !interaction.options.getString('loldle_category')) {
            await interaction.reply(
                'Si tu veux la moyenne pour Loldle, tu dois en plus préciser la catégorie de jeu (ability, partial, etc.)'
            );
            return;
        }

        const dict = {
            [gameName]: [],
        };
        const resultEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`Scores ${utils.title(gameName.replace('Score', ''))}`)
            .setDescription('Moyenne de score');

        for (const [user, events] of Object.entries(scoresJson['users'])) {
            for (const [eventName, scores] of Object.entries(events)) {
                if (eventName === 'userInfo' || eventName !== gameName) continue;
                if (Object.keys(scores).length === 0) continue;
                let average;
                if (gameName === 'loldleScore') {
                    average = getAverage.getAverageScoreFromUsername(
                        user,
                        eventName.replace('Score', ''),
                        interaction.options.getString('loldle_category')
                    );
                } else {
                    average = getAverage.getAverageScoreFromUsername(
                        user,
                        eventName.replace('Score', '')
                    );
                }
                dict[eventName].push([user, average]);
            }
        }

        for (const event in dict) {
            dict[event].sort(function (a, b) {
                return a[1][0] - b[1][0];
            });
        }

        for (const [position, data] of Object.entries(dict[gameName])) {
            const user = data[0];
            const average = data[1][0];
            const length = data[1][1];

            if (length < 10) continue;

            resultEmbed.addFields({
                name: utils.title(user),
                value: `${average} (${length} participations)`,
            });
        }

        await interaction.reply({ embeds: [resultEmbed] });
    },
};
