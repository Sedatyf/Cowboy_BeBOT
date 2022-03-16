const { SlashCommandBuilder } = require('@discordjs/builders');
const path = require('path');
const utils = require('../tools/utils.js');

const SUTOM_JSON_PATH = path.join(__dirname, '..', 'data', 'sutomScore.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('averagesutom')
        .setDescription("Affiche la moyenne des scores d'une personne")
        .addStringOption(option =>
            option
                .setName('player')
                .setDescription('Le nom discord de la personne')
                .setRequired(true)
        ),
    async execute(interaction) {
        const sutomJson = require('../data/sutomScore.json');
        const user = interaction.options.data[0].value.toLowerCase();
        if (!(user in sutomJson.users)) {
            await interaction.reply(
                `Je n'ai pas trouvé la personne ${interaction.options.data[0].value}`
            );
        }
        let sum = 0;
        for (const sutomScore in sutomJson['users'][user]['sutomScore']) {
            sum += sutomJson['users'][user]['sutomScore'][sutomScore];
        }
        console.log(sum);
        console.log(Object.keys(sutomJson['users'][user]['sutomScore']).length);
        const average = sum / Object.keys(sutomJson['users'][user]['sutomScore']).length;
        await interaction.reply(`La moyenne pour **${user}** est de **${average}**`);
    },
};
