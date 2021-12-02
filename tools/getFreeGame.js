const fs = require('fs');
const constants = require('../data/constant.json');
const got = require('got');
const url = constants.epicGameLink;
const channelIDs = require('../data/discordIDs.json').channels;
const roleIDs = require('../data/discordIDs.json').roles;
const utils = require('../tools/utils.js');

function getFreeGame(client) {
    getEpicData();
    const epicJson = require('../data/epicOutput.json');
    const epicGames = epicJson.data.Catalog.searchStore.elements;
    client.channels.cache
        .get(channelIDs.informations)
        .send(`Bonjour à tous <@&${roleIDs.jeuxEpic}> :rat:`);
    client.channels.cache.get(channelIDs.informations).send(constants.freeGameMessage);
    for (const element of epicGames) {
        if (element.price.totalPrice.discountPrice === 0 && element.promotions !== null) {
            try {
                let startDate =
                    element.promotions.promotionalOffers[0].promotionalOffers[0].startDate;
                if (!startDate.includes(utils.generateTodayDate())) continue;
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

function getEpicData() {
    got(url).then(response => {
        const data = response.body;
        fs.writeFile('./data/epicOutput.json', data, err => {
            if (err) throw err;
        });
    });
}

module.exports = { getFreeGame };
