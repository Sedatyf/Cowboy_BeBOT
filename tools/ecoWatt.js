const axios = require('axios');
const qs = require('qs');
const fs = require('fs');
const { Client, EmbedBuilder } = require('discord.js');

const utils = require('./utils');
const constant = require('../data/constant.json');
const channelIDs = require('../data/discordIDs.json').channels;
const roleIDs = require('../data/discordIDs.json').roles;

require('dotenv').config();
const CLIENT_ID = process.env.ECOWATT_CLIENT_ID;
const ecowattTokenPath = '/data/generated/ecoWattToken.json';
const ecowattSignalsPath = '/data/generated/ecoWattSignals.json';

/**
 * Get a temporary token to make EcoWatt signals request
 */
async function getToken() {
    const data = qs.stringify({});
    const config = {
        method: 'post',
        url: constant.ecowattTokenLink,
        headers: {
            Authorization: 'Basic ' + CLIENT_ID,
        },
        data: data,
    };

    await axios(config)
        .then(function (response) {
            const bodyString = JSON.stringify(response.data);
            utils.writeFile(process.cwd() + ecowattTokenPath, bodyString);
        })
        .catch(function (error) {
            return console.log(error);
        });
}

/**
 * Make a request to get Ecowatt electricity grid status
 */
async function getSignals() {
    const token = JSON.parse(fs.readFileSync(process.cwd() + ecowattTokenPath, 'utf8'));
    const config = {
        method: 'get',
        url: constant.ecowattSignalsLink,
        headers: {
            Authorization: 'Bearer ' + token.access_token,
        },
    };

    await axios(config)
        .then(function (response) {
            const bodyString = JSON.stringify(response.data);
            utils.writeFile(process.cwd() + ecowattSignalsPath, bodyString);
        })
        .catch(function (error) {
            return console.log(error);
        });
}

/**
 * Load the ecoWattSignals.json file in the data/generated/ folder and parse its information
 * Generate an embedObject in order to be sent in a discord message
 * @returns { EmbedBuilder } An Embed object containing ecowatt information
 */
function parseSignals() {
    const signalsJson = fs.readFileSync(process.cwd() + ecowattSignalsPath);
    const signalsData = JSON.parse(signalsJson);
    const resultEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`La météo de l'électricité ⚡`);

    for (let i = 0; i < 4; i++) {
        switch (signalsData['signals'][i]['dvalue']) {
            case 1:
                resultEmbed.addFields({
                    name: utils.addDaysFullTodayDate(i),
                    value: "Pas d'alertes 🟢",
                });
                break;
            case 2:
                resultEmbed.addFields({
                    name: utils.addDaysFullTodayDate(i),
                    value: "Risque de coupures d'électricité 🟠",
                });
                break;
            case 3:
                resultEmbed.addFields({
                    name: utils.addDaysFullTodayDate(i),
                    value: "Coupures d'électricité programmées 🔴",
                });
                break;
        }
    }

    resultEmbed.addFields({
        name: '\u200b',
        value: "Pour plus d'informations sur les zones et les horaires des coupures, veuillez vous référer au site Ecowatt : https://www.monecowatt.fr/",
    });

    return resultEmbed;
}

/**
 * Simply send ecowatt information in the channelID.ecowatt with a ping message and embed with information
 * @param {Client} client The bot's discord client in order to send messages
 */
function sendMessage(client) {
    const embedToSend = parseSignals();
    client.channels.cache.get(channelIDs.ecowatt).send(`Bonjour à tous <@&${roleIDs.ecowatt}>`);
    client.channels.cache.get(channelIDs.ecowatt).send({ embeds: [embedToSend] });
}

/**
 * Method that use async/await function to let time to request to be done
 * The purpose of this method is only to be exported in the index.js
 * @param {Client} client The bot's discord client in order to send messages
 */
async function ecowattProcess(client) {
    await getToken();
    await getSignals();
    sendMessage(client);
}

/**
 * Same as function ecowattProcess() but without messages
 * Allow to see process (if files are generated, error messages, ect) locally without disturbing users
 */
async function devDebug() {
    await getToken();
    await getSignals();
}

if (require.main === module) {
    devDebug();
}

module.exports = { ecowattProcess };
