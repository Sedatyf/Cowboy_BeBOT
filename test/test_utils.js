const expect = require('chai').expect;
const utils = require('../tools/utils');
const path = require('path');

const SUTOM_JSON_PATH = path.join(__dirname, 'testData', 'test_dailyScore.json');

describe('Verify Get current sutom data', () => {
    it('should return 135', () => {
        expect(utils.getCurrentSutom(SUTOM_JSON_PATH)).to.equal(135);
    });
});

describe('Verify Get Random int inclusive', () => {
    it('should be lower than max and higher than min', () => {
        expect(utils.getRandomIntInclusive(0, 10)).to.be.above(0);
        expect(utils.getRandomIntInclusive(0, 10)).to.be.below(10);
    });
});
