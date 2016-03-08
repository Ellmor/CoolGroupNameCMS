var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var service = require('../services/auth.service');
var userService = require('../services/user.service');
var auth = require('../auth');

/* GET users listing. */
router.get('/', auth.requiresRole("admin"), function(req, res, next) {
    User.find(function (err, results){res.json(results);});
});

/*Create user*/
router.post('/', function(req, res){

    //checking for errors
    if( typeof req.body.username ==="undefined" || typeof req.body.password === "undefined"){
        //return error
        res.json({message: "Error"})
    }
    
    else { //if values are valid
        userService.createUser(req.body, function(response){
            console.log(response);
            if(response.success) {
                res.json(response.data)
            }
            else {
                res.json({message: response.message});
            }
        });
    }
});

/*Get User */
router.get('/:userid', function(req,res, next){
    var userid = req.params.userid;
    User.findOne({_id:userid}, function(err, results){res.json(results);});
});

/*Update user*/
router.put('/:userid', function(req,res,next){

    userService.updateUser(req.params.userid, req.body, function(response){
        console.log(response);
        if(response.success) {
            res.send(response.data);
        } else {
            res.json({message: response.message});
        }
    });
});

/*Delete user*/
router.delete('/:userid', function(req,res,next){
    var userid = req.params.userid;
    User.remove({_id:userid}, function (err){
            if(err) {
                //if there is an error return error message
                res.json({success:false, message:"Error", details: err});
            } else {
                //else return confirmation that the user was deleted
                res.json({success:true, message: "The user " +req.params.userid+" was deleted"});
            };
        }
    );
});

module.exports = router;