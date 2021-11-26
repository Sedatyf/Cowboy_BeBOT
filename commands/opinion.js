const { SlashCommandBuilder } = require('@discordjs/builders');
const constant = require('../utils/constant.json');
const utils = require('../utils/utils.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opinion')
        .setDescription('Répond à ta question en donnant son opinion')
        .addStringOption(option =>
            option.setName('question').setDescription('La phrase a posé au bot').setRequired(true)
        ),
    async execute(interaction) {
        rand = utils.generateRandomForArray(constant.Opinion);
        await interaction.reply(`${constant.Opinion[rand]}`);
    },
};
