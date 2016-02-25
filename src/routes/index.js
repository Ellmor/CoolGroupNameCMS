var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool Group Name CMS' });
});
router.get('/AdminPanel', function (req,res, next) {
  res.render('AdminPanel', {title: 'admin panel'});

});
router.get('/userCreation', function (req,res, next) {
  res.render('userCreation', {title: 'admin panel'});

});
router.get('/AdminPanel/:userid', function(req, res, next) {
  res.render('AdminEdit', { userid: req.params.userid });
});
module.exports = router;
