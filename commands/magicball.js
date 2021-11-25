const { SlashCommandBuilder } = require('@discordjs/builders');
const obj = require('./constant.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('magicball')
        .setDescription("Répond aux questions existentielles à la manière d'une Magic 8 ball")
        .addStringOption(option =>
            option.setName('sentence').setDescription('La phrase a posé au bot').setRequired(true)
        ),
    async execute(interaction) {
        let rand = Math.random();
        rand *= obj.Magic8Ball.length;
        rand = Math.floor(rand);
        await interaction.reply(`:8ball: ${obj.Magic8Ball[rand]} :8ball:`);
    },
};
