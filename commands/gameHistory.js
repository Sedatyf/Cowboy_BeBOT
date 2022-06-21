const { SlashCommandBuilder } = require('@discordjs/builders');
const getHistory = require('../tools/getHistoryScore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('historygame')
        .setDescription("Affiche les cinq derniers scores d'une personne sur un jeu")
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
            option2.setName('user').setDescription("Le nom de l'utilisateur").setRequired(false)
        ),
    async execute(interaction) {
        const gameName = interaction.options.getString('game_name');
        await interaction.reply(getHistory.getHistoryGame(interaction, gameName));
    },
};
