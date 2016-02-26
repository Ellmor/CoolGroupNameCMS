(function(){

    var userService = function($http){

        var getUsers = function(){
            return $http.get("/users")
                .then(function(response){
                    return response.data;
                })
        };

        var getUser = function(userid){
            return $http.get("/users/" + userid)
                .then(function(response){
                    return response.data;
                })
        };

        var createUser = function(user){
            return $http.post("/users", user)
                .then(function(response){
                    return response.data;
                })
        };

        var deleteUser = function(userid){
            return $http.delete("/users/" + userid)
                .then(function(response){
                    return response.data;
                })
        };

        var updateUser = function(user){
            return $http.put("/users/" + user._id, {username: user.username, password: user.password})
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
    angular
        .module('main')
        .factory('userService', userService);

}());
