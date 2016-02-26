
var passport = require('passport');

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