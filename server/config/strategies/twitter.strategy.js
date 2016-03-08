/**
 * Created by Liga on 06-03-2016.
 */
var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    config = require('../config'),
    users = require('../services/user.service');

module.exports = function() {
    passport.use(new TwitterStrategy({
            consumerKey: config.development.twitter.clientID,
            consumerSecret: config.development.twitter.clientSecret,
            callbackURL: config.development.twitter.callbackURL,
            passReqToCallback: true
        },
        function(req, token, tokenSecret, profile, done) {
            var providerData = profile._json;
            providerData.token = token;
            providerData.tokenSecret = tokenSecret;

            var providerUserProfile = {
                fullName: profile.displayName,
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