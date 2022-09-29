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
                .setRequired(false)
        ),
    async execute(interaction) {
        const gameName = interaction.options.getString('game_name');
        const user1 = interaction.options.getString('user1');
        const user2 = interaction.options.getString('user2');
        const gameNumber = interaction.options.getString('game_number');

        if (gameNumber === null || gameNumber === undefined) {
            const user1Values = jsonTools.getScoreFromUser(FILENAME, gameName, user1);
            const user2Values = jsonTools.getScoreFromUser(FILENAME, gameName, user2);
            const user1Scores = [];
            const user2Scores = [];

            Object.values(user1Values).forEach(element => {
                user1Scores.push(element);
            });
            Object.values(user2Values).forEach(element => {
                user2Scores.push(element);
            });

            const listLength =
                user1Scores.length > user2Scores.length ? user1Scores.length : user2Scores.length;
            let user1Score = 0;
            let user2Score = 0;
            let draw = 0;

            for (let i = 0; i < listLength; i++) {
                if (user1Scores[i] === user2Scores[i]) draw++;
                else if (user1Scores[i] < user2Scores[i]) user1Score++;
                else if (user2Scores[i] < user1Scores[i]) user2Score++;
            }

            await interaction.reply(
                `La personne qui gagne ce duel de ` +
                    `${utils.title(gameName)}` +
                    ` est **${user1Score > user2Score ? utils.title(user1) : utils.title(user2)}**
**${utils.title(user1)}** a fait un meilleur score que ${utils.title(user2)} **${user1Score}** fois.
**${utils.title(user2)}** a fait un meilleur score que ${utils.title(user1)} **${user2Score}** fois.
Il y a eu **${draw} égalités**`
            );
        } else {
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
                )}** a trouvé en ${user1Score}\r\n**${utils.title(
                    user2
                )}** a trouvé en ${user2Score}`
            );
        }
    },
};
