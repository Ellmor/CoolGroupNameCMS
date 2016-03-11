/**
 * Created by Liga on 11-03-2016.
 */
var authService = require('./auth.service');
var User = require('../../models/user');
var Content = require('../../models/content');


module.exports.createContent = function createContent(contentModel, callback) {
    var content = {
        title: contentModel.title || "undefined",
        headline: contentModel.headline || "undefined",
        content: contentModel.content || "undefined",
        state: contentModel.state || "undefined",
        author: {username: contentModel.author || "Admin"},
        dateCreated: new Date(),
        lastEdited: new Date(),
        published: contentModel.published || false
    };

    //creating passing object to mongoose schema
    var newContent = new Content(content);

    //saving user to database
    newContent.save(function(err, content){
        if(err) {
            callback({success: false, message: "Error"});
        } else {
            callback({success: true, message: "Success", data: content});
        }
    });
};

module.exports.updateContent = function updateContent(userId, userModel, callback) {

    User.findById(userId, function(err, user){
        if(err) {callback({success: false, message: "Error"});}

        var salt = authService.createSalt();
        var hash = authService.hashPwd(salt, userModel.password);

        user.username = userModel.username;
        user.hashed_pwd = hash;
        user.salt = salt;

        user.save(function(err){
            if(err) {
                callback({success: false, message: "Error"});
            } else {
                callback({success: true, message: "Success"});
            }
        });
    });
};

