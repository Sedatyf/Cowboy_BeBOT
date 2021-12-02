const { SlashCommandBuilder } = require('@discordjs/builders');
const constant = require('../data/constant.json');
const utils = require('../tools/utils.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('magicball')
        .setDescription("Répond aux questions existentielles à la manière d'une Magic 8 ball")
        .addStringOption(option =>
            option.setName('question').setDescription('La phrase a posé au bot').setRequired(true)
        ),
    async execute(interaction) {
        const rand = utils.generateRandomForArray(constant.magic8Ball);
        await interaction.reply(`:8ball: ${constant.magic8Ball[rand]} :8ball:`);
    },
};
