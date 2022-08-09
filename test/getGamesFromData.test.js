const utils = require('../tools/utils');
const fs = require('fs');
const getEpicData = require('../tools/getEpicData');
const constants = require('../data/constant.json');

const epicData = process.cwd() + '/data/epicOutput.json';
const epicJson = JSON.parse(fs.readFileSync(epicData, 'utf8'));
const epicGames = epicJson.data.Catalog.searchStore.elements;

function getGamesFromData(gamesData) {
    const todayDate = new Date(utils.generateTodayDate());
    let baseLink = 'https://store.epicgames.com/fr/p/';
    const results = [];

    for (const element of gamesData) {
        if (element.price.totalPrice.discountPrice === 0 && element.promotions !== null) {
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
            } else if (element.productSlug !== null) {
                link = `${baseLink}${element.productSlug}`;
            } else {
                link = `${baseLink}${element.catalogNs.mappings[0].pageSlug}`;
            }

            results.push(link);
        }
    }
    return results;
}

getEpicData.getEpicData(constants.epicGameLink);

describe('Verify Get games From Data', () => {
    it('should not be null or undefined', () => {
        getGamesFromData(epicGames).forEach(link => {
            expect(link).not.toBeNull();
            expect(link).toBeDefined();
        });
    });
});
