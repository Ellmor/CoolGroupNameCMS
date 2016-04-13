var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//creating the http server
var server = require('http').Server(app);
//passing the server to the socket.io to listen to
var io = require('socket.io')(server);

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

//require('./server/config/passport')(app);


require('./server/config/socketio')(app, io);

//changed from app to server
server.listen(config.port);

console.log('Listening on port ' + config.port + '...');
