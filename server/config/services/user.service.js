var authService = require('./auth.service');
var User = require('../../models/user');


module.exports.createUser = function createUser(userModel, callback) {

    var salt = authService.createSalt();
    var hash = authService.hashPwd(salt, userModel.password);

    //creating user object, based on which mongo User can be created
    var user = {
        firstName: "test",
        lastName:  "test1",
        username: userModel.username,
        salt: salt,
        hashed_pwd: hash,
        roles: ["user"]
    };

    //creating passing object to mongoose shema
    var newUser = new User(user);

    //saving user to database
    newUser.save(function(err, user){
        if(err) {
            callback({success: false, message: "Error"});
        } else {
            callback({success: true, message: "Success", data: user});
        }
    });
};

module.exports.updateUser = function updateUser(userId, userModel, callback) {

    User.findById(userId, function(err, user){
        if(err) {callback({success: false, message: "Error"});}

        var salt = authService.createSalt();
        var hash = authService.hashPwd(salt, userModel.password);

        user.username = userModel.username;
        user.hashed_pwd = hash;
        user.salt = salt;

        user.save(function(err){
            if(err) {
                callback({success: false, message: "Error"});
            } else {
                callback({success: true, message: "Success"});
            }
        });
    });
};

module.exports.saveOAuthUserProfile = function(req, profile, done) {
    console.log("TEST");
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function(err, user) {
        if (err) {
            return done(err);
        } else {
            if (!user) {
                var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

                //calling a static mongoose Shema method to save the user (more on this in MEAN Book).
                //The function can be found in models/user.js
                User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                    profile.username = availableUsername;

                    user = new User(profile);

                    user.save(function(err) {
                        if (err) {
                            var message = _this.getErrorMessage(err);

                            req.flash('error', message);
                            return res.redirect('/signup');
                        }

                        return done(err, user);
                    });
                });
            } else {
                return done(err, user);
            }
        }
    });
};


