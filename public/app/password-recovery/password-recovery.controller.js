(function () {
    "use strict";

    angular
        .module('app')
        .controller('passwordRecoveryController', passwordRecoveryController);

    function passwordRecoveryController($scope, userService, mvNotifier, helperService, $routeParams) {
        var vm = this;

        vm.title = "Password Recovery";

        vm.recoverPassword = function(user){
            console.log('recoverPassword');
            console.log(user);
            userService.requestNewPassword(user).then(
                function(responce){
                   console.log(responce);
                    if(responce.success){
                        mvNotifier.notify(responce.message);
                    } else {
                        mvNotifier.notify(responce.message);
                    }
                }
            );
        };
    }

})();