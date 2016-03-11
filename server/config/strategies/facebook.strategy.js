/**
 * Created by D'oh on 3/7/16.
 */

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    users = require('../services/user.service');

module.exports = function() {
    passport.use(new FacebookStrategy({

            clientID: config.development.facebook.clientID,
            clientSecret: config.development.facebook.clientSecret,
            callbackURL: config.development.facebook.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {

            var providerData = profile._json;
            providerData.token = accessToken;
            providerData.refreshToken = refreshToken;

            var providerUserProfile = {


                username: profile.displayName,
                provider: 'facebook',
                providerId: profile.id,
                providerData: providerData
            };
console.log(providerUserProfile);
            //Saving the user to mongodb
            //Function can be found in user.service.js
            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }));
};