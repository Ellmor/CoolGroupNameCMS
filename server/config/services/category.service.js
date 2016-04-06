/**
 * Created by D'oh on 3/30/16.
 */
var Category = require('../../models/category');


module.exports.createCategory = function createCategory(content, categoryModel, callback) {
    if(content){
        var category = {
            name: categoryModel.name || "undefined",

        };

        //creating passing object to mongoose schema
        var newCategory = new Category(category);

        //saving user to database
        newCategory.save(function(err, category){
            if(err) {
                callback({success: false, message: "Error"});
            } else {
                callback({success: true, message: "Success", data: category});
            }
        });
    }
};

module.exports.updateCategory = function updateCategory(categoryId, content, categoryModel, callback) {

    Category.findById(categoryId, function(err, categoryItem){
        if(err) {callback({success: false, message: "Error"});}

        categoryItem.name= categoryModel.name || "undefined";
        categoryItem.save(function(err){
            if(err) {
                callback({success: false, message: "Error"});
            } else {
                callback({success: true, message: "Success"});
            }
        });
    });
};

