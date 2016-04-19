var log = require('./services/log.service'),
    config = require('./config'),
    cookieParser = require('cookie-parser'),
    passport = require('passport');

module.exports = function (app, io, mongoStore) {
    io.use(function(socket, next){
        cookieParser(config.sessionSecret)(socket.request, {}, function(err){
            var sessionId = socket.request.signedCookies['connect.sid'];
            mongoStore.get(sessionId, function(err, session){
                socket.request.session = session;
                passport.initialize()(socket.request, {}, function() {
                    passport.session()(socket.request, {}, function(){
                        if(socket.request.user){
                            next(null, true);
                        } else {
                            next('Error', false);
                        }
                    })
                })
            })
        })
    })
//
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

        socket.on('login', function (user_id) {
            var event = {
                ip: socket.handshake.address,
                event: 'login',
                user: user_id
            }
            log.logEvent(event, function(log){
                console.log(log);
                io.sockets.emit('login', log);
            });
        });

        socket.on('logout', function (user_id) {
            var event = {
                ip: socket.handshake.address,
                event: 'logout',
                url: path
            }
            log.logEvent(event, function(log){
                console.log(log);
                io.sockets.emit('logout', log);
            });
        });

        socket.on('disconnect', function () {
            var event = {
                ip: socket.handshake.address,
                event: 'disconnect',
                url: ''
            }
            log.logEvent(event, function(log){
                console.log(log);
                io.sockets.emit('log-update', log);
            });
        });
    });

}