(function(){
    "use strict";

    angular
        .module('app')
        .controller('dashboardController', dashboardController);

    function dashboardController($scope, helperService, mvIdentity){
        var vm = this;

        $scope.identity = mvIdentity;
    }

})();