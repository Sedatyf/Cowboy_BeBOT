'use strict';

const { SlashCommandBuilder } = require('@discordjs/builders');
const utils = require('../tools/utils.js');
const constant = require('../data/81212.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('81212')
        .setDescription('📱 Envoie zicmu, pecho ou match pour seulement 2€ + prix du SMS !')
        .addStringOption(option =>
            option
                .setName('service')
                .setDescription('Le service que vous voulez joindre')
                .setRequired(true)
                .addChoice('Zicmu', 'zicmu')
                .addChoice('Pecho', 'pecho')
        ),
    async execute(interaction) {
        switch (interaction.options.getString('service')) {
            case 'zicmu': {
                const randZik = utils.generateRandomForArray(constant.zikmu);
                interaction.reply(
                    `Voici un super son à mettre dans ton téléphone. Tes amis seront tous jaloux !\n${constant.zikmu[randZik]}`
                );
                break;
            }
            case 'pecho': {
                const randPecho = utils.generateRandomForArray(constant.pecho);
                interaction.reply(
                    `Voici un message que tu peux envoyer pour pécho à coup sur !\n**${constant.pecho[randPecho]}**`
                );
                break;
            }
            default:
                interaction.reply(
                    "Ce service n'existe pas ! Tu seras quand même facturé 2€ + prix du SMS"
                );
                break;
        }
    },
};
