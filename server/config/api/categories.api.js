/**
 * Created by D'oh on 3/30/16.
 */
var express = require('express');
var router = express.Router();
var Category = require('../../models/category');
var categoryService = require('../services/category.service');

/* GET category listing. */
router.get('/', function(req, res, next) {

    Category.find(function (err, results){console.log(results); res.json(results);});
});

/*Create category*/
router.post('/', function(req, res){
    //NOT SECURE
    if(!req.content)(
        req.content = {_id: "undefined", title: "undefined", headline: "undefined", author: "undefined"}
    )
    categoryService.createCategory(req.content, req.body, function(response){
        console.log(req.body);
        if(response.success) {
            res.json(response.data)
        }
        else {
            res.json({message: response.message});
        }
    });
});

/*Update category*/
router.put('/:categoryid', function(req,res,next){
    //NOT SECURE
    if(!req.content)(
        req.content = {_id: "undefined", title: "undefined", headline: "undefined", author: "undefined"}
    )
    categoryService.updateCategory(req.params.categoryid, req.content, req.body, function(response){
        console.log(response);
        if(response.success) {
            res.send(response.data);
        } else {
            res.json({message: response.message});
        }
    });
});

/*Get category */
router.get('/:categoryid', function(req,res, next){
    var categoryid = req.params.categoryid;
    Category.findOne({_id:categoryid}, function(err, results){res.json(results);});
});

/*Delete category*/
router.delete('/:categoryid', function(req,res,next){

    var categoryid = req.params.categoryid;

    Category.remove({_id:categoryid}, function (err){

            if(err) {
                //if there is an error return error message
                res.json({success:false, message:"Error", details: err});
            } else {
                //else return confirmation that the user was deleted
                res.json({success:true, message: "The category " +req.params.categoryid+" was deleted"});
            };
        }
    );
});

module.exports = router;