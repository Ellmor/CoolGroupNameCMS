var Session = require('../../models/session');
var Log = require('../../models/log');


module.exports.logEvent = function logEvent(event) {

    //creating user object, based on which mongo User can be created
    var log = {
        client_ip: event.ip,
        event: event.event, //if logged in
        session_id: null, //if logged in
        date: new Date(),
        url: event.url //path, dateVisited
    };

    //creating passing object to mongoose schema
    var newLog = new Log(log);

    //saving user to database
    newLog.save(function(err, log){
        if(err) {
            console.log('Error');
        }
    });
};

module.exports.newSession = function updateUser(session) {

    //creating user object, based on which mongo User can be created
    var session = {
        client_ip: session.ip,
        user_id: session.user_id,
        status: 'logged in',
        loggedIn: new Date()
    };

    //creating passing object to mongoose schema
    var newSession = new Session(session);

    //saving user to database
    newSession.save(function(err, session){
        if(err) {
            console.log('Error');
        }
    });
};

module.exports.endSession = function updateUser(session) {



};