
var passport = require('passport');

var auth = require('/auth');
var express = require('express');
var router = express.Router;

router.route('/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/api/users/',
        failure: '/error'
    }));

route.route('/google')
    .get(passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email']
    }));

module.exports = router;

exports.authenticate  = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({success:false}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({success:true, user:user});
        });
    })(req, res, next);
}