'use strict';

const { SlashCommandBuilder } = require('@discordjs/builders');
const utils = require('../tools/utils.js');
const constant = require('../data/81212.json');

/* Ancien système 81212 avec match dedans. Mais personne ne l'utilise */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('81212')
        .setDescription('📱 Envoie zicmu, pecho ou match pour seulement 2€ + prix du SMS !')
        .addStringOption(option =>
            option
                .setName('service')
                .setDescription('Le service que vous voulez joindre')
                .setRequired(true)
        ),
    async execute(interaction) {
        const service = interaction.options.data[0].value;
        switch (service.toLowerCase()) {
            case 'zicmu':
                const randZik = utils.generateRandomForArray(constant.zikmu);
                interaction.reply(
                    `Voici un super son à mettre dans ton téléphone. Tes amis seront tous jaloux !\n${constant.zikmu[randZik]}`
                );
                break;
            case 'pecho':
                const randPecho = utils.generateRandomForArray(constant.pecho);
                interaction.reply(
                    `Voici un message que tu peux envoyer pour pécho à coup sur !\n**${constant.pecho[randPecho]}**`
                );
                break;
            default:
                if (interaction.options.data[0].value.includes('match')) {
                    const names = interaction.options.data[0].value.split(' ');
                    if (names.length < 3) {
                        interaction.reply(
                            `T'as oublié de préciser les noms des gens avec qui tu veux savoir la compatibilité !
Tu seras quand même facturé 2€ + prix du SMS
Envoie match [nom1] [nom2] au 8 12 12`
                        );
                        break;
                    }

                    interaction.reply(
                        `${names[1]} et ${
                            names[2]
                        } vous avez une compabilité de ${utils.getRandomIntInclusive(0, 100)}%`
                    );
                    break;
                }
                interaction.reply(
                    "Ce service n'existe pas ! Tu seras quand même facturé 2€ + prix du SMS"
                );
                break;
        }
    },
};
