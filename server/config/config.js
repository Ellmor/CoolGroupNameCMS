var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');

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
        }
    }
}