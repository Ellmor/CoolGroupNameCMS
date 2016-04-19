var express = require('express');
var router = express.Router();
var Log = require('../../models/log');
var User = require('../../models/user');
var logService = require('../services/log.service');

/* GET content listing. */


router.get('/', function (req, res, next) {
    console.log(req.query);
    var param = {};
    //checking if there is a query
    if(req.query) {
        //checking if query has sort parameter
        if(req.query.sort){
            //translate the values to mongo commands
            switch(req.query.sort) {
                case 'date-asc':
                    param.sort = {"date": 1};
                    break;
                case 'date-desc':
                    param.sort = {"date": -1};
                    break;
                default:
                    param.sort = '{}';
            }
        }
        //checking if query has number parameter
        if(req.query.number) {
            //parse the number value to integer
            var number = parseInt(req.query.number);
            //checking if it is a valid number
            param.limit = ((number > 0) ? number : 0);
        }
    } else {
        //setting default values
        param.sort = {};
        param.limit = 0; //limit(0) is equivalent as setting no limit
    }
    console.log(param);
    Log.find().limit(param.limit).sort(param.sort).exec(
        function (err, results) {
            res.json(results);
        });
});

router.get('/users', function (req, res, next) {
    console.log(req.query);
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

    User.find('username online').limit(param.limit).exec(
        function (err, results) {
            res.json(results);
        });
});

module.exports = router;
