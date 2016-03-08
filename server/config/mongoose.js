var mongoose = require('mongoose'),
    service = require('./services/auth.service'),
    User = require('../models/user');

module.exports = function (config) {

    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));


    db.once('open', function callback() {
        console.log('CoolGroupName db opened');
    });

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = service.createSalt();
            hash = service.hashPwd(salt, 'admin');
            User.create({
                firstName: "Admin",
                lastName: "none",
                username: "Admin",
                salt: salt,
                hashed_pwd: hash,
                roles: ["admin"]
            });
            salt = service.createSalt();
            hash = service.hashPwd(salt, 'nezi12');
            User.create({
                firstName: "Piotr",
                lastName: "Suski",
                username: "Ellmor",
                salt: salt,
                hashed_pwd: hash,
                roles: []
            });
            salt = service.createSalt();
            hash = service.hashPwd(salt, 'commentator');
            User.create({
                firstName: "Commentator",
                lastName: "LastName",
                username: "Commentator",
                salt: salt,
                hashed_pwd: hash,
                roles: ["commentator"]
            });
        }
    });


}

