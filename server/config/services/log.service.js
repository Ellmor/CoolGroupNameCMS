//var Session = require('../../models/session');
var Log = require('../../models/log');
var User = require('../../models/user');

//service contains methods for interacting with the log and session documents of the database.
//log = logs evens: log in, log out, page change etc.
//session = stores all sessions of the logged in users(ip, date when logged in, and when logged out. ). (do we need this?)

module.exports.logEvent = function logEvent(event, callback) {

    //creating user object, based on which mongo User can be created
    var log = {
        client_ip: event.ip,
        event: event.event, //if logged in
        user_id: event.user_id || 'anonymous', //if logged in
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
