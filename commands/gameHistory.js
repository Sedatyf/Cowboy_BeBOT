const { SlashCommandBuilder } = require('@discordjs/builders');
const tools = require('../tools/getHistoryScore');

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
        )
        .addStringOption(option2 =>
            option2.setName('user').setDescription("Le nom de l'utilisateur").setRequired(false)
        ),
    async execute(interaction) {
        switch (interaction.options.getString('game_name')) {
            case 'sutom':
                await interaction.reply(tools.historySutom(interaction));
                break;
            case 'framed':
                await interaction.reply(tools.historyFramed(interaction));
                break;
            case 'moviedle':
                await interaction.reply(tools.historyMoviedle(interaction));
                break;
            default:
                await interaction.reply('Erreur sur le choix du jeu');
                break;
        }
    },
};
