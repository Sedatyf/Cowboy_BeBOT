const emojiList = [
    '375955064931745792', // lul
    '864226078951997480', // kekw
    '684156698532773937', // kekw2
    '408634661791858690', // alain
    '363999789328891914', // sturdyMegaforce
    '😂',
    '😭',
];

module.exports = {
    name: 'messageReactionAdd',
    execute(reaction) {
        if (reaction.me) return; // Don't react to itself
        if (reaction.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }

        if (emojiList.includes(reaction._emoji.id) || emojiList.includes(reaction._emoji.name)) {
            let indexOfEmoji = emojiList.indexOf(reaction._emoji.id);
            if (indexOfEmoji === -1) indexOfEmoji = emojiList.indexOf(reaction._emoji.name);
            reaction.message.react(emojiList[indexOfEmoji]);
        }
    },
};
