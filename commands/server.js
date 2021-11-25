const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Répond en donnant les infos du serveur'),
    async execute(interaction) {
        await interaction.reply(
            `**Nom du serveur:** ${interaction.guild.name}\n**Crée le:** ${interaction.guild.createdAt}\n**Nombre de membres:** ${interaction.guild.memberCount}`
        );
    },
};
