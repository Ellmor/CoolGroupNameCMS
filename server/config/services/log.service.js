var Session = require('../../models/session');
var Log = require('../../models/log');

//service contains methods for interacting with the log and session documents of the database.
//log = logs evens: log in, log out, page change etc.
//session = stores all sessions of the logged in users(ip, date when logged in, and when logged out. ). (do we need this?)

module.exports.logEvent = function logEvent(event, callback) {

    //creating user object, based on which mongo User can be created
    var log = {
        client_ip: event.ip,
        event: event.event, //if logged in
        session_id: null, //if logged in
        date: new Date(),
        url: event.url || '' //path, dateVisited
    };

    //creating passing object to mongoose schema
    var newLog = new Log(log);
    console.log('logEvent function');
    console.log(callback);
    //saving user to database
    newLog.save(function(err, log){
        if(err) {
            console.log('Error');
        }
        callback(log);
    });

};
/*
module.exports.sessionCreate = function sessionCreate(data, callback) {

    var session = {
        client_ip: data.ip,
        date: new Date(),
        status: 'anonymous',
    };

    //creating passing object to mongoose schema
    var newSession = new Session(session);

    //saving user to database
    newSession.save(function(err, session){
        if(err) {
            console.log('Error');
        }
        callback(session);

    });

};



module.exports.sessionLogin = function sessionLogin(data) {

    Session.findOne({client_ip: data.ip, status: 'anonymous'}, function(err, session){
        if(err) {
            //({success: false, message: "Error"});
            var session = {
                client_ip: data.ip,
                user_id: data.user_id,
                date: new Date(),
                status: 'logged-in',
                loggedIn: new Date()
            };

            //creating passing object to mongoose schema
            var newSession = new Session(session);

            //saving user to database
            newSession.save(function(err, session){
                if(err) {
                    console.log('Error');
                } else {
                    console.log(log);
                    io.sockets.emit('log-update', log);
                }
            });
        } else {
            session.user_id = data.user_id;
            session.status = 'logged-in';
            session.loggedIn = new Date();

            session.save(function(err){
                if(err) {
                    console.log('Error');
                } else {
                    //callback(session);
                }
            });
        }
    });

};

module.exports.sessionLogout = function sessionLogout(session) {

    Session.findOne({client_ip: data.ip, status: 'anonymous'}, function(err, session){
        if(err) {
            //({success: false, message: "Error"});
            var session = {
                client_ip: data.ip,
                user_id: data.user_id,
                date: new Date(),
                status: 'logged-out',
                loggedOut: new Date(),
                message: 'No session found. '
            };

            //creating passing object to mongoose schema
            var newSession = new Session(session);

            //saving user to database
            newSession.save(function(err, session){
                if(err) {
                    console.log('Error');
                } else {
                    //callback(session);
                }
            });
        } else {
            session.user_id = data.user_id;
            session.status = 'logged-out';
            session.loggedOut = new Date();

            session.save(function(err){
                if(err) {
                    console.log('Error');
                } else {
                    //callback(session);
                }
            });
        }
    });

};

 */