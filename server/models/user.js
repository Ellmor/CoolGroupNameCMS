var mongoose = require('mongoose'),
    service = require('../config/service');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    email: String,
    username: String,
    salt: String,
    hashed_pwd: String,
    roles: [String],
    provider: String,
    providerId: String,
    providerData: String
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return service.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};

module.exports = mongoose.model('User', userSchema);
