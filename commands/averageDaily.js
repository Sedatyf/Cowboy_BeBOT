const { SlashCommandBuilder } = require('@discordjs/builders');
const getAverage = require('../tools/getAverageScore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('averagedaily')
        .setDescription("Affiche la moyenne des scores d'une personne")
        .addStringOption(option1 =>
            option1
                .setName('game_name')
                .setDescription('Le nom du jeu')
                .setRequired(true)
                .addChoice('Sutom', 'sutom')
                .addChoice('Framed', 'framed')
                .addChoice('Moviedle', 'moviedle')
                .addChoise('Posterdle', 'posterdle')
        )
        .addStringOption(option2 =>
            option2.setName('user').setDescription("Le nom de l'utilisateur").setRequired(false)
        ),
    async execute(interaction) {
        const gameName = interaction.options.getString('game_name');
        await interaction.reply(getAverage.getAverageScore(interaction, gameName));
    },
};
