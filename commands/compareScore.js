const { SlashCommandBuilder } = require('@discordjs/builders');
const jsonTools = require('../tools/jsonTools');
const utils = require('../tools/utils');
const FILENAME = 'data/dailyScore.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('comparescore')
        .setDescription('Permet de comparer le score entre deux joueurs pour un jour donné')
        .addStringOption(option1 =>
            option1
                .setName('game_name')
                .setDescription('Le nom du jeu')
                .setRequired(true)
                .addChoice('Sutom', 'sutom')
                .addChoice('Framed', 'framed')
                .addChoice('Moviedle', 'moviedle')
                .addChoice('Posterdle', 'posterdle')
        )
        .addStringOption(option2 =>
            option2
                .setName('user1')
                .setDescription('Le nom du premier utilisateur')
                .setRequired(true)
        )
        .addStringOption(option3 =>
            option3
                .setName('user2')
                .setDescription('Le nom du second utilisateur')
                .setRequired(true)
        )
        .addStringOption(option4 =>
            option4
                .setName('game_number')
                .setDescription('Le numéro du jeu (ex: 202 pour le Sutom #202')
                .setRequired(true)
        ),
    async execute(interaction) {
        const gameName = interaction.options.getString('game_name');
        const user1 = interaction.options.getString('user1');
        const user2 = interaction.options.getString('user2');
        const gameNumber = interaction.options.getString('game_number');

        const user1Score = jsonTools.getScoreFromUserSpecificDay(
            FILENAME,
            gameName,
            user1,
            gameNumber
        );
        const user2Score = jsonTools.getScoreFromUserSpecificDay(
            FILENAME,
            gameName,
            user2,
            gameNumber
        );

        await interaction.reply(
            `**${
                user1Score < user2Score ? utils.title(user1) : utils.title(user2)
            }** a gagné le **${gameName}** numéro **${gameNumber}**\r\n**${utils.title(
                user1
            )}** a trouvé en ${user1Score}\r\n**${utils.title(user2)}** a trouvé en ${user2Score}`
        );
    },
};
