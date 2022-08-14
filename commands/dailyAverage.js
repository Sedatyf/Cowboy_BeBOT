const { SlashCommandBuilder } = require('@discordjs/builders');
const getAverage = require('../tools/getAverageScore');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dailyaverage')
        .setDescription("Affiche la moyenne des scores d'une personne")
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
            option2.setName('user').setDescription("Le nom de l'utilisateur").setRequired(false)
        )
        .addStringOption(option3 =>
            option3
                .setName('loldle_category')
                .setDescription('Le nom de la catégorie Loldle')
                .addChoice("Ability's Icon", 'ability')
                .addChoice('Classic mode', 'classic')
                .addChoice('Partial splash', 'splash')
                .addChoice('Quote', 'quote')
                .setRequired(false)
        ),
    async execute(interaction) {
        const gameName = interaction.options.getString('game_name');
        await interaction.reply(getAverage.getAverageScoreFromMessage(interaction, gameName));
    },
};
