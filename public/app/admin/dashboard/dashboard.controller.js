(function(){
    "use strict";

    angular
        .module('app')
        .controller('dashboardController', dashboardController);

    function dashboardController($scope){
        var vm = this;

        $scope.scopeTitle = "Scope Title Dashboard";

        vm.title = "Dashboard";
    };

})();