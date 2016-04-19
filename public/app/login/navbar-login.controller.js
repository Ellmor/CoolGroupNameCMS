(function () {
    'use strict';
    angular
        .module('app')
        .controller('mvNavBarLoginCtrl', mvNavBarLoginCtrl);

    mvNavBarLoginCtrl.$inject = ['$scope', 'mvIdentity', 'mvNotifier', 'mvAuth', '$location', 'helperService'];

    function mvNavBarLoginCtrl($scope, mvIdentity, mvNotifier, mvAuth, $location, helperService) {
        var vm = this;

        $scope.identity = mvIdentity;
        $scope.signin = function (username, password) {
            mvAuth.authenticateUser(username, password).then(function (success) {
                if (success) {
                    mvNotifier.notify('You have successfully signed in!');
                    //$location.path('/backend');
                } else {
                    mvNotifier.notify('Username/Password combination incorrect');
                }
            });
        }
        $scope.signout = function () {
            mvAuth.logoutUser().then(function () {
                $scope.username = "";
                $scope.password = "";
                mvNotifier.notify('You have successfully signed out!');
                $location.path('/');
            })
        }

        vm.isActive = helperService.isActive;
    }

})()