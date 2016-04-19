var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//files
var config = require('./server/config/config')[env];
var mongoose = require('./server/config/mongoose');
var express = require('./server/config/express');
var passport = require('./server/config/passport');
var routes = require('./server/config/routes');

//require('./server/config/passport')(app);

//var socketio = require('./server/config/socketio')(app);

//changed from app to server

//invoke files
var db = mongoose(config);
console.log(db);
var app = express(app, config, db);
var passport = passport();
var routes = routes(app.app);
//var socketio = socketio();

app.server.listen(config.port);
console.log('Listening on port ' + config.port + '...');
