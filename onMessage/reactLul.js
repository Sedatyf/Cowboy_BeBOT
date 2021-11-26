module.exports = {
    reactLul: function (client, message) {
        const userMessage = message.cleanContent.toLowerCase();
        if (userMessage.includes('mdr') || userMessage.includes('lol')) {
            const lul = client.emojis.cache.find(emoji => emoji.name === 'lul');
            message.react(lul);
        }
    },
};
