var mongoose = require('mongoose'),
    service = require('../config/services/auth.service');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    salt: String,
    hashed_pwd: String,
    roles: [String],
    provider: String, //for OAuth identification
    providerId: String, //for OAuth identification
    providerData: Object
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return service.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};

//static method created for OAuth functionality
userSchema.statics = {
    findUniqueUsername: function(username, suffix, callback) {
        var _this = this;
        var possibleUsername = username + (suffix || '');

        _this.findOne({
            username: possibleUsername
        }, function (err, user) {
            if (!err) {
                if (!user) {
                    callback(possibleUsername);
                } else {
                    return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
                }
            } else {
                callback(null);
            }
        });
    }
};


module.exports = mongoose.model('User', userSchema);
