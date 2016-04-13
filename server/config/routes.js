var auth = require('./auth');
var users = require('./api/user.api');
var content = require('./api/content.api');
var categories = require('./api/categories.api.js');
var tags = require('./api/tags.api.js');
var log = require('./services/log.service');



module.exports = function (app) {

    //Angular Partials
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    //Route for reset tokens (links send to Mails)

    app.post('/logout', function (req, res) {
        req.logOut();
        res.end();
    });
//
    //Local Auth
    app.post('/login', auth.authenticate);

    //Twitter Auth
    app.get('/oauth/twitter', auth.twitterAuthenticate);
    app.get('/twitter/callback', auth.twitterAuthenticateCallback);

    //Facebook Auth
    app.get('/oauth/facebook', auth.facebookAuthenticate);
    app.get('/oauth/facebook/callback', auth.facebookAuthenticateCallback);

    //Google Auth
    app.get('/oauth/google', auth.googleAuthenticate);
    app.get('/oauth/google/callback', auth.googleAuthenticateCallback);

    //API ROUTE SETUP
    app.use('/api/users/', users);
    app.use('/api/content/', content);
    app.use('/api/categories/', categories);
    app.use ('/api/tags/', tags);

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};