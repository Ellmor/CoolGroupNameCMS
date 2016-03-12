(function () {
    angular.module('app')
        .controller('mvMainCtrl', mvMainCtrl);

    function mvMainCtrl($scope, helperService) {
        var vm = this;

        vm.isActive = helperService.isActive;

    }

})()