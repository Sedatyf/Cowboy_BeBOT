// Module import
const fs = require('fs');
const { Client, Collection, Intents, Guild } = require('discord.js');
const schedule = require('node-schedule');
const getFreeGame = require('./tools/getFreeGame.js');
require('dotenv').config();
const TOKEN = process.env.BOT_TOKEN;

// Variable initialisation
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();
const onMessageFunctions = {};

// Data import
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const onMessageFiles = fs.readdirSync('./onMessage').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) client.once(event.name, (...args) => event.execute(...args));
    else client.on(event.name, (...args) => event.execute(...args));
}

for (const file of onMessageFiles) {
    const onMessage = require(`./onMessage/${file}`);
    onMessageFunctions[file.toString().replace('.js', '')] = onMessage;
}

// on message create
client.on('messageCreate', async message => {
    if (message.author.id === '896039839076585472') return; // bot id so he doesn't answer itself
    onMessageFunctions.goodNight.goodNight(client, message);
    //onMessageFunctions.replyLul.replyLul(client, message); it was a bit spammy so replaced by reactLul for now
    onMessageFunctions.reactLul.reactLul(client, message);
});

// cron job for free game on Epic
const jobEpic = schedule.scheduleJob('30 17 * * 4', function () {
    getFreeGame.getFreeGame(client);
});

const jobReminder = schedule.scheduleJob('00 18 * * 3', function () {
    getFreeGame.reminderFreeGame(client);
});

client.login(TOKEN);
