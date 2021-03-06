const Discord = require('discord.js');
const identifier = require('../identifier');
const dateFormat = require('dateformat');
const publisher = require('iut-calendar-parser').publisher;
const db = require('../database');

const wait = ms => new Promise((r, j)=>setTimeout(r, ms));

module.exports = {
    name: 'check-day',
    async execute(client, io) {
        for (i in identifier.url) {
            let data = await publisher.getData(identifier.url[i]);
            let day = publisher.getDay(data, new Date());

            if (db.get('courses')[i] != day) {
                client.guilds.get(identifier.server).channels.get(identifier.channels.groups[i]).fetchMessages({ limit: 12 })
                    .then(messages => messages.forEach(message => message.delete()))
                    .catch(console.error);

                const journeyEmbed = new Discord.RichEmbed()
                    .setColor('#95a5a6')
                    .setTitle(`Journée du ${dateFormat(new Date(), 'dd/mm/yyyy')}`);
                await client.guilds.get(identifier.server).channels.get(identifier.channels.groups[i]).send(journeyEmbed);
                day.forEach(async (c, j) => {
                    await wait(200);
                    const courseEmbed = new Discord.RichEmbed()
                        .setColor(identifier.colors[j])
                        .setTitle(`${c.startTime}-${c.endTime}`)
                        .addField('Type de cours', c.category, true)
                        .addField('Module', c.module !== Array ? c.module : c.module.join(', ').substr(0, c.module.length - 2), true)
                        .addBlankField()
                        .addField('Prof', c.staff !== Array ? c.staff : c.staff.join(', ').substr(0, c.staff.length - 2), true)
                        .addField('Salle', c.room !== Array ? c.room : c.room.join(', ').substr(0, c.room.length - 2), true);
                    await client.guilds.get(identifier.server).channels.get(identifier.channels.groups[i]).send(courseEmbed);
                })
                await wait(2000);
                await client.guilds.get(identifier.server).channels.get(identifier.channels.groups[i]).send(`⚠ @here modification de votre emploi du temps`);
            }

        }
    }
}