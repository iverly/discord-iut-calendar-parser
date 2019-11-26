const Discord = require('discord.js');
const identifier = require('./identifier')
const debug = require('debug')('discord');

const client = new Discord.Client();

client.once('ready', () => {
    client.user.setStatus('dnd');
    client.user.setActivity('github.com/iverly', {type: 'WATCHING'});
})

module.exports = client;