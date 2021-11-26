const { SlashCommandBuilder } = require('@discordjs/builders');
const constant = require('../utils/constant.json');
const utils = require('../utils/utils.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('magicball')
        .setDescription("Répond aux questions existentielles à la manière d'une Magic 8 ball")
        .addStringOption(option =>
            option.setName('question').setDescription('La phrase a posé au bot').setRequired(true)
        ),
    async execute(interaction) {
        const rand = utils.generateRandomForArray(constant.Magic8Ball);
        await interaction.reply(`:8ball: ${constant.Magic8Ball[rand]} :8ball:`);
    },
};
