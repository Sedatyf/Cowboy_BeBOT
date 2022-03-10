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

        let message = '';
        for (const [user, value] of Object.entries(sutomJson.users)) {
            if (!(currentSutom in value)) continue;
            message += `${user} : `;
            for (const [score, scoreValue] of Object.entries(value['sutomScore'])) {
                if (score === currentSutom) {
                    message += scoreValue + '\n';
                }
            }
        }
        if (message === '') {
            await interaction.reply("Je n'ai enregistré aucun score pour aujourd'hui");
        } else {
            await interaction.reply(
                "Voici les scores que j'ai enregistré pour le Sutom du jour par ordre d'arrivée"
            );
            await interaction.channel.send(message);
        }
    },
};
