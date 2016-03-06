var auth = require('./auth');
var users = require('./api/user.api');

module.exports = function (app) {

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });


    app.get('/oauth/google', auth.googleAuthenticate);

    app.get('/oauth/google/callback', auth.googleAuthenticateCallback);

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logOut();
        res.end();
    });

    app.use('/api/users/', users);

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}