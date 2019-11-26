const socket = require('socket.io-client')('http://127.0.0.1:' + process.env.SOCKET_PORT);
socket.on('connect', () => socket.emit('check-day'));