var passport = require('passport'),
    //url = require('url'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    config = require('../config'),
    users = require('../services/user.service');

module.exports = function() {
    passport.use(new GoogleStrategy({
            clientID: config[process.env.NODE_ENV].google.clientID,
            clientSecret: config[process.env.NODE_ENV].google.clientSecret,
            callbackURL: config[process.env.NODE_ENV].google.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshToken = refreshToken;

            var providerUserProfile = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                fullName: profile.displayName,
                email: profile.emails[0].value,
                username: profile.username,
                roles: ["commentator"],
                provider: 'google',
                providerId: profile.id,
                providerData: providerData
            };

            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }));
};