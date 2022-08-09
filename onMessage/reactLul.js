const utils = require('../tools/utils.js');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    reactLul: async function (client, message) {
        const userMessage = message.cleanContent.toLowerCase();
        const lul = client.emojis.cache.find(emoji => emoji.name === 'lul');
        if (userMessage.includes('mdr') || userMessage.includes('lol')) {
            if (userMessage.includes('#LoLdle')) return; // reduce spam on Loldle game
            const rand = utils.getRandomIntInclusive(2, 10) * 1000;
            await delay(rand);
            await message.react(lul);
        }
        if (userMessage.includes('<:lul:375955064931745792>')) {
            const rand = utils.getRandomIntInclusive(2, 10) * 1000;
            await delay(rand);
            await message.react(lul);
        }
    },
};
