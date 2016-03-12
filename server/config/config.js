var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');


//ports. Brought outside of object, because these values are repeated
var devPort = process.env.PORT || 3030;
var prodPort = process.env.PORT || 80;

module.exports = {
    development: {
        db: 'mongodb://localhost/CoolGroupProjectDB',
        rootPath: rootPath,
        port: devPort,
        twitter: {
            clientID: 's5R77sfSVhyg9lnDGGDVODrh5',
            clientSecret: 'dowP4AoBt9nFPg5jvVBfZaH1IgydtQvx4P9TCJGu7LHssUjvMZ',
            callbackURL: 'http://localhost:' + devPort + '/twitter/callback'
        },
        facebook: {
            clientID: '1087048447981846',
            clientSecret: '80981c736f0bb42fed95ed8b1b9fe622',
            callbackURL: 'http://localhost:' + devPort + '/oauth/facebook/callback'
        },
        google: {
            clientID: '311341705290-rp10bgnd9o5lscvbh8hjv0qanqauo3pt.apps.googleusercontent.com',
            clientSecret: 'lCGkHGQZ2XFLS9vpAdOcCaI4',
            callbackURL: 'http://localhost:' + devPort + '/oauth/google/callback'
        }
    },
    production: {
        db: 'mongodb://localhost/CoolGroupProjectDB',
        rootPath: rootPath,
        port: prodPort,
        twitter: {
            clientID: 's5R77sfSVhyg9lnDGGDVODrh5',
            clientSecret: 'dowP4AoBt9nFPg5jvVBfZaH1IgydtQvx4P9TCJGu7LHssUjvMZ',
            callbackURL: 'http://localhost:' + prodPort + '/twitter/callback'
        },
        facebook: {
            clientID: '1087048447981846',
            clientSecret: '80981c736f0bb42fed95ed8b1b9fe622',
            callbackURL: 'http://localhost:' + prodPort + '/oauth/facebook/callback'
        },
        google: {
            clientID: '311341705290-rp10bgnd9o5lscvbh8hjv0qanqauo3pt.apps.googleusercontent.com',
            clientSecret: 'lCGkHGQZ2XFLS9vpAdOcCaI4',
            callbackURL: 'http://localhost:' + prodPort + '/oauth/google/callback'
        }
    }
}