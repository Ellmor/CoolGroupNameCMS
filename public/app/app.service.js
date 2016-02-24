(function(){
    "use strict";

    angular
        .module('app')
        .factory('AuthService', authService);

    //authService.$inject = ['$http'];

    function authService($rootScope, $http) {
        var service = {};

        var logIn = function(name, password, callback) {
            console.log('LogIn ' + name + ' ' + password);
            $http({
                method: 'POST',
                url: '/auth/logIn',
                data: {name: name, password: password}

            }).then(function successCallback(response) {
                console.log(response.data);
                callback(response);
            }, function errorCallback(response) {
                console.log(response);
            });
        }

        function SetCredentials(username, password) {
            $rootScope.globals = {currentUser: {}};
            $rootScope.globals.currentUser.username = username;
            $rootScope.globals.currentUser.password = password;

            return true;
        }

        /*SERVICE VALUES*/
        service.logIn = logIn;
        service.SetCredentials = SetCredentials;

        return service;
    }

})();
