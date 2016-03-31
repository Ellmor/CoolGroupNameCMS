(function(){

    angular
        .module('app')
        .factory('userService', userService);

    function userService($http){

        var getUsers = function(    ){
            return $http.get("/api/users")
                .then(function(response){
                    console.log(response.data);
                    return response.data;
                })
        };

        var getUser = function(userid){
            return $http.get("/api/users/" + userid)
                .then(function(response){
                    return response.data;
                })
        };

        var createUser = function(user){
            console.log(user);
            return $http.post("/api/users", user)
                .then(function(response){
                    return response.data;
                })
        };

        var deleteUser = function(userid){
            return $http.delete("/api/users/" + userid)
                .then(function(response){
                    return response.data;
                })
        };

        var updateUser = function(user){
            return $http.put("/api/users/" + user._id, {username: user.username, password: user.password})
                .then(function(response){
                    return response.data;
                })
        };
        return {
            getUsers: getUsers,
            getUser: getUser,
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        }

    }

}());
