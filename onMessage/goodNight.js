module.exports = {
    goodNight: function (client, message) {
        const userMessage = message.cleanContent.toLowerCase();
        if (
            userMessage === 'bonne nuit' ||
            userMessage === 'je vais me coucher' ||
            userMessage === "j'vais me coucher"
        ) {
            const heyGuys = client.emojis.cache.find(emoji => emoji.name === 'HeyGuys');
            message.reply(`Bonne nuit ${heyGuys}`);
        }
    },
};
