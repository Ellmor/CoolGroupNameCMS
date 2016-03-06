var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');

var devPort = process.env.PORT || 3030;
var prodPort = process.env.PORT || 80;

module.exports = {
    development: {
        db: 'mongodb://localhost/CoolGroupProjectDB',
        rootPath: rootPath,
        port: devPort,
        google: {
            clientID: '311341705290-rp10bgnd9o5lscvbh8hjv0qanqauo3pt.apps.googleusercontent.com',
            clientSecret: 'lCGkHGQZ2XFLS9vpAdOcCaI4',
            callbackURL: 'http://localhost:'+ devPort +'/oauth/google/callback'
        }
    },
    production: {
        db: 'mongodb://localhost/CoolGroupProjectDB',
        rootPath: rootPath,
        port: prodPort,
        google: {
            clientID: '311341705290-rp10bgnd9o5lscvbh8hjv0qanqauo3pt.apps.googleusercontent.com',
            clientSecret: 'lCGkHGQZ2XFLS9vpAdOcCaI4',
            callbackURL: 'http://localhost:' + prodPort + '/oauth/google/callback'
        }
    }
}