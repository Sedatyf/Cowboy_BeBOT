const { SlashCommandBuilder } = require('@discordjs/builders');
const jsonTools = require('../tools/jsonTools');
const FILENAME = 'data/ragdollScore.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rrsave')
        .setDescription('Enregistre votre meilleur score sur Ragdoll Runners')
        .addStringOption(option1 =>
            option1
                .setName('game_name')
                .setDescription("Le nom de l'épreuuve")
                .setRequired(true)
                .addChoice('10m', '10m')
                .addChoice('30m', '30m')
                .addChoice('60m', '60m')
                .addChoice('100m', '100m')
                .addChoice('Triple Saut', 'tripleJump')
                .addChoice('Saut en longueur', 'longJump')
                .addChoice('60m haies', '60Herdles')
                .addChoice('110m haies', '110Herdles')
        )
        .addStringOption(option2 =>
            option2
                .setName('score')
                .setDescription("Le temps/distance de l'épreuve")
                .setRequired(true)
        ),
    async execute(interaction) {
        const gameName = interaction.options.getString('game_name');
        const score = interaction.options.getString('score');
        jsonTools.ragdollBuildJson(FILENAME, interaction, gameName, score);
        await interaction.reply(
            `Ton score pour **${gameName}** de **${score}** a bien été enregistré !`
        );
    },
};
