var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../models/user');

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
}