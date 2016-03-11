var passport = require('passport'),
    User = require('../models/user.js')

//Import Strategy

require('./strategies/local.strategy')();
require('./strategies/twitter.strategy')();
require('./strategies/facebook.strategy')();
require('./strategies/google.strategy')();


module.exports = function () {

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
};