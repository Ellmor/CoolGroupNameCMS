/**
 * Created by Liga on 06-04-2016.
 */
(function () {
    "use strict";

    angular
        .module('app')
        .controller('passwordResetController', passwordResetController);

    function passwordResetController(userService, mvNotifier, $routeParams, $location) {
        var vm = this;

        vm.title = "Password Reset";

        var userModel = {
            token: $routeParams.token,
            password: ""
        }

        vm.resetPassword = function(password){
            console.log('resetPassword');
            console.log(password);
            userModel.password = password
            //console.log(userModel);
            userService.resetPassword(userModel).then(
                function(responce){
                    //console.log(responce);
                    if(responce.success){
                        mvNotifier.notify(responce.message);
                        $location.path('/');
                    } else {
                        mvNotifier.notify(responce.message);
                    }
                }
            );
        };
    }

})();