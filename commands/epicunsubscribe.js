const { SlashCommandBuilder } = require('@discordjs/builders');
const utils = require('../tools/utils.js');
const jsonPathToRead = '../data/subscribedUser.json';
const jsonPathToWrite = 'data/subscribedUser.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('epicunsubscribe')
        .setDescription('Permet de vous désinscrire aux notifications pour les jeux gratuits Epic'),
    async execute(interaction) {
        if (utils.isSubscribed(interaction, jsonPathToRead)) {
            utils.epicConstructJSON(interaction, jsonPathToRead, jsonPathToWrite, false);
            interaction.member.roles.remove('915898775690682388');
            interaction.reply(
                `Ta désinscription aux notifications Epic est prise en compte ${interaction.user.toString()}`
            );
        } else {
            interaction.reply('Tu es déjà désinscrit !');
        }
    },
};
