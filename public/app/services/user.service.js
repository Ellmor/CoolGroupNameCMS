(function(){

    angular
        .module('app')
        .factory('userService', userService);

    function userService($http){

        var getUsers = function(    ){
            return $http.get("/api/users")
                .then(function(response){

                    return response.data;
                })
        };

        //function accepts lmit for number of users. The endpoint was changed accordingly in backend
        var getUsersWithParam = function(limit, fields){
            var param = '';

            if(limit || fields){
                param += '?';
                if(limit && fields){
                    param += "limit=" + limit + "&fields=" + fields;
                } else if (limit){
                    param += "limit=" + limit;
                } else if (fields){
                    param += "fields=" + fields;
                }
            }
            console.log(param);
            return $http.get("/api/users" + param)
                .then(function(response){
                    return response.data;
                });
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
            return $http.put("/api/users/" + user._id, {username: user.username,
                password: user.password,
                firstName:user.firstName,
                lastName: user.lastName,
                roles: user.roles})
                .then(function(response){
                    return response.data;
                })
        };

        var requestNewPassword = function(user){
            return $http.post("/api/users/forgotPassword", {username: user.username, email: user.email})
                .then(function(response){
                    console.log(response);
                    return response.data;
                })
        };
        var resetPassword = function(user){
            console.log('resetPassword');
            return $http.put("/api/users/resetPassword", {token: user.token, password: user.password})
                .then(function(response){
                    console.log(response);
                    return response.data;
                })
        };

        return {
            getUsers: getUsers,
            getUser: getUser,
            createUser: createUser,
            updateUser: updateUser,
            requestNewPassword: requestNewPassword,
            resetPassword: resetPassword,
            deleteUser: deleteUser,
            getUsersWithParam: getUsersWithParam
        }

    }

}());
