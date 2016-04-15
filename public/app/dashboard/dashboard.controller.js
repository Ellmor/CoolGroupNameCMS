(function(){
    "use strict";

    angular
        .module('app')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$scope', 'logService', 'ioService', 'mvIdentity'];


    function dashboardController($scope, logService, ioService, mvIdentity){
        var vm = this;

        //defining general variables for this controller
        var settings = {
            logTable: { size: 10}
        }
        //user control - authorisation etc.
        vm.identity = mvIdentity;

        vm.Logs = [{}];

        //listening the changes in log table
        ioService.on('log-update', function(log){
            //add new log to the baginning of the array
            vm.Logs.unshift(log);
            //keping the array in constant size
            vm.Logs.slice(0, settings.logTable.size);
            //applying changes (so the view knows that the object was changed)
            $scope.$apply();
        });

        var modelLogs = function (data) {
            vm.Logs = data;
        }

        var modelLog = function (data) {
            vm.Log = data;
        }

        logService.getLogs(settings.logTable.size, 'date-desc')
            .then(modelLogs);

        vm.getLog = function (logid) {
            categoryService.getCategory(logid)
                .then(modelLog);
        }

    }

})();