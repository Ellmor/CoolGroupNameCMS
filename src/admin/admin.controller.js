(function() { "use strict";

    admin.module("userAdministrationController", userAdministrationController);

    function  userAdministrationController($scope, adminService) {

        adminService.getUsers().then(function(data){
            $scope.users = data;
        })
    }



})();