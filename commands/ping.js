const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Répond avec 🏓 ainsi que le temps de latence du bot'),
    async execute(interaction) {
        await interaction.reply(
            `🏓\nLa latence est de ${Date.now() - interaction.createdTimestamp}ms`
        );
    },
};
