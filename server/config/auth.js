var passport = require('passport');

exports.authenticate = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({success: false});
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.send({success: true, user: user});
        });
    })(req, res, next);
};

exports.requiresApiLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
};

exports.requiresRole = function (role) {
    return function (req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf("admin") === -1) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    }
};


//Twitter OAuth
exports.twitterAuthenticate = function (req, res, next) {
    passport.authenticate('twitter', {
        failureRedirect: '/signin'
    })(req, res, next);
};
exports.twitterAuthenticateCallback = function (req, res, next) {
    passport.authenticate('twitter', {
        failureRedirect: '/signin',
        successRedirect: '/backend'
    })(req, res, next);
};

//Facebook Auth
exports.facebookAuthenticate = function (req, res, next) {
    passport.authenticate('facebook', {
        scope: ['email']
    })(req, res, next);
};
exports.facebookAuthenticateCallback = function (req, res, next) {
    passport.authenticate('facebook', {
        failureRedirect: '/signin',
        successRedirect: '/admin'
    })(req, res, next);
};

//Google Auth
exports.googleAuthenticate = function (req, res, next) {
    passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
    })(req, res, next);
}

exports.googleAuthenticateCallback = function (req, res, next) {
    passport.authenticate('google', {
        failureRedirect: '/signin',
        successRedirect: '/admin'
    })(req, res, next);
}
