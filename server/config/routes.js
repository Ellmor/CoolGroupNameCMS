var auth = require('./auth');
var users = require('./api/user.api');

module.exports = function (app) {
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logOut();
        res.end();
    });

    //Twitter OAuth
    app.get('/oauth/twitter', auth.twitterAuthenticate);
    app.get('/twitter/callback', auth.twitterAuthenticateCallback);

    //Facebook Auth
    app.get('/oauth/facebook', auth.facebookAuthenticate);
    app.get('/oauth/facebook/callback', auth.facebookAuthenticateCallback);

    //ROUTE SETUP
    app.use('/api/users/', users);

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}