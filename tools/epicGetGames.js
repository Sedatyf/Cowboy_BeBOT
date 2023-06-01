const fs = require('fs');
const axios = require('axios');
const isUrl = require('is-url');

const constants = require('../data/constant.json');
const channelIDs = require('../data/discordIDs.json').channels;
const roleIDs = require('../data/discordIDs.json').roles;
const utils = require('../tools/utils.js');

const data = '';

/**
 * Download the response's body from the given URL and then write it in a JSON
 * @param {string} url This URL must lead to the JSON request from EpicGame Store
 */
async function getEpicData() {
    const config = {
        method: 'get',
        url: constants.epicGameLink,
        headers: {},
        data: data,
    };

    await axios(config)
        .then(function (response) {
            const bodyString = JSON.stringify(response.data);
            utils.writeFile(process.cwd() + '/data/generated/epicOutput.json', bodyString);
        })
        .catch(function (error) {
            return console.log(error);
        });
}

/**
 * Get the current free games, send those games to a channel, ping people with a role
 * with a fresh message
 * @param {Client} client
 * @param {string} fullpath of the extracted epic data
 */
function getFreeGame(client, epicOutputFullpath) {
    const epicJson = JSON.parse(fs.readFileSync(epicOutputFullpath, 'utf8'));
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
    const epicJson = JSON.parse(fs.readFileSync(epicOutputFullpath, 'utf8'));
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
    let baseLink = 'https://store.epicgames.com/fr/p/';

    for (const element of gamesData) {
        if (element.price.totalPrice.discountPrice !== 0 && element.promotions === null) {
            throw new Error("Couldn't find any discounted game");
        }

        try {
            const epicStartDate =
                element.promotions.promotionalOffers[0].promotionalOffers[0].startDate;
            const epicEndDate =
                element.promotions.promotionalOffers[0].promotionalOffers[0].endDate;
            const startDate = new Date(epicStartDate.slice(0, 10));
            const endDate = new Date(epicEndDate.slice(0, 10));
            if (todayDate < startDate || todayDate > endDate) continue;
        } catch (error) {
            continue;
        }

        let link = '';

        if (element.offerType === 'BUNDLE') {
            baseLink = 'https://store.epicgames.com/fr/bundles/';
            link = `${baseLink}${element['customAttributes'][3]['value']}`;
        } else if (element.catalogNs.mappings[0] !== undefined) {
            if (element.catalogNs.mappings[0].pageType === 'productHome') {
                link = `${baseLink}${element.catalogNs.mappings[0].pageSlug}`;
            }
        } else {
            link = `${baseLink}${element.productSlug}`;
        }

        if (!isUrl(link)) {
            throw new Error('Generated link for free game is not an URL');
        }

        client.channels.cache.get(channelIDs.informations).send(`**${element.title}**`);
        client.channels.cache.get(channelIDs.informations).send(link);
    }
}

async function getFreeGameProcess(client, epicOutputFullpath) {
    await getEpicData();
    getFreeGame(client, epicOutputFullpath);
}

async function reminderFreeGameProcess(client, epicOutputFullpath) {
    await getEpicData();
    reminderFreeGame(client, epicOutputFullpath);
}

if (require.main === module) {
    getEpicData();
}

module.exports = { getFreeGameProcess, reminderFreeGameProcess };
