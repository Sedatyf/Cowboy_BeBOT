const utils = require('../tools/utils');
const path = require('path');

const SUTOM_JSON_PATH = path.join(__dirname, 'testData', 'dailyScore.test.json');
const randomArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

describe('Verify utils.readFile()', () => {
    it('should have a value different to null or undefined', () => {
        expect(utils.readFile(SUTOM_JSON_PATH)).not.toBeNull();
        expect(utils.readFile(SUTOM_JSON_PATH)).toBeDefined();
    });
});

describe('Verify Get current sutom data', () => {
    it('should return 135', () => {
        expect(utils.getCurrentSutom(SUTOM_JSON_PATH)).toBe(135);
    });
});

describe('Verify Get Random int inclusive', () => {
    it('should be lower than max and higher than min', () => {
        expect(utils.getRandomIntInclusive(0, 10)).toBeGreaterThanOrEqual(0);
        expect(utils.getRandomIntInclusive(0, 10)).toBeLessThanOrEqual(10);
    });
});

describe('Verify utils.generateRandomForArray()', () => {
    it('should be lower than 9 and higher than 0', () => {
        expect(utils.generateRandomForArray(randomArray)).toBeGreaterThanOrEqual(0);
        expect(utils.generateRandomForArray(randomArray)).toBeLessThanOrEqual(10);
    });
});
