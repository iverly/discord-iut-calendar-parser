const Discord = require('discord.js');
const debug = require('debug')('discord');
const identifier = require('./identifier');
const dateFormat = require('dateformat');
const publisher = require('iut-calendar-parser').publisher;

const client = new Discord.Client();

module.exports = client;