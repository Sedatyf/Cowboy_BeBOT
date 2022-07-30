const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setPresence({
            activities: [
                {
                    name: `Type / to have different options. I also react on certain messages`,
                    type: ActivityType.Playing,
                },
            ],
            status: 'online',
        });
    },
};
