/**
 * Created by D'oh on 3/7/16.
 */

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    users = require('../services/user.service');

module.exports = function() {
    passport.use(new FacebookStrategy({

            consumerKey: config.development.facebook.clientID,
            consumerSecret: config.development.facebook.clientSecret,
            callbackURL: config.development.facebook.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {

            var providerData = profile._json;
            providerData.token = accessToken;
            providerData.refreshToken = refreshToken;

            var providerUserProfile = {

                fullName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                provider: 'facebook',
                providerId: profile.id,
                providerData: providerData
            };

            //Saving the user to mongodb
            //Function can be found in user.service.js
            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }));
};