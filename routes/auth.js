var express = require('express');
var mongoose = require('mongoose');

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


var authRouter = express.Router();
var router = function() {
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log('Sign Up Route');
            console.log(req.body);
            req.login(req.body, function(){
                res.redirect('/auth/profile')
            });
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
