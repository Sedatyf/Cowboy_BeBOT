const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription("Répond en donnant les info de l'utilisateur"),
    async execute(interaction) {
        await interaction.reply(
            `**Ton tag:** ${interaction.user.tag}\n**Ton id:** ${interaction.user.id}\n**Compte crée le:** ${interaction.user.createdAt}`
        );
    },
};
