var passport = require('passport');
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var User = require('../models/user');


exports.checkAndRedirect = function(req, res) {
        //find a user which owns the token
        User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            //if user was not found redirect back to password recovery
            if (!user) {
                console.log('Error: Password reset token is invalid or has expired.');
                return res.redirect('/passwordRecovery');
            } else {
                //else redirect to password reset
                return res.redirect('/passwordReset');
            }
        });
};

exports.passwordRecovery = function(req, res, next) {
    console.log(req);
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            console.log('function nr 1');
            console.log(req.body.username);
            User.findOne({username: req.body.username }, function(err, user) {
                if (!user) {
                    //req.flash('error', 'No account with that email address exists.');
                    console.log('No account with that email address exists.');
                    return res.json({success: false, message: 'No account with that email address exists.'});
                }

                console.log(token);
                user.email = req.body.email;
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            console.log('function nr 2');
            var smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "liga.daine@gmail.com",
                    pass: "node1024"
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                //req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                console.log('An e-mail has been sent to ' + user.email + ' with further instructions.');
                //done(err, 'done');
                res.json({success:true, message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/passwordRecovery');
    });
};

