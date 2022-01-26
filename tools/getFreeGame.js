const fs = require('fs');
const constants = require('../data/constant.json');
const channelIDs = require('../data/discordIDs.json').channels;
const roleIDs = require('../data/discordIDs.json').roles;
const utils = require('../tools/utils.js');

/**
 * Get the current free games, send those games to a channel, ping people with a role
 * with a fresh message
 * @param {Client} client
 * @param {string} fullpath of the extracted epic data
 */
function getFreeGame(client, epicOutputFullpath) {
    let epicJson = JSON.parse(fs.readFileSync(epicOutputFullpath, 'utf8'));
    const epicGames = epicJson.data.Catalog.searchStore.elements;
    client.channels.cache
        .get(channelIDs.informations)
        .send(`Bonjour à tous <@&${roleIDs.jeuxEpic}> :rat:`);
    client.channels.cache.get(channelIDs.informations).send(constants.freeGameMessage);
    getGamesFromData(client, epicGames);
}

/**
 * Get the current free games, send those games to a channel, ping people with a role
 * with a reminder message
 * @param {Client} client
 * @param {string} fullpath of the extracted epic data
 */
function reminderFreeGame(client, epicOutputFullpath) {
    let epicJson = JSON.parse(fs.readFileSync(epicOutputFullpath, 'utf8'));
    const epicGames = epicJson.data.Catalog.searchStore.elements;
    client.channels.cache
        .get(channelIDs.informations)
        .send(`Bonjour à tous <@&${roleIDs.jeuxEpic}> :rat:`);
    client.channels.cache.get(channelIDs.informations).send(constants.freeGameReminder);
    getGamesFromData(client, epicGames);
}

/**
 * Parse JSON data from EpicGame Store to finally send free games in given channel
 * @param {string} gamesData The JSON from Epic
 */
function getGamesFromData(client, gamesData) {
    const todayDate = new Date(utils.generateTodayDate());
    for (const element of gamesData) {
        if (element.price.totalPrice.discountPrice === 0 && element.promotions !== null) {
            try {
                let epicStartDate =
                    element.promotions.promotionalOffers[0].promotionalOffers[0].startDate;
                let epicEndDate =
                    element.promotions.promotionalOffers[0].promotionalOffers[0].endDate;
                let startDate = new Date(epicStartDate.slice(0, 10));
                let endDate = new Date(epicEndDate.slice(0, 10));
                if (todayDate < startDate || todayDate > endDate) continue;
            } catch (error) {
                continue;
            }
            client.channels.cache.get(channelIDs.informations).send(`**${element.title}**`);
            client.channels.cache
                .get(channelIDs.informations)
                .send(`https://www.epicgames.com/store/fr/p/${element.productSlug}?lang=fr`);
        }
    }
}

module.exports = { getFreeGame, reminderFreeGame };
