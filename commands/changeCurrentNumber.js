const { SlashCommandBuilder } = require('@discordjs/builders');
const jsonTools = require('../tools/jsonTools');
const FILENAME = 'data/dailyScore.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changecurrent')
        .setDescription('Permet de changer le current number pour Sutom et Framed manuellement')
        .addStringOption(option1 =>
            option1
                .setName('game_name')
                .setDescription('Le nom du jeu')
                .setRequired(true)
                .addChoice('Sutom', 'sutom')
                .addChoice('Framed', 'framed')
        )
        .addStringOption(option2 =>
            option2
                .setName('current_set')
                .setDescription('La valeur a mettre dans le fichier')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === 'Admin')) {
            const gameName = interaction.options.getString('game_name');
            const currentToSet = interaction.options.getString('current_set');

            jsonTools.apiChangeCurrent(FILENAME, gameName, currentToSet);
            await interaction.reply({ content: 'New current set', ephemeral: true });
        } else {
            await interaction.reply({
                content: "Tu n'as pas les droits pour faire cette commande",
                ephemeral: true,
            });
        }
    },
};
