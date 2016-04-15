var log = require('./services/log.service');

module.exports = function (app, io) {
    io.sockets.on('connection', function(socket) {
        console.log("on connection");
        //on message event, which is passed when the website is first loaded
        socket.on('message', function (message) {
            console.log('Received message: ' + message);
            console.log(socket.handshake.address);
            console.log(socket.handshake.headers.referer);
            //populate event data
            var event = {
                ip: socket.handshake.address,
                event: 'connect',
                url: socket.handshake.headers.referer
            }
            //log the event in mongoDB
            log.logEvent(event, function(log){
                console.log(log);
                //send back to angular just created log(received in dashboard controller)
                io.sockets.emit('log-update', log);
            });
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
            log.logEvent(event, function(log){
                console.log(log);
                io.sockets.emit('log-update', log);
            });
        });
    });

}