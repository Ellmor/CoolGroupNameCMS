(function () {
    "use strict";

    angular
        .module('app')
        .controller('userController', userController);

    function userController($scope, userService, mvNotifier, helperService, $routeParams) {
        var vm = this;

        if ($routeParams.userId) {
            vm.userId = $routeParams.userId;
        }

        var modelUsers = function (data) {
            console.log(data);
            $scope.Users = data;
        }

        var modelUser = function (data) {
            $scope.User = data;
        }

        $scope.getUsers = function () {
            userService.getUsers()
                .then(modelUsers);
        }

        $scope.getUser = function (userid) {
            userService.getUser(userid)
                .then(modelUser);
        }

        $scope.createUser = function (user) {
            userService.createUser(user);
            userService.getUsers()
                .then(modelUsers);
        }

        $scope.updateUser = function (user) {
            console.log(user);
            userService.updateUser(user);
            userService.getUser(user.userid)
                .then(modelUser);
        }


        $scope.deleteUser = function (userid) {
            userService.deleteUser(userid).then(
                function(responce){
                    //if the user was deleted
                    if(responce.success){
                        //notify thet the user was deleted
                        mvNotifier.notify(responce.message);
                        //get the new list of users and add it to the scope.
                        userService.getUsers()
                            .then(modelUsers);
                    //otherwise show error message and do nothing.
                    } else {
                        mvNotifier.notify(responce.message);
                    }
                }
            );

        }

    }

})();

