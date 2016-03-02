var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy;

var User = mongoose.model('User');

passport.use(new GoogleStrategy({
        clientID: '1035851092543-krqf06ld6a1d83uvbar4cibi673c30md.apps.googleusercontent.com',
        clientSecret: 'jIZ7rvfc4AnnB5SgG8CGvlJq',
        callbackURL: 'http://localhost:3000/auth/google/callback'},
        function (req, accessToken, refreshToken, profile, done) {
            done(null, profile);
}));

module.exports = function () {
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