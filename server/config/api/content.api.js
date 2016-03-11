/**
 * Created by Liga on 11-03-2016.
 */

var express = require('express');
var router = express.Router();
var Content = require('../../models/content');
var contentService = require('../services/content.service');

/* GET content listing. */
router.get('/', function(req, res, next) {
    Content.find(function (err, results){console.log(results); res.json(results);});
});

/*Create content*/
router.post('/', function(req, res){
    contentService.createContent(req.body, function(response){
        console.log(response);
        if(response.success) {
            res.json(response.data)
        }
        else {
            res.json({message: response.message});
        }
    });
});

/*Get Content */
router.get('/:contentid', function(req,res, next){
    var contentid = req.params.contentid;
    Content.findOne({_id:contentid}, function(err, results){res.json(results);});
});

/*Delete content*/
router.delete('/:contentid', function(req,res,next){
    var contentid = req.params.contentid;
    Content.remove({_id:contentid}, function (err){
            if(err) {
                //if there is an error return error message
                res.json({success:false, message:"Error", details: err});
            } else {
                //else return confirmation that the user was deleted
                res.json({success:true, message: "The user " +req.params.contentid+" was deleted"});
            };
        }
    );
});

module.exports = router;
