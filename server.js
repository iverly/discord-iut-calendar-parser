const server = require('http').createServer();
const io = require('socket.io')(server);
const debug = require('debug')('tcp');

io.on('connection', function (socket) {
    io.emit('this', { will: 'be received by everyone'});

    socket.on('private message', function (from, msg) {
        debug('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {
        io.emit('user disconnected');
    });
});

module.exports = server;