/**
 * Created by D'oh on 4/12/16.
 */
var Tag = require('../../models/tag');

module.exports.createTag = function (content, tagModel, callback) {
    if(callback){
        var tag ={
            name: tagModel.name || "undefined",
        };

        //creating passing object to mongoose schema
        var newTag = new Tag(tag);

        //saving tag to database
        newTag.save(function (err, tag) {
            if(err){
                callback({success:false, message:'Error'});
            }else{
                callback({success:true, message:'Success', data:tag});
            }

        });
    }
};
module.exports.updateTag = function updateTag(tagId, content, tagModel, callback) {
    Tag.findById(tagId, function(err, tagItem){
        if(err){callback({success:false, message: 'Error'});}

        console.log(tagItem.name);
        tagItem.name = tagModel.name || 'undefined';
        tagItem.save(function(err){
            if(err){
                callback({success: false, message:'Error'});
            }else{
                callback({success: true, message:'Success'});
            }
        });
    });

};