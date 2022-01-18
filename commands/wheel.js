const { SlashCommandBuilder } = require('@discordjs/builders');
const utils = require('../tools/utils.js');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wheel')
        .setDescription(
            "Permet de choisir entre plusieurs éléments donnés. Séparer les éléments d'un espace"
        )
        .addStringOption(option =>
            option
                .setName('elements')
                .setDescription(
                    "Les éléments à mettre dans la roue. Séparer les éléments d'un slash"
                )
                .setRequired(true)
        ),
    async execute(interaction) {
        const originalString = interaction.options.data[0].value;
        const choicesArray = originalString.split(' / ');
        rand = utils.generateRandomForArray(choicesArray);
        await interaction.reply('Je fais tourner la roue');
        await interaction.channel.send(
            'https://tenor.com/view/the-goon-prize-wheel-wheel-of-excuses-excuses-no-gif-14618546'
        );
        await delay(5000);
        await interaction.channel.send(`Et c'est tombé sur **${choicesArray[rand]}**`);
    },
};
