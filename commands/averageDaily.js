const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('averagedaily')
        .setDescription("Affiche la moyenne des scores d'une personne")
        .addSubcommand(subcommand =>
            subcommand
                .setName('playerName')
                .setDescription('La moyenne d\'une personne')
                .setRequired(false)
                .addUserOption(option => option.setName('player').setDescription('Le pseudo de la personne'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('game'))
                .setDescription('La moyenne d\'un jeu')
                .setRequired(true)
                .addStringOption(option =>
                    option.setName('which_game')
                        .setDescription('Le choix du jeu')
                        .setRequired(true)
                        .addChoice('Sutom', 'sutom')
                        .addChoice('Framed', 'framed')
                        .addChoice('Moviedle', 'moviedle')
                )
        ),
    async execute(interaction) {
        await interaction.reply(interaction.options.getString('which_game'))
        /*const sutomJson = require('../data/sutomScore.json');
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
        let sum = 0;
        for (const sutomScore in sutomJson['users'][user]['sutomScore']) {
            sum += sutomJson['users'][user]['sutomScore'][sutomScore];
        }
        let average = sum / Object.keys(sutomJson['users'][user]['sutomScore']).length;
        average = Math.round((average + Number.EPSILON) * 100) / 100;
        await interaction.reply(`La moyenne pour **${user}** est de **${average}**`);*/
    },
};
