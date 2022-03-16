const { SlashCommandBuilder } = require('@discordjs/builders');

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
        let average = sum / Object.keys(sutomJson['users'][user]['sutomScore']).length;
        average = Math.round((average + Number.EPSILON) * 100) / 100;
        await interaction.reply(`La moyenne pour **${user}** est de **${average}**`);
    },
};
