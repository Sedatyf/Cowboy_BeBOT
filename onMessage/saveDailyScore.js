const utils = require('../tools/utils');
const FILENAME = 'data/dailyScore.json';

function saveSutomScore(client, discordMessage) {
    const userMessage = discordMessage.cleanContent;
    if (userMessage.includes('SUTOM #')) {
        const messageElements = userMessage.split(' ');

        if (messageElements.length < 3) {
            discordMessage.reply("T'essayes de m'arnaquer ? è_é");
            return;
        }

        const sutomNumber = messageElements[1].substring(1);
        const score = Number(messageElements[2].slice(0, 1));
        utils.dailyBuildJson(FILENAME, discordMessage, 'sutomScore', sutomNumber, score);
    }
}

function saveFramedScore(client, discordMessage) {
    const userMessage = discordMessage.cleanContent;
    if (userMessage.includes('Framed #')) {
        const messageElements = userMessage.split(' ');

        if (messageElements.length < 3) {
            discordMessage.reply("T'essayes de m'arnaquer ? è_é");
            return;
        }

        let framedScore = 1;
        for (let i = 0; i < messageElements.length; i++) {
            if (messageElements[i] === '🎥') continue;
            if (messageElements[i] === '🟥') framedScore++;
        }
        const framedNumber = messageElements[1].substring(1).replace('\n🎥', '');
        utils.dailyBuildJson(FILENAME, discordMessage, 'framedScore', framedNumber, framedScore);
    }
}

function saveMoviedleScore(client, discordMessage) {
    const userMessage = discordMessage.cleanContent;
    if (userMessage.includes('#Moviedle #')) {
        const messageElements = userMessage.split(' ');

        if (messageElements.length < 3) {
            discordMessage.reply("T'essayes de m'arnaquer ? è_é");
            return;
        }

        let moviedleScore = 1;
        for (let i = 0; i < messageElements.length; i++) {
            if (messageElements[i] === '🎥') continue;
            if (messageElements[i] === '⬛️') moviedleScore++;
        }
        const moviedleNumber = messageElements[1].substring(1).replace('\n🎥', '');
        utils.dailyBuildJson(
            FILENAME,
            discordMessage,
            'moviedleScore',
            moviedleNumber,
            moviedleScore
        );
    }
}

module.exports = { saveSutomScore, saveFramedScore, saveMoviedleScore };
