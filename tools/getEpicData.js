const axios = require('axios');
const utils = require('./utils');
const constant = require('../data/constant.json');

const data = '';

/**
 * Download the response's body from the given URL and then write it in a JSON
 * @param {string} url This URL must lead to the JSON request from EpicGame Store
 */
function getEpicData() {
    const config = {
        method: 'get',
        url: constant.epicGameLink,
        headers: {},
        data: data,
    };

    axios(config)
        .then(function (response) {
            const bodyString = JSON.stringify(response.data);
            utils.writeFile(process.cwd() + '/data/epicOutput.json', bodyString);
        })
        .catch(function (error) {
            return console.log(error);
        });
}

module.exports = { getEpicData };
