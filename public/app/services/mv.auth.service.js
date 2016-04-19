

(function () {
    angular.module('app')
        .factory('mvAuth', mvAuth);

    function mvAuth ($http, mvIdentity, $q, mvUser, ioService) {
        return {
            authenticateUser: function (username, password) {
                var dfd = $q.defer();
                $http.post('/login', {username: username, password: password}).then(function (response) {
                    if (response.data.success) {
                        var user = new mvUser();
                        angular.extend(user, response.data.user);
                        mvIdentity.currentUser = user;

                        //send back that the user was logged in
                        //other solution(?) Cannot resolve the problem that the information should be updated on other clients
                        ioService.emit('login', user, function(){
                            console.log('emit');
                        });

                        dfd.resolve(true);
                    } else {
                        dfd.resolve(false);
                    }
                });
                return dfd.promise;
            },
            logoutUser: function () {
                var dfd = $q.defer();
                $http.post('/logout', {logout: true}).then(function () {
                    mvIdentity.currentUser = undefined;
                    //send back that the user was logged in
                    //other solution(?) Cannot resolve the problem that the information should be updated on other clients
                    ioService.emit('logout', '', function(){
                        console.log('emit');
                    });
                    dfd.resolve();
                });
                return dfd.promise;
            },
            authorizeCurrentUserForRoute: function (role) {
                console.log('checkRole in mvAuth');
                if(mvIdentity.isAuthorized(role)){
                    return {success: true, resolve: true};
                } else {
                    console.log('not ' + role);
                    return {success: false, resolve: $q.reject('not authorized')};
                    //return false;
                }
            }

        }
    }

})()