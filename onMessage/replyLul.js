module.exports = {
    replyLul: function (client, message) {
        const userMessage = message.cleanContent.toLowerCase();
        if (userMessage.includes('<:lul:375955064931745792>')) {
            const lul = client.emojis.cache.find(emoji => emoji.name === 'lul');
            message.reply({
                content: `${lul}`,
                allowedMentions: { repliedUser: false },
            });
        }
    },
};
