var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../models/user');

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'name',
            passwordField: 'password'
        },
        function (username, password, done) {
            User.findOne({username: username}, function (err, results) {
                if (results.password == password) {
                    var user = results;
                    done(null, user);
                } else {
                    done(null, false, 'error');
                }

            });
        }));
}