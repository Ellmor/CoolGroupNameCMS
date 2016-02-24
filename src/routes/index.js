var express = require('express');
var router = express.Router();
console.log('INDEX ROUTER');
/* GET home page. */

router.get('/', function(req, res, next) {
  console.log('server side /');
  res.render('index', { title: 'Express' });
});



module.exports = router;