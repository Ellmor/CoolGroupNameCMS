var auth = require('./auth');

module.exports = function (app) {
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logOut();
        res.end();
    });

    //ROUTE FILES
    var users = require('./api/user.api');

    //ROUTE SETUP
    app.use('/users/', users);

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}