const utils = require('../tools/utils');
const FILENAME = 'data/sutomScore.json';

module.exports = {
    saveSutomScore: function (client, message) {
        const userMessage = message.cleanContent;
        if (userMessage.includes('SUTOM #')) {
            const messageElements = userMessage.split(' ');

            if (messageElements.length < 3) {
                message.reply("T'essayes de m'arnaquer ? è_é");
                return;
            }

            const sutomNumber = messageElements[1].substring(1);
            const score = Number(messageElements[2].slice(0, 1));
            utils.sutomBuildJson(FILENAME, message, sutomNumber, score);
        }
    },
};
