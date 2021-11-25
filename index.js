const { Client, Intents } = require('discord.js');
require('dotenv').config();
const TOKEN = process.env.BOT_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    switch (commandName) {
        case 'ping':
            await interaction.reply('Pong!');
            break;
        case 'server':
            await interaction.reply(
                `**Server name:** ${interaction.guild.name}\n**Created at:** ${interaction.guild.createdAt}\n**Total members:** ${interaction.guild.memberCount}`
            );
            break;
        case 'user':
            await interaction.reply(
                `**Your tag:** ${interaction.user.tag}\n**Your id:** ${interaction.user.id}\n**Created at:** ${interaction.user.createdAt}`
            );
            break;
        default:
            break;
    }
});

client.login(TOKEN);
