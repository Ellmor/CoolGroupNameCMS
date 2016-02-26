var crypto = require('crypto');

module.exports.createSalt = function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

module.exports.hashPwd = function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha256', salt);
    hmac.update(pwd);
    return hmac.digest('hex');
}
