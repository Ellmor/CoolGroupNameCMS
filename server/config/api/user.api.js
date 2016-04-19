var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var service = require('../services/auth.service');
var userService = require('../services/user.service');
var auth = require('../auth');

//console.log('users.api');
/* GET users listing. */
router.get('/', auth.requiresRole("admin"), function(req, res, next) {

    var param = {};
    if(req.query) {
        console.log(req.query);
        if(req.query.limit) {
            //parse the number value to integer
            var limit = parseInt(req.query.limit);
            //checking if it is a valid number
            param.limit = ((limit > 0) ? limit : 0);
        }
    } else {
        //setting default values
        param.limit = 0; //limit(0) is equivalent as setting no limit
    }

    User.find().limit(param.limit).exec(
        function (err, results) {
            res.json(results);
        });

    //User.find(function (err, results){res.json(results);});
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
            //console.log(response);
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
/*Reset Password*/
router.put('/resetPassword', userService.passwordReset);
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


router.post('/forgotPassword', userService.passwordRecovery);



module.exports = router;