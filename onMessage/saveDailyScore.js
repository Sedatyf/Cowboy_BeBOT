const jsonTools = require('../tools/jsonTools');

function saveSutomScore(filepath, discordMessage) {
    const userMessage = discordMessage.cleanContent;
    if (userMessage.includes('SUTOM #')) {
        const messageElements = userMessage.split(' ');

        if (messageElements.length < 3) {
            discordMessage.reply("T'essayes de m'arnaquer ? è_é");
            return;
        }

        const sutomNumber = messageElements[1].substring(1);
        let score = Number(messageElements[2].slice(0, 1));
        if (score === null) score = 7;
        jsonTools.dailyBuildJson(filepath, discordMessage, 'sutomScore', sutomNumber, score);
        console.log(`Saved Sutom score for ${discordMessage.author.username.toLowerCase()}`);
    }
}

function saveFramedScore(filepath, discordMessage) {
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
        jsonTools.dailyBuildJson(
            filepath,
            discordMessage,
            'framedScore',
            framedNumber,
            framedScore
        );
        console.log(`Saved Framed score for ${discordMessage.author.username.toLowerCase()}`);
    }
}

function saveMoviedleScore(filepath, discordMessage) {
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
            if (messageElements[i] === '🟥') moviedleScore++;
        }
        const moviedleNumber = messageElements[1].substring(1).replace('\n🎥', '');
        jsonTools.dailyBuildJson(
            filepath,
            discordMessage,
            'moviedleScore',
            moviedleNumber,
            moviedleScore
        );
        console.log(`Saved Moviedle score for ${discordMessage.author.username.toLowerCase()}`);
    }
}

module.exports = { saveSutomScore, saveFramedScore, saveMoviedleScore };
