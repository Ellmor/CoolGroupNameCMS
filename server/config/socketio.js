var log = require('./services/log.service');

module.exports = function (app, io) {
    io.sockets.on('connection', function(socket) {
        console.log("on connection");
        socket.on('message', function (message) {
            console.log('Received message: ' + message);
            console.log(socket.handshake.address);
            console.log(socket.handshake.headers.referer);
            var event = {
                ip: socket.handshake.address,
                event: 'connect',
                url: socket.handshake.headers.referer
            }
            log.logEvent(event);
        });
        socket.on('locationChange', function (path) {
            console.log('Received path: ' + path);
            console.log(socket.handshake.address);
            console.log(socket.handshake.headers.referer);
            var event = {
                ip: socket.handshake.address,
                event: 'location change',
                url: path
            }
            log.logEvent(event);
        });
    });

}