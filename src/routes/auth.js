var express = require('express');
var passport = require('passport');

var User = require('../models/user');

var authRouter = express.Router();
var router = function() {
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log('Sign Up Route');
            console.log(req.body);

            var user = new User();

            user.username = req.body.name;
            user.password = req.body.password;

            user.save(function(err){
                    req.login(user, function(){
                        res.redirect('/auth/profile')
                    });
                });
            console.log(user);
        });

    authRouter.route('/logIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res){
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .get(function(req, res){
            console.log('Profile Route');
            res.json(req.user);
        });
    authRouter.route('/')
        .get(function(req, res, next) {
            console.log('TEST');
            res.render('profile');
        });
    return authRouter;
};



module.exports = router;


/*
 var router = express.Router();

 router.post('/signUp', function(req, res) {
 console.log('Sign Up Route');
 console.log(req.body);
 req.login(req.body, function(){
 res.redirect('/auth/profile')
 })
 ;
 });

 router.get('/profile', function(req, res){
 console.log('Profile Route');
 res.json(req.user);
 });

 router.get('/', function(req, res, next) {
 console.log('TEST');
 res.render('profile');
 });

 */