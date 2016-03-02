var mongoose = require('mongoose'),
    service = require('../config/services/auth.service');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    salt: String,
    hashed_pwd: String,
    roles: [String]
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return service.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
}

module.exports = mongoose.model('User', userSchema);
