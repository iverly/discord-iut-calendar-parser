const identifier = require('../identifier');

module.exports = {
    name: 'announcement',
    async execute(client, io, message) {
        client.guilds.get(identifier.server).channels.get(identifier.channels.announcement).send(message);
    }
}