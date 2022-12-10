const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong.'),
    execute(interaction, client) {
        interaction.reply({
            content: `Pong! \n**${client.ws.ping}** ms.`
        });
    },
};