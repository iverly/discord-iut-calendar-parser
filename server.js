const io = require('socket.io');
const debug = require('debug')('tcp');

const server = io(process.env.SOCKET_PORT);

io.on('connection', function (socket) {
    io.emit('this', { will: 'be received by everyone'});

    socket.on('private message', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function () {
        io.emit('user disconnected');
    });
});

module.exports = server;