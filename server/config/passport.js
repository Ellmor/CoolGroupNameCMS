var passport = require('passport');

require('./strategies/local.strategy')();
require('./strategies/google.strategy')();

var User = require('../models/user.js');

module.exports = function () {
    /*
    passport.use(new LocalStrategy(
        function (username, password, done) {
            console.log("DEBUG: looking for user in mongo");
            User.findOne({username: username}).exec(function (err, user) {
                if (user && user.authenticate(password)) {
                    console.log("DEBUG: user found");
                    return done(null, user);
                } else {
                    console.log("DEBUG: user not found");
                    return done(null, false);
                }
            });
        }
    ));
    */

    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
}