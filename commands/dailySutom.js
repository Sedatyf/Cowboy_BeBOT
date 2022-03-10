const { SlashCommandBuilder } = require('@discordjs/builders');
const path = require('path');
const utils = require('../tools/utils.js');
const sutomJson = require('../data/sutomScore.json');

const SUTOM_JSON_PATH = path.join(__dirname, '..', 'data', 'sutomScore.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dailysutom')
        .setDescription('Affiche les scores enregistrés du Sutom du jour'),
    async execute(interaction) {
        const currentSutom = utils.getCurrentSutom(SUTOM_JSON_PATH).toString();
        await interaction.reply(
            "Voici les scores que j'ai enregistré pour le Sutom du jour par ordre d'arrivée"
        );
        let message = '';
        for (const [key, value] of Object.entries(sutomJson.users)) {
            message += `${key} : `;
            for (const [key1, value1] of Object.entries(value['sutomScore'])) {
                if (key1 === currentSutom) {
                    message += value1 + '\n';
                }
            }
        }
        await interaction.channel.send(message);
    },
};
