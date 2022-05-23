const assert = require('assert');
const utils = require('../tools/utils');
const path = require('path');

const SUTOM_JSON_PATH = path.join(__dirname, 'testData', 'test_dailyScore.json');

describe('Verify Get current sutom data', () => {
    it('should return 135', () => {
        assert.equal(utils.getCurrentSutom(SUTOM_JSON_PATH), 135);
    });
});
