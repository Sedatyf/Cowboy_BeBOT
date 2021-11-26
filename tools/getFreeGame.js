const fs = require('fs');
const constants = require('../data/constant.json');
const got = require('got');
const url = constants.epicGameLink;
const epicJson = require('../data/epicOutput.json');
const channelIDs = require('../data/channelIDs.json');

function getFreeGame(client) {
    getEpicData();
    const epicGames = epicJson.data.Catalog.searchStore.elements;
    client.channels.cache.get(channelIDs.informations).send(constants.freeGameMessage);
    for (const element of epicGames) {
        if (element.price.totalPrice.discountPrice === 0 && element.promotions !== null) {
            client.channels.cache.get(channelIDs.informations).send(`**${element.title}**`);
            client.channels.cache
                .get(channelIDs.informations)
                .send(`https://www.epicgames.com/store/fr/p/${element.urlSlug}?lang=fr`);
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
