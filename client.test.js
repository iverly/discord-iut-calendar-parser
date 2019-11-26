const socket = require('socket.io-client')('http://127.0.0.1:' + process.env.SOCKET_PORT);
socket.on('connect', () => {
    console.log('Connected');
    socket.emit('announcement', '');
});
socket.on('disconnect', () => console.log('Disconnected'));