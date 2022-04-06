const { SlashCommandBuilder } = require('@discordjs/builders');
const tools = require('../tools/getAverageScore');

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
        )
        .addStringOption(option2 =>
            option2.setName('user').setDescription("Le nom de l'utilisateur").setRequired(false)
        ),
    async execute(interaction) {
        switch (interaction.options.getString('game_name')) {
            case 'sutom':
                await interaction.reply(tools.getAverageSutom(interaction));
                break;
            case 'framed':
                await interaction.reply(tools.getAverageFramed(interaction));
                break;
            case 'moviedle':
                await interaction.reply(tools.getAverageMoviedle(interaction));
                break;
            default:
                await interaction.reply('Erreur sur le choix du jeu');
                break;
        }
    },
};
