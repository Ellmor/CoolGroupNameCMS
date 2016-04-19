var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')(session),
    mongoose = require('mongoose');

var http = require('http'),
    socketio = require('socket.io');

module.exports = function (app, config, db) {
    var app = express();
//creating the http server
    var server = http.createServer(app);

//passing the server to the socket.io to listen to
    var io = socketio(server);
    //https://github.com/kcbanner/connect-mongo  //reuse mongoose connection
    var mongoStore = new MongoStore({mongooseConnection: db})

    app.set('views', config.rootPath + "/server/views");
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(session({
        secret: config.sessionSecret,
        name: 'whatever',
        store: mongoStore, // connect-mongo session store
        proxy: true,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));

    //require('./routes')(app);
    require('./socketio')(server, io, mongoStore)
    return {app:app, server:server};
}