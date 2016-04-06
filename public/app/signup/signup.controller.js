(function () {
    "use strict";

    angular
        .module('app')
        .controller('signUpController', signUpController);

    function signUpController($scope, userService, mvNotifier, helperService, $routeParams) {
        var vm = this;

        if ($routeParams.userId) {
            vm.userId = $routeParams.userId;
        }

        var modelUser = function (data) {
            $scope.User = data;
        }

        $scope.createUser = function (user) {
            userService.createUser(user);
        }
    }


})();


