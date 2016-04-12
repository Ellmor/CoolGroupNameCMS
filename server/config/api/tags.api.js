/**
 * Created by D'oh on 4/12/16.
 */
var express = require('express'),
    router = express.Router(),
    Tags = require('../../models/tag'),
    tagServices = require('../services/tag.service');

/* Get tags listings */
router.get('/', function (req,res, next) {

    Tags.find(function(err, results){
        res.json(results);});

});
    /* Create tags*/
    router.post('/', function(req,res){
        if(!req.content)(
            req.content = {_id:'undefined', title: 'undefined', headline: 'undefined', author: 'undefined'}
        )
        tagServices.createTag(req.content, req.body, function(response){
            if(response.success){
                res.json(response.data)
            }
            else {
                res.json({message: response.message});
            }
        });
    });

    /*Update tags*/
    router.put('/:tagid', function(req,res,next){
        if(!req.content)(
            req.content = {_id: "undefined", title: "undefined", headline: "undefined", author: "undefined"}
        )
        tagServices.updateTag(req.params.tagid, req.content, req.body, function(response){

            if(response.success) {
                res.send(response.data);
            } else {
                res.json({message: response.message});
            }
        });
    });

    /*Get tags */
    router.get('/:tagid', function(req,res, next){
        var tagid = req.params.tagid;
        Tag.findOne({_id:tagid}, function(err, results){res.json(results);});
    });

    /*Delete tags*/
    router.delete('/:tagid', function(req,res,next){

        var tagid = req.params.tagid;

        Tag.remove({_id:tagid}, function (err){

                if(err) {
                    //if there is an error return error message
                    res.json({success:false, message:"Error", details: err});
                } else {
                    //else return confirmation that the user was deleted
                    res.json({success:true, message: "The tag " +req.params.tagid+" was deleted"});
                };
            }
        );
    });

    module.exports = router;