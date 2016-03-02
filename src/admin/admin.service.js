(function(){ "user strict";

    function  adminService($http){

        var getUsers = function(){
            return $http.get("/userAdmin")
                .then(function(res){ return res.data; });
        };

        return {
            getUsers: getUsers
        };
    }

    admin.factory("adminService", adminService);
})();