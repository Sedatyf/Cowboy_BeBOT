const { SlashCommandBuilder } = require('@discordjs/builders');
const jsonTools = require('../tools/jsonTools');
const FILENAME = 'data/dailyScore.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addscore')
        .setDescription("Permet d'ajouter un score manuellement")
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
            option2.setName('user').setDescription("Le nom de l'utilisateur").setRequired(true)
        )
        .addStringOption(option3 =>
            option3
                .setName('game_number')
                .setDescription('Le numéro du jeu (ie Framed #192)')
                .setRequired(true)
        )
        .addStringOption(option4 =>
            option4.setName('game_score').setDescription('Le score du jeu').setRequired(true)
        ),
    async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === 'Admin')) {
            const gameName = interaction.options.getString('game_name');
            const user = interaction.options.getString('user');
            const gameNumber = interaction.options.getString('game_number');
            const gameScore = interaction.options.getString('game_score');

            jsonTools.apiBuildJson(FILENAME, user, gameName, gameNumber, gameScore);
            await interaction.reply({ content: 'New score added', ephemeral: true });
        } else {
            await interaction.reply({
                content: "Tu n'as pas les droits pour faire cette commande",
                ephemeral: true,
            });
        }
    },
};
