const { Client, Intents } = require('discord.js');
require('dotenv').config();
const TOKEN = process.env.BOT_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Ready!');
});

client.login(TOKEN);
