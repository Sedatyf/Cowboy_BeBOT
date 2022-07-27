// Module import
const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const schedule = require('node-schedule');

const getFreeGame = require('./tools/getFreeGame.js');
const getEpicData = require('./tools/getEpicData.js');
const utils = require('./tools/utils');
const constants = require('./data/constant.json');
const epicOutputFullpath = process.cwd() + '/data/epicOutput.json';

require('dotenv').config();
const TOKEN = process.env.BOT_TOKEN;
const FILENAME = 'data/dailyScore.json';

// Variable initialisation
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
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
    // onMessageFunctions.replyLul.replyLul(client, message); it was a bit spammy so replaced by reactLul for now
    onMessageFunctions.reactLul.reactLul(client, message);
    onMessageFunctions.saveDailyScore.saveSutomScore(FILENAME, message);
    onMessageFunctions.saveDailyScore.saveFramedScore(FILENAME, message);
    onMessageFunctions.saveDailyScore.saveMoviedleScore(FILENAME, message);
    onMessageFunctions.saveDailyScore.savePosterdleScore(FILENAME, message);
});

// cron job for free game on Epic
// eslint-disable-next-line no-unused-vars
const jobEpic = schedule.scheduleJob('10 17 * * 4', function () {
    getEpicData.getEpicData(constants.epicGameLink);
    setTimeout(() => {
        getFreeGame.getFreeGame(client, epicOutputFullpath);
    }, 5000);
});

// eslint-disable-next-line no-unused-vars
const jobReminder = schedule.scheduleJob('00 18 * * 3', function () {
    getEpicData.getEpicData(constants.epicGameLink);
    setTimeout(() => {
        getFreeGame.reminderFreeGame(client, epicOutputFullpath);
    }, 5000);
});

// eslint-disable-next-line no-unused-vars
const jobCurrentGame = schedule.scheduleJob('1 0 * * *', function () {
    const jsonData = require('./data/dailyScore.json');
    const currentMoviedle = utils.add1DayToTodayDate();

    jsonData['currentNumber']['currentSutom'] = jsonData['currentNumber']['currentSutom'] + 1;
    jsonData['currentNumber']['currentFramed'] = jsonData['currentNumber']['currentFramed'] + 1;
    jsonData['currentNumber']['currentMoviedle'] = jsonData['currentNumber'][currentMoviedle];

    const json = JSON.stringify(jsonData);
    utils.writeFile('./data/dailyScore.json', json);
});

client.login(TOKEN);
