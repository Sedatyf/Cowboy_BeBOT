const { SlashCommandBuilder } = require('@discordjs/builders');

let keyValue = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('historysutom')
        .setDescription("Affiche les cinq derniers scores d'une personne")
        .addStringOption(option =>
            option
                .setName('player')
                .setDescription('Le nom discord de la personne')
                .setRequired(false)
        ),
    async execute(interaction) {
        const sutomJson = require('../data/sutomScore.json');
        let user = '';
        if (interaction.options.data[0] !== undefined) {
            user = interaction.options.data[0].value.toLowerCase();
        } else {
            user = interaction.user.username.toLowerCase();
        }

        if (!(user in sutomJson.users)) {
            await interaction.reply(
                `Je n'ai pas trouvé la personne ${interaction.options.data[0].value}`
            );
        }
        for (const sutomScore in sutomJson['users'][user]['sutomScore']) {
            keyValue.push([sutomScore, sutomJson['users'][user]['sutomScore'][sutomScore]]);
        }
        keyValue = keyValue.slice(Math.max(keyValue.length - 5, 0));
        let message = '';
        for (let i = 0; i < keyValue.length; i++) {
            message += `**${keyValue[i][0]}** : ${keyValue[i][1]}\r\n`;
        }
        await interaction.reply(
            `Voici les 5 derniers scores Sutom enregistrés pour **${user}**\r\n${message}`
        );
    },
};
