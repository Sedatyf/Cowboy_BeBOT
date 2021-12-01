'use strict';

const fs = require('fs');
const jsonPathToRead = '../data/subscribedUser.json';
const jsonPathToWrite = 'data/subscribedUser.json';
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('epicsubscribe')
        .setDescription('Permet de vous inscrire aux notifications pour les jeux gratuits Epic'),
    async execute(interaction) {
        interaction.reply(`Inscription de ${interaction.user.toString()}`);
        let jsonData = require(jsonPathToRead);
        jsonData[interaction.user.username] = [true, interaction.user.tag];
        let json = JSON.stringify(jsonData);
        fs.writeFile(jsonPathToWrite, json, 'utf8', function (err) {
            if (err) throw err;
            console.log(
                `Registration to Epic notifications for ${interaction.user.username} is complete`
            );
        });
    },
};
