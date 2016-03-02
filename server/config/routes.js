var auth = required('./auth');
//var router = express.Router;

// defines the path to the view files - partials is considered /public/app/
// also, renders jade into HTML
module.exports = function (app) {
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logOut();
        res.end();
    });

    app.get('/google/callback', auth.googleAuthenticate);

    route.route('/google')
        .get(passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email']
        }));

    //ROUTE FILES
    var users = require('./api/user.api');

    //ROUTE SETUP
    app.use('/api/users/', users);

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};
