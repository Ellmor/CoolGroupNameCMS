(function(){
    "use strict";

    angular
        .module('main', [])
        .controller('userController', userController);

    function userController($scope, userService){

        var modelUsers = function(data){
            $scope.Users = data;
        }

        var modelUser = function(data){
            $scope.User = data;
        }

        $scope.getUsers = function(){
            userService.getUsers()
                .then(modelUsers);
        }

        $scope.getUser = function(userid){
            userService.getUser(userid)
                .then(modelUser);
        }

        $scope.createUser = function(user){
            userService.createUser(user);
            userService.getUsers()
                .then(modelUsers);
        }

        $scope.updateUser = function(user){
            console.log(user);
            userService.updateUser(user);
            userService.getUser(user.userid)
                .then(modelUser);
        }
        $scope.deleteUser = function(userid){
            userService.deleteUser(userid);
            userService.getUsers()
                .then(modelUsers);
        }

    }

})();