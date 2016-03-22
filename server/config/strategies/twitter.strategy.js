/**
 * Created by Liga on 06-03-2016.
 */
var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    config = require('../config'),
    users = require('../services/user.service');

module.exports = function() {
    passport.use(new TwitterStrategy({
            consumerKey: config[process.env.NODE_ENV].twitter.clientID,
            consumerSecret: config[process.env.NODE_ENV].twitter.clientSecret,
            callbackURL: config[process.env.NODE_ENV].twitter.callbackURL,
            passReqToCallback: true
        },
        function(req, token, tokenSecret, profile, done) {
            var providerData = profile._json;
            providerData.token = token;
            providerData.tokenSecret = tokenSecret;

            var providerUserProfile = {
                firstName: profile.displayName,
                username: profile.username,
                roles: ["commentator"],
                provider: 'twitter',
                providerId: profile.id,
                providerData: providerData
            };

            //Saving the user to mongodb
            //Function can be found in user.service.js
            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }));
};