const Discord = require('discord.js');
const identifier = require('./identifier');
const debug = require('debug')('discord');

const client = new Discord.Client();

client.once('ready', () => {
    // Clear channels message
    for (i in identifier.channels.groups) {
        client.guilds.get(identifier.server).channels.get(identifier.channels.groups[i]).fetchMessages({ limit: 50 })
            .then(messages => messages.forEach(message => message.delete()))
            .catch(console.error);
    }
})

module.exports = client;