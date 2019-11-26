const server = require('http').createServer();
const io = require('socket.io')(server);
const fs = require('fs');
const path = require('path');

io.on('connection', function (socket) {
    const basePath = path.join(__dirname, 'events')
    fs.readdirSync(basePath).forEach(file => {
        let event = require(path.join(basePath, file));
        socket.on(event.name, (...args) => event.execute(require('./bot'), io, args));
    })
});

module.exports = server;