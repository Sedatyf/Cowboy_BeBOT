'use strict';

const utils = require('../tools/utils.js');
const jsonPathToRead = '../data/subscribedUser.json';
const jsonPathToWrite = 'data/subscribedUser.json';
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('epicsubscribe')
        .setDescription('Permet de vous inscrire aux notifications pour les jeux gratuits Epic'),
    async execute(interaction) {
        if (!utils.isSubscribed(interaction, jsonPathToRead)) {
            utils.epicConstructJSON(interaction, jsonPathToRead, jsonPathToWrite, true);
            interaction.member.roles.add('915898775690682388');
            interaction.reply(
                `Ton inscription aux notifications Epic est prise en compte ${interaction.user.toString()}`
            );
        } else {
            interaction.reply('Tu es déjà inscrit !');
        }
    },
};
