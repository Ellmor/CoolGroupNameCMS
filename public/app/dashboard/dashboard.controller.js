(function(){
    "use strict";

    angular
        .module('app')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$scope', 'logService', 'ioService', 'mvIdentity', 'userService'];


    function dashboardController($scope, logService, ioService, mvIdentity, userService){
        var vm = this;

        //defining general variables for this controller
        var settings = {
            userTable: { size: 5, fields: 'username online sessions'},
            logTable: { size: 10}
        }
        //user control - authorisation etc.
        vm.identity = mvIdentity;

        vm.total = 0;
        vm.Logs = [{}];
        var TopUserDemo = {
            username: 'test',
            sessions_num: 2,
            currentlyLoggedIn: false,
            lastLogin: new Date(),
            timeOnline: 30,
            pagesVisited: '/dashboard'
        }
        vm.TopUsers = [TopUserDemo];

        //get all sessions, which are not 'disconnected'
        //usrename: user_id -> get username
        //sessions_num: get all sesions with this user_id
        //


        var TopPageDemo = {
            url: '/dashboard',
            visitors: 2,
            totalVisits: 10
        }
        vm.TopPages = [TopPageDemo];

        //listening the changes in log table
        ioService.on('log-update', function(log){
            //add new log to the baginning of the array
            vm.Logs.unshift(log);
            //keping the array in constant size
            vm.Logs.slice(0, settings.logTable.size);
            //applying changes (so the view knows that the object was changed)
            $scope.$apply();
        });

        ioService.on('connection', function(){
            vm.total += 1;
        });

        ioService.on('disconnect', function(){
            vm.total -= 1;
        });

        ioService.on('user-update', function(log){

        });

        ioService.on('page-update', function(log){

        });

        var modelLogs = function (data) {
            vm.Logs = data;
        }

        var modelLog = function (data) {
            vm.Log = data;
        }

        var modelUsers = function (data) {

            vm.TopUsers = data;
        }

        logService.getLogs(settings.logTable.size, 'date-desc')
            .then(modelLogs);

        logService.getUsers(settings.userTable.size, settings.userTable.fields)
            .then(modelUsers);

        vm.getLog = function (logid) {
            categoryService.getCategory(logid)
                .then(modelLog);
        }

    }

})();