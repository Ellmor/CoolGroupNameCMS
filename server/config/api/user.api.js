var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var service = require('../service');

/* GET users listing. */
router.get('/', function(req, res, next) {
    User.find(function (err, results){res.json(results);});
});
/*Create user*/
router.route('/').post(function(req, res){

    //checking for errors
    if( typeof req.body.username ==="undefined" || typeof req.body.password === "undefined"){
        //return error
        res.json({message: "Error"})
    }
    else { //if values are valid
        //hashing password
        var salt = service.createSalt();
        var hash = service.hashPwd(salt, req.body.password);

        //creating user object, based on which mongo User can be created
        var user = {
            firstName: "test",
            lastName:  "test",
            username: req.body.username,
            salt: salt,
            hashed_pwd: hash,
            roles: ["user"]
        };

        //creating passing object to mongoose shema
        var newUser = new User(user);

        //saving user to database
        newUser.save(function(err, user){
            if(err) {res.json({message:"Error"});}
            console.log(user);
            res.json(user)
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
    var userid = req.params.userid;

    User.findById(userid, function(err,user){
        if(err) res.json({message:"Error"})

        var salt = service.createSalt();
        var hash = service.hashPwd(salt, req.body.password);

        user.username = req.body.username;
        user.hashed_pwd = hash;
        user.salt = salt;

        user.save(function(err){
            if(err) res.json({message:"Error"});
            res.send(user);
        });
    });
});

/*Delete user*/
router.delete('/:userid', function(req,res,next){
    var userid = req.params.userid;
    User.remove({_id:userid}, function (err){
            if(err)res.json({message:"Error"});
        }
    );
});


module.exports = router;
