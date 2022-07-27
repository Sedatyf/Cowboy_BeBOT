module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: "Une erreur c'est produite lors de l'exécution de la commande !",
                ephemeral: true,
            });
        }
    },
};
