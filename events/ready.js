module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.user.setActivity(
            'Type / to have different options. I also react on certain messages',
            {
                type: 'PLAYING',
            }
        );
    },
};
