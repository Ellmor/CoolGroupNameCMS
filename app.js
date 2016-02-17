var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

//MONGO DB CONNECTION
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CoolGroupProjectDB');
var mongodb = mongoose.connection;
 //error
 mongodb.on('error', console.error.bind(console, 'connection error'))
 //open event (listen once)
 mongodb.on('open', function callback(){
    console.log('CoolGroupNameCMSAppDB opened');
 });

//ROUTE FILES
var routes = require('./src/routes/index');
var users = require('./src/routes/users');
var auth = require('./src/routes/auth')();

//APP
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'whatever',
    name: 'whatever',
    //store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
require('./src/config/passport')(app);


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTE SETUP
app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
