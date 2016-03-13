

(function () {
    angular.module('app')
        .factory('mvAuth', mvAuth);

    function mvAuth ($http, mvIdentity, $q, mvUser) {
        return {
            authenticateUser: function (username, password) {
                var dfd = $q.defer();
                $http.post('/login', {username: username, password: password}).then(function (response) {
                    if (response.data.success) {
                        var user = new mvUser();
                        angular.extend(user, response.data.user);
                        mvIdentity.currentUser = user;
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
                    dfd.resolve();
                });
                return dfd.promise;
            },
            authorizeCurrentUserForRoute: function (role) {
                console.log('checkRole in mvAuth');
                if(mvIdentity.isAuthorized(role)){
                    return true;
                } else {
                    return $q.reject('not authorized');
                }
            }

        }
    }

})()