var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/CoolGroupProjectDB',
        rootPath: rootPath,
        port: process.env.PORT || 3030,
        google : {
            clientID: '1035851092543-krqf06ld6a1d83uvbar4cibi673c30md.apps.googleusercontent.com',
            clientSecret: 'jIZ7rvfc4AnnB5SgG8CGvlJq',
            callbackURL: 'http://localhost:3000/auth/google/callback' }
    },
    production: {
        db: 'mongodb://localhost/CoolGroupProjectDB',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}