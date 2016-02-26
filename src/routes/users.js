var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function (err, results){res.json(results);});

});
/*Create user*/
router.route('/').post(function(req, res){
  mongoose.createConnection('localhost', 'CoolGroupProjectDB');
  var user = {
    username: req.body.username,
    password: req.body.password
  };
  if( typeof req.body.username ==="undefined" || typeof req.body.password === "undefined"){
    res.json({message: "Error"})
  }
  else{
    var newUser = new User(user);
    newUser.save(function(err, user){
      if(err) res.json({message:"Error"});
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

    user.username = req.body.username;
    user.password = req.body.password;

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
