const jsonTools = require('../tools/jsonTools');

function saveSutomScore(filepath, discordMessage) {
    const userMessage = discordMessage.cleanContent;
    if (!userMessage.includes('SUTOM #')) return; // Guard clause
    const messageElements = userMessage.split(' ');

    if (messageElements.length < 3) {
        discordMessage.reply("T'essayes de m'arnaquer ? è_é");
        return;
    }

    const sutomNumber = messageElements[1].substring(1);
    let score = Number(messageElements[2].slice(0, 1));
    if (score === null) score = 7;
    jsonTools.dailyBuildJson(filepath, discordMessage, 'sutomScore', sutomNumber, score);
    console.log(`The following Sutom Score has been saved:
User: ${discordMessage.author.username}
Sutom number: ${sutomNumber}
Score: ${score}`);
}

function saveFramedScore(filepath, discordMessage) {
    const userMessage = discordMessage.cleanContent;
    if (!userMessage.includes('Framed #')) return; // Guard clause
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
    jsonTools.dailyBuildJson(filepath, discordMessage, 'framedScore', framedNumber, framedScore);
    console.log(`The following Framed Score has been saved:
User: ${discordMessage.author.username}
Framed number: ${framedNumber}
Score: ${framedScore}`);
}

function saveMoviedleScore(filepath, discordMessage) {
    let userMessage = discordMessage.cleanContent;
    if (!userMessage.includes('#Moviedle #') && !userMessage.includes('#Moviedle for')) return; // Guard clause

    if (userMessage.includes('#Moviedle for')) {
        userMessage = userMessage.replace('From the ', '');
        userMessage = userMessage.replace(' for', '');
    }
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
    console.log(`The following Moviedle Score has been saved:
User: ${discordMessage.author.username}
Moviedle number: ${moviedleNumber}
Score: ${moviedleScore}`);
}

function savePosterdleScore(filepath, discordMessage) {
    const userMessage = discordMessage.cleanContent;
    if (!userMessage.includes('#Posterdle #')) return; // Guard clause

    const messageElements = userMessage.split('\n');

    const sharpText = messageElements[0];
    const timeToFind = messageElements[2];
    let time = '';

    const currentPoster = sharpText.split('#')[2].trim();
    timeToFind.split('').forEach(element => {
        if (!isNaN(parseInt(element))) {
            time += element;
        }
    });

    jsonTools.dailyBuildJson(
        filepath,
        discordMessage,
        'posterdleScore',
        currentPoster,
        parseInt(time)
    );
    console.log(`The following Posterdle Score has been saved:
User: ${discordMessage.author.username}
Posterdle number: ${currentPoster}
Score: ${time}`);
}

function saveLoldleScore(filepath, discordMessage) {
    const userMessage = discordMessage.cleanContent;
    if (!userMessage.includes('I found #LoLdle champion #')) return; // Guard clause

    const removedMessage = userMessage.replace('I found #LoLdle champion #', '');
    const messageElements = removedMessage.split(' ');

    const gameNumber = messageElements[0];
    let gameType = messageElements[3].replace("'s", '');
    if (gameType === 'mode') gameType = 'classic';
    if (gameType === 'partial') gameType = 'splash';

    const indexShots = messageElements.indexOf('shots');
    let score;
    indexShots === -1
        ? (score = messageElements[messageElements.indexOf('shot') - 1])
        : (score = messageElements[indexShots - 1]);

    jsonTools.dailyBuildJson(
        filepath,
        discordMessage,
        'loldleScore',
        gameType,
        gameNumber,
        parseInt(score)
    );
    console.log(`The following Loldle Score has been saved:
User: ${discordMessage.author.username}
Loldle number: ${gameNumber}
Loldle type: ${gameType}
Score: ${score}`);
}

module.exports = {
    saveSutomScore,
    saveFramedScore,
    saveMoviedleScore,
    savePosterdleScore,
    saveLoldleScore,
};
