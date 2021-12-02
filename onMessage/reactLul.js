module.exports = {
    reactLul: function (client, message) {
        const userMessage = message.cleanContent.toLowerCase();
        const lul = client.emojis.cache.find(emoji => emoji.name === 'lul');
        if (userMessage.includes('mdr') || userMessage.includes('lol')) {
            message.react(lul);
        }
        if (userMessage.includes('<:lul:375955064931745792>')) {
            message.react(lul);
        }
    },
};
