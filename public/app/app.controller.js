(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', mainCtrl);

    //mainCtrl.$inject = ['AuthService'];

    function mainCtrl($scope, $rootScope,$http, $location, AuthService) {
        var vm = this;
        vm.title = "My New App";

        vm.name = null;
        vm.password = null;

        $scope.data = 'temp data';

        vm.signUp = function(){
            console.log('SignUp ' + vm.name + ' ' + vm.password);

            $http({
                method: 'POST',
                url: '/auth/signUp',
                data: {name: vm.name, password: vm.password}

            }).then(function successCallback(response) {
                console.log(response);
                $scope.data = response.data
                $scope.$apply();
                console.log($location.host());
                $location.path('/profile');
            }, function errorCallback(response) {
                console.log(response);
            });

        };

        vm.logIn = function(){
            console.log('LogIn ' + vm.name + ' ' + vm.password);
            //I cannot get the data out to scope. .
            var  authCallback= function(responce){
                $scope.data = responce.data.username;
                console.log(responce.data);
                AuthService.SetCredentials(responce.data.username, responce.data.password);

                console.log($location.host());
                console.log($scope.data);
                $location.path('/profile');
            }

            AuthService.logIn(vm.name, vm.password, authCallback);


        };
    /*
        $http({
            method: 'GET',
            url: '/auth/profile'
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    */

    }

})();