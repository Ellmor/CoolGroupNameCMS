var mongoose = require('mongoose'),
    service = require('./services/auth.service'),

    User = require('../models/user'),
    Content = require('../models/content'),
    Category = require('../models/category');

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
                firstName: 'Admin',
                lastName: 'none',
                username: 'Admin',
                salt: salt,
                hashed_pwd: hash,
                roles: ["admin"]
            });
            salt = service.createSalt();
            hash = service.hashPwd(salt, 'nezi12');
            User.create({
                firstName: 'Piotr',
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

    Content.find({}).exec(function (err, collection) {
        if (collection.length === 0) {

            var content = [{
                "title": "Introducing Amsterdam",
                "headline": "Amsterdam from different perspective",
                "content": "Amsterdam is the Netherlands’ capital, known for its artistic heritage, elaborate canal system and narrow houses with gabled facades, legacies of the city’s 17th-century Golden Age. Its Museum District houses works by Rembrandt and Vermeer at the Rijksmuseum, the Van Gogh Museum and modern art at the Stedelijk. Cycling is key to the city’s character, and there are 400km of cycle paths.",
                "state": "draft",
                "author": findUser("Admin"),
                "dateCreated": changeDate(3, true),
                "lastEdited": new Date(),
                "published": false
            },
            {
                "title": "Toronto",
                "headline": "You want to be there.",
                "content": "Toronto, the provincial capital of Ontario, Canada, is a large, ethnically diverse city sprawling along Lake Ontario’s northwestern shore. A dynamic metropolis with a core of soaring skyscrapers, all dwarfed by the iconic CN Tower, it also features abundant green spaces, from the orderly oval of Queen’s Park to 400-acre High Park and its trails, sports facilities and zoo.",
                "state": "hidden",
                "author": findUser("Admin"),
                "dateCreated": changeDate(15, true),
                "lastEdited": changeDate(10, true),
                "published": false
            },
            {
                "title": "Introducing Tibet",
                "headline": "Special Report by T.Carter",
                "content": "Tibet offers fabulous monasteries, breathtaking high-altitude treks, stunning views of the world’s highest mountains and one of the most likeable peoples you will ever meet.",
                "state": "Archived",
                "author": findUser("Admin"),
                "dateCreated": changeDate(20, true),
                "lastEdited": changeDate(15, true),
                "published": false
            }];

            Content.create(content);
        }
    });
    Category.find({}).exec(function (err, collection) {
        if (collection.length === 0) {

            var category = [{
                "name": "Introducing Amsterdam",

            },
                {
                    "name": "Toronto",

                },
                {
                    "name": "Introducing Tibet",

                }];

            Category.create(category);
        }
    });

    var findUser = function (username){
        var user = User.findOne({username: username});

        return {_id: user._id,
                username: username,
                firstName: user.firstName,
                lastName: user.lastName,};
    };

    var changeDate = function(change, decrease) {
        if (decrease){
            return new Date(new Date().setDate(new Date().getDate()-change))
        } else {
            return new Date(new Date().setDate(new Date().getDate()+change))
        }
    };
}

