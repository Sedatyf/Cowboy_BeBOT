const fs = require('fs');
const { Client, Collection, Intents, Guild } = require('discord.js');
require('dotenv').config();
const TOKEN = process.env.BOT_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) client.once(event.name, (...args) => event.execute(...args));
    else client.on(event.name, (...args) => event.execute(...args));
}

client.on('messageCreate', async message => {
    if (message.author.id === '896039839076585472') return; // bot id so he doesn't answer itself
    const userMessage = message.cleanContent.toLowerCase();
    if (
        userMessage === 'bonne nuit' ||
        userMessage === 'je vais me coucher' ||
        userMessage === "j'vais me coucher"
    ) {
        const heyGuys = client.emojis.cache.find(emoji => emoji.name === 'HeyGuys');
        message.reply(`Bonne nuit ${heyGuys}`);
    }
    if (userMessage.includes('<:lul:375955064931745792>')) {
        const lul = client.emojis.cache.find(emoji => emoji.name === 'lul');
        message.reply({
            content: `${lul}`,
            allowedMentions: { repliedUser: false },
        });
    }
    if (userMessage.includes('mdr') || userMessage.includes('lol')) {
        const lul = client.emojis.cache.find(emoji => emoji.name === 'lul');
        message.react(lul);
    }
});

client.login(TOKEN);
