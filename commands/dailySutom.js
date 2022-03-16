const { SlashCommandBuilder } = require('@discordjs/builders');
const path = require('path');
const utils = require('../tools/utils.js');

const SUTOM_JSON_PATH = path.join(__dirname, '..', 'data', 'sutomScore.json');
const keyValue = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dailysutom')
        .setDescription('Affiche les scores enregistrés du Sutom du jour'),
    async execute(interaction) {
        const sutomJson = require('../data/sutomScore.json');
        const currentSutom = utils.getCurrentSutom(SUTOM_JSON_PATH).toString();

        for (const [user, value] of Object.entries(sutomJson.users)) {
            if (!(currentSutom in value.sutomScore)) continue;
            for (const [score, scoreValue] of Object.entries(value['sutomScore'])) {
                if (score === currentSutom) {
                    keyValue.push([user, scoreValue]);
                }
            }
        }

        keyValue.sort(function (a, b) {
            return a[1] - b[1];
        });

        if (keyValue.length === 0) {
            await interaction.reply("Je n'ai enregistré aucun score pour aujourd'hui");
        } else {
            let message = '';
            console.log(keyValue);
            for (let i = 0; i < keyValue.length; i++) {
                message += `${keyValue[i][0]} : ${keyValue[i][1]}\r\n`;
            }
            await interaction.reply(
                "Voici les scores que j'ai enregistré pour le Sutom du jour trié par score"
            );
            await interaction.channel.send(message);
        }
    },
};
