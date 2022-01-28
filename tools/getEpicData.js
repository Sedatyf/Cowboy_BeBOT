const request = require('request');
const utils = require('./utils');

/**
 * Download the response's body from the given URL and then write it in a JSON
 * @param {string} url This URL must lead to the JSON request from EpicGame Store
 */
function getEpicData(url) {
    const options = { json: true };
    request(url, options, (error, res, body) => {
        if (error) {
            return console.log(error);
        }

        if (!error && res.statusCode == 200) {
            const bodyString = JSON.stringify(body);
            utils.writeFile(process.cwd() + '/data/epicOutput.json', bodyString);
        }
    });
}

module.exports = { getEpicData };
