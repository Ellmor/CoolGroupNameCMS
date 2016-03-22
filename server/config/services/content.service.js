/**
 * Created by Liga on 11-03-2016.
 */
var authService = require('./auth.service');
var User = require('../../models/user');
var Content = require('../../models/content');


module.exports.createContent = function createContent(user, contentModel, callback) {
    if(user){
        var content = {
            title: contentModel.title || "undefined",
            headline: contentModel.headline || "undefined",
            content: contentModel.content || "undefined",
            state: contentModel.state || "undefined",
            author: {_id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName},
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
    }
};

module.exports.updateContent = function updateContent(contentId, user, contentModel, callback) {

    Content.findById(contentId, function(err, contentItem){
        if(err) {callback({success: false, message: "Error"});}

        contentItem.title= contentModel.title || "undefined";
        contentItem.headline= contentModel.headline || "undefined";
        contentItem.content= contentModel.content || "undefined";
        contentItem.state= contentModel.state || "undefined";
        //contentItem.author= {_id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName};
        contentItem.lastEdited= new Date();
        contentItem.published= contentModel.published || false;

        contentItem.save(function(err){
            if(err) {
                callback({success: false, message: "Error"});
            } else {
                callback({success: true, message: "Success"});
            }
        });
    });
};

